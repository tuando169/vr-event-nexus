import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Monitor,
  Users,
  Activity,
  Settings,
  Radio,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { eventService } from "@/services/eventService";
import { mediaService } from "@/services/mediaService";
import { deviceService } from "@/services/deviceService";
import { Event, MediaFile, Device } from "@/types/api";
import { getMediaFile } from "@/lib/utils";

const StreamingControl = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [playlist, setPlaylist] = useState<MediaFile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [streamImage, setStreamImage] = useState<string | null>(null);
  const [lastStreamId, setLastStreamId] = useState<string | null>(null);

  const currentVideo = playlist[currentIndex] || null;

  const fetchStreamFrame = async () => {
    try {
      const res = await mediaService.getMediaFiles({ page: 1, size: 1000 });
      if (!res.data) return;

      const streams = res.data.filter((m: MediaFile) =>
        m.path?.startsWith("public/streaming")
      );
      if (streams.length === 0) return;

      const latest = streams.sort(
        (a: MediaFile, b: MediaFile) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )[0];

      if (latest && latest._id !== lastStreamId) {
        // Xoá ảnh cũ nếu có
        if (lastStreamId) {
          deleteMediaFile(lastStreamId);
        }

        // Cập nhật ảnh mới
        setStreamImage(getMediaFile(latest.path));
        setLastStreamId(latest._id);
      }
    } catch (err) {
      console.error("Lỗi khi fetch stream frame:", err);
    }
  };

  const deleteMediaFile = async (id: string) => {
    try {
      await fetch(`http://45.124.94.12:8080/api/v1/mediafile/delete/${id}`, {
        method: "DELETE",
      });
      console.log("Đã xóa file cũ:", id);
    } catch (err) {
      console.error("Lỗi khi xóa file:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStreamFrame();
    }, 1000);

    return () => clearInterval(interval);
  }, [lastStreamId]);

  // format time mm:ss
  const formatTime = (sec: number) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Fetch data lần đầu
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const eventsRes = await eventService.getEvent();
        if (eventsRes.data) {
          setEvents(eventsRes.data);

          if (eventsRes.data.length > 0) {
            const firstEvent = eventsRes.data[0];
            setSelectedEvent(firstEvent);
            await loadPlaylist(firstEvent.video_list);
          }
        } else {
          setEvents([]);
        }

        const deviceRes = await deviceService.getDevices();
        setDevices(deviceRes.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu streaming:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleLoadedMetadata = () => {
      setDuration(videoEl.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoEl.currentTime);
    };

    const handleEnded = () => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= playlist.length) nextIndex = 0;
      handlePlayVideo(nextIndex);
    };

    videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    videoEl.addEventListener("ended", handleEnded);

    return () => {
      videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoEl.removeEventListener("timeupdate", handleTimeUpdate);
      videoEl.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, playlist]);
  // Hàm load playlist dựa vào danh sách id trong event
  const loadPlaylist = async (videoIds: string[]) => {
    try {
      const mediaRes = await mediaService.getMediaFiles();
      const filtered = mediaRes.data.filter((v) => videoIds.includes(v._id));
      setPlaylist(filtered);
      setCurrentIndex(0);
    } catch (err) {
      console.error("Lỗi khi load playlist:", err);
    }
  };

  // Khi chọn event khác
  const handleSelectEvent = async (event: Event) => {
    setSelectedEvent(event);
    await loadPlaylist(event.video_list);
    setIsStreaming(false);
  };

  // Hàm play video
  const handlePlayVideo = async (index: number) => {
    setCurrentIndex(index);
    setIsStreaming(true);

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.currentTime = 0;
      videoEl
        .play()
        .catch((err) => console.warn("Play blocked by browser:", err));
    }

    if (selectedEvent) {
      await eventService.updateEvent(selectedEvent._id, {
        streaming: playlist[index]?._id || "",
      });
    }
  };

  const handlePauseVideo = async () => {
    setIsStreaming(false);

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.pause();
    }

    if (selectedEvent) {
      await eventService.updateEvent(selectedEvent._id, { streaming: "" });
    }
  };

  // Auto next khi video kết thúc + update progress
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleLoadedMetadata = () => {
      setDuration(videoEl.duration);
    };

    const handleTimeUpdate = () => {
      if (videoEl.duration > 0) {
        setCurrentTime(videoEl.currentTime);
        setProgress((videoEl.currentTime / videoEl.duration) * 100);
      }
    };

    const handleEnded = () => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= playlist.length) nextIndex = 0;
      handlePlayVideo(nextIndex);
    };

    videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    videoEl.addEventListener("ended", handleEnded);

    return () => {
      videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoEl.removeEventListener("timeupdate", handleTimeUpdate);
      videoEl.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, playlist]);

  // Đồng bộ volume với video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Điều khiển Streaming
            </h1>
            <p className="text-muted-foreground">
              Quản lý nội dung phát cho các thiết bị VR được kết nối
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              className={
                isStreaming
                  ? "bg-vr-secondary text-vr-background"
                  : "bg-secondary"
              }
            >
              {isStreaming ? "Đang phát" : "Dừng"}
            </Badge>
            <Button
              onClick={() =>
                isStreaming ? handlePauseVideo() : handlePlayVideo(currentIndex)
              }
              className={
                isStreaming
                  ? "bg-destructive hover:bg-destructive/90"
                  : "bg-gradient-primary hover:opacity-90"
              }
            >
              <Radio className="mr-2 h-4 w-4" />
              {isStreaming ? "Dừng Stream" : "Bắt đầu Stream"}
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">
            Đang tải dữ liệu...
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Video */}
              {currentVideo && (
                <Card className="bg-vr-surface border-border shadow-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Video Hiện tại
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <video
                        ref={videoRef}
                        src={getMediaFile(currentVideo.path)}
                        autoPlay={isStreaming}
                        controls={false}
                        className="w-full rounded-lg"
                      />
                      <div className="flex items-center space-x-4">
                        <img
                          src={getMediaFile(currentVideo.thumbnail)}
                          alt=""
                          className="object-cover h-12 w-12 rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-foreground mb-1">
                            {currentVideo.title}
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            Đang phát cho event {selectedEvent?.title}
                          </div>
                          <div className="w-full bg-vr-surface-elevated rounded-full h-2 mt-2">
                            <div
                              className="bg-gradient-primary h-2 rounded-full transition-all duration-200"
                              style={{
                                width: `${(currentTime / duration) * 100}%`,
                              }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              isStreaming
                                ? handlePauseVideo()
                                : handlePlayVideo(currentIndex)
                            }
                            className={
                              isStreaming
                                ? "bg-vr-secondary text-vr-background"
                                : ""
                            }
                          >
                            {isStreaming ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setVolume(volume[0] === 0 ? [75] : [0])
                            }
                          >
                            {volume[0] === 0 ? (
                              <VolumeX className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>

                          <div className="w-24">
                            <Slider
                              value={volume}
                              onValueChange={setVolume}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {volume[0]}%
                          </span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Playlist */}
              <Card className="bg-vr-surface border-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Danh sách phát
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {playlist.map((video, index) => (
                      <div
                        key={video._id}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                          currentIndex === index
                            ? "bg-gradient-primary/10 border-primary"
                            : "bg-vr-surface-elevated border-border hover:bg-vr-surface-elevated/80"
                        }`}
                        onClick={() => handlePlayVideo(index)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-sm text-muted-foreground w-6">
                            {index + 1}
                          </div>
                          <div>
                            <div
                              className={`font-medium ${
                                currentIndex === index
                                  ? "text-primary"
                                  : "text-foreground"
                              }`}
                            >
                              {video.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {Math.round(video.size / (1024 * 1024))} MB
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {currentIndex === index && isStreaming && (
                            <Badge className="bg-vr-secondary text-vr-background">
                              Đang phát
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handlePlayVideo(index)}
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-vr-surface border-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Stream từ thiết bị</CardTitle>
                </CardHeader>
                <CardContent>
                  {streamImage ? (
                    <img
                      src={streamImage}
                      alt="VR Stream Frame"
                      className="rounded-lg w-full object-contain max-h-[400px]"
                    />
                  ) : (
                    <p className="text-muted-foreground">Chưa có stream nào</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Selector */}
              <Card className="bg-vr-surface border-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Sự kiện</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div
                        key={event._id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedEvent?._id === event._id
                            ? "bg-gradient-primary/10 border-primary"
                            : "bg-vr-surface-elevated border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleSelectEvent(event)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div
                              className={`font-medium ${
                                selectedEvent?._id === event._id
                                  ? "text-primary"
                                  : "text-foreground"
                              }`}
                            >
                              {event.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ID: {event._id}
                            </div>
                          </div>
                          <Badge className="bg-vr-secondary text-vr-background">
                            {event.video_list.length}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Connected Devices */}
              <Card className="bg-vr-surface border-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Monitor className="mr-2 h-5 w-5" />
                    Thiết bị kết nối
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {devices.map((device) => (
                      <div
                        key={device._id}
                        className="flex items-center justify-between p-3 bg-vr-surface-elevated rounded-lg border border-border"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              device.is_active
                                ? "bg-vr-secondary"
                                : "bg-muted-foreground"
                            }`}
                          />
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {device.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Event: {device.streaming_event || "Không có"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {device.activity}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-vr-surface border-border shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Users className="h-8 w-8 text-vr-secondary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          234
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Người xem
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-vr-surface border-border shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-8 w-8 text-vr-primary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {devices.filter((d) => d.is_active).length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Thiết bị active
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamingControl;

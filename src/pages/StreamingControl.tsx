import { useEffect, useState } from "react";
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
  Eye,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { eventService } from "@/services/eventService";
import { mediaService } from "@/services/mediaService";
import { Event, MediaFile } from "@/types/api";
// import { streamService } from "@/services/streamService"; // bạn tạo service này để gọi API backend

const StreamingControl = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const [activeEvents, setActiveEvents] = useState<Event[]>([]);
  const [playlist, setPlaylist] = useState<MediaFile[]>([]);
  const [currentVideo, setCurrentVideo] = useState<MediaFile | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock device list (sẽ thay bằng deviceService sau)
  const connectedDevices = [
    {
      id: "HMD001",
      name: "Oculus Quest 2 #001",
      user: "Người dùng #1",
      status: "connected",
      lastActivity: "2 phút trước",
    },
    {
      id: "HMD002",
      name: "HTC Vive Pro #002",
      user: "Người dùng #2",
      status: "connected",
      lastActivity: "1 phút trước",
    },
    {
      id: "HMD003",
      name: "Pico 4 #003",
      user: "Người dùng #3",
      status: "idle",
      lastActivity: "5 phút trước",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Lấy danh sách sự kiện đang active
        const eventsRes = await eventService.getEvent(1, 10);
        const events = eventsRes.data.filter((e) => e.streaming === "active");
        setActiveEvents(events);

        // Chọn event đầu tiên làm default
        if (events.length > 0) {
          setSelectedEvent(events[0]._id);
        }

        // Lấy media files
        const mediaRes = await mediaService.getMediaFiles(1);
        setPlaylist(mediaRes.data);

        // Gán video đầu tiên làm current
        if (mediaRes.data.length > 0) {
          setCurrentVideo(mediaRes.data[0]);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu streaming:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Hàm bắt đầu stream 1 video
  const handlePlayVideo = async (video: MediaFile) => {
    setCurrentVideo(video);
    setIsStreaming(true);

    try {
      // Gọi API backend nếu có
      // await streamService.startStream(selectedEvent, video._id);
      console.log("Streaming video:", video.title, "cho event:", selectedEvent);
    } catch (error) {
      console.error("Lỗi khi start stream:", error);
    }
  };

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
              onClick={() => setIsStreaming(!isStreaming)}
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
                      <div className="flex items-center space-x-4">
                        <div className="text-6xl">🎬</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-foreground mb-1">
                            {currentVideo.title}
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            Đang phát cho event {selectedEvent}
                          </div>
                          <div className="w-full bg-vr-surface-elevated rounded-full h-2 mt-2">
                            <div
                              className="bg-gradient-primary h-2 rounded-full"
                              style={{ width: "30%" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => setIsStreaming(!isStreaming)}
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
                          currentVideo?._id === video._id
                            ? "bg-gradient-primary/10 border-primary"
                            : "bg-vr-surface-elevated border-border hover:bg-vr-surface-elevated/80"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-sm text-muted-foreground w-6">
                            {index + 1}
                          </div>
                          <div>
                            <div
                              className={`font-medium ${
                                currentVideo?._id === video._id
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
                          {currentVideo?._id === video._id && (
                            <Badge className="bg-vr-secondary text-vr-background">
                              Đang phát
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handlePlayVideo(video)}
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Selector */}
              <Card className="bg-vr-surface border-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Sự kiện Active
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activeEvents.map((event) => (
                      <div
                        key={event._id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedEvent === event._id
                            ? "bg-gradient-primary/10 border-primary"
                            : "bg-vr-surface-elevated border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedEvent(event._id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div
                              className={`font-medium ${
                                selectedEvent === event._id
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
                    {connectedDevices.map((device) => (
                      <div
                        key={device.id}
                        className="flex items-center justify-between p-3 bg-vr-surface-elevated rounded-lg border border-border"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              device.status === "connected"
                                ? "bg-vr-secondary"
                                : "bg-muted-foreground"
                            }`}
                          />
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {device.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {device.user}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {device.lastActivity}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
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
                          {
                            connectedDevices.filter(
                              (d) => d.status === "connected"
                            ).length
                          }
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

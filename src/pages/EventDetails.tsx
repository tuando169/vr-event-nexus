import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Settings,
  Upload,
  Image as ImageIcon,
  Video,
  Play,
  Trash2,
  Plus,
  Users,
  Calendar,
  Key,
} from "lucide-react";
import { eventService } from "@/services/eventService";
import { mediaService } from "@/services/mediaService";
import { Event, MediaFile } from "@/types/api";
import { getMediaFile } from "@/lib/utils";
import { toast } from "sonner";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const isCreateMode = eventId === "create";

  const [isEditing, setIsEditing] = useState(isCreateMode);
  const [event, setEvent] = useState<Event | null>(
    isCreateMode
      ? {
          _id: "",
          title: "",
          description: "",
          intro: "",
          logo: "",
          video_list: [],
          streaming: "draft",
          username: "",
          password: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      : null
  );
  const [videos, setVideos] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId || isCreateMode) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await eventService.getEventDetail(eventId);
        setEvent(res.data);

        const mediaRes = await mediaService.getMediaFiles(1);
        const filtered = mediaRes.data.filter((v) =>
          res.data.video_list.includes(v._id)
        );
        setVideos(filtered);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sự kiện:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId, isCreateMode]);

  const handleSave = async () => {
    try {
      if (!event) return;
      if (isCreateMode) {
        const res = await eventService.createEvent({
          title: event.title,
          description: event.description,
        });
        toast.success("Tạo sự kiện thành công!");
        navigate(`/events/${res.data._id}`);
      } else {
        const res = await eventService.updateEvent(event._id, {
          title: event.title,
          description: event.description,
        });
        toast.success("Cập nhật sự kiện thành công!");
        setEvent(res.data);
        setIsEditing(false);
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra khi lưu sự kiện");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Đang tải chi tiết sự kiện...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Không tìm thấy sự kiện
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/events">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isCreateMode ? "Tạo sự kiện mới" : event.title}
              </h1>
              <p className="text-muted-foreground">
                {isCreateMode
                  ? "Điền thông tin để tạo sự kiện VR"
                  : "Quản lý chi tiết sự kiện VR"}
              </p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            variant={isEditing ? "default" : "outline"}
          >
            <Settings className="mr-2 h-4 w-4" />
            {isEditing
              ? isCreateMode
                ? "Tạo Sự kiện"
                : "Lưu thay đổi"
              : "Chỉnh sửa"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Info */}
            <Card className="bg-vr-surface border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Thông tin Sự kiện
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Tên sự kiện
                    </Label>
                    {isEditing ? (
                      <Input
                        value={event.title}
                        onChange={(e) =>
                          setEvent({ ...event, title: e.target.value })
                        }
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 text-foreground">{event.title}</div>
                    )}
                  </div>
                  {!isCreateMode && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        ID Sự kiện
                      </Label>
                      <div className="mt-1 text-foreground font-mono">
                        {event._id}
                      </div>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Mật khẩu
                    </Label>
                    {isEditing ? (
                      <Input
                        value={event.password}
                        onChange={(e) =>
                          setEvent({ ...event, password: e.target.value })
                        }
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 text-foreground font-mono">
                        {event.password}
                      </div>
                    )}
                  </div>
                  {!isCreateMode && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Trạng thái
                      </Label>
                      <div className="mt-1">
                        <Badge className="bg-vr-secondary text-vr-background">
                          {event.streaming === "active"
                            ? "Đang diễn ra"
                            : event.streaming}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Mô tả
                  </Label>
                  {isEditing ? (
                    <textarea
                      value={event.description}
                      onChange={(e) =>
                        setEvent({ ...event, description: e.target.value })
                      }
                      className="mt-1 w-full p-3 bg-vr-surface-elevated border border-border rounded-md text-foreground"
                      rows={3}
                    />
                  ) : (
                    <div className="mt-1 text-foreground">
                      {event.description}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Customization */}
            {!isCreateMode && (
              <Card className="bg-vr-surface border-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <ImageIcon className="mr-2 h-5 w-5" />
                    Tùy chỉnh Giao diện
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Logo Sự kiện
                    </Label>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="w-20 h-20 bg-vr-surface-elevated border border-border rounded-lg flex items-center justify-center overflow-hidden">
                        {event.logo ? (
                          <img
                            src={getMediaFile(event.logo)}
                            alt="Logo sự kiện"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl">🏢</span>
                        )}
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Đổi Logo
                        </Button>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Intro Text
                    </Label>
                    {isEditing ? (
                      <textarea
                        value={event.intro}
                        onChange={(e) =>
                          setEvent({ ...event, intro: e.target.value })
                        }
                        className="mt-1 w-full p-3 bg-vr-surface-elevated border border-border rounded-md text-foreground"
                        rows={3}
                      />
                    ) : (
                      <div className="mt-1 p-3 bg-vr-surface-elevated rounded-lg text-foreground">
                        {event.intro}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Video Playlist */}
            {!isCreateMode && (
              <Card className="bg-vr-surface border-border shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground flex items-center">
                      <Video className="mr-2 h-5 w-5" />
                      Playlist Video ({videos.length})
                    </CardTitle>
                    <Button
                      size="sm"
                      className="bg-gradient-primary hover:opacity-90"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm Video
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {videos.map((video, index) => (
                      <div
                        key={video._id}
                        className="flex items-center justify-between p-3 bg-vr-surface-elevated rounded-lg border border-border"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-vr-primary/20 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">
                              {video.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {Math.round(video.size / (1024 * 1024))} MB
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          {!isCreateMode && (
            <div className="space-y-6">
              <Card className="bg-vr-surface border-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Thống kê</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-vr-secondary" />
                      <span className="text-muted-foreground">
                        Người tham gia
                      </span>
                    </div>
                    <span className="text-foreground font-medium">
                      {event.username}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-vr-secondary" />
                      <span className="text-muted-foreground">Ngày tạo</span>
                    </div>
                    <span className="text-foreground font-medium">
                      {new Date(event.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4 text-vr-secondary" />
                      <span className="text-muted-foreground">Mật khẩu</span>
                    </div>
                    <span className="text-foreground font-mono font-medium">
                      {event.password}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4 text-vr-secondary" />
                      <span className="text-muted-foreground">Video</span>
                    </div>
                    <span className="text-foreground font-medium">
                      {videos.length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

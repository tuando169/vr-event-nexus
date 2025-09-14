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
  User,
  Lock,
} from "lucide-react";
import { eventService } from "@/services/eventService";
import { mediaService } from "@/services/mediaService";
import { Event, MediaFile } from "@/types/api";
import { getMediaFile } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const isCreateMode = eventId === "create";
  const [open, setOpen] = useState(false);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(isCreateMode); // Allow create mode without auth
  const [authForm, setAuthForm] = useState({ username: "", password: "" });
  const [authLoading, setAuthLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(true);
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
  const [allVideos, setAllVideos] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);

  // Authentication handler
  const handleAuth = async () => {
    if (!eventId || isCreateMode) return;

    setAuthLoading(true);
    try {
      const res = await eventService.getEventDetail(eventId);
      const eventData = res.data;

      // Check credentials
      if (
        authForm.username === eventData.username &&
        authForm.password === eventData.password
      ) {
        setIsAuthenticated(true);
        setEvent(eventData);
        toast.success("Đăng nhập thành công!");

        // Load media files
        const mediaRes = await mediaService.getMediaFiles();
        setAllVideos(mediaRes.data);
        const filtered = mediaRes.data.filter((v) =>
          eventData.video_list.includes(v._id)
        );
        setVideos(filtered);
      } else {
        toast.error("Sai tên đăng nhập hoặc mật khẩu!");
      }
    } catch (error) {
      console.error("Lỗi xác thực:", error);
      toast.error("Có lỗi xảy ra khi xác thực!");
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (!eventId || isCreateMode) {
      setLoading(false);
      return;
    }

    // For non-create mode, just load basic event info to show login form
    const fetchBasicEventInfo = async () => {
      try {
        setLoading(true);
        // We'll just set loading to false and show auth form
      } catch (error) {
        console.error("Lỗi khi tải thông tin sự kiện:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBasicEventInfo();
  }, [eventId, isCreateMode]);

  const handleSave = async () => {
    try {
      if (!event) return;
      if (isCreateMode) {
        const res = await eventService.createEvent({
          title: event.title,
          description: event.description,
          username: event.username,
          password: event.password,
          intro: event.intro,
        });
        toast.success("Tạo sự kiện thành công!");
        navigate(`/events/${res.data._id}`);
        setEvent(res.data);
        setIsEditing(false);
      } else {
        const res = await eventService.updateEvent(event._id, {
          title: event.title,
          description: event.description,
          password: event.password,
          intro: event.intro,
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

  // Show authentication form for non-create mode
  if (!isCreateMode && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-background">
        <div className="max-w-md mx-auto px-4 py-16">
          <Card className="bg-vr-surface border-border shadow-card">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-vr-primary/20 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-vr-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">
                Xác thực Sự kiện
              </CardTitle>
              <p className="text-muted-foreground">
                Nhập tên đăng nhập và mật khẩu để xem chi tiết sự kiện
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  type="text"
                  value={authForm.username}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, username: e.target.value })
                  }
                  className="mt-1"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
              <div>
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={authForm.password}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, password: e.target.value })
                  }
                  className="mt-1"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <Button
                onClick={handleAuth}
                disabled={
                  !authForm.username || !authForm.password || authLoading
                }
                className="w-full bg-gradient-primary hover:opacity-90"
              >
                {authLoading ? "Đang xác thực..." : "Đăng nhập"}
              </Button>
              <div className="text-center">
                <Link to="/events">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại danh sách sự kiện
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
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
                  {/* Tên sự kiện */}
                  <div>
                    <Label>Tên sự kiện</Label>
                    <Input
                      value={event.title}
                      onChange={(e) =>
                        setEvent({ ...event, title: e.target.value })
                      }
                      className="mt-1"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* ID Sự kiện (chỉ edit) */}
                  {!isCreateMode && (
                    <div>
                      <Label>ID Sự kiện</Label>
                      <div className="mt-1 text-foreground font-mono">
                        {event._id}
                      </div>
                    </div>
                  )}

                  {/* Người chủ trì */}
                  <div>
                    <Label>Người chủ trì</Label>
                    {isCreateMode ? (
                      <Input
                        value={event.username}
                        onChange={(e) =>
                          setEvent({ ...event, username: e.target.value })
                        }
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 text-foreground font-mono">
                        {event.username || "—"}
                      </div>
                    )}
                  </div>

                  {/* Mật khẩu */}
                  <div>
                    <Label>Mật khẩu</Label>
                    <Input
                      value={event.password}
                      onChange={(e) =>
                        setEvent({ ...event, password: e.target.value })
                      }
                      className="mt-1"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Mô tả */}
                <div>
                  <Label>Mô tả</Label>
                  <textarea
                    value={event.description}
                    onChange={(e) =>
                      setEvent({ ...event, description: e.target.value })
                    }
                    className="mt-1 w-full p-3 bg-vr-surface-elevated border border-border rounded-md text-foreground"
                    rows={3}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Customization */}
            <Card className="bg-vr-surface border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <ImageIcon className="mr-2 h-5 w-5" />
                  Tùy chỉnh Giao diện
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo */}
                <div>
                  <Label>Logo Sự kiện</Label>
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
                      <>
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const res = await mediaService
                                .uploadFile(file, "vr360")
                                .then((res) => {
                                  setEvent({ ...event, logo: res.data.path });

                                  const url = URL.createObjectURL(file);
                                  setEvent({ ...event, logo: url });
                                });
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            document.getElementById("logo-upload")?.click()
                          }
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Đổi Logo
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Intro Video */}
                <div>
                  <Label>Intro Video</Label>
                  <div className="mt-2 space-y-2">
                    {event.intro ? (
                      <video
                        src={getMediaFile(event.intro)}
                        controls
                        className="w-full rounded-lg"
                      />
                    ) : (
                      <div className="text-muted-foreground">
                        Chưa chọn video intro
                      </div>
                    )}
                    {isEditing && (
                      <div className="flex space-x-2">
                        <div>
                          <input
                            type="file"
                            accept="video/*"
                            id="introUpload"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              try {
                                const res = await mediaService.uploadFile(
                                  file,
                                  "vr360"
                                );
                                setEvent({ ...event, intro: res.data.path });
                                toast.success("Upload intro thành công!");
                              } catch (err) {
                                toast.error("Upload thất bại");
                                console.error(err);
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              document.getElementById("introUpload")?.click()
                            }
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Video
                          </Button>
                        </div>
                        <Dialog open={open} onOpenChange={setOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Video className="mr-2 h-4 w-4" />
                              Chọn từ danh sách
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Chọn Video Intro</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2 max-h-80 overflow-y-auto">
                              {allVideos
                                .filter((i) => i.path.includes("vr360"))
                                .map((v) => (
                                  <div
                                    key={v._id}
                                    className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-vr-surface-elevated"
                                    onClick={() => {
                                      setEvent({ ...event, intro: v.path });
                                      toast.success("Chọn intro thành công");
                                      setOpen(false);
                                    }}
                                  >
                                    <span>{v.title}</span>
                                    <Play className="h-4 w-4" />
                                  </div>
                                ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Playlist */}
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
                      <User className="h-4 w-4 text-vr-secondary" />
                      <span className="text-muted-foreground">
                        Người chủ trì
                      </span>
                    </div>
                    <span className="text-foreground font-medium">
                      {event.username || "—"}
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

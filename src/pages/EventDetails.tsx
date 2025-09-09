import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Settings,
  Upload,
  Image,
  Video,
  Play,
  Trash2,
  Plus,
  Save,
  Users,
  Calendar,
  Key
} from "lucide-react";

const EventDetails = () => {
  const { eventId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  
  const event = {
    id: "EVT001",
    name: "Triển lãm Ô tô Quốc tế 2024",
    description: "Khám phá các mẫu xe mới nhất từ các thương hiệu hàng đầu",
    status: "active",
    participants: 234,
    maxParticipants: 500,
    startDate: "2024-01-15",
    endDate: "2024-01-20", 
    password: "AUTO2024",
    customization: {
      hasCustomLogo: true,
      hasCustomIntro: true,
      logoUrl: "🏢",
      introText: "Chào mừng bạn đến với Triển lãm Ô tô Quốc tế 2024!"
    }
  };

  const eventVideos = [
    { id: "VID001", title: "Triển lãm Ô tô - Khu vực A", duration: "00:15:30", order: 1 },
    { id: "VID002", title: "Triển lãm Ô tô - Khu vực B", duration: "00:12:45", order: 2 },
    { id: "VID003", title: "Triển lãm Ô tô - Showroom Mercedes", duration: "00:18:20", order: 3 },
    { id: "VID004", title: "Triển lãm Ô tô - Test Drive Area", duration: "00:10:15", order: 4 }
  ];

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
              <h1 className="text-3xl font-bold text-foreground">{event.name}</h1>
              <p className="text-muted-foreground">Quản lý chi tiết sự kiện VR</p>
            </div>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
          >
            <Settings className="mr-2 h-4 w-4" />
            {isEditing ? "Lưu thay đổi" : "Chỉnh sửa"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Info */}
            <Card className="bg-vr-surface border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Thông tin Sự kiện</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Tên sự kiện</Label>
                    {isEditing ? (
                      <Input defaultValue={event.name} className="mt-1" />
                    ) : (
                      <div className="mt-1 text-foreground">{event.name}</div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">ID Sự kiện</Label>
                    <div className="mt-1 text-foreground font-mono">{event.id}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Mật khẩu</Label>
                    {isEditing ? (
                      <Input defaultValue={event.password} className="mt-1" />
                    ) : (
                      <div className="mt-1 text-foreground font-mono">{event.password}</div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Trạng thái</Label>
                    <div className="mt-1">
                      <Badge className="bg-vr-secondary text-vr-background">
                        {event.status === 'active' ? 'Đang diễn ra' : event.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Mô tả</Label>
                  {isEditing ? (
                    <textarea 
                      defaultValue={event.description}
                      className="mt-1 w-full p-3 bg-vr-surface-elevated border border-border rounded-md text-foreground"
                      rows={3}
                    />
                  ) : (
                    <div className="mt-1 text-foreground">{event.description}</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Customization */}
            <Card className="bg-vr-surface border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Image className="mr-2 h-5 w-5" />
                  Tùy chỉnh Giao diện
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo */}
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Logo Sự kiện</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="w-20 h-20 bg-vr-surface-elevated border border-border rounded-lg flex items-center justify-center text-2xl">
                      {event.customization.logoUrl}
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Đổi Logo
                      </Button>
                    )}
                  </div>
                </div>

                {/* Intro Text */}
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Intro Text</Label>
                  {isEditing ? (
                    <textarea 
                      defaultValue={event.customization.introText}
                      className="mt-1 w-full p-3 bg-vr-surface-elevated border border-border rounded-md text-foreground"
                      rows={3}
                      placeholder="Nhập lời chào mừng cho sự kiện..."
                    />
                  ) : (
                    <div className="mt-1 p-3 bg-vr-surface-elevated rounded-lg text-foreground">
                      {event.customization.introText}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Video Playlist */}
            <Card className="bg-vr-surface border-border shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground flex items-center">
                    <Video className="mr-2 h-5 w-5" />
                    Playlist Video ({eventVideos.length})
                  </CardTitle>
                  <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm Video
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eventVideos.map((video, index) => (
                    <div key={video.id} className="flex items-center justify-between p-3 bg-vr-surface-elevated rounded-lg border border-border">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-vr-primary/20 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                          {video.order}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{video.title}</div>
                          <div className="text-sm text-muted-foreground">{video.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
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
            {/* Quick Stats */}
            <Card className="bg-vr-surface border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-vr-secondary" />
                    <span className="text-muted-foreground">Người tham gia</span>
                  </div>
                  <span className="text-foreground font-medium">{event.participants}/{event.maxParticipants}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-vr-secondary" />
                    <span className="text-muted-foreground">Thời gian</span>
                  </div>
                  <span className="text-foreground font-medium">{event.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-vr-secondary" />
                    <span className="text-muted-foreground">Mật khẩu</span>
                  </div>
                  <span className="text-foreground font-mono font-medium">{event.password}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Video className="h-4 w-4 text-vr-secondary" />
                    <span className="text-muted-foreground">Video</span>
                  </div>
                  <span className="text-foreground font-medium">{eventVideos.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-vr-surface border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Hành động</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/streaming" className="block">
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    Điều khiển Stream
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Xuất báo cáo
                </Button>
                <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                  Xóa sự kiện
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Calendar, 
  Users, 
  Settings, 
  Play,
  Pause,
  Eye,
  Copy,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";

const EventManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const events = [
    {
      id: "EVT001",
      name: "Triển lãm Ô tô Quốc tế 2024",
      description: "Khám phá các mẫu xe mới nhất từ các thương hiệu hàng đầu",
      status: "active",
      participants: 234,
      maxParticipants: 500,
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      password: "AUTO2024",
      videoCount: 12,
      customization: {
        hasCustomLogo: true,
        hasCustomIntro: true
      }
    },
    {
      id: "EVT002", 
      name: "Hội thảo VR Technology",
      description: "Tìm hiểu về công nghệ thực tế ảo và ứng dụng",
      status: "scheduled",
      participants: 89,
      maxParticipants: 200,
      startDate: "2024-01-22",
      endDate: "2024-01-22",
      password: "VR2024",
      videoCount: 8,
      customization: {
        hasCustomLogo: false,
        hasCustomIntro: true
      }
    },
    {
      id: "EVT003",
      name: "Khám phá Bảo tàng Lịch sử",
      description: "Tour tham quan ảo các hiện vật lịch sử quý giá",
      status: "completed",
      participants: 156,
      maxParticipants: 300,
      startDate: "2024-01-10",
      endDate: "2024-01-12", 
      password: "MUSEUM2024",
      videoCount: 15,
      customization: {
        hasCustomLogo: true,
        hasCustomIntro: true
      }
    },
    {
      id: "EVT004",
      name: "Hội chợ Sản phẩm Công nghệ",
      description: "Giới thiệu các sản phẩm công nghệ đổi mới",
      status: "draft",
      participants: 0,
      maxParticipants: 400,
      startDate: "2024-02-01",
      endDate: "2024-02-03",
      password: "TECH2024",
      videoCount: 5,
      customization: {
        hasCustomLogo: false,
        hasCustomIntro: false
      }
    }
  ];

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-vr-secondary text-vr-background';
      case 'scheduled': return 'bg-vr-primary text-primary-foreground';
      case 'completed': return 'bg-muted-foreground text-foreground';
      case 'draft': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang diễn ra';
      case 'scheduled': return 'Đã lên lịch';
      case 'completed': return 'Đã hoàn thành';
      case 'draft': return 'Nháp';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Quản lý Sự kiện</h1>
            <p className="text-muted-foreground">Tạo và quản lý các sự kiện VR với tùy chỉnh theo nhu cầu</p>
          </div>
          <Link to="/events/create">
            <Button className="bg-gradient-primary hover:opacity-90 shadow-vr">
              <Plus className="mr-2 h-4 w-4" />
              Tạo Sự kiện Mới
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="bg-vr-surface border-border shadow-card mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm sự kiện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-vr-surface-elevated border-border"
              />
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="bg-vr-surface border-border shadow-card hover:shadow-vr transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl text-foreground">{event.name}</CardTitle>
                      <Badge className={getStatusColor(event.status)}>
                        {getStatusText(event.status)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    
                    {/* Event Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">ID Sự kiện</div>
                        <div className="font-medium text-foreground flex items-center">
                          {event.id}
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-1">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Mật khẩu</div>
                        <div className="font-medium text-foreground flex items-center">
                          {event.password}
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-1">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          Người tham gia
                        </div>
                        <div className="font-medium text-foreground">
                          {event.participants}/{event.maxParticipants}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          Thời gian
                        </div>
                        <div className="font-medium text-foreground">
                          {event.startDate} - {event.endDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{event.videoCount} video</span>
                    <div className="flex items-center space-x-2">
                      {event.customization.hasCustomLogo && (
                        <Badge variant="outline" className="text-xs">Logo tùy chỉnh</Badge>
                      )}
                      {event.customization.hasCustomIntro && (
                        <Badge variant="outline" className="text-xs">Intro tùy chỉnh</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Link to={`/events/${event.id}`}>
                      <Button size="sm" variant="ghost">
                        <Eye className="mr-1 h-4 w-4" />
                        Xem
                      </Button>
                    </Link>
                    <Link to={`/events/${event.id}/edit`}>
                      <Button size="sm" variant="ghost">
                        <Settings className="mr-1 h-4 w-4" />
                        Cài đặt
                      </Button>
                    </Link>
                    {event.status === 'active' ? (
                      <Button size="sm" variant="ghost">
                        <Pause className="mr-1 h-4 w-4" />
                        Tạm dừng
                      </Button>
                    ) : event.status === 'scheduled' || event.status === 'draft' ? (
                      <Button size="sm" variant="ghost">
                        <Play className="mr-1 h-4 w-4" />
                        Bắt đầu
                      </Button>
                    ) : null}
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card className="bg-vr-surface border-border shadow-card">
            <CardContent className="p-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Không tìm thấy sự kiện
              </h3>
              <p className="text-muted-foreground mb-4">
                Thử thay đổi từ khóa tìm kiếm hoặc tạo sự kiện mới
              </p>
              <Link to="/events/create">
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo Sự kiện Đầu tiên
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventManagement;
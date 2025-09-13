import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Users, Activity, Plus, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "@/assets/vr-hero.jpg";
import { eventService } from "@/services/eventService";
import { Event } from "@/types/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const stats = [
    {
      title: "Tổng Video 360",
      value: "127",
      icon: Video,
      change: "+12%",
    },
    {
      title: "Sự kiện Active",
      value: "8",
      icon: Calendar,
      change: "+5%",
    },
    {
      title: "Người dùng Online",
      value: "45",
      icon: Users,
      change: "+23%",
    },
    {
      title: "Streaming Active",
      value: "3",
      icon: Activity,
      change: "0%",
    },
  ];

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await eventService.getEvent(1, 5);
        setEvents(res.data);
      } catch (error) {
        console.error("Lỗi khi load sự kiện:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-vr-surface">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="VR Technology"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vr-background/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                VR Event
              </span>
              <br />
              <span className="text-foreground">Management Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Quản lý kho video 360 và điều khiển sự kiện VR một cách chuyên
              nghiệp. Tạo trải nghiệm tương tác đỉnh cao cho người dùng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/events/create">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 shadow-vr"
                  onClick={() => navigate("/events/create")}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Tạo Sự kiện Mới
                </Button>
              </Link>
              <Link to="/streaming">
                <Button variant="outline" size="lg">
                  <Play className="mr-2 h-5 w-5" />
                  Điều khiển Streaming
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="bg-vr-surface border-border shadow-card hover:shadow-vr transition-all duration-300"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-vr-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <p className="text-xs text-vr-secondary">
                    {stat.change} từ tháng trước
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div> */}

        {/* Recent Events */}
        <Card className="bg-vr-surface border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Sự kiện Gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Đang tải...</p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="flex items-center justify-between p-4 bg-vr-surface-elevated rounded-lg border border-border hover:shadow-vr transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          event.streaming === "active"
                            ? "bg-vr-secondary"
                            : event.streaming === "scheduled"
                            ? "bg-vr-primary"
                            : "bg-muted-foreground"
                        }`}
                      />
                      <div>
                        <h4 className="font-medium text-foreground">
                          {event.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          ID: {event._id} • {event.video_list?.length ?? 0}{" "}
                          video
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">
                        {new Date(event.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                      <Link to={`/events/${event._id}`}>
                        <Button variant="ghost" size="sm">
                          Xem chi tiết
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

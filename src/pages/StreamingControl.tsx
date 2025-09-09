import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX,
  Monitor,
  Users,
  Activity,
  Settings,
  Radio,
  Eye
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

const StreamingControl = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [selectedEvent, setSelectedEvent] = useState("EVT001");

  const activeEvents = [
    {
      id: "EVT001",
      name: "Triển lãm Ô tô Quốc tế",
      participants: 234,
      status: "active"
    },
    {
      id: "EVT002", 
      name: "Hội thảo VR Technology",
      participants: 89,
      status: "scheduled"
    }
  ];

  const connectedDevices = [
    {
      id: "HMD001",
      name: "Oculus Quest 2 #001",
      user: "Người dùng #1",
      status: "connected",
      lastActivity: "2 phút trước"
    },
    {
      id: "HMD002",
      name: "HTC Vive Pro #002", 
      user: "Người dùng #2",
      status: "connected",
      lastActivity: "1 phút trước"
    },
    {
      id: "HMD003",
      name: "Pico 4 #003",
      user: "Người dùng #3", 
      status: "idle",
      lastActivity: "5 phút trước"
    }
  ];

  const currentVideo = {
    id: "VID001",
    title: "Triển lãm Ô tô - Khu vực A",
    duration: "00:15:30",
    currentTime: "00:05:42",
    thumbnail: "🎬"
  };

  const playlist = [
    { id: "VID001", title: "Triển lãm Ô tô - Khu vực A", duration: "00:15:30", active: true },
    { id: "VID002", title: "Triển lãm Ô tô - Khu vực B", duration: "00:12:45", active: false },
    { id: "VID003", title: "Triển lãm Ô tô - Showroom Mercedes", duration: "00:18:20", active: false },
    { id: "VID004", title: "Triển lãm Ô tô - Test Drive Area", duration: "00:10:15", active: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Điều khiển Streaming</h1>
            <p className="text-muted-foreground">Quản lý nội dung phát cho các thiết bị VR được kết nối</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={isStreaming ? "bg-vr-secondary text-vr-background" : "bg-secondary"}>
              {isStreaming ? "Đang phát" : "Dừng"}
            </Badge>
            <Button
              onClick={() => setIsStreaming(!isStreaming)}
              className={isStreaming ? "bg-destructive hover:bg-destructive/90" : "bg-gradient-primary hover:opacity-90"}
            >
              <Radio className="mr-2 h-4 w-4" />
              {isStreaming ? "Dừng Stream" : "Bắt đầu Stream"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Video */}
            <Card className="bg-vr-surface border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Video Hiện tại</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-6xl">{currentVideo.thumbnail}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-foreground mb-1">
                        {currentVideo.title}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {currentVideo.currentTime} / {currentVideo.duration}
                      </div>
                      <div className="w-full bg-vr-surface-elevated rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full"
                          style={{ width: '37%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Square className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => setIsStreaming(!isStreaming)}
                        className={isStreaming ? "bg-vr-secondary text-vr-background" : ""}
                      >
                        {isStreaming ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button size="sm" variant="ghost">
                        {volume[0] === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
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
                      <span className="text-sm text-muted-foreground">{volume[0]}%</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Playlist */}
            <Card className="bg-vr-surface border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Danh sách phát</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {playlist.map((video, index) => (
                    <div
                      key={video.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                        video.active 
                          ? "bg-gradient-primary/10 border-primary" 
                          : "bg-vr-surface-elevated border-border hover:bg-vr-surface-elevated/80"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-sm text-muted-foreground w-6">
                          {index + 1}
                        </div>
                        <div>
                          <div className={`font-medium ${video.active ? "text-primary" : "text-foreground"}`}>
                            {video.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {video.duration}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {video.active && (
                          <Badge className="bg-vr-secondary text-vr-background">
                            Đang phát
                          </Badge>
                        )}
                        <Button size="sm" variant="ghost">
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
                <CardTitle className="text-foreground">Sự kiện Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedEvent === event.id
                          ? "bg-gradient-primary/10 border-primary"
                          : "bg-vr-surface-elevated border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedEvent(event.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${selectedEvent === event.id ? "text-primary" : "text-foreground"}`}>
                            {event.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ID: {event.id}
                          </div>
                        </div>
                        <Badge className="bg-vr-secondary text-vr-background">
                          {event.participants}
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
                    <div key={device.id} className="flex items-center justify-between p-3 bg-vr-surface-elevated rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          device.status === 'connected' ? 'bg-vr-secondary' : 'bg-muted-foreground'
                        }`} />
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
                      <div className="text-2xl font-bold text-foreground">234</div>
                      <div className="text-sm text-muted-foreground">Người xem</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-vr-surface border-border shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-8 w-8 text-vr-primary" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">3</div>
                      <div className="text-sm text-muted-foreground">Thiết bị active</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingControl;
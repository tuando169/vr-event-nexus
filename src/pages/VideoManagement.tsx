import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Search, 
  Filter, 
  Play, 
  Download, 
  Trash2,
  Eye,
  Clock,
  Tag,
  Video
} from "lucide-react";

const VideoManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const videos = [
    {
      id: "VID001",
      title: "Triển lãm Ô tô - Khu vực A",
      duration: "00:15:30",
      size: "2.3 GB",
      format: "360° MP4",
      uploadDate: "2024-01-15",
      tags: ["Ô tô", "Triển lãm", "VR"],
      thumbnail: "🎬",
      status: "active"
    },
    {
      id: "VID002", 
      title: "Bảo tàng Lịch sử - Tầng 1",
      duration: "00:12:45",
      size: "1.8 GB", 
      format: "360° MP4",
      uploadDate: "2024-01-14",
      tags: ["Bảo tàng", "Lịch sử", "Giáo dục"],
      thumbnail: "🏛️",
      status: "active"
    },
    {
      id: "VID003",
      title: "Hội thảo Công nghệ - Phòng chính",
      duration: "00:45:20",
      size: "6.1 GB",
      format: "360° MP4", 
      uploadDate: "2024-01-13",
      tags: ["Hội thảo", "Công nghệ", "VR Tech"],
      thumbnail: "🔬",
      status: "processing"
    },
    {
      id: "VID004",
      title: "Khám phá Thiên nhiên - Rừng nhiệt đới",
      duration: "00:20:15",
      size: "3.2 GB",
      format: "360° MP4",
      uploadDate: "2024-01-12", 
      tags: ["Thiên nhiên", "Giáo dục", "Sinh thái"],
      thumbnail: "🌿",
      status: "active"
    }
  ];

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Kho Video 360°</h1>
            <p className="text-muted-foreground">Quản lý và tổ chức video 360° cho các sự kiện VR</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-vr">
            <Upload className="mr-2 h-4 w-4" />
            Upload Video Mới
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="bg-vr-surface border-border shadow-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm video hoặc tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-vr-surface-elevated border-border"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="bg-vr-surface border-border shadow-card hover:shadow-vr transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{video.thumbnail}</div>
                  <Badge 
                    variant={video.status === 'active' ? 'default' : 'secondary'}
                    className={video.status === 'active' ? 'bg-vr-secondary text-vr-background' : ''}
                  >
                    {video.status === 'active' ? 'Sẵn sàng' : 'Đang xử lý'}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-foreground line-clamp-2">
                  {video.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {video.duration}
                  </div>
                  <span>{video.size}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {video.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="mr-1 h-2 w-2" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Metadata */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>ID: {video.id}</div>
                    <div>Format: {video.format}</div>
                    <div>Upload: {video.uploadDate}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <Card className="bg-vr-surface border-border shadow-card">
            <CardContent className="p-12 text-center">
              <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Không tìm thấy video
              </h3>
              <p className="text-muted-foreground">
                Thử thay đổi từ khóa tìm kiếm hoặc upload video mới
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideoManagement;
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Search,
  Play,
  Download,
  Trash2,
  Eye,
  Clock,
  Video,
} from "lucide-react";
import { mediaService } from "@/services/mediaService";
import { MediaFile } from "@/types/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { downloadFile, getMediaFile } from "@/lib/utils";

const VideoManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewVideo, setPreviewVideo] = useState<MediaFile | null>(null);

  // Upload dialog state
  const [openUpload, setOpenUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Lấy danh sách media từ API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await mediaService.getMediaFiles();
        setVideos(res.data);
      } catch (error) {
        console.error("Lỗi khi tải video:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Hàm xoá video
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa video này?"
    );
    if (!confirmDelete) return;

    try {
      await mediaService.deleteFile(id);
      setVideos((prev) => prev.filter((video) => video._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa video:", error);
    }
  };

  const filteredVideos = videos.filter((video) => {
    return (
      video.path.includes("vr360") &&
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Hàm upload
  const handleUpload = async () => {
    if (!file) return;
    try {
      setUploading(true);
      const res = await mediaService.uploadFile(file, "video", "admin");
      setVideos((prev) => [res.data, ...prev]); // prepend video mới
      toast({
        title: "Upload thành công",
        description: `${file.name} đã được tải lên.`,
      });
      setFile(null);
      setOpenUpload(false);
    } catch (err) {
      console.error("Lỗi upload:", err);
      toast({
        title: "Lỗi upload",
        description: "Không thể tải video lên.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Dialog open={!!previewVideo} onOpenChange={() => setPreviewVideo(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{previewVideo?.title}</DialogTitle>
          </DialogHeader>
          {previewVideo && (
            <video
              src={getMediaFile(previewVideo.path)}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Kho Video 360°
            </h1>
            <p className="text-muted-foreground">
              Quản lý và tổ chức video 360° cho các sự kiện VR
            </p>
          </div>
          <Button
            className="bg-gradient-primary hover:opacity-90 shadow-vr"
            onClick={() => setOpenUpload(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Video Mới
          </Button>
        </div>

        {/* Search */}
        <Card className="bg-vr-surface border-border shadow-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm video..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-vr-surface-elevated border-border"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground">Đang tải video...</p>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card
                key={video._id}
                className="bg-vr-surface border-border shadow-card hover:shadow-vr transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <img
                      src={getMediaFile(video.thumbnail)}
                      alt=""
                      className="object-cover h-10 w-10 rounded-md"
                    />
                    <Badge
                      variant="default"
                      className="bg-vr-secondary text-vr-background"
                    >
                      Sẵn sàng
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-foreground line-clamp-2">
                    {video.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {Math.round(video.size / (1024 * 1024))} MB
                    </div>
                    <span>{video.type}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Metadata */}
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>ID: {video._id}</div>
                      <div>
                        Upload:{" "}
                        {new Date(video.createdAt).toLocaleDateString("vi-VN")}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => setPreviewVideo(video)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            downloadFile(video.path, `${video.title}.mp4`)
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(video._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
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

      {/* Upload Dialog */}
      <Dialog open={openUpload} onOpenChange={setOpenUpload}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Video 360°</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-muted-foreground"
            />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenUpload(false)}>
              Hủy
            </Button>
            <Button
              className="bg-gradient-primary hover:opacity-90"
              disabled={!file || uploading}
              onClick={handleUpload}
            >
              {uploading ? "Đang upload..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoManagement;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, Video, Calendar, Radio, Upload } from "lucide-react";

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Hướng dẫn sử dụng
        </h1>
        <p className="text-muted-foreground mb-8">
          Trang này sẽ giúp bạn nắm được các bước cơ bản để quản lý sự kiện VR,
          upload video và điều khiển streaming.
        </p>

        {/* Quản lý sự kiện */}
        <Card className="bg-vr-surface border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-vr-secondary" />
              Quản lý sự kiện
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>
              • Tạo sự kiện mới tại nút “Tạo Sự kiện Mới” trên Dashboard hoặc
              trang Quản lý sự kiện.
            </p>
            <p>
              • Trong chi tiết sự kiện, bạn có thể chỉnh sửa tên, mô tả, logo và
              intro.
            </p>
            <p>• Thêm hoặc xoá video khỏi playlist sự kiện.</p>
          </CardContent>
        </Card>

        {/* Quản lý video */}
        <Card className="bg-vr-surface border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-5 w-5 text-vr-secondary" />
              Quản lý video
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>• Upload video 360° bằng nút “Upload Video Mới”.</p>
            <p>• Xem trước video bằng biểu tượng 👁️.</p>
            <p>• Tải video về bằng biểu tượng ⬇️.</p>
            <p>• Xoá video không cần thiết bằng biểu tượng 🗑️.</p>
          </CardContent>
        </Card>

        {/* Streaming */}
        <Card className="bg-vr-surface border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Radio className="mr-2 h-5 w-5 text-vr-secondary" />
              Điều khiển Streaming
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>• Vào trang “Streaming” để bắt đầu hoặc dừng stream sự kiện.</p>
            <p>• Chọn sự kiện đang active để phát nội dung.</p>
            <p>• Theo dõi thiết bị kết nối và số người xem trực tiếp.</p>
            <p>
              • Quản lý playlist: chọn video nào sẽ phát, tạm dừng hoặc chuyển
              video.
            </p>
          </CardContent>
        </Card>

        {/* Upload */}
        <Card className="bg-vr-surface border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5 text-vr-secondary" />
              Lưu ý khi upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>
              • Chỉ hỗ trợ định dạng video: <strong>mp4, webm</strong>.
            </p>
            <p>
              • Dung lượng tối đa: <strong>500MB/video</strong>.
            </p>
            <p>• Nên đặt tên file rõ ràng để dễ quản lý.</p>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-vr-surface border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <List className="mr-2 h-5 w-5 text-vr-secondary" />
              Mẹo sử dụng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>
              • Sử dụng tính năng tìm kiếm để nhanh chóng lọc sự kiện hoặc
              video.
            </p>
            <p>• Kiểm tra lại thông tin sự kiện trước khi bắt đầu streaming.</p>
            <p>
              • Xoá video/sự kiện không dùng đến để tránh tốn dung lượng server.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpPage;

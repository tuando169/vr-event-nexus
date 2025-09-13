import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, User, Monitor, Headphones, Shield, Bell } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Profile Settings
    username: "Admin",
    email: "admin@vr-platform.com",
    avatar: "",
    
    // VR Settings
    quality: "high",
    frameRate: [60],
    audioQuality: "high",
    autoStream: true,
    
    // System Settings
    notifications: true,
    autoBackup: true,
    theme: "dark",
    language: "vi",
    
    // Security
    twoFactor: false,
    sessionTimeout: [30],
  });

  const handleSave = () => {
    toast({
      title: "Cài đặt đã được lưu",
      description: "Tất cả thay đổi đã được áp dụng thành công.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <SettingsIcon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Cài đặt hệ thống
          </h1>
          <p className="text-muted-foreground">Quản lý cấu hình và tùy chỉnh nền tảng VR</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Tài khoản
          </TabsTrigger>
          <TabsTrigger value="vr" className="flex items-center gap-2">
            <Headphones className="w-4 h-4" />
            VR Settings
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Hệ thống
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Bảo mật
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin tài khoản</CardTitle>
              <CardDescription>Quản lý thông tin cá nhân và hồ sơ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    id="username"
                    value={settings.username}
                    onChange={(e) => setSettings({...settings, username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Avatar URL</Label>
                <Input
                  placeholder="https://example.com/avatar.jpg"
                  value={settings.avatar}
                  onChange={(e) => setSettings({...settings, avatar: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vr">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt VR</CardTitle>
              <CardDescription>Tối ưu hóa trải nghiệm thực tế ảo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Chất lượng video</Label>
                  <Select value={settings.quality} onValueChange={(value) => setSettings({...settings, quality: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Thấp - 720p</SelectItem>
                      <SelectItem value="medium">Trung bình - 1080p</SelectItem>
                      <SelectItem value="high">Cao - 2K</SelectItem>
                      <SelectItem value="ultra">Siêu cao - 4K</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Chất lượng âm thanh</Label>
                  <Select value={settings.audioQuality} onValueChange={(value) => setSettings({...settings, audioQuality: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Chuẩn</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="lossless">Không mất dữ liệu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Tốc độ khung hình: {settings.frameRate[0]} FPS</Label>
                <Slider
                  value={settings.frameRate}
                  onValueChange={(value) => setSettings({...settings, frameRate: value})}
                  max={120}
                  min={30}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>30 FPS</span>
                  <span>60 FPS</span>
                  <span>90 FPS</span>
                  <span>120 FPS</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Streaming</Label>
                  <p className="text-sm text-muted-foreground">Tự động phát stream khi có kết nối</p>
                </div>
                <Switch
                  checked={settings.autoStream}
                  onCheckedChange={(checked) => setSettings({...settings, autoStream: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt hệ thống</CardTitle>
              <CardDescription>Cấu hình chung cho ứng dụng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Giao diện</Label>
                  <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Sáng</SelectItem>
                      <SelectItem value="dark">Tối</SelectItem>
                      <SelectItem value="auto">Tự động</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ngôn ngữ</Label>
                  <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      <Label>Thông báo</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Nhận thông báo về hoạt động hệ thống</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sao lưu tự động</Label>
                    <p className="text-sm text-muted-foreground">Tự động sao lưu dữ liệu hàng ngày</p>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật</CardTitle>
              <CardDescription>Cài đặt bảo mật và quyền riêng tư</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Xác thực 2 bước</Label>
                  <p className="text-sm text-muted-foreground">Tăng cường bảo mật với xác thực 2 lớp</p>
                </div>
                <Switch
                  checked={settings.twoFactor}
                  onCheckedChange={(checked) => setSettings({...settings, twoFactor: checked})}
                />
              </div>

              <div className="space-y-3">
                <Label>Thời gian chờ phiên: {settings.sessionTimeout[0]} phút</Label>
                <Slider
                  value={settings.sessionTimeout}
                  onValueChange={(value) => setSettings({...settings, sessionTimeout: value})}
                  max={120}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>5 phút</span>
                  <span>30 phút</span>
                  <span>60 phút</span>
                  <span>120 phút</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Đổi mật khẩu
                </Button>
                <Button variant="outline" className="w-full">
                  Tải xuống dữ liệu cá nhân
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Hủy bỏ</Button>
        <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-primary-glow">
          Lưu cài đặt
        </Button>
      </div>
    </div>
  );
};

export default Settings;
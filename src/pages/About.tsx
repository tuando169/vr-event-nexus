import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const teamMembers = [
    {
      name: "Đỗ Tuấn Min",
      role: "Lead Developer",
      description: "Chuyên gia phát triển VR/AR với 5+ năm kinh nghiệm",
      avatar: "/placeholder.svg",
      skills: ["React", "WebXR", "Three.js", "Node.js"],
      social: {
        github: "#",
        linkedin: "#",
        email: "nva@example.com",
      },
    },
    {
      name: "Đỗ Trung Hiếu",
      role: "Backend Developer",
      description: "Thiết kế giao diện người dùng cho các ứng dụng VR",
      avatar: "/placeholder.svg",
      skills: ["Figma", "Adobe XD", "3D Modeling", "User Research"],
      social: {
        github: "#",
        linkedin: "#",
        email: "ttb@example.com",
      },
    },
    {
      name: "Đỗ Đăng Tuân",
      role: "FrontEnd Developer",
      description: "Phát triển hệ thống backend và streaming",
      avatar: "/placeholder.svg",
      skills: ["Python", "WebRTC", "Docker", "AWS"],
      social: {
        github: "#",
        linkedin: "#",
        email: "lvc@example.com",
      },
    },
    {
      name: "Lê Hoàng Anh",
      role: "AI Developer",
      description: "Tạo nội dung 360° và trải nghiệm VR",
      avatar: "/placeholder.svg",
      skills: ["Unity", "Blender", "Video 360°", "Content Strategy"],
      social: {
        github: "#",
        linkedin: "#",
        email: "ptd@example.com",
      },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Về Chúng Tôi
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Chúng tôi là đội ngũ đam mê công nghệ VR/AR, cam kết mang đến những
          trải nghiệm thực tế ảo tuyệt vời và giải pháp quản lý sự kiện 360°
          hiện đại nhất.
        </p>
      </div>

      {/* Mission Section */}
      <Card className="mb-12 border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Sứ Mệnh Của Chúng Tôi</CardTitle>
          <CardDescription className="text-base">
            Democratizing Virtual Reality - Đưa công nghệ VR đến gần hơn với mọi
            người
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Chúng tôi tin rằng công nghệ thực tế ảo có thể thay đổi cách con
            người tương tác, học tập và giải trí. Với nền tảng quản lý video
            360° và sự kiện VR, chúng tôi muốn tạo ra những công cụ dễ sử dụng,
            mạnh mẽ và có thể tiếp cận được với tất cả mọi người.
          </p>
        </CardContent>
      </Card>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Đội Ngũ Phát Triển
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30"
            >
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription className="font-medium text-primary">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  {member.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Công Nghệ Sử Dụng</CardTitle>
          <CardDescription>
            Những công nghệ tiên tiến mà chúng tôi sử dụng để xây dựng nền tảng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "React",
              "TypeScript",
              "WebXR",
              "Three.js",
              "WebRTC",
              "Node.js",
              "Docker",
              "AWS",
              "Unity",
              "Blender",
              "FFmpeg",
              "Redis",
            ].map((tech, index) => (
              <div
                key={index}
                className="text-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <Badge variant="outline" className="text-sm">
                  {tech}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;

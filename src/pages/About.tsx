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
      name: "Đỗ Tuấn Minh",
      role: "Lead Developer",
      description: "Phát triển hệ thống thiết bị VR",
      avatar: "/placeholder.svg",
      skills: ["React", "WebXR", "Three.js", "Unity"],
      social: {
        github: "#",
        linkedin: "#",
        email: "nva@example.com",
      },
    },
    {
      name: "Đỗ Trung Hiếu",
      role: "Backend Developer",
      description: "Phát triển hệ thống backend và streaming",
      avatar: "/placeholder.svg",
      skills: ["MongoDB", "ExpressJS", "Deployment"],
      social: {
        github: "#",
        linkedin: "#",
        email: "ttb@example.com",
      },
    },
    {
      name: "Đỗ Đăng Tuân",
      role: "FrontEnd Developer",
      description: "Phát triển giao diện web cho ứng dụng VR",
      avatar: "/placeholder.svg",
      skills: ["React", "Typescript", "TailwindCSS"],
      social: {
        github: "#",
        linkedin: "#",
        email: "lvc@example.com",
      },
    },
    {
      name: "Lê Hoàng Anh",
      role: "VR Developer",
      description: "Tạo nội dung 360° và trải nghiệm VR",
      avatar: "/placeholder.svg",
      skills: ["Unity", "Blender", "Video 360"],
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
          VR Event Manager
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          VR Event Manager là nền tảng quản lý và trình chiếu sự kiện thực tế ảo
          được thiết kế dành riêng cho nhu cầu tổ chức, phát sóng và điều khiển
          nội dung VR 360° một cách chuyên nghiệp. Phần mềm mang đến khả năng
          quản lý toàn bộ kho video 360° từ lưu trữ, phân loại, chỉnh sửa đến
          trình chiếu chỉ bằng vài thao tác đơn giản, đồng thời hỗ trợ mạnh mẽ
          việc tạo và điều khiển các sự kiện VR theo kịch bản định sẵn hoặc phát
          trực tiếp.
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
            Với VR Event Manager, bạn có thể dễ dàng khởi tạo sự kiện mới, lựa
            chọn nội dung cần phát, điều khiển luồng streaming và theo dõi toàn
            bộ quá trình trình chiếu trên kính thực tế ảo trong thời gian thực.
            Không chỉ là công cụ phát lại, hệ thống còn tích hợp công cụ điều
            khiển streaming hiện đại, giúp đảm bảo độ mượt mà, ổn định và chất
            lượng hình ảnh cao, đáp ứng nhu cầu của cả hội thảo, triển lãm, đào
            tạo hay chương trình giải trí tương tác.
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
                    <Github
                      className="h-4 w-4"
                      onClick={() => window.open(member.social.github)}
                    />
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
              "MongoDB",
              "ExpressJS",
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

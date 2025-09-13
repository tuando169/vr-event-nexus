import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Video, 
  Calendar, 
  Settings, 
  Radio,
  Users,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/videos", icon: Video, label: "Kho Video 360" },
    { path: "/events", icon: Calendar, label: "Sự kiện" },
    { path: "/streaming", icon: Radio, label: "Streaming" },
    { path: "/about", icon: Users, label: "Về chúng tôi" },
    { path: "/settings", icon: Settings, label: "Cài đặt" },
  ];

  return (
    <nav className="bg-vr-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                VR Event Manager
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 ${
                      isActive 
                        ? "bg-gradient-primary text-primary-foreground shadow-vr" 
                        : "hover:bg-vr-surface-elevated"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button 
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start flex items-center space-x-2 ${
                      isActive 
                        ? "bg-gradient-primary text-primary-foreground shadow-vr" 
                        : "hover:bg-vr-surface-elevated"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
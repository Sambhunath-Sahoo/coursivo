"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Home,
  BookOpen,
  Users,
  Settings,
  HelpCircle,
  GraduationCap,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "student" | "educator";
  academyName?: string;
}

export function DashboardLayout({ children, type, academyName }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [currentAcademyName, setCurrentAcademyName] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (academyName) {
      setCurrentAcademyName(academyName);
    } else if (type === "educator") {
      setCurrentAcademyName(session?.user?.domain || "academy");
    }
  }, [academyName, type, session?.user?.domain]);

  const studentNavigationItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: `/${currentAcademyName}/dashboard` },
    { id: "courses", label: "My Courses", icon: BookOpen, href: `/${currentAcademyName}/courses` },
  ];

  const educatorNavigationItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    { id: "courses", label: "Course Management", icon: BookOpen, href: "/courses" },
    { id: "students", label: "Student Management", icon: Users, href: "/students" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
    { id: "help", label: "Help & Support", icon: HelpCircle, href: "/help" },
  ];

  const navigationItems = type === "student" ? studentNavigationItems : educatorNavigationItems;
  const profileHref = type === "student" ? `/${currentAcademyName}/profile` : "/profile";

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const handleLogout = () => {
    router.push("/");
    setIsOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/dashboard" || href === `/${currentAcademyName}/dashboard`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const NavigationContent = () => (
    <div className="flex flex-col h-full">
      {/* Academy Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#09382f] rounded-lg flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-sm font-bold text-gray-900 truncate">
            {currentAcademyName}
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={isActive(item.href) ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation(item.href)}>
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      {/* Profile Section */}
      <div className="p-2 border-t border-gray-200">
        <Button
          variant={isActive(profileHref) ? "default" : "ghost"}
          className="w-full justify-start mb-1"
          onClick={() => handleNavigation(profileHref)}>
          <User className="h-4 w-4 mr-2" />
          Profile
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FCFBF8]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center px-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 p-0" title="Navigation Menu">
            <NavigationContent />
          </SheetContent>
        </Sheet>

        <div className="flex items-center space-x-2 ml-2">
          <div className="w-8 h-8 bg-[#09382f] rounded-lg flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-sm font-bold text-gray-900 truncate">
            {currentAcademyName}
          </h1>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <NavigationContent />
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-60">
        <main className="min-h-screen pt-16 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Home,
  BookOpen,
  FileQuestion,
  Trophy,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  GraduationCap,
  User,
  LogOut,
  Copy,
} from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "student" | "educator";
  academyName?: string; // For student routes - represents the academy name
}

export function DashboardLayout({ children, type, academyName }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  // Get academy name from session (for educators) or use provided academyName (for students)
  const currentAcademyName =
    type === "educator" ? session?.user?.domain || "coursivo" : academyName || "coursivo";

  const studentNavigationItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: `/${currentAcademyName}/dashboard` },
    { id: "courses", label: "My Courses", icon: BookOpen, href: `/${currentAcademyName}/courses` },
    { id: "quiz", label: "Take Quiz", icon: FileQuestion, href: `/${currentAcademyName}/quiz` },
    {
      id: "achievements",
      label: "Achievements",
      icon: Trophy,
      href: `/${currentAcademyName}/achievements`,
    },
    { id: "schedule", label: "Schedule", icon: Calendar, href: `/${currentAcademyName}/schedule` },
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
  };

  const handleLogout = () => {
    // Here you would typically handle logout logic
    router.push("/");
  };

  const copyStudentLandingLink = () => {
    const landingLink = `${window.location.origin}/${currentAcademyName}`;
    navigator.clipboard.writeText(landingLink);
    alert("Student landing page link copied to clipboard!");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard" || href === `/${currentAcademyName}/dashboard`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-[#FCFBF8]">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-80 bg-white border-r border-gray-200 shadow-sm z-50 flex flex-col">
        {/* Academy Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#09382f] rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              {type === "educator"
                ? `${currentAcademyName} Academy`
                : `${currentAcademyName} Academy`}
            </h1>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.href)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all text-left ${
                  isActive(item.href)
                    ? "bg-[#09382f] text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}>
                <item.icon className="h-5 w-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Section - Fixed at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          {/* Student Landing Link for Educators */}
          {type === "educator" && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-700 mb-2">Student Access</p>
              <button
                onClick={copyStudentLandingLink}
                className="w-full flex items-center justify-between px-2 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors font-medium">
                <span>Copy Landing Page Link</span>
                <Copy className="h-4 w-4" />
              </button>
              <p className="text-xs text-gray-500 mt-1">
                Share: {window.location.origin}/{currentAcademyName}
              </p>
            </div>
          )}

          {/* Profile Button */}
          <button
            onClick={() => handleNavigation(profileHref)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all text-left mb-2 ${
              isActive(profileHref)
                ? "bg-[#09382f] text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}>
            <User className="h-5 w-5" />
            <span className="font-medium text-sm">My Profile</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all text-left">
            <LogOut className="h-5 w-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-80 flex flex-col min-h-screen">{children}</div>
    </div>
  );
}

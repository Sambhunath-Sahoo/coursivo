"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  Users,
  Settings,
  HelpCircle,
  User,
  LogOut,
  GraduationCap,
  Plus,
  TrendingUp,
  Award,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddNewCourse } from "@/components/AddNewCourse";

const defaultAcademy = {
  id: "coursivo",
  name: "Coursivo Academy",
  description: "Modern Learning Platform",
  theme: { primary: "#6366f1", secondary: "#8b5cf6" },
};

export default function AcademyDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  const handleAddNewCourse = () => {
    setActiveTab("add-course");
  };

  const handleBackToCourses = () => {
    setActiveTab("courses");
  };

  const handleSaveCourse = (courseData: Record<string, unknown>) => {
    console.log("Saving course:", courseData);
    // Here you would typically save to your backend
    setActiveTab("courses");
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "Course Management", icon: BookOpen },
    { id: "students", label: "Student Management", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  const courses = [
    {
      id: 1,
      title: "Introduction to Programming",
      students: 45,
      progress: 78,
      status: "active",
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      students: 32,
      progress: 92,
      status: "active",
    },
    {
      id: 3,
      title: "Graphic Design Basics",
      students: 28,
      progress: 65,
      status: "draft",
    },
  ];

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@email.com",
      courses: 3,
      progress: 85,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@email.com",
      courses: 2,
      progress: 72,
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@email.com",
      courses: 1,
      progress: 94,
    },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "add-course":
        return "Add New Course";
      default:
        return navigationItems.find((item) => item.id === activeTab)?.label || "Academy Management";
    }
  };

  const getPageDescription = () => {
    switch (activeTab) {
      case "dashboard":
        return "Overview of your academy performance and insights";
      case "courses":
        return "Create, edit and manage your course catalog";
      case "add-course":
        return "Create a new course for your academy";
      case "students":
        return "Monitor student progress and manage enrollments";
      case "settings":
        return "Configure your academy preferences and settings";
      case "help":
        return "Get assistance and access support resources";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card border border-border shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-gradient-primary shadow-glow">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                      <p className="text-2xl font-bold text-foreground">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-gradient-primary shadow-glow">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                      <p className="text-2xl font-bold text-foreground">156</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-gradient-primary shadow-glow">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                      <p className="text-2xl font-bold text-foreground">84%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-gradient-primary shadow-glow">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                      <p className="text-2xl font-bold text-foreground">89</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border border-border shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-foreground">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.students} students</p>
                        </div>
                        <Badge
                          variant={course.status === "active" ? "default" : "outline"}
                          className={
                            course.status === "active" ? "bg-gradient-primary text-white shadow-glow" : "border-border"
                          }>
                          {course.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">Top Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-foreground">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {student.courses} courses enrolled
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{student.progress}%</p>
                          <p className="text-sm text-muted-foreground">progress</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "courses":
        return (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-foreground">Course Management</h2>
              <Button
                onClick={handleAddNewCourse}
                className="bg-gradient-primary hover:shadow-glow text-white border-0">
                <Plus className="h-4 w-4 mr-2" />
                Add New Course
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-card border border-border hover:shadow-soft transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>{course.students} students enrolled</p>
                      <p>{course.progress}% content completed</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <Badge
                        variant={course.status === "active" ? "default" : "outline"}
                        className={
                          course.status === "active" ? "bg-gradient-primary text-white shadow-glow" : "border-border"
                        }>
                        {course.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-accent">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "add-course":
        return <AddNewCourse onBack={handleBackToCourses} onSave={handleSaveCourse} />;
      case "students":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold text-foreground">Student Management</h2>

            <Card className="bg-card border border-border shadow-soft">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{student.courses} courses</p>
                          <p className="font-medium text-foreground">{student.progress}% avg progress</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-accent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "settings":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold text-foreground">Academy Settings</h2>

            <Card className="bg-card border border-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-foreground">Academy Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Academy Name</label>
                  <input
                    type="text"
                    defaultValue={defaultAcademy.name}
                    className="w-full p-3 border border-border rounded-lg focus:border-primary focus:ring-primary/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    defaultValue={defaultAcademy.description}
                    className="w-full p-3 border border-border rounded-lg focus:border-primary focus:ring-primary/20 focus:outline-none"
                    rows={3}
                  />
                </div>
                <Button className="bg-gradient-primary hover:shadow-glow text-white border-0">Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        );
      case "help":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold text-foreground">Help & Support</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border border-border shadow-soft">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-foreground mb-2">Documentation</h3>
                  <p className="text-muted-foreground mb-4">Access comprehensive guides and tutorials</p>
                  <Button variant="outline" className="border-border text-foreground hover:bg-accent">
                    View Docs
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border shadow-soft">
                <CardContent className="p-6 text-center">
                  <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-foreground mb-2">Contact Support</h3>
                  <p className="text-muted-foreground mb-4">Get help from our support team</p>
                  <Button variant="outline" className="border-border text-foreground hover:bg-accent">
                    Get Help
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex h-screen">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-40 shadow-soft">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-primary rounded-full"></div>
              </div>
              <h1 className="font-semibold text-gradient">Coursivo</h1>
            </div>
          </div>

          <div className="px-4 py-4 flex flex-col h-full">
            <nav className="space-y-1 flex-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all text-left ${
                    activeTab === item.id
                      ? "bg-gradient-primary text-white shadow-glow"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}>
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Profile Section */}
            <div className="pt-6 border-t border-border">
              <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-all text-left">
                <User className="h-5 w-5" />
                <span className="font-medium text-sm">My Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content with Left Margin */}
        <div className="flex-1 ml-80 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-card border-b border-border px-6 py-4 relative z-30 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground leading-tight">{getPageTitle()}</h1>
                <p className="text-muted-foreground mt-1">{getPageDescription()}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-gradient-primary text-white border-0 px-3 py-1 shadow-glow">
                  {defaultAcademy.name}
                </Badge>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-border text-foreground hover:bg-accent">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto bg-muted/30">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}

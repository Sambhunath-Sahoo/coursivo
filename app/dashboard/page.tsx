"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  Trophy,
  Calendar,
  User,
  LogOut,
  Play,
  Clock,
  TrendingUp,
  Star,
  ChevronRight,
  FileQuestion,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QuizPage } from "@/components/QuizPage";

const defaultAcademy = {
  id: "coursivo",
  name: "Coursivo",
  description: "Modern Learning Platform",
  theme: { primary: "#000000", secondary: "#404040" },
};

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "quiz", label: "Take Quiz", icon: FileQuestion },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "schedule", label: "Schedule", icon: Calendar },
  ];

  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to Programming",
      instructor: "Dr. Sarah Chen",
      progress: 75,
      nextLesson: "Variables and Data Types",
      duration: "45 min",
      difficulty: "Beginner",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      instructor: "Mark Johnson",
      progress: 45,
      nextLesson: "Social Media Strategy",
      duration: "35 min",
      difficulty: "Intermediate",
      rating: 4.6,
    },
    {
      id: 3,
      title: "Graphic Design Basics",
      instructor: "Emily Rodriguez",
      progress: 20,
      nextLesson: "Color Theory",
      duration: "50 min",
      difficulty: "Beginner",
      rating: 4.9,
    },
  ];

  const upcomingLessons = [
    {
      course: "Introduction to Programming",
      lesson: "Variables and Data Types",
      time: "10:00 AM",
      date: "Today",
    },
    {
      course: "Digital Marketing Fundamentals",
      lesson: "Social Media Strategy",
      time: "2:00 PM",
      date: "Tomorrow",
    },
    {
      course: "Graphic Design Basics",
      lesson: "Color Theory",
      time: "11:00 AM",
      date: "Friday",
    },
  ];

  const achievements = [
    { title: "First Course Completed", date: "July 15, 2024", icon: Trophy },
    { title: "7-Day Streak", date: "July 20, 2024", icon: TrendingUp },
    { title: "Top 10% Student", date: "July 22, 2024", icon: Star },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue Learning Section */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="h-5 w-5 text-black" />
                    <span className="text-black">Continue Learning</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-black mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                        </div>
                        <Badge variant="outline" className="text-xs border-gray-300 text-black">
                          {course.difficulty}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-black">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </span>
                          </div>
                          <Button size="sm" className="bg-black hover:bg-gray-800 text-white">
                            Continue
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  className="bg-black text-white border-0 cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => setActiveTab("quiz")}>
                  <CardContent className="p-6 text-center">
                    <FileQuestion className="h-8 w-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-1">Take Quiz</h3>
                    <p className="text-sm text-gray-300">Test your knowledge</p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveTab("achievements")}>
                  <CardContent className="p-6 text-center">
                    <Trophy className="h-8 w-8 mx-auto mb-3 text-black" />
                    <h3 className="font-semibold text-black mb-1">Achievements</h3>
                    <p className="text-sm text-gray-600">View your progress</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Achievements */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-black" />
                    <span className="text-black">Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                        <div className="p-2 rounded-full bg-black">
                          <achievement.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-black">{achievement.title}</p>
                          <p className="text-sm text-gray-600">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Lessons */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-black" />
                    <span className="text-black">Upcoming</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingLessons.map((lesson, index) => (
                      <div key={index} className="border-l-3 border-black pl-3">
                        <p className="font-medium text-black text-sm">{lesson.lesson}</p>
                        <p className="text-sm text-gray-600">{lesson.course}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {lesson.date} at {lesson.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Stats */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-black">This Week</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-black">5.2</div>
                    <div className="text-sm text-gray-600">Hours Learned</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-black">8</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-black">12</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "quiz":
        return <QuizPage />;
      case "courses":
        return (
          <div className="px-4 py-6">
            <h3 className="text-xl font-bold text-black mb-6">My Enrolled Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-black mb-2">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                    <Progress value={course.progress} className="h-2 mb-4" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{course.progress}% complete</span>
                      <Button size="sm" className="bg-black hover:bg-gray-800 text-white">
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "achievements":
        return (
          <div className="px-4 py-6">
            <h3 className="text-xl font-bold text-black mb-6">Your Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="p-4 rounded-full bg-black inline-flex mb-4">
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-black mb-2">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "schedule":
        return (
          <div className="px-4 py-6">
            <h3 className="text-xl font-bold text-black mb-6">Your Schedule</h3>
            <div className="space-y-4">
              {upcomingLessons.map((lesson, index) => (
                <Card
                  key={index}
                  className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-black">{lesson.lesson}</h4>
                        <p className="text-gray-600">{lesson.course}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-black">{lesson.time}</p>
                        <p className="text-sm text-gray-600">{lesson.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-40">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-black rounded-full"></div>
              </div>
              <h1 className="font-semibold text-black">Coursivo</h1>
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
                      ? "bg-black text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50 hover:text-black"
                  }`}>
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Profile Section */}
            <div className="pt-6 border-t border-gray-200">
              <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black transition-all text-left">
                <User className="h-5 w-5" />
                <span className="font-medium text-sm">My Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content with Left Margin */}
        <div className="flex-1 ml-80 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 relative z-30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-black leading-tight">
                  {navigationItems.find((item) => item.id === activeTab)?.label ||
                    "Student Dashboard"}
                </h1>
                <p className="text-gray-600 mt-1">Welcome back! Ready to continue learning?</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-black text-white border-0 px-3 py-1">
                  {defaultAcademy.name}
                </Badge>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-gray-300 text-black hover:bg-gray-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto bg-gray-50 p-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}

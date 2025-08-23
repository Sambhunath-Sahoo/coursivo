"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Play,
  Clock,
  TrendingUp,
  Star,
  ChevronRight,
  BookOpen,
  Trophy,
  Users,
  Plus,
  FileText,
  BarChart3,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Get academy name from session or fallback to default
  const academyName = session?.user?.domain || "coursivo";
  const userType = (session?.user?.role as "student" | "educator") || "educator";
  const userName = session?.user?.name || "User";

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/signin");
      return;
    }
  }, [session, status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#FCFBF8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-[#09382f] rounded-xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-6 w-6 text-white animate-pulse" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if no session
  if (!session) {
    return null;
  }

  // Sample data for both user types
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

  const courses = [
    {
      id: 1,
      title: "Introduction to Programming",
      students: 45,
      progress: 78,
      status: "Active",
      nextClass: "Today, 2:00 PM",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      students: 32,
      progress: 65,
      status: "Active",
      nextClass: "Tomorrow, 10:00 AM",
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      students: 28,
      progress: 45,
      status: "Active",
      nextClass: "Friday, 3:00 PM",
    },
  ];

  if (userType === "student") {
    return (
      <DashboardLayout type="student" academyName={academyName}>
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName}!</h1>
              <p className="text-gray-600">
                Continue your learning journey at {academyName} Academy
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                      <p className="text-sm text-gray-600">Active Courses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Trophy className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">450</p>
                      <p className="text-sm text-gray-600">Points Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-sm text-gray-600">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">87%</p>
                      <p className="text-sm text-gray-600">Avg Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Continue Learning */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Continue Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {enrolledCourses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{course.title}</h3>
                            <p className="text-sm text-gray-600">by {course.instructor}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-2">
                                <Progress value={course.progress} className="w-24 h-2" />
                                <span className="text-sm text-gray-600">{course.progress}%</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-gray-600">{course.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Button className="bg-[#09382f] hover:bg-[#0a4a3a] text-white">
                            <Play className="h-4 w-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button
                        variant="outline"
                        className="w-full border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                        onClick={() => router.push(`/${academyName}/courses`)}>
                        View All Courses
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full bg-[#09382f] hover:bg-[#0a4a3a] text-white"
                      onClick={() => router.push(`/${academyName}/quiz`)}>
                      Take a Quiz
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                      onClick={() => router.push(`/${academyName}/courses`)}>
                      Browse Courses
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Educator Dashboard
  return (
    <DashboardLayout type="educator">
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName}!</h1>
            <p className="text-gray-600">Manage your courses and students</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-600">Active Courses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">248</p>
                    <p className="text-sm text-gray-600">Total Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4.8</p>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Courses */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {course.students} students
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Progress value={course.progress} className="w-20 h-2" />
                              <span className="text-sm text-gray-600">{course.progress}%</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800">{course.status}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{course.nextClass}</p>
                          <Button
                            size="sm"
                            className="mt-2 bg-[#09382f] hover:bg-[#0a4a3a] text-white"
                            onClick={() => router.push("/courses")}>
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="w-full border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                      onClick={() => router.push("/courses")}>
                      View All Courses
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full bg-[#09382f] hover:bg-[#0a4a3a] text-white"
                    onClick={() => router.push("/courses")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Course
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                    onClick={() => router.push("/students")}>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Students
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                    onClick={() => router.push("/settings")}>
                    <FileText className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Student Landing Page Link */}
              <Card>
                <CardHeader>
                  <CardTitle>Student Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">Student Landing Page</p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={`${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/${academyName}`}
                        readOnly
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md bg-white"
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/${academyName}`);
                          alert("Student landing page link copied to clipboard!");
                        }}
                        className="bg-[#09382f] hover:bg-[#0a4a3a] text-white">
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Share this landing page with students. They can sign up or sign in from here.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Academy: <span className="font-medium">{academyName}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>This Week</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">New Enrollments</span>
                    <span className="font-semibold text-gray-900">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Course Completions</span>
                    <span className="font-semibold text-gray-900">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg. Quiz Score</span>
                    <span className="font-semibold text-gray-900">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Student Satisfaction</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">4.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

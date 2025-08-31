"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Play,
  Clock,
  TrendingUp,
  Star,
  ChevronRight,
  BookOpen,
  Trophy,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function StudentDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const academyName = params.domain as string; // URL param is 'domain' but represents academy name

  // Get student info from session
  const studentName = session?.user?.name || "Student";

  // Authentication check
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push(`/${academyName}/signin`);
      return;
    }
    // Ensure student is accessing the correct academy domain
    if (session.user.role !== "student" || session.user.tenant !== academyName) {
      router.push("/");
      return;
    }
  }, [session, status, router, academyName]);

  // Loading state
  if (status === "loading") {
    return (
      <DashboardLayout type="student" academyName={academyName}>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  // Not authenticated
  if (!session) {
    return null;
  }

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
      date: "Wednesday",
    },
  ];

  const recentAchievements = [
    { title: "First Steps", points: 100, date: "2 days ago" },
    { title: "Quick Learner", points: 150, date: "1 week ago" },
    { title: "Consistent Learner", points: 200, date: "2 weeks ago" },
  ];

  return (
    <DashboardLayout type="student" academyName={academyName}>
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {studentName}!</h1>
            <p className="text-gray-600">Continue your learning journey at {academyName} Academy</p>
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
              {/* Upcoming Lessons */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Upcoming Lessons</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingLessons.map((lesson, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{lesson.lesson}</p>
                          <p className="text-xs text-gray-600">{lesson.course}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{lesson.time}</p>
                          <p className="text-xs text-gray-600">{lesson.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                    onClick={() => router.push(`/${academyName}/schedule`)}>
                    View Schedule
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5" />
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAchievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{achievement.title}</p>
                          <p className="text-sm text-gray-600">{achievement.date}</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          +{achievement.points}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                    onClick={() => router.push(`/${academyName}/achievements`)}>
                    View All Achievements
                  </Button>
                </CardContent>
              </Card>

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

"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Calendar, Clock, Users, Video, BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function StudentSchedulePage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const academyName = params.domain as string;

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

  const upcomingLessons = [
    {
      id: 1,
      course: "Introduction to Programming",
      lesson: "Variables and Data Types",
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "45 min",
      type: "video",
      instructor: "Dr. Sarah Chen",
    },
    {
      id: 2,
      course: "Digital Marketing Fundamentals",
      lesson: "Social Media Strategy",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "35 min",
      type: "live",
      instructor: "Mark Johnson",
    },
    {
      id: 3,
      course: "Graphic Design Basics",
      lesson: "Color Theory",
      date: "2024-01-16",
      time: "11:00 AM",
      duration: "50 min",
      type: "video",
      instructor: "Emily Rodriguez",
    },
    {
      id: 4,
      course: "Introduction to Programming",
      lesson: "Functions and Methods",
      date: "2024-01-17",
      time: "10:00 AM",
      duration: "60 min",
      type: "live",
      instructor: "Dr. Sarah Chen",
    },
  ];

  const todayLessons = upcomingLessons.filter(
    (lesson) => lesson.date === new Date().toISOString().split("T")[0]
  );

  const upcomingThisWeek = upcomingLessons.filter((lesson) => {
    const lessonDate = new Date(lesson.date);
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return lessonDate >= today && lessonDate <= weekFromNow;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const getLessonTypeIcon = (type: string) => {
    return type === "live" ? Users : Video;
  };

  const getLessonTypeBadge = (type: string) => {
    return type === "live" ? (
      <Badge className="bg-red-100 text-red-800">Live Session</Badge>
    ) : (
      <Badge variant="secondary">Video Lesson</Badge>
    );
  };

  return (
    <DashboardLayout type="student">
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Schedule</h1>
            <p className="text-gray-600">Stay on track with your learning schedule</p>
          </div>

          {/* Today's Lessons */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Today&apos;s Schedule</h2>
            {todayLessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {todayLessons.map((lesson) => {
                  const IconComponent = getLessonTypeIcon(lesson.type);
                  return (
                    <Card key={lesson.id} className="border-l-4 border-l-[#09382f]">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                              {lesson.lesson}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mb-2">{lesson.course}</p>
                            <p className="text-sm text-gray-500">by {lesson.instructor}</p>
                          </div>
                          {getLessonTypeBadge(lesson.type)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{lesson.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <IconComponent className="h-4 w-4" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-[#09382f] hover:bg-[#0a4a3a] text-white">
                          {lesson.type === "live" ? "Join Live Session" : "Start Lesson"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No lessons scheduled for today</p>
                  <Button
                    variant="outline"
                    className="border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white">
                    Browse Available Courses
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* This Week's Schedule */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">This Week</h2>
            <div className="space-y-4">
              {upcomingThisWeek.map((lesson) => {
                const IconComponent = getLessonTypeIcon(lesson.type);
                return (
                  <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gray-100 rounded-lg">
                            <IconComponent className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{lesson.lesson}</h3>
                            <p className="text-sm text-gray-600">{lesson.course}</p>
                            <p className="text-sm text-gray-500">by {lesson.instructor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{formatDate(lesson.date)}</p>
                          <p className="text-sm text-gray-600">
                            {lesson.time} • {lesson.duration}
                          </p>
                          {getLessonTypeBadge(lesson.type)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">View Full Calendar</h3>
                <p className="text-sm text-gray-600">See all your scheduled lessons</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Schedule Study Time</h3>
                <p className="text-sm text-gray-600">Block time for focused learning</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Study Reminders</h3>
                <p className="text-sm text-gray-600">Set up notifications</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

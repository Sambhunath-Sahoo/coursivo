"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  BookOpen,
  Play,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function StudentCoursesPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const academyName = params.domain as string;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  return (
    <DashboardLayout type="student" academyName={academyName}>
      <div className="flex-1 overflow-auto">
        <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                      {course.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-3">
                      by {course.instructor}
                    </p>
                  </div>
                  <Badge
                    variant={
                      course.difficulty === "Beginner"
                        ? "secondary"
                        : course.difficulty === "Intermediate"
                        ? "default"
                        : "destructive"
                    }
                    className="ml-2"
                  >
                    {course.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-600 mb-3">
                      Next: {course.nextLesson}
                    </p>
                    <Button className="w-full bg-[#09382f] hover:bg-[#0a4a3a] text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Explore More Courses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Discover new courses to expand your knowledge and skills.
              </p>
              <Button variant="outline" className="border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white">
                Browse Course Catalog
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
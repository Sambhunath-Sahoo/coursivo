"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Users,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AddNewCourse } from "@/components/AddNewCourse";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function CourseManagementPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      id: 1,
      title: "Introduction to Programming",
      description: "Learn the fundamentals of programming with hands-on exercises",
      students: 45,
      progress: 78,
      status: "active",
      category: "Technology",
      duration: "8 weeks",
      lessons: 24,
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-20",
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      description: "Master the basics of digital marketing and online advertising",
      students: 32,
      progress: 92,
      status: "active",
      category: "Marketing",
      duration: "6 weeks",
      lessons: 18,
      createdDate: "2024-01-05",
      lastUpdated: "2024-01-22",
    },
    {
      id: 3,
      title: "Graphic Design Basics",
      description: "Create stunning visual designs using modern design principles",
      students: 28,
      progress: 65,
      status: "draft",
      category: "Design",
      duration: "10 weeks",
      lessons: 30,
      createdDate: "2024-01-10",
      lastUpdated: "2024-01-25",
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      description: "Introduction to data analysis and machine learning",
      students: 0,
      progress: 0,
      status: "draft",
      category: "Technology",
      duration: "12 weeks",
      lessons: 36,
      createdDate: "2024-01-15",
      lastUpdated: "2024-01-25",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "archived":
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewCourse = () => {
    setActiveView("add-course");
  };

  const handleBackToCourses = () => {
    setActiveView("list");
  };

  const handleSaveCourse = (courseData: Record<string, unknown>) => {
    console.log("Saving course:", courseData);
    // Here you would typically save to your backend
    setActiveView("list");
  };

  if (activeView === "add-course") {
    return (
      <DashboardLayout type="educator">
        <div className="flex-1 overflow-auto">
          <AddNewCourse onBack={handleBackToCourses} onSave={handleSaveCourse} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="educator">
      <div className="flex-1 overflow-auto">
        <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
              <p className="text-gray-600">Create and manage your courses</p>
            </div>
            <Button
              onClick={handleAddNewCourse}
              className="bg-[#09382f] hover:bg-[#0a4a3a] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Course
            </Button>
          </div>
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
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                  <p className="text-sm text-gray-600">Total Courses</p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {courses.reduce((sum, course) => sum + course.students, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {courses.filter(c => c.status === 'active').length}
                  </p>
                  <p className="text-sm text-gray-600">Active Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Edit className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {courses.filter(c => c.status === 'draft').length}
                  </p>
                  <p className="text-sm text-gray-600">Draft Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Courses List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                      {course.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(course.status)}
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Students</p>
                      <p className="font-semibold text-gray-900">{course.students}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Lessons</p>
                      <p className="font-semibold text-gray-900">{course.lessons}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">{course.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Progress</p>
                      <p className="font-semibold text-gray-900">{course.progress}%</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No courses found matching your search</p>
              <Button
                onClick={handleAddNewCourse}
                className="bg-[#09382f] hover:bg-[#0a4a3a] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Course
              </Button>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </DashboardLayout>
  );
} 
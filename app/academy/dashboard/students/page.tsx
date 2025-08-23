"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Download,
  Mail,
  MoreHorizontal,
  UserPlus,
  Eye,
  BookOpen,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function StudentManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1 (555) 123-4567",
      enrolledCourses: 3,
      completedCourses: 1,
      totalProgress: 75,
      joinDate: "2024-01-01",
      lastActive: "2024-01-25",
      status: "active",
      avatar: "/api/placeholder/40/40",
      courses: [
        { name: "Introduction to Programming", progress: 85 },
        { name: "Digital Marketing Fundamentals", progress: 60 },
        { name: "Graphic Design Basics", progress: 40 },
      ],
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phone: "+1 (555) 234-5678",
      enrolledCourses: 2,
      completedCourses: 2,
      totalProgress: 100,
      joinDate: "2024-01-05",
      lastActive: "2024-01-24",
      status: "active",
      avatar: "/api/placeholder/40/40",
      courses: [
        { name: "Introduction to Programming", progress: 100 },
        { name: "Digital Marketing Fundamentals", progress: 100 },
      ],
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@example.com",
      phone: "+1 (555) 345-6789",
      enrolledCourses: 1,
      completedCourses: 0,
      totalProgress: 25,
      joinDate: "2024-01-10",
      lastActive: "2024-01-20",
      status: "inactive",
      avatar: "/api/placeholder/40/40",
      courses: [{ name: "Graphic Design Basics", progress: 25 }],
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1 (555) 456-7890",
      enrolledCourses: 4,
      completedCourses: 1,
      totalProgress: 65,
      joinDate: "2024-01-15",
      lastActive: "2024-01-25",
      status: "active",
      avatar: "/api/placeholder/40/40",
      courses: [
        { name: "Introduction to Programming", progress: 100 },
        { name: "Digital Marketing Fundamentals", progress: 80 },
        { name: "Graphic Design Basics", progress: 45 },
        { name: "Data Science Fundamentals", progress: 30 },
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || student.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "active").length;
  const totalEnrollments = students.reduce((sum, student) => sum + student.enrolledCourses, 0);
  const averageProgress = Math.round(
    students.reduce((sum, student) => sum + student.totalProgress, 0) / students.length
  );

  return (
    <DashboardLayout type="educator">
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Management</h1>
              <p className="text-gray-600">Monitor and manage your students</p>
            </div>
            <Button className="bg-[#09382f] hover:bg-[#0a4a3a] text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                  <p className="text-sm text-gray-600">Total Students</p>
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
                  <p className="text-2xl font-bold text-gray-900">{activeStudents}</p>
                  <p className="text-sm text-gray-600">Active Students</p>
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
                  <p className="text-2xl font-bold text-gray-900">{totalEnrollments}</p>
                  <p className="text-sm text-gray-600">Total Enrollments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
                  <p className="text-sm text-gray-600">Avg Progress</p>
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
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm">
            <option value="all">All Students</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Students List */}
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">
                          Joined {new Date(student.joinDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          Last active {new Date(student.lastActive).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">
                        {student.enrolledCourses}
                      </p>
                      <p className="text-xs text-gray-600">Enrolled</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">
                        {student.completedCourses}
                      </p>
                      <p className="text-xs text-gray-600">Completed</p>
                    </div>
                    <div className="text-center min-w-[100px]">
                      <p className="text-lg font-semibold text-gray-900">
                        {student.totalProgress}%
                      </p>
                      <Progress value={student.totalProgress} className="h-2 mt-1" />
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(student.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Course Progress Details */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Course Progress</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {student.courses.map((course, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{course.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Progress value={course.progress} className="h-1 flex-1" />
                            <span className="text-xs text-gray-600">{course.progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No students found matching your criteria</p>
              <Button className="bg-[#09382f] hover:bg-[#0a4a3a] text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Your First Student
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

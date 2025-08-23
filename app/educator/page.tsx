"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Users,
  Plus,
  TrendingUp,
  Award,
  FileText,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function AcademyDashboardPage() {
  const router = useRouter();
  
  // This would typically come from authentication context or API
  const educatorName = "Dr. Sarah Chen";
  const academyDomain = "coursivo"; // This would come from the educator's academy settings

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
      email: "alice.johnson@example.com",
      courses: 3,
      progress: 75,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      courses: 2,
      progress: 90,
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@example.com",
      courses: 1,
      progress: 45,
    },
  ];

  const recentActivity = [
    { action: "New student enrolled", item: "Alice Johnson", time: "2 hours ago" },
    { action: "Course completed", item: "Bob Smith - Programming", time: "4 hours ago" },
    { action: "New course published", item: "Advanced JavaScript", time: "1 day ago" },
    { action: "Student query", item: "Carol Davis - Design help", time: "2 days ago" },
  ];

  const stats = {
    totalStudents: 105,
    activeCourses: 12,
    totalRevenue: 25000,
    completionRate: 87,
  };

  return (
    <DashboardLayout type="educator">
      <div className="flex-1 overflow-auto">
        <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {educatorName}!</h1>
          <p className="text-gray-600">Manage your courses and students</p>
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
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeCourses}</p>
                  <p className="text-sm text-gray-600">Active Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Courses */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Courses</CardTitle>
                  <Button 
                    className="bg-[#09382f] hover:bg-[#0a4a3a] text-white"
                    onClick={() => router.push('/educator/courses')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">{course.students} students</span>
                          <span className="text-sm text-gray-600">{course.progress}% avg progress</span>
                          <Badge 
                            className={course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                          >
                            {course.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                    onClick={() => router.push('/educator/courses')}
                  >
                    View All Courses
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Students */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{student.courses} courses</p>
                        <p className="text-sm text-gray-600">{student.progress}% progress</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                    onClick={() => router.push('/educator/students')}
                  >
                    View All Students
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.item}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
                  onClick={() => router.push('/educator/courses')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                  onClick={() => router.push('/educator/students')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Students
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                  onClick={() => router.push('/educator/settings')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </CardContent>
            </Card>

            {/* Student Signup Link */}
            <Card>
              <CardHeader>
                <CardTitle>Student Enrollment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">Student Signup Link</p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={`${window.location.origin}/${academyDomain}/signup`}
                      readOnly
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md bg-white"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/${academyDomain}/signup`);
                        alert('Link copied to clipboard!');
                      }}
                      className="bg-[#09382f] hover:bg-[#0a4a3a] text-white"
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Share this link with students to let them join your academy
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">15</div>
                  <div className="text-sm text-blue-600">New Students</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">3</div>
                  <div className="text-sm text-green-600">Courses Published</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-900">$5,200</div>
                  <div className="text-sm text-yellow-600">Revenue</div>
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

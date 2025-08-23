"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, GraduationCap, Brain, BookOpen, Users, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentLandingPage() {
  const router = useRouter();
  const params = useParams();
  const academyName = params.domain as string; // URL param is still 'domain' but represents academy name

  // This would typically come from API based on academy name
  const academyInfo = {
    name: `${academyName.charAt(0).toUpperCase() + academyName.slice(1)} Academy`,
    description: "Excellence in Digital Learning",
    instructor: "Dr. Sarah Chen",
    totalCourses: 12,
    totalStudents: 248,
    rating: 4.8,
    features: [
      "Interactive Learning Modules",
      "Real-time Progress Tracking", 
      "Expert Instructor Support",
      "Certificate of Completion"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCFBF8] to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#09382f] rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-[#09382f] rounded-full flex items-center justify-center">
                  <Brain className="h-1.5 w-1.5 text-[#09382f]" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[#09382f]">{academyInfo.name}</span>
                <p className="text-xs text-gray-600">{academyInfo.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-[#09382f]">{academyInfo.name}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of students in our comprehensive learning platform. 
              Master new skills with expert guidance and interactive content.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <BookOpen className="h-5 w-5 text-[#09382f]" />
                  <span className="text-2xl font-bold text-gray-900">{academyInfo.totalCourses}</span>
                </div>
                <p className="text-sm text-gray-600">Courses</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Users className="h-5 w-5 text-[#09382f]" />
                  <span className="text-2xl font-bold text-gray-900">{academyInfo.totalStudents}</span>
                </div>
                <p className="text-sm text-gray-600">Students</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold text-gray-900">{academyInfo.rating}</span>
                </div>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => router.push(`/${academyName}/signup`)}
                className="bg-[#09382f] hover:bg-[#0a4a3d] text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started - Sign Up
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(`/${academyName}/signin`)}
                className="border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300"
              >
                Already a Student? Sign In
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {academyInfo.features.map((feature, index) => (
              <Card key={index} className="text-center border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#09382f]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-6 w-6 text-[#09382f]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Instructor Section */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Meet Your Instructor</CardTitle>
              <CardDescription>Learn from industry experts</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="w-20 h-20 bg-[#09382f] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {academyInfo.instructor.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{academyInfo.instructor}</h3>
              <p className="text-gray-600 mb-6">
                Expert educator with years of experience in delivering high-quality online learning experiences.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => router.push(`/${academyName}/signup`)}
                  className="bg-[#09382f] hover:bg-[#0a4a3d] text-white"
                >
                  Start Learning Today
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">
            © 2024 {academyInfo.name}. Powered by{" "}
            <span className="font-semibold text-[#09382f]">Coursivo</span>
          </p>
        </div>
      </footer>
    </div>
  );
} 
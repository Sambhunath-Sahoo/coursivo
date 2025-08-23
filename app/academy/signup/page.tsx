"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Lock,
  GraduationCap,
  User,
  Eye,
  EyeOff,
  School,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AcademySignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    academyName: "",
    academyDescription: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    router.push("/academy/dashboard");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#FCFBF8]/90 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="container mx-auto px-12 lg:px-24 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#09382f] rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-[#09382f] rounded-full"></div>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#09382f]">Coursivo</span>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 bg-gradient-to-br from-gray-100 to-[#FCFBF8] min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-[#09382f] flex items-center justify-center shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Create Your Academy</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Start your journey as an educator with Coursivo
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Personal Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-900">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-10 border-gray-200 focus:border-[#09382f] focus:ring-[#09382f]/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 border-gray-200 focus:border-[#09382f] focus:ring-[#09382f]/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-900">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10 pr-10 border-gray-200 focus:border-[#09382f] focus:ring-[#09382f]/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900">
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-900">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10 border-gray-200 focus:border-[#09382f] focus:ring-[#09382f]/20"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-200" />

                {/* Academy Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Academy Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="academyName" className="text-gray-900">
                      Academy Name
                    </Label>
                    <div className="relative">
                      <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                      <Input
                        id="academyName"
                        type="text"
                        placeholder="Enter your academy name"
                        value={formData.academyName}
                        onChange={(e) => handleInputChange("academyName", e.target.value)}
                        className="pl-10 border-gray-200 focus:border-[#09382f] focus:ring-[#09382f]/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="academyDescription" className="text-gray-900">
                      Academy Description
                    </Label>
                    <Input
                      id="academyDescription"
                      type="text"
                      placeholder="Brief description of your academy"
                      value={formData.academyDescription}
                      onChange={(e) => handleInputChange("academyDescription", e.target.value)}
                      className="border-gray-200 focus:border-[#09382f] focus:ring-[#09382f]/20"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#09382f] hover:bg-[#0a4a3d] text-white border-0 transition-all duration-300 shadow-lg"
                  disabled={isLoading}>
                  {isLoading ? "Creating Academy..." : "Create Academy"}
                </Button>
              </form>

              <div className="relative">
                <Separator className="bg-gray-200" />
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-600">
                  or
                </span>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">Already have an academy account?</p>
                <Button
                  variant="link"
                  onClick={() => router.push("/academy/signin")}
                  className="p-0 h-auto text-[#09382f] hover:text-[#0a4a3d]">
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Role Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#09382f]/20 bg-[#09382f]/10 text-sm font-medium text-[#09382f]">
              <Brain className="h-4 w-4 mr-2" />
              Educator Portal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

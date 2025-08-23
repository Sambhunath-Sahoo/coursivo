"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, GraduationCap, User, Eye, EyeOff, School } from "lucide-react";
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
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="mb-6 text-gray-600 hover:text-black hover:bg-gray-50">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Auth Card */}
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-black flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-black">Create Your Academy</CardTitle>
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
                  <Label htmlFor="name" className="text-black">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10 border-gray-300 focus:border-black"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 border-gray-300 focus:border-black"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-black">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10 border-gray-300 focus:border-black"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-black">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10 border-gray-300 focus:border-black"
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
                  <Label htmlFor="academyName" className="text-black">
                    Academy Name
                  </Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="academyName"
                      type="text"
                      placeholder="Enter your academy name"
                      value={formData.academyName}
                      onChange={(e) => handleInputChange("academyName", e.target.value)}
                      className="pl-10 border-gray-300 focus:border-black"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academyDescription" className="text-black">
                    Academy Description
                  </Label>
                  <Input
                    id="academyDescription"
                    type="text"
                    placeholder="Brief description of your academy"
                    value={formData.academyDescription}
                    onChange={(e) => handleInputChange("academyDescription", e.target.value)}
                    className="border-gray-300 focus:border-black"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white"
                disabled={isLoading}>
                {isLoading ? "Creating Academy..." : "Create Academy"}
              </Button>
            </form>

            <div className="relative">
              <Separator className="bg-gray-200" />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                or
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">Already have an academy account?</p>
              <Button
                variant="link"
                onClick={() => router.push("/academy/signin")}
                className="p-0 h-auto text-black hover:text-gray-700">
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Role Badge */}
        <div className="mt-6 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black text-white">
            Educator Portal
          </span>
        </div>
      </div>
    </div>
  );
}

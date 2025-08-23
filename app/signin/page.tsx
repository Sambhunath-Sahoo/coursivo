"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, GraduationCap, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const defaultAcademy = {
  id: "coursivo",
  name: "Coursivo",
  description: "Natural Intelligence Meets Digital Learning",
  theme: { primary: "#09382f", secondary: "#8b5cf6" },
};

export default function StudentSignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    router.push("/dashboard");
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
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">
                Welcome Back to {defaultAcademy.name}
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Sign in to your student account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#09382f] hover:bg-[#0a4a3d] text-white border-0 transition-all duration-300 shadow-lg"
                  disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="relative">
                <Separator className="bg-gray-200" />
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-600">
                  or
                </span>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">Don&apos;t have an account?</p>
                <Button
                  variant="link"
                  onClick={() => router.push("/signup")}
                  className="p-0 h-auto text-[#09382f] hover:text-[#0a4a3d]">
                  Create Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Role Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#09382f]/20 bg-[#09382f]/10 text-sm font-medium text-[#09382f]">
              <Leaf className="h-4 w-4 mr-2" />
              Student Portal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

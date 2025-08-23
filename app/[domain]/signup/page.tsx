"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft, Mail, Lock, GraduationCap, User, Eye, EyeOff, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function StudentSignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const academyName = params.domain as string; // URL param is 'domain' but represents academy name

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        tenant: academyName, // Pass academy name as tenant
        action: "signup",
        redirect: false,
      });

      if (result?.error) {
        console.error("Sign up error:", result.error);
      } else {
        // Redirect to student dashboard with academy domain
        router.push(`/${academyName}/dashboard`);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#FCFBF8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push(`/${academyName}`)}
          className="mb-6 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {academyName} Academy
        </Button>

        {/* Auth Card */}
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-[#09382f] flex items-center justify-center shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Join {academyName} Academy</CardTitle>
            <CardDescription className="text-base text-gray-600">
              Start your learning journey today
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-900">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-900">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 border-gray-200 focus:border-[#09382f] focus:ring-[#09382f]/20"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#09382f] hover:bg-[#0a4a3d] text-white border-0 transition-all duration-300 shadow-lg"
                disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="relative">
              <Separator className="bg-gray-200" />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-600">
                or
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">Already have an account?</p>
              <Button
                variant="link"
                onClick={() => router.push(`/${academyName}/signin`)}
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
            Student Portal
          </div>
        </div>
      </div>
    </div>
  );
}

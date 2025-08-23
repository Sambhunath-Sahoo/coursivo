"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft, Mail, Lock, GraduationCap, Eye, EyeOff, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function StudentSignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const academyName = params.domain as string; // URL param is 'domain' but represents academy name

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        tenant: academyName, // Pass academy name as tenant
        action: "signin",
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Redirect to student dashboard with academy domain
        router.push(`/${academyName}/dashboard`);
      }
    } catch (error) {
      setError("An unexpected error occurred");
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
          onClick={() => router.push("/")}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Auth Card */}
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-[#09382f] flex items-center justify-center shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-900">
              Sign in to {academyName} Academy
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Access your learning dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#09382f] hover:bg-[#0a4a3d] text-white border-0 transition-all duration-300 shadow-lg"
                disabled={isLoading}
              >
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
              <p className="text-sm text-gray-600">New to {academyName} Academy?</p>
              <Button
                variant="link"
                onClick={() => router.push(`/${academyName}/signup`)}
                className="p-0 h-auto text-[#09382f] hover:text-[#0a4a3d]"
              >
                Create Account
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

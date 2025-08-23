"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  GraduationCap,
  Star,
  Brain,
  Monitor,
  Search,
  Shield,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserRole, AuthMode } from "@/types/academy";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleAuthStart = (role: UserRole, mode: AuthMode) => {
    if (role === "educator") {
      router.push(`/${mode === "signin" ? "signin" : "signup"}`);
    } else if (role === "student") {
      router.push(`/${mode}`);
    }
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

            <div className="hidden md:flex items-center space-x-16">
              <div className="flex items-center space-x-12">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  Features
                </a>
                <a
                  href="#about"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  About
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  Contact
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => handleAuthStart("educator", "signin")}
                  className="text-gray-900 hover:bg-gray-100 hover:text-gray-900">
                  Educator Login
                </Button>
                <Button
                  onClick={() => handleAuthStart("educator", "signup")}
                  className="bg-[#09382f] hover:bg-[#0a4a3d] text-white border-0 transition-all duration-300">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div
                className={`w-6 h-0.5 bg-gray-900 transition-all ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></div>
              <div
                className={`w-6 h-0.5 bg-gray-900 transition-all ${isMenuOpen ? "opacity-0" : ""}`}></div>
              <div
                className={`w-6 h-0.5 bg-gray-900 transition-all ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200">
              <div className="space-y-4">
                <a href="#features" className="block text-gray-600 hover:text-gray-900">
                  Features
                </a>
                <a href="#about" className="block text-gray-600 hover:text-gray-900">
                  About
                </a>
                <a href="#contact" className="block text-gray-600 hover:text-gray-900">
                  Contact
                </a>
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => handleAuthStart("educator", "signin")}
                    className="w-full border-gray-200 text-gray-900 hover:bg-gray-100">
                    Educator Login
                  </Button>
                  <Button
                    onClick={() => handleAuthStart("educator", "signup")}
                    className="w-full bg-[#09382f] hover:bg-[#0a4a3d] text-white border-0 transition-all duration-300">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Nature-Inspired */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-gray-100 to-[#FCFBF8]">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#09382f]/20 bg-[#09382f]/10 text-sm font-medium text-[#09382f] mb-4">
                <Brain className="h-4 w-4 mr-2" />
                Natural Intelligence Meets Digital Learning
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Transform Learning with Coursivo&apos;s AI-Powered Platform
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl">
                Create, manage, and deliver exceptional educational experiences. Our platform
                combines cutting-edge technology with intuitive design to help educators build
                thriving learning communities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => handleAuthStart("educator", "signup")}
                className="bg-[#09382f] hover:bg-[#0a4a3d] text-white px-8 py-4 text-lg border-0 transition-all duration-300 shadow-lg">
                Sign up for free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleAuthStart("educator", "signin")}
                className="border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white px-8 py-4 text-lg transition-all duration-300">
                Get a demo
              </Button>
            </div>

            <div className="pt-8">
              <p className="text-sm text-gray-600 mb-4">
                Trusted by the world&apos;s most ambitious educators
              </p>
              <div className="flex justify-center items-center space-x-8 text-gray-600">
                <span className="text-sm">Featured in</span>
                <div className="flex space-x-8">
                  <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-600 font-medium">
                    TechCrunch
                  </div>
                  <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-600 font-medium">
                    Forbes
                  </div>
                  <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-600 font-medium">
                    EdTech
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Nature-Inspired */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#09382f]/20 bg-[#09382f]/10 text-sm font-medium text-[#09382f] mb-4">
              <Brain className="h-4 w-4 mr-2" />
              Intelligent Learning Features
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              See how students learn with your platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Harness the power of natural intelligence combined with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#09382f] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Monitor learning progress in real-time
              </h3>
              <p className="text-gray-600">
                See students interact with your courses in real-time with instant insights. Track
                progress, identify bottlenecks, and optimize learning pathways naturally.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#09382f] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Reveal pain points that hurt engagement
              </h3>
              <p className="text-gray-600">
                Understand where students are frustrated or confused. Drill into specific lessons to
                see the impact on learning outcomes and identify improvements.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#09382f] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Find and capture issues at the source
              </h3>
              <p className="text-gray-600">
                Surface previously unseen problems and debug in-depth by capturing learning
                analytics and student behavior patterns with natural precision.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#09382f] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Play className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Stop wasting time in support tickets
              </h3>
              <p className="text-gray-600">
                Instantly get context on student issues and support them in real-time. Diagnose and
                reproduce problems effortlessly with intelligent insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-[#FCFBF8]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-red-500/20 bg-red-500/10 text-sm font-medium text-red-500 mb-4">
              <Star className="h-4 w-4 mr-2" />
              See what educators are saying about Coursivo
            </div>
            <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 leading-relaxed">
              &ldquo;Coursivo has been game-changing for us. The platform has saved countless hours
              of course management, and undeniably improved the learning experience for our
              students.&rdquo;
            </blockquote>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Dr. Sarah Chen</div>
              <div className="text-gray-600">Computer Science Professor, Stanford University</div>
            </div>
            <div className="pt-4">
              <Button
                variant="link"
                className="text-blue-500 hover:text-[#09382f] transition-colors duration-300">
                Read Case Study
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#09382f] rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-[#09382f]">Coursivo</span>
              </div>
              <p className="text-gray-300">
                Empowering education through innovative technology and thoughtful design,
                harmonizing natural wisdom with digital innovation.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <div className="space-y-2 text-gray-300">
                <div>Course Creation</div>
                <div>Student Management</div>
                <div>Analytics</div>
                <div>Assessments</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <div className="space-y-2 text-gray-300">
                <div>Documentation</div>
                <div>Support</div>
                <div>Community</div>
                <div>Blog</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <div className="space-y-2 text-gray-300">
                <div>About</div>
                <div>Careers</div>
                <div>Privacy</div>
                <div>Terms</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Coursivo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, ArrowRight, Users, BookOpen, TrendingUp, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UserRole, AuthMode } from '@/types/academy';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleAuthStart = (role: UserRole, mode: AuthMode) => {
    if (role === 'educator') {
      router.push(`/academy/${mode}`);
    } else if (role === 'student') {
      router.push(`/${mode}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-black rounded-full"></div>
              </div>
              <span className="text-xl font-bold tracking-tight">Coursivo</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-black transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-black transition-colors">Contact</a>
              
              <div className="flex items-center space-x-3 ml-8 pl-8 border-l border-gray-200">
                <Button 
                  variant="ghost" 
                  onClick={() => handleAuthStart('educator', 'signin')}
                  className="text-black hover:bg-gray-50"
                >
                  Educator Login
                </Button>
                <Button 
                  onClick={() => handleAuthStart('educator', 'signup')}
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  Get Started
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-100">
              <div className="space-y-4">
                <a href="#features" className="block text-gray-600 hover:text-black">Features</a>
                <a href="#about" className="block text-gray-600 hover:text-black">About</a>
                <a href="#contact" className="block text-gray-600 hover:text-black">Contact</a>
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleAuthStart('educator', 'signin')}
                    className="w-full border-black text-black hover:bg-gray-50"
                  >
                    Educator Login
                  </Button>
                  <Button 
                    onClick={() => handleAuthStart('educator', 'signup')}
                    className="w-full bg-black hover:bg-gray-800 text-white"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Next-generation learning platform
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Transform
                  <span className="block">Education</span>
                  <span className="block text-gray-400">Digitally</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Create, manage, and deliver exceptional learning experiences with our comprehensive platform designed for modern educators.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => handleAuthStart('educator', 'signup')}
                  className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg"
                >
                  Start Teaching Today
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => handleAuthStart('student', 'signin')}
                  className="border-black text-black hover:bg-gray-50 px-8 py-4 text-lg"
                >
                  Student Access
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-gray-600">Active Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1K+</div>
                  <div className="text-sm text-gray-600">Expert Educators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">99%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            {/* Geometric Art */}
            <div className="relative">
              <div className="relative w-full h-96">
                {/* Main geometric shape */}
                <div className="absolute inset-0 bg-black rounded-3xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-white border-2 border-black rounded-3xl transform -rotate-3"></div>
                
                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-black rounded-xl transform rotate-12"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 border-2 border-black rounded-lg transform -rotate-12"></div>
                <div className="absolute top-1/2 left-4 w-8 h-8 bg-black rounded-full"></div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-black p-8">
                  <div className="text-center space-y-4">
                    <BookOpen className="h-16 w-16 mx-auto" />
                    <div className="text-lg font-semibold">Modern Learning</div>
                    <div className="text-sm text-gray-600">Reimagined for today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for Excellence</h2>
            <p className="text-xl text-gray-600">Everything you need to create and manage world-class courses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 group hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Student Management</h3>
              <p className="text-gray-600">Track progress, manage enrollments, and engage with your students effectively.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 group hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Course Creation</h3>
              <p className="text-gray-600">Build comprehensive courses with multimedia content and interactive assessments.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 group hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
              <p className="text-gray-600">Gain deep insights into learning patterns and course effectiveness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-800 bg-gray-900 text-sm">
              <Award className="h-4 w-4 mr-2" />
              Join thousands of successful educators
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to transform your teaching?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start creating engaging courses and managing your students with our powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => handleAuthStart('educator', 'signup')}
                className="bg-white hover:bg-gray-100 text-black px-8 py-4 text-lg"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">Coursivo</span>
              </div>
              <p className="text-gray-600">Empowering education through innovative technology and thoughtful design.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-gray-600">
                <div>Course Creation</div>
                <div>Student Management</div>
                <div>Analytics</div>
                <div>Assessments</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-gray-600">
                <div>Documentation</div>
                <div>Support</div>
                <div>Community</div>
                <div>Blog</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-600">
                <div>About</div>
                <div>Careers</div>
                <div>Privacy</div>
                <div>Terms</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Coursivo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

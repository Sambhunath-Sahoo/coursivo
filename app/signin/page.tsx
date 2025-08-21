'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const defaultAcademy = {
  id: 'coursivo',
  name: 'Coursivo',
  description: 'Modern Learning Platform',
  theme: { primary: '#000000', secondary: '#404040' }
};

export default function StudentSignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    router.push('/dashboard');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.push('/')}
          className="mb-6 text-gray-600 hover:text-black hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Auth Card */}
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-black flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-black">
              Welcome Back to {defaultAcademy.name}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Sign in to your student account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 border-gray-300 focus:border-black"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-black">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 border-gray-300 focus:border-black"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative">
              <Separator className="bg-gray-200" />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                or
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?
              </p>
              <Button 
                variant="link" 
                onClick={() => router.push('/signup')}
                className="p-0 h-auto text-black hover:text-gray-700"
              >
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Role Badge */}
        <div className="mt-6 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black text-white">
            Student Portal
          </span>
        </div>
      </div>
    </div>
  );
}

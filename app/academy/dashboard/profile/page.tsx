"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Award,
  BookOpen,
  Users,
  TrendingUp,
  Building,
  Globe,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function AcademyProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Chen",
    title: "Academy Director",
    email: "sarah.chen@coursivo.academy",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate educator with over 15 years of experience in online learning and curriculum development. Dedicated to creating engaging educational experiences that empower learners worldwide.",
    joinDate: "2023-06-01",
    avatar: "/api/placeholder/150/150",
    website: "https://sarahchen.edu",
    linkedin: "https://linkedin.com/in/sarahchen",
    twitter: "https://twitter.com/sarahchen",
    organization: "Coursivo Academy",
    expertise: ["Online Learning", "Curriculum Development", "Educational Technology", "Student Engagement"],
  });

  const [editData, setEditData] = useState(profileData);

  const stats = {
    coursesCreated: 12,
    totalStudents: 450,
    averageRating: 4.8,
    totalRevenue: 25000,
  };

  const recentActivity = [
    { action: "Created new course", item: "Advanced JavaScript", date: "2024-01-25" },
    { action: "Updated course content", item: "React Fundamentals", date: "2024-01-24" },
    { action: "Responded to student query", item: "Programming Basics", date: "2024-01-23" },
    { action: "Published quiz", item: "HTML & CSS Quiz", date: "2024-01-22" },
  ];

  const achievements = [
    { title: "Top Educator", description: "Highest rated instructor", date: "2024-01-01" },
    { title: "Course Creator", description: "Created 10+ courses", date: "2023-12-15" },
    { title: "Student Favorite", description: "500+ positive reviews", date: "2023-11-20" },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleExpertiseChange = (expertise: string[]) => {
    setEditData(prev => ({ ...prev, expertise }));
  };

  return (
    <DashboardLayout type="academy">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your educator profile and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEdit}
                      className="border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-[#09382f] hover:bg-[#0a4a3a] text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                    {isEditing && (
                      <button className="absolute -bottom-2 -right-2 p-2 bg-[#09382f] text-white rounded-full hover:bg-[#0a4a3a]">
                        <Camera className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {profileData.name}
                    </h3>
                    <p className="text-gray-600">{profileData.title}</p>
                    <p className="text-sm text-gray-500">
                      Member since {new Date(profileData.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    {isEditing ? (
                      <Input
                        id="title"
                        value={editData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.title}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={editData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.location}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    {isEditing ? (
                      <Input
                        id="organization"
                        value={editData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.organization}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="mt-1"
                      rows={4}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profileData.bio}</p>
                  )}
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    {isEditing ? (
                      <Input
                        id="website"
                        value={editData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {profileData.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    {isEditing ? (
                      <Input
                        id="linkedin"
                        value={editData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 flex items-center space-x-2">
                        <Linkedin className="h-4 w-4 text-gray-400" />
                        <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    {isEditing ? (
                      <Input
                        id="twitter"
                        value={editData.twitter}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 flex items-center space-x-2">
                        <Twitter className="h-4 w-4 text-gray-400" />
                        <a href={profileData.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Twitter Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expertise */}
                <div>
                  <Label>Areas of Expertise</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profileData.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Activity Sidebar */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Courses Created</span>
                  </div>
                  <span className="font-semibold text-gray-900">{stats.coursesCreated}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Total Students</span>
                  </div>
                  <span className="font-semibold text-gray-900">{stats.totalStudents}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Average Rating</span>
                  </div>
                  <span className="font-semibold text-gray-900">{stats.averageRating}/5.0</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Total Revenue</span>
                  </div>
                  <span className="font-semibold text-gray-900">${stats.totalRevenue.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  Academy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                  <X className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
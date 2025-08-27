"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { User, Mail, Edit, Save, X, Camera, Trophy, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function StudentProfilePage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const academyName = params.domain as string;
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "John Doe",
    email: session?.user?.email || "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Passionate learner exploring new technologies and skills.",
    joinDate: "January 2024",
  });
  const [editData, setEditData] = useState(profileData);

  // Authentication check
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push(`/${academyName}/signin`);
      return;
    }
    // Ensure student is accessing the correct academy domain
    if (session.user.role !== "student" || session.user.tenant !== academyName) {
      router.push("/");
      return;
    }
  }, [session, status, router, academyName]);

  // Update profile data when session loads
  useEffect(() => {
    if (session?.user) {
      setProfileData((prev) => ({
        ...prev,
        name: session.user.name || prev.name,
        email: session.user.email || prev.email,
      }));
    }
  }, [session]);

  // Loading state
  if (status === "loading") {
    return (
      <DashboardLayout type="student" academyName={academyName}>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  // Not authenticated
  if (!session) {
    return null;
  }

  const stats = {
    coursesCompleted: 2,
    totalPoints: 450,
    studyStreak: 12,
    averageScore: 87,
  };

  const recentAchievements = [
    { title: "First Steps", date: "2024-01-15", points: 100 },
    { title: "Quick Learner", date: "2024-01-20", points: 150 },
    { title: "Consistent Learner", date: "2024-01-25", points: 200 },
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
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout type="student" academyName={academyName}>
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
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
                        className="border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={handleSave}
                          className="bg-[#09382f] hover:bg-[#0a4a3a] text-white">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
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
                      <h3 className="text-xl font-semibold text-gray-900">{profileData.name}</h3>
                      <p className="text-gray-600">Student</p>
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
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
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
                          onChange={(e) => handleInputChange("phone", e.target.value)}
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
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profileData.location}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={editData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.bio}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats and Achievements Sidebar */}
            <div className="space-y-6">
              {/* Learning Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Courses Completed</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stats.coursesCompleted}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Total Points</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stats.totalPoints}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Study Streak</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stats.studyStreak} days</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Average Score</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stats.averageScore}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">+{achievement.points}</Badge>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-[#09382f] text-[#09382f] hover:bg-[#09382f] hover:text-white"
                    onClick={() => router.push("/dashboard/achievements")}>
                    View All Achievements
                  </Button>
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
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700">
                    <X className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

"use client";

import { useState } from "react";
import {
  Settings,
  Save,
  Edit,
  Upload,
  Palette,
  Shield,
  Bell,
  CreditCard,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const [academySettings, setAcademySettings] = useState({
    name: "Coursivo Academy",
    description: "Natural Intelligence Meets Digital Learning",
    website: "https://coursivo.academy",
    email: "contact@coursivo.academy",
    phone: "+1 (555) 123-4567",
    address: "123 Education Street, Learning City, LC 12345",
    logo: "/api/placeholder/100/100",
    primaryColor: "#09382f",
    secondaryColor: "#8b5cf6",
    allowPublicRegistration: true,
    requireEmailVerification: true,
    enableNotifications: true,
    enableAnalytics: true,
    maxStudentsPerCourse: 100,
    defaultCoursePrice: 99,
    currency: "USD",
    timezone: "America/New_York",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    courseUpdates: true,
    studentProgress: true,
    systemAlerts: true,
    marketingEmails: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordComplexity: true,
    loginAttempts: 5,
    ipWhitelist: "",
  });

  const handleSaveSettings = () => {
    console.log("Saving settings:", {
      academy: academySettings,
      notifications: notificationSettings,
      security: securitySettings,
    });
    // Here you would typically save to your backend
  };

  const handleInputChange = (section: string, field: string, value: string | number | boolean) => {
    if (section === "academy") {
      setAcademySettings((prev) => ({ ...prev, [field]: value }));
    } else if (section === "notifications") {
      setNotificationSettings((prev) => ({ ...prev, [field]: value }));
    } else if (section === "security") {
      setSecuritySettings((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <DashboardLayout type="educator">
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-gray-600">Manage your academy configuration</p>
              </div>
              <Button
                onClick={handleSaveSettings}
                className="bg-[#09382f] hover:bg-[#0a4a3a] text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Academy Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo Upload */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-2 bg-[#09382f] text-white rounded-full hover:bg-[#0a4a3a]">
                        <Upload className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Academy Logo</h3>
                      <p className="text-sm text-gray-600">
                        Upload your academy logo (recommended: 200x200px)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="academyName">Academy Name</Label>
                      <Input
                        id="academyName"
                        value={academySettings.name}
                        onChange={(e) => handleInputChange("academy", "name", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={academySettings.website}
                        onChange={(e) => handleInputChange("academy", "website", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Contact Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={academySettings.email}
                        onChange={(e) => handleInputChange("academy", "email", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={academySettings.phone}
                        onChange={(e) => handleInputChange("academy", "phone", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={academySettings.description}
                      onChange={(e) => handleInputChange("academy", "description", e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={academySettings.address}
                      onChange={(e) => handleInputChange("academy", "address", e.target.value)}
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="maxStudents">Max Students per Course</Label>
                      <Input
                        id="maxStudents"
                        type="number"
                        value={academySettings.maxStudentsPerCourse}
                        onChange={(e) =>
                          handleInputChange(
                            "academy",
                            "maxStudentsPerCourse",
                            parseInt(e.target.value)
                          )
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="defaultPrice">Default Course Price</Label>
                      <Input
                        id="defaultPrice"
                        type="number"
                        value={academySettings.defaultCoursePrice}
                        onChange={(e) =>
                          handleInputChange(
                            "academy",
                            "defaultCoursePrice",
                            parseFloat(e.target.value)
                          )
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <select
                        id="currency"
                        value={academySettings.currency}
                        onChange={(e) => handleInputChange("academy", "currency", e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm">
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Public Registration</Label>
                        <p className="text-sm text-gray-600">
                          Allow students to register without invitation
                        </p>
                      </div>
                      <Switch
                        checked={academySettings.allowPublicRegistration}
                        onCheckedChange={(checked) =>
                          handleInputChange("academy", "allowPublicRegistration", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Email Verification</Label>
                        <p className="text-sm text-gray-600">
                          Students must verify their email before accessing courses
                        </p>
                      </div>
                      <Switch
                        checked={academySettings.requireEmailVerification}
                        onCheckedChange={(checked) =>
                          handleInputChange("academy", "requireEmailVerification", checked)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Theme & Branding</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center space-x-3 mt-1">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={academySettings.primaryColor}
                          onChange={(e) =>
                            handleInputChange("academy", "primaryColor", e.target.value)
                          }
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={academySettings.primaryColor}
                          onChange={(e) =>
                            handleInputChange("academy", "primaryColor", e.target.value)
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center space-x-3 mt-1">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={academySettings.secondaryColor}
                          onChange={(e) =>
                            handleInputChange("academy", "secondaryColor", e.target.value)
                          }
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={academySettings.secondaryColor}
                          onChange={(e) =>
                            handleInputChange("academy", "secondaryColor", e.target.value)
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">Preview</h3>
                    <div className="space-y-3">
                      <Button
                        style={{ backgroundColor: academySettings.primaryColor }}
                        className="text-white">
                        Primary Button
                      </Button>
                      <Button
                        variant="outline"
                        style={{
                          borderColor: academySettings.secondaryColor,
                          color: academySettings.secondaryColor,
                        }}>
                        Secondary Button
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {Object.entries(notificationSettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label>
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </Label>
                          <p className="text-sm text-gray-600">
                            {key === "emailNotifications" && "Receive notifications via email"}
                            {key === "smsNotifications" && "Receive notifications via SMS"}
                            {key === "pushNotifications" && "Receive push notifications"}
                            {key === "courseUpdates" && "Get notified about course updates"}
                            {key === "studentProgress" && "Get notified about student progress"}
                            {key === "systemAlerts" &&
                              "Receive system alerts and maintenance notifications"}
                            {key === "marketingEmails" && "Receive marketing emails and promotions"}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            handleInputChange("notifications", key, checked)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          handleInputChange("security", "twoFactorAuth", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Password Complexity Requirements</Label>
                        <p className="text-sm text-gray-600">
                          Enforce strong passwords for all users
                        </p>
                      </div>
                      <Switch
                        checked={securitySettings.passwordComplexity}
                        onCheckedChange={(checked) =>
                          handleInputChange("security", "passwordComplexity", checked)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) =>
                          handleInputChange("security", "sessionTimeout", parseInt(e.target.value))
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                      <Input
                        id="loginAttempts"
                        type="number"
                        value={securitySettings.loginAttempts}
                        onChange={(e) =>
                          handleInputChange("security", "loginAttempts", parseInt(e.target.value))
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Settings */}
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Billing & Subscription</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Current Plan: Professional</h3>
                    <p className="text-blue-700">$99/month - Up to 1000 students</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                      Upgrade Plan
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Payment Method</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                            <p className="text-sm text-gray-600">Expires 12/25</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Billing History</h3>
                    <div className="space-y-2">
                      {[
                        { date: "2024-01-01", amount: "$99.00", status: "Paid" },
                        { date: "2023-12-01", amount: "$99.00", status: "Paid" },
                        { date: "2023-11-01", amount: "$99.00", status: "Paid" },
                      ].map((invoice, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{invoice.date}</p>
                            <p className="text-sm text-gray-600">{invoice.amount}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-green-600">{invoice.status}</span>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}

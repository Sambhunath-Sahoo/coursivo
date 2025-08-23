"use client";

import { useState } from "react";
import { ArrowLeft, Save, Plus, Trash2, GripVertical, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Lesson {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "assignment";
  duration: string;
  description: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface AddNewCourseProps {
  onBack: () => void;
  onSave: (courseData: Record<string, unknown>) => void;
}

export function AddNewCourse({ onBack, onSave }: AddNewCourseProps) {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    category: "",
    level: "",
    language: "English",
    duration: "",
    price: "",
    currency: "USD",
    thumbnail: "",
    tags: [],
    isPublished: false,
    allowPreview: true,
    maxStudents: "",
    certificate: true,
  });

  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      title: "Introduction",
      description: "Course introduction and overview",
      lessons: [
        {
          id: "1-1",
          title: "Welcome to the Course",
          type: "video",
          duration: "5",
          description: "Course overview and what you'll learn",
        },
      ],
    },
  ]);

  const [currentTag, setCurrentTag] = useState("");

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !courseData.tags.includes(currentTag.trim())) {
      setCourseData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCourseData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: "New Module",
      description: "",
      lessons: [],
    };
    setModules((prev) => [...prev, newModule]);
  };

  const updateModule = (moduleId: string, field: string, value: string) => {
    setModules((prev) =>
      prev.map((module) => (module.id === moduleId ? { ...module, [field]: value } : module))
    );
  };

  const deleteModule = (moduleId: string) => {
    setModules((prev) => prev.filter((module) => module.id !== moduleId));
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `${moduleId}-${Date.now()}`,
      title: "New Lesson",
      type: "video",
      duration: "10",
      description: "",
    };

    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId ? { ...module, lessons: [...module.lessons, newLesson] } : module
      )
    );
  };

  const updateLesson = (moduleId: string, lessonId: string, field: string, value: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
              ),
            }
          : module
      )
    );
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
          : module
      )
    );
  };

  const handleSave = () => {
    const completeData = {
      ...courseData,
      modules: modules,
    };
    onSave(completeData);
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-800";
      case "reading":
        return "bg-green-100 text-green-800";
      case "quiz":
        return "bg-purple-100 text-purple-800";
      case "assignment":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-gray-300 text-black hover:bg-gray-50">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-black">Create New Course</h1>
            <p className="text-gray-600">Build an engaging learning experience for your students</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-50">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} className="bg-black hover:bg-gray-800 text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Course
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="bg-gray-100">
          <TabsTrigger
            value="basic"
            className="data-[state=active]:bg-black data-[state=active]:text-white">
            Basic Information
          </TabsTrigger>
          <TabsTrigger
            value="curriculum"
            className="data-[state=active]:bg-black data-[state=active]:text-white">
            Curriculum
          </TabsTrigger>
          <TabsTrigger
            value="pricing"
            className="data-[state=active]:bg-black data-[state=active]:text-white">
            Pricing & Settings
          </TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-black">
                      Course Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter course title..."
                      value={courseData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="border-gray-300 focus:border-black"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription" className="text-black">
                      Short Description *
                    </Label>
                    <Textarea
                      id="shortDescription"
                      placeholder="Brief description for course preview..."
                      value={courseData.shortDescription}
                      onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                      className="border-gray-300 focus:border-black"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-black">
                      Full Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed course description, learning outcomes, prerequisites..."
                      value={courseData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="border-gray-300 focus:border-black"
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-black">
                        Category *
                      </Label>
                      <Select
                        value={courseData.category}
                        onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="programming">Programming</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="photography">Photography</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="languages">Languages</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="level" className="text-black">
                        Difficulty Level *
                      </Label>
                      <Select
                        value={courseData.level}
                        onValueChange={(value) => handleInputChange("level", value)}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-black">
                        Estimated Duration
                      </Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 8 weeks, 20 hours"
                        value={courseData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        className="border-gray-300 focus:border-black"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-black">
                        Language
                      </Label>
                      <Select
                        value={courseData.language}
                        onValueChange={(value) => handleInputChange("language", value)}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                          <SelectItem value="Chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label className="text-black">Tags</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add a tag..."
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        className="border-gray-300 focus:border-black"
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        size="sm"
                        className="bg-black hover:bg-gray-800 text-white">
                        Add
                      </Button>
                    </div>
                    {courseData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {courseData.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-100 text-black hover:bg-gray-200 cursor-pointer"
                            onClick={() => removeTag(tag)}>
                            {tag}
                            <span className="ml-1">×</span>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Media & Settings */}
            <div className="space-y-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Course Thumbnail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload course thumbnail</p>
                    <p className="text-sm text-gray-500">Recommended: 1280x720 pixels</p>
                    <Button
                      variant="outline"
                      className="mt-3 border-gray-300 text-black hover:bg-gray-50">
                      Choose File
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Quick Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-black">Allow Preview</p>
                      <p className="text-sm text-gray-600">Let students preview content</p>
                    </div>
                    <Switch
                      checked={courseData.allowPreview}
                      onCheckedChange={(checked) => handleInputChange("allowPreview", checked)}
                    />
                  </div>

                  <Separator className="bg-gray-200" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-black">Certificate</p>
                      <p className="text-sm text-gray-600">Issue completion certificate</p>
                    </div>
                    <Switch
                      checked={courseData.certificate}
                      onCheckedChange={(checked) => handleInputChange("certificate", checked)}
                    />
                  </div>

                  <Separator className="bg-gray-200" />

                  <div className="space-y-2">
                    <Label htmlFor="maxStudents" className="text-black">
                      Max Students
                    </Label>
                    <Input
                      id="maxStudents"
                      type="number"
                      placeholder="Unlimited"
                      value={courseData.maxStudents}
                      onChange={(e) => handleInputChange("maxStudents", e.target.value)}
                      className="border-gray-300 focus:border-black"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-6">
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-black">Course Curriculum</CardTitle>
                <Button onClick={addModule} className="bg-black hover:bg-gray-800 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {modules.map((module, moduleIndex) => (
                <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                      <Badge variant="outline" className="border-black text-black">
                        Module {moduleIndex + 1}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteModule(module.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-black">Module Title</Label>
                      <Input
                        value={module.title}
                        onChange={(e) => updateModule(module.id, "title", e.target.value)}
                        className="border-gray-300 focus:border-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-black">Module Description</Label>
                      <Input
                        value={module.description}
                        onChange={(e) => updateModule(module.id, "description", e.target.value)}
                        placeholder="Brief module description..."
                        className="border-gray-300 focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-black">Lessons</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addLesson(module.id)}
                        className="border-gray-300 text-black hover:bg-gray-50">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Lesson
                      </Button>
                    </div>

                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                            <span className="text-sm font-medium text-gray-600">
                              Lesson {lessonIndex + 1}
                            </span>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${getLessonTypeColor(lesson.type)}`}>
                              {lesson.type}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteLesson(module.id, lesson.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-100">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-black">Title</Label>
                            <Input
                              value={lesson.title}
                              onChange={(e) =>
                                updateLesson(module.id, lesson.id, "title", e.target.value)
                              }
                              className="border-gray-300 focus:border-black text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-black">Type</Label>
                            <Select
                              value={lesson.type}
                              onValueChange={(value) =>
                                updateLesson(module.id, lesson.id, "type", value)
                              }>
                              <SelectTrigger className="border-gray-300 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="reading">Reading</SelectItem>
                                <SelectItem value="quiz">Quiz</SelectItem>
                                <SelectItem value="assignment">Assignment</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-black">Duration (min)</Label>
                            <Input
                              type="number"
                              value={lesson.duration}
                              onChange={(e) =>
                                updateLesson(module.id, lesson.id, "duration", e.target.value)
                              }
                              className="border-gray-300 focus:border-black text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {module.lessons.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>No lessons added yet. Click &quot;Add Lesson&quot; to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {modules.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>
                    No modules created yet. Click &quot;Add Module&quot; to start building your
                    curriculum.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing & Settings Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-black">
                      Price *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={courseData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className="border-gray-300 focus:border-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-black">
                      Currency
                    </Label>
                    <Select
                      value={courseData.currency}
                      onValueChange={(value) => handleInputChange("currency", value)}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> Setting price to $0 will make this a free course. You can
                    always update pricing later.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Publication Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black">Publish Course</p>
                    <p className="text-sm text-gray-600">Make course visible to students</p>
                  </div>
                  <Switch
                    checked={courseData.isPublished}
                    onCheckedChange={(checked) => handleInputChange("isPublished", checked)}
                  />
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Tip:</strong> Keep your course as draft while you&apos;re building it.
                    Publish when you&apos;re ready for students to enroll.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

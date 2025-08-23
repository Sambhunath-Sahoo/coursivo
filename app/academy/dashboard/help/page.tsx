"use client";

import { useState } from "react";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Video,
  Book,
  Users,
  Settings,
  Zap,
  CreditCard,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function HelpSupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [supportForm, setSupportForm] = useState({
    subject: "",
    category: "general",
    message: "",
    priority: "medium",
  });

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      questions: [
        {
          question: "How do I create my first course?",
          answer:
            "To create your first course, navigate to Course Management and click 'Add New Course'. Fill in the course details, upload content, and publish when ready.",
        },
        {
          question: "How do I invite students to my academy?",
          answer:
            "Go to Student Management and click 'Add Student'. You can either add students individually or enable public registration in Settings.",
        },
        {
          question: "How do I customize my academy's appearance?",
          answer:
            "Visit Settings > Appearance to customize your academy's colors, logo, and branding elements.",
        },
      ],
    },
    {
      id: "course-management",
      title: "Course Management",
      icon: Book,
      questions: [
        {
          question: "Can I import content from other platforms?",
          answer:
            "Yes, you can import content from various formats including SCORM packages, videos, PDFs, and presentations.",
        },
        {
          question: "How do I track student progress?",
          answer:
            "Student progress is automatically tracked and can be viewed in the Student Management section or individual course analytics.",
        },
        {
          question: "Can I create quizzes and assessments?",
          answer:
            "Yes, you can create various types of assessments including multiple choice, true/false, and essay questions.",
        },
      ],
    },
    {
      id: "student-management",
      title: "Student Management",
      icon: Users,
      questions: [
        {
          question: "How do I enroll students in courses?",
          answer:
            "Students can be enrolled automatically upon registration or manually assigned to specific courses in Student Management.",
        },
        {
          question: "Can I send messages to students?",
          answer:
            "Yes, you can send individual messages or broadcast announcements to all students or specific groups.",
        },
        {
          question: "How do I generate student reports?",
          answer:
            "Reports can be generated from the Student Management section, including progress reports, completion certificates, and performance analytics.",
        },
      ],
    },
    {
      id: "billing",
      title: "Billing & Payments",
      icon: CreditCard,
      questions: [
        {
          question: "How do I upgrade my plan?",
          answer:
            "Visit Settings > Billing to view available plans and upgrade options. Changes take effect immediately.",
        },
        {
          question: "Can I accept payments from students?",
          answer:
            "Yes, you can set up payment processing to charge for courses. Configure payment methods in Settings > Billing.",
        },
        {
          question: "How do I download invoices?",
          answer:
            "All invoices are available in Settings > Billing > Billing History and can be downloaded as PDFs.",
        },
      ],
    },
  ];

  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      availability: "24/7",
      action: "Start Chat",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      availability: "Response within 24h",
      action: "Send Email",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Phone Support",
      description: "Speak directly with our team",
      icon: Phone,
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Call Now",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const resources = [
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: Video,
      count: "25+ videos",
      link: "#",
    },
    {
      title: "Documentation",
      description: "Comprehensive user guides",
      icon: FileText,
      count: "50+ articles",
      link: "#",
    },
    {
      title: "Community Forum",
      description: "Connect with other educators",
      icon: Users,
      count: "1000+ members",
      link: "#",
    },
    {
      title: "API Documentation",
      description: "Technical integration guides",
      icon: Settings,
      count: "Full reference",
      link: "#",
    },
  ];

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Support request:", supportForm);
    // Here you would typically send to your backend
    setSupportForm({
      subject: "",
      category: "general",
      message: "",
      priority: "medium",
    });
  };

  return (
    <DashboardLayout type="academy">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-gray-600">Find answers and get help when you need it</p>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* FAQ Categories */}
            <div className="space-y-6">
              {(searchTerm ? filteredFAQs : faqCategories).map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <category.icon className="h-5 w-5" />
                      <span>{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.questions.map((faq, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                          <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                          <p className="text-gray-600 text-sm">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {searchTerm && filteredFAQs.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No FAQ found matching your search</p>
                  <Button className="bg-[#09382f] hover:bg-[#0a4a3a] text-white">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Contact Support Tab */}
          <TabsContent value="contact" className="space-y-6">
            {/* Support Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`p-3 rounded-full w-fit mx-auto mb-4 ${channel.color}`}>
                      <channel.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{channel.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                    <p className="text-xs text-gray-500 mb-4">{channel.availability}</p>
                    <Button className="w-full bg-[#09382f] hover:bg-[#0a4a3a] text-white">
                      {channel.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support Form */}
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSupportSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        value={supportForm.subject}
                        onChange={(e) =>
                          setSupportForm((prev) => ({ ...prev, subject: e.target.value }))
                        }
                        placeholder="Brief description of your issue"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={supportForm.category}
                        onChange={(e) =>
                          setSupportForm((prev) => ({ ...prev, category: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm">
                        <option value="general">General Question</option>
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={supportForm.priority}
                      onChange={(e) =>
                        setSupportForm((prev) => ({ ...prev, priority: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm max-w-xs">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Textarea
                      value={supportForm.message}
                      onChange={(e) =>
                        setSupportForm((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder="Please provide detailed information about your issue..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="bg-[#09382f] hover:bg-[#0a4a3a] text-white">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <resource.icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{resource.count}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-between">
                    Getting Started Guide
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between">
                    Course Creation Tutorial
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between">
                    Student Management Guide
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between">
                    Settings Configuration
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>All Systems Operational</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { service: "Course Delivery", status: "Operational", uptime: "99.9%" },
                    { service: "User Authentication", status: "Operational", uptime: "100%" },
                    { service: "Payment Processing", status: "Operational", uptime: "99.8%" },
                    { service: "Video Streaming", status: "Operational", uptime: "99.7%" },
                    { service: "API Services", status: "Operational", uptime: "99.9%" },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-900">{service.service}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-green-600">{service.status}</span>
                        <p className="text-xs text-gray-500">{service.uptime} uptime</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      date: "Jan 25, 2024",
                      title: "New Quiz Features Released",
                      description: "Added support for timed quizzes and advanced question types.",
                    },
                    {
                      date: "Jan 20, 2024",
                      title: "Performance Improvements",
                      description: "Improved page load times and video streaming quality.",
                    },
                    {
                      date: "Jan 15, 2024",
                      title: "Mobile App Update",
                      description: "Enhanced mobile experience with new navigation and features.",
                    },
                  ].map((update, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{update.title}</h3>
                        <span className="text-sm text-gray-500">{update.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

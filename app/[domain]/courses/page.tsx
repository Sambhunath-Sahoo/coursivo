
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/DashboardLayout";


interface Course {
  id: string;
  title: string;
  description: string;
  price_cents: number;
  currency: string;
  thumbnail_url: string | null;
  duration_minutes: number | null;
}

export default function StudentCoursesPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const academyName = params.domain as string;
  const [courses, setCourses] = useState<Course[]>([]);
  console.log(courses);
  const [loading, setLoading] = useState(true);

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

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/courses?domain=${academyName}`);
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchCourses();
    }
  }, [session, academyName]);

  // Loading state
  if (status === "loading" || loading) {
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

  return (
    <DashboardLayout type="student" academyName={academyName}>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Courses</h1>
      </div>
    </DashboardLayout>
  );
}
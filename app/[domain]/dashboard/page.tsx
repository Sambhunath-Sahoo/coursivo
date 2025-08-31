"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function StudentDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const academyName = params.domain as string;

  // Get student info from session
  const studentName = session?.user?.name || "Student";

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

  // Not authenticated
  if (!session) {
    return null;
  }

  return (
    <DashboardLayout type="student" academyName={academyName}>
        <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {studentName}!</h1>
        <p className="text-gray-600 mt-2">Continue your learning journey at {academyName} Academy</p>
      </div>
    </DashboardLayout>
  );
}
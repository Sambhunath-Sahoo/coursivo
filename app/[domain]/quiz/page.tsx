"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { QuizPage } from "@/components/QuizPage";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function StudentQuizPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const academyName = params.domain as string;

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

  return (
    <DashboardLayout type="student" academyName={academyName}>
      <div className="flex-1 overflow-auto">
        <QuizPage />
      </div>
    </DashboardLayout>
  );
}

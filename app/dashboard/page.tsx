"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Get academy name from session or fallback to default
  const academyName = session?.user?.domain || "coursivo";
  const userType = (session?.user?.role as "student" | "educator") || "educator";
  const userName = session?.user?.name || "User";

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/signin");
      return;
    }
  }, [session, status, router]);

  // Not authenticated
  if (!session) {
    return null;
  }

  if (userType === "student") {
    return (
      <DashboardLayout type="student" academyName={academyName}>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}!</h1>
        </div>
      </DashboardLayout>
    );
  }

  // Educator Dashboard
  return (
    <DashboardLayout type="educator">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}!</h1>
      </div>
    </DashboardLayout>
  );
}
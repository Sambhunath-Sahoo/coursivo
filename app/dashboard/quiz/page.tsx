"use client";

import { QuizPage } from "@/components/QuizPage";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function TakeQuizPage() {
  return (
    <DashboardLayout type="student">
      <div className="flex-1 overflow-auto">
        <QuizPage />
      </div>
    </DashboardLayout>
  );
} 
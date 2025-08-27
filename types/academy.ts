export type UserRole = "student" | "educator" | null;
export type AuthMode = "signin" | "signup";

export interface Academy {
  id: string;
  name: string;
  description: string;
  theme: {
    primary: string;
    secondary: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress?: number;
  status?: "active" | "completed" | "draft";
  students?: number;
  category?: string;
  image?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: Course[];
  progress: Record<string, number>;
  joinedAt: Date;
}

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export types for convenience
export type { 
  educator_account,
  students,
  educator_bank,
  courses,
  sections,
  content_items,
  quizzes,
  quiz_questions,
  quiz_attempts,
  quiz_attempted_answers,
  purchases,
  enrollments,
  course_completion_certificates,
  enrollment_content_progress
} from '@prisma/client'

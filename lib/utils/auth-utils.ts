import { hash, compare } from "bcryptjs"
import { prisma } from "../prisma"

// Types for authentication
export interface AuthCredentials {
  email: string
  password: string
  userType: "student" | "educator"
  action: "signin" | "signup"
  tenant?: string
  name?: string
}

export interface AuthUser {
  id: string
  email: string
  name: string | undefined
  role: "student" | "educator"
  educatorId?: string
  tenant?: string
  domain?: string
}

// Validation utilities
export function validateCredentials(credentials: AuthCredentials | undefined): credentials is AuthCredentials {
  if (!credentials) return false
  if (!credentials.email || !credentials.password) return false
  if (!credentials.userType || !credentials.action) return false
  return true
}

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
}

// Database utilities
export async function findEducatorByEmail(email: string) {
  return await prisma.educator_account.findFirst({
    where: { email }
  })
}

export async function findEducatorByDomain(domain: string) {
  return await prisma.educator_account.findFirst({
    where: { domain }
  })
}

export async function findStudentByEmail(email: string) {
  return await prisma.students.findFirst({
    where: { email },
    include: {
      educator: true
    }
  })
}

export async function findStudentByEmailAndEducator(email: string, educatorId: string) {
  return await prisma.students.findFirst({
    where: {
      email,
      educator_id: educatorId
    }
  })
}

// Create user utilities
export async function createEducatorAccount(email: string, password: string, name?: string) {
  const hashedPassword = await hashPassword(password)
  return await prisma.educator_account.create({
    data: {
      email,
      password_hash: hashedPassword,
      name: name || "New Educator",
      domain: "academy",
      domain_verified: false
    }
  })
}

export async function createStudentAccount(email: string, password: string, educatorId: string, name?: string) {
  const hashedPassword = await hashPassword(password)
  return await prisma.students.create({
    data: {
      email,
      password_hash: hashedPassword,
      name: name || "New Student",
      educator_id: educatorId
    }
  })
}

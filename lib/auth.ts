import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { JWT } from "next-auth/jwt"
import type { Session, User } from "next-auth"
import { prisma } from "./prisma"
import { compare, hash } from "bcryptjs"

// Clean auth options
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
        action: { label: "Action", type: "text" },
        tenant: { label: "Tenant", type: "text" },
        domain: { label: "Domain", type: "text" }
      },
      async authorize(credentials) {
        console.log("🔐 Auth attempt with credentials:", { 
          email: credentials?.email, 
          userType: credentials?.userType, 
          action: credentials?.action,
          tenant: credentials?.tenant,
          domain: credentials?.domain
        });
        
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing email or password");
          return null
        }

        const { email, password, userType, action, tenant, domain } = credentials

        try {
          if (userType === "educator") {
            console.log("👨‍🏫 Attempting educator auth...");
            return await handleEducatorAuth(email, password, action, domain)
          } else if (userType === "student") {
            console.log("👨‍🎓 Attempting student auth...");
            return await handleStudentAuth(email, password, action, tenant)
          } else {
            console.log("❌ Invalid userType:", userType);
            return null
          }
        } catch (error) {
          console.error("🚨 Auth error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role
        token.educatorId = user.educatorId
        token.tenant = user.tenant
        token.domain = user.domain
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      try {
        if (token && session.user) {
          session.user.id = token.sub || ""
          session.user.role = token.role as string
          session.user.educatorId = token.educatorId as string
          session.user.tenant = token.tenant as string
          session.user.domain = token.domain as string
        }
        return session
      } catch (error) {
        console.error("🚨 Session callback error:", error)
        // Return a clean session if there's an error
        return {
          ...session,
          user: {
            id: "",
            email: "",
            name: "",
            role: "",
            educatorId: "",
            tenant: "",
            domain: ""
          }
        }
      }
    }
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup"
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}

// Educator authentication
async function handleEducatorAuth(email: string, password: string, action: string, domain?: string) {
  if (action === "signup") {
    const existingEducator = await prisma.educator_account.findFirst({
      where: { email }
    })

    if (existingEducator) {
      throw new Error("Educator account already exists")
    }

    const hashedPassword = await hash(password, 12)
    const newEducator = await prisma.educator_account.create({
      data: {
        email,
        password_hash: hashedPassword,
        name: "New Educator",
        domain: domain || "academy",
        domain_verified: false
      }
    })

    return {
      id: newEducator.id,
      email: newEducator.email,
      name: newEducator.name || undefined,
      role: "educator",
      domain: newEducator.domain || undefined
    }
  }

  if (action === "signin") {
    const educator = await prisma.educator_account.findFirst({
      where: { email }
    })

    if (!educator || !educator.password_hash) {
      throw new Error("Invalid credentials")
    }

    const isValidPassword = await compare(password, educator.password_hash)
    if (!isValidPassword) {
      throw new Error("Invalid credentials")
    }

    return {
      id: educator.id,
      email: educator.email,
      name: educator.name || undefined,
      role: "educator",
      domain: educator.domain || undefined
    }
  }

  throw new Error("Invalid action")
}

// Student authentication
async function handleStudentAuth(email: string, password: string, action: string, tenant: string = "default") {
  if (action === "signup") {
    const educator = await prisma.educator_account.findFirst({
      where: { domain: tenant }
    })

    if (!educator) {
      throw new Error("Invalid academy")
    }

    const existingStudent = await prisma.students.findFirst({
      where: {
        educator_id: educator.id,
        email
      }
    })

    if (existingStudent) {
      throw new Error("Student already exists in this academy")
    }

    const hashedPassword = await hash(password, 12)
    const newStudent = await prisma.students.create({
      data: {
        email,
        password_hash: hashedPassword,
        name: "New Student",
        educator_id: educator.id
      }
    })

    return {
      id: newStudent.id,
      email: newStudent.email,
      name: newStudent.name || undefined,
      role: "student",
      educatorId: educator.id,
      tenant
    }
  }

  if (action === "signin") {
    const student = await prisma.students.findFirst({
      where: { email },
      include: {
        educator: true
      }
    })

    if (!student || !student.password_hash) {
      throw new Error("Invalid credentials")
    }

    const isValidPassword = await compare(password, student.password_hash)
    if (!isValidPassword) {
      throw new Error("Invalid credentials")
    }

    return {
      id: student.id,
      email: student.email,
      name: student.name || undefined,
      role: "student",
      educatorId: student.educator_id,
      tenant: student.educator.domain || "default"
    }
  }

  throw new Error("Invalid action")
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

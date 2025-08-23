import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

// Student authentication function
async function handleStudentAuth(credentials: Record<string, string>) {
  const tenant = credentials.tenant || "alpha";

  // Find educator by tenant
  const educator = await prisma.educator_account.findFirst({
    where: { domain: tenant },
  });

  if (!educator) {
    throw new Error("Invalid tenant");
  }

  if (credentials.action === "signup") {
    if (!credentials.name) {
      throw new Error("Name is required for signup");
    }

    // Check if student exists
    const existingStudent = await prisma.students.findFirst({
      where: {
        educator_id: educator.id,
        email: credentials.email,
      },
    });

    if (existingStudent) {
      throw new Error("User already exists in this tenant");
    }

    // Create new student
    const hashedPassword = await hash(credentials.password, 12);
    const newStudent = await prisma.students.create({
      data: {
        email: credentials.email,
        name: credentials.name,
        password_hash: hashedPassword,
        educator_id: educator.id,
      },
    });

    return {
      id: newStudent.id,
      email: newStudent.email,
      name: newStudent.name,
      educatorId: educator.id,
      tenant: tenant,
      role: "student",
    };
  }

  if (credentials.action === "signin") {
    const student = await prisma.students.findFirst({
      where: {
        educator_id: educator.id,
        email: credentials.email,
      },
    });

    if (!student || !student.password_hash) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await compare(credentials.password, student.password_hash);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    return {
      id: student.id,
      email: student.email,
      name: student.name,
      educatorId: educator.id,
      tenant: tenant,
      role: "student",
    };
  }

  throw new Error("Invalid action");
}

// Educator authentication function
async function handleEducatorAuth(credentials: Record<string, string>) {
  if (credentials.action === "signup") {
    const domain = credentials.domain;
    if (!domain) {
      throw new Error("Domain is required for signup");
    }

    if (!credentials.name) {
      throw new Error("Name is required for signup");
    }

    const existingEducator = await prisma.educator_account.findFirst({
      where: { domain: domain },
    });

    if (existingEducator) {
      throw new Error("An academy with this domain already exists");
    }

    const hashedPassword = await hash(credentials.password, 12);
    const newEducator = await prisma.educator_account.create({
      data: {
        email: credentials.email,
        name: credentials.name,
        password_hash: hashedPassword,
        domain: domain,
      },
    });

    return {
      id: newEducator.id,
      email: newEducator.email,
      name: newEducator.name,
      domain: newEducator.domain ?? undefined,
      role: "educator",
    };
  }

  if (credentials.action === "signin") {
    // For signin, find educator by email first, then get domain from database
    const educator = await prisma.educator_account.findFirst({
      where: { email: credentials.email },
    });

    if (!educator || !educator.password_hash) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await compare(credentials.password, educator.password_hash);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    return {
      id: educator.id,
      email: educator.email,
      name: educator.name,
      domain: educator.domain ?? undefined, // Domain comes from database
      role: "educator",
    };
  }

  throw new Error("Invalid action");
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Student Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        action: { label: "Action", type: "text" },
        tenant: { label: "Tenant", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        return handleStudentAuth(credentials);
      },
    }),
    CredentialsProvider({
      id: "educator-credentials",
      name: "Educator Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        action: { label: "Action", type: "text" },
        domain: { label: "Domain", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        return handleEducatorAuth(credentials);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        if (user.role === "educator") {
          token.domain = user.domain;
          token.role = user.role;
        } else {
          token.educatorId = user.educatorId;
          token.tenant = user.tenant;
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.sub || "";
        if (token.role === "educator") {
          session.user.domain = token.domain;
          session.user.role = token.role;
        } else {
          session.user.educatorId = token.educatorId;
          session.user.tenant = token.tenant;
          session.user.role = token.role;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax" as const,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

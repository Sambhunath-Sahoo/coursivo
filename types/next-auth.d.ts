import "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name?: string
    educatorId?: string
    tenant?: string
    domain?: string
    role: string
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string
      educatorId?: string
      tenant?: string
      domain?: string
      role: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    educatorId?: string
    tenant?: string
    domain?: string
    role: string
  }
}

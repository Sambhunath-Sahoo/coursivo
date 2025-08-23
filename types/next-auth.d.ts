import "next-auth";

declare module "next-auth" {
  interface User {
    educatorId: string;
    tenant: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      educatorId: string;
      tenant: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    educatorId: string;
    tenant: string;
    role: string;
  }
}

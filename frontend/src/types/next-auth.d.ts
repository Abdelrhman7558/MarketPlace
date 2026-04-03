import { User as AppUser } from "../lib/auth";

declare module "next-auth" {
  interface Session {
    backendUser?: AppUser;
    backendToken?: string;
    pendingApproval?: boolean;
    pendingEmail?: string;
    authError?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendUser?: AppUser;
    backendToken?: string;
    pendingApproval?: boolean;
    pendingEmail?: string;
    authError?: string;
  }
}

import "next-auth";
import { DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    role: string;
    email: string;
    accessToken: JWT;
  }
  interface Session {
    user: User;
    token: JWT;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    role: string;
    email: string;
    accessToken: string;
  }
}

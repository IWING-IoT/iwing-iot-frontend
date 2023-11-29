import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

const signInCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/signin`,
    {
      email: email,
      password: password,
    },
  );
  // console.log(res);
  return res.data;
};

interface MyJwtPayload extends JwtPayload {
  id: string;
  name: string;
  role: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log("credentials => ", credentials);
        if (!credentials) {
          throw new Error("No credentials.");
        }
        const { email, password } = credentials;
        const response = await signInCredentials({ email, password });
        const decoded = jwtDecode<MyJwtPayload>(response.token);
        // console.log("decoded => ", decoded);
        return {
          id: decoded.id,
          name: decoded.name,
          role: decoded.role,
          email: decoded.email,
          accessToken: response.token,
        };
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("------------signin begin---------------");
    //   console.log("user => ", user);
    //   console.log("jwt ==> ", user.accessToken);
    //   console.log("account => ", account);
    //   console.log("profile => ", profile);
    //   console.log("email => ", email);
    //   console.log("credentials => ", credentials);
    //   console.log("------------signin end---------------");
    //   return true;
    // },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return baseUrl + url;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
    jwt({ token, user }: { token: JWT; user: User }) {
      // console.log("------------jwt begin---------------");
      // console.log("token => ", token);
      // console.log("user => ", user);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      // console.log("------------session begin---------------");
      // console.log("session => ", session);
      // console.log("token => ", token);
      // console.log("------------session end---------------");
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      // console.log("session-session => ", session);
      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);

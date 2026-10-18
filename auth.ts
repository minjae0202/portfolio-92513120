import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null; // ① 입력값 검증

        await connectDB();
        const user = await User.findOne({ email });
        if (!user) return null; // ② 존재하지 않는 이메일

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null; // ③ 비밀번호 불일치 — ②와 같은 응답(계정 존재 여부 노출 방지)

        return { id: String(user._id), name: user.name, email: user.email }; // ④ 세션에 담길 값
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user && typeof token.id === "string") session.user.id = token.id;
      return session;
    },
  },
});

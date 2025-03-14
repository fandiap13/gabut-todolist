import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const existingUser = await prisma.user.findFirst({
          where: { email: user.email?.toString() },
        });

        // Jika blom ada user, buat user
        if (!existingUser) {
          const create = await prisma.user.create({
            data: {
              email: user.email ? user.email.toString() : "",
              name: user.name,
            },
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    // // async session({ session, user }) {
    // //   // Menyimpan informasi pengguna ke session
    // //   session.user.id = user.id;
    // //   return session;
    // // },
    async session({ session, token }) {
      // Dapatkan user dari database berdasarkan email
      const user = await prisma.user.findFirst({
        where: { email: session.user?.email },
      });

      // Tambahkan data user ke session
      if (user) {
        session.user.id = user.user_id.toString();
        // Bisa menambahkan informasi lain dari database jika perlu
        // session.user.role = user.role;
        // session.user.customField = user.customField;
      }

      return session;
    },
  },
});

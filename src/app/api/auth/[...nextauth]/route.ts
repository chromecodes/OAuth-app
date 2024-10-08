import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/dbCongfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcryptjs from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      const crtUser = await User.findOne({ email: user.email });
      if (!crtUser) {
        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(user.id, salt);

        const newUser = new User({
          username: user.name,
          email: user.email,
          password: hashedPassword,
        });
        const savedUser = await newUser.save();
        const tokenData = {
          _id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!);
        cookies().set("token", token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        });
      } else {
        const tokenData = {
          _id: crtUser._id,
          username: crtUser.username,
          email: crtUser.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!);
        cookies().set("token", token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        });
      }

      return true;
    },
  },
});
connect();

export { handler as GET, handler as POST };

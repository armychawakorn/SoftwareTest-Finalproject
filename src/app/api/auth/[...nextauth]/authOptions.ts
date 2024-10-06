import { CreateConnection } from "@/libs/mongoose";
import { user } from "@/models/user";
import * as bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        redirect({ baseUrl }) {
            return baseUrl;
        },
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: { email: {}, password: {} },
            async authorize(credentials) {
                const userLoginRequest = {
                    email: credentials?.email,
                    password: credentials?.password,
                };

                await CreateConnection();

                const db_user = await user.findOne({
                    email: userLoginRequest.email
                });

                if (!db_user) {
                    return null;
                }

                const isPasswordMatch = await bcrypt.compare(
                    userLoginRequest.password as string,
                    db_user.password
                );

                if (!isPasswordMatch) {
                    return null;
                }

                return {
                    id: db_user._id,
                    email: db_user.email,
                };
            },
        }),
    ],
};
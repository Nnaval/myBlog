import user from "@/models/user";
import { connectToDb } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/Google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
    CredentialsProvider({
      // id: "Credentials",
      name: "Credentials",
      async authorize(Credentials) {
        // check if user exists
        await connectToDb();

        console.log("connected to db to find existing user");
        try {
          // taking the email from login page and comparing it to the email in the database
          const users = user.findOne({ email: Credentials.email });

          if (users) {
          // if the email in the database matches, then compare the password
            
            const isPasswordCorrect = await bcrypt.compare(
              Credentials.password,
              users.password
            );

            if (isPasswordCorrect) {
              return users;
            } else {
              throw new Error("wrong credentials");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(err);
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };

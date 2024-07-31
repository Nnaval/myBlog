import user from "@/models/user";
import { connectToDb } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/Google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // ...add more providers here
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      async authorize(Credentials) {
        // check if user exists
        await connectToDb();

        console.log("connected to db to find existing user");
        try {
          // taking the email from login page and comparing it to the email in the database
          const users = await user.findOne({ email: Credentials.email });

          if (users) {
            console.log("email exists so lets find password=", users);
            // if the email in the database matches, then compare the password

            const isPasswordCorrect = await bcrypt.compare(
              Credentials.password,
              users.password
            );
            console.log("cheking if password is correct");
            if (isPasswordCorrect) {
              // console.log( "password is correct =", isPasswordCorrect);
              
              console.log("users created ");
              return users;
            } else {
              throw new Error("wrong credentials");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, users}) {
      if (users) {
        token.email = users.email,
        token.password = users.password,
        token.id = users.id
      }
      console.log(" token=", token, "users=", users);
      return token;
    },
   
    async session({session, token}) {
      session.user.email = token.email,
      session.user.password = token.password
      session.user.id = token.id

      console.log("session=", session);
      return session;
    },
    secret: process.env.NEXTAUTH_SECRET,
  },


  pages: {
    error: "/dashbaord/login",
  },
});

export { handler as GET, handler as POST };

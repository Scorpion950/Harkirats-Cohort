import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Email and Password",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "yash@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const username = credentials?.username;
        const password = credentials?.password;

        console.log(username, password);

            //db request if username and pass is correct
        const user = {
          name: "yash",
          id: "1",
          username: "yash@gmail.com"
        };
        if(user){
        return user;
        }else{
            return null;
        }
      }
    }),
    GoogleProvider({
    clientId: "asd",
    clientSecret: "Asd"
  }),


  ],
  secret: process.env.NEXTAUTH_SECRET,
});


export { handler as GET, handler as POST };
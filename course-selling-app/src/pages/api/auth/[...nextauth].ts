import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import {Provider} from "next-auth/providers"
import CredentialsProvider from "next-auth/providers/credentials";
import { ensureDbConnected } from "@/lib/dbConnect";
import { User, Admin, Course } from "@/lib/db";
// import { useRecoilState } from "recoil";
// import { userTypeAtom } from "@/atom/userTypeAtom";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "Username" },
          password: { label: "Password", type: "password" },
          role: { label: "Role", type: "text", placeholder: "User or Admin" },
        },
        async authorize(credentials, req) {
            await ensureDbConnected();
            // Add logic here to look up the user from the credentials supplied
            // console.log("credentials: ", credentials)
            // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
            
            if (!credentials) {
                return null;
            }
            const username = credentials.username;
            const password = credentials.password;
            const role = credentials.role;

            if (role == 'User' || role == 'user'){
              const userDetails = await User.findOne({username});
              if (!userDetails){
                const newUser = {username, password};
                const userObj = new User(newUser);
                let userDb = await userObj.save();
                // console.log("adminDb: ", adminDb);
                return {
                    id: userDb._id,
                    email: userDb.username,
                    role: role
                }
              } else {
                  if (userDetails.password !== password) {
                    return null
                }
                // User is authenticated
                return {
                    id: userDetails._id,
                    email: userDetails.username,
                    role: role
                }     
              }
            }

            if (role == 'Admin' || role == 'admin'){
              const adminDetails = await Admin.findOne({username});
              if (!adminDetails){
                const newAdmin = {username, password};
                const userObj = new Admin(newAdmin);
                let adminDb = await userObj.save();
                // console.log("adminDb: ", adminDb);
                return {
                    id: adminDb._id,
                    email: adminDb.username,
                    role: role
                }
              } else {
                  if (adminDetails.password !== password) {
                    return null
                }
                // User is authenticated
                return {
                    id: adminDetails._id,
                    email: adminDetails.username,
                    role: role
                }     
              }
            } else{
              return null;
            }
        }
      })
    // ...add more providers here
  ] as Provider[],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
      encryption: true
  },
}

export default NextAuth(authOptions)
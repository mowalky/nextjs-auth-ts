import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { comparePassword } from "../../../lib/auth";

export default NextAuth({
  secret: "sdfasdfasfa",
  jwt: {
    secret: "sdfasdfasfa",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials?.email == "test@test.com") {
          return {
            ...credentials,
          };
        }

        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

        // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // Return null if user data could not be retrieved
        console.log(credentials);
        return null;
      },
    }),
  ],
});

// export default NextAuth({
//   session: {
//     jwt: true,
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const client = await connectToDatabase();

//         const usersCollection = client.db().collection("users");
//         const user = await usersCollection.findOne({
//           email: credentials.email,
//         });

//         if (!user) {
//           client.close();
//           throw new Error("No user found!");
//         }

//         const isValid = await comparePassword(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) {
//           client.close();
//           throw new Error("Invalid password!");
//         }

//         client.close();

//         return { email: user.email };
//       },
//     }),
//   ],
// });

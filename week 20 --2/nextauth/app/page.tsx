// "use client";

import {getServerSession} from "next-auth";

// import { SessionProvider, useSession } from "next-auth/react";
// import{ signIn, signOut } from "next-auth/react";

//second method to do thios sign in function - 

export default async function Home(){
  const session = await getServerSession();


  return (
    <div>
    {JSON.stringify(session)}
    </div>
  );
}

// export default function Home() {
//   return (
//     <div>
//       <SessionProvider>
//         <RealHome />
//       </SessionProvider>
//     </div>
//   );
// }

 /* function RealHome() {
  const session = useSession();

  return (
    <div>

      {session.status === "authenticated" && <button onClick={() =>signOut()}>Logout</button>}

      {session.status === "unauthenticated" && <button onClick={() =>signIn()}>Signin</button>}

    </div>
  );
} */
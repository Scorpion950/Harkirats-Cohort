"use client";

import { SessionProvider, useSession } from "next-auth/react";
import{ signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <SessionProvider>
        <RealHome />
      </SessionProvider>
    </div>
  );
}

function RealHome() {
  const session = useSession();

  return (
    <div>
      
      {session.status === "authenticated" && <button onClick={() =>signOut()}>Logout</button>}

      {session.status === "unauthenticated" && <button onClick={() =>signIn()}>Signin</button>}

    </div>
  );
}
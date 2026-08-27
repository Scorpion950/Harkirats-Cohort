import Link from "next/link";

export default function Home() {
  return (
    <div className = "text-lg w-screen h-screen flex items-center justify-center">
      Todo Application
      <br></br>
      <Link className = "text-md border m-2" href = "/signin">Sign in to TODO App</Link>
      <br></br>
      <Link className = "text-md border m-2" href = "/signup">Sign up to TODO App</Link>
    </div>
  );
}

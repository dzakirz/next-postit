import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Signin from "@/components/Navbar/Signin";
import Signout from "@/components/Navbar/Signout";

export default async function Navbar(){
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <nav className="flex items-center justify-between py-8">
      <Link href="/">
        <h1 className="text-xl font-bold">Post it.</h1>
      </Link>
      <ul className="flex justify-center gap-7">
        {!session?.user ? <Signin /> : <Signout image={session.user.image} />}
      </ul>
    </nav>
  );
}

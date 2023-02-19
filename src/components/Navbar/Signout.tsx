"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Signout({ image }: { image: any }) {
  const handleClick = () => {
    signOut();
  };

  return (
    <li className="flex items-center gap-8">
      <button
        className="px-6 py-2 text-sm text-white bg-gray-700 rounded-lg"
        onClick={handleClick}
      >
        Sign Out
      </button>
      <Link href="/dashboard">
        <Image
          className="rounded-full w-14"
          width={64}
          height={64}
          src={image}
          alt="profile-image"
          priority
        />
      </Link>
    </li>
  );
}

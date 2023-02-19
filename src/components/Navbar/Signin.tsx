"use client";
import { signIn } from "next-auth/react";

export default function Signin() {
  const handleCLick = () => {
    signIn("google");
  };

  return (
    <li className="list-none">
      <button
        className="px-6 py-2 text-sm text-white bg-gray-700 rounded-xl disabled:opacity-25"
        onClick={handleCLick}
      >
        Sign In
      </button>
    </li>
  );
}

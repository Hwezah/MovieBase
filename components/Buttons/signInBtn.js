"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
export default function SignInBtn() {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="text-black bg-white  hover:bg-blue-800 hover:text-white px-4 py-2 rounded cursor-pointer"
    >
      Sign In
    </Button>
  );
}

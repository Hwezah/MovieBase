"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
export default function SignOutBtn() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
    >
      Sign Out
    </Button>
  );
}

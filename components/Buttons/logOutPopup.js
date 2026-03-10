"use client";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LogOutPopup({ trigger }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger ? trigger : <Button variant="outline">Logout</Button>}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverTitle className="mb-2">Sure you want to logout?</PopoverTitle>
        <PopoverDescription>
          <Button
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}

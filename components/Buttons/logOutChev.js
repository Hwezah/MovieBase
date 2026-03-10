"use client";
import { ChevronDown } from "lucide-react";
import LogOutPopup from "@/components/Buttons/logOutPopup";

export default function LogoutChev() {
  return (
    <LogOutPopup
      trigger={
        <ChevronDown
          className="text-white animate-bounce cursor-pointer"
          size={24}
        />
      }
    />
  );
}

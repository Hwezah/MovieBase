import LoginButton from "@/components/Buttons/loginBtn";
import { auth } from "@/lib/auth";
import { CircleUserRound } from "lucide-react";
import LogoutChev from "@/components/Buttons/logOutChev";
export default async function SettingsPage() {
  const { user } = (await auth()) || {};
  const { email, name, image } = user || {};

  return (
    <div className="flex flex-col items-center  md:items-start  max-w-7xl mx-auto px-2 lg:px-4">
      <h1 className="text-white text-center  md:text-left font-bold text-2xl mt-8">
        Settings
      </h1>
      <div className="flex md:gap-4  p-6">
        {/* Left side: Settings & user info */}
        <div className="space-y-2">
          {user ? (
            <div className="flex items-center space-x-2 gap-4">
              <div className="flex items-center space-x-4">
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <CircleUserRound
                    className="text-gray-400 cursor-pointer"
                    size={48}
                    strokeWidth={1}
                  />
                )}
                <div>
                  <p className="text-white font-semibold">
                    Hi, {name.split(" ")[0]}
                  </p>
                  <p className="text-gray-400 text-sm">{email}</p>
                </div>
              </div>
              <LogoutChev />
            </div>
          ) : (
            <div className="flex items-center space-x-2 gap-4">
              <p className="text-gray-300">You are not logged in...</p>
              <LoginButton />
            </div>
          )}
        </div>

        {/* Right side: ChevronDown */}
      </div>
    </div>
  );
}

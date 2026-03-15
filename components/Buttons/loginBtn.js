export const dynamic = "force-dynamic"
import { auth } from "@/lib/auth";
import SignInBtn from "./signInBtn";
import SignOutBtn from "./signOutBtn";
export default async function LoginButton() {
  const { user } = (await auth()) || {}; // guard against null
  if (user) {
    console.log(user)
    return (
      <>
        Signed in as {user.email} <br />
        <SignOutBtn />
      </>
    );
  }
  return (
    <>
      <SignInBtn />
    </>
  );
}

import SignInForm from "@/components/forms/sign-in-form";
import Logo from "@/components/atoms/logo";
import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerAuthSession();
  if (session) redirect("/home");
  return (
    <main className="flex h-screen grow items-center justify-center">
      <div className="m-4 flex max-w-md flex-1 flex-col items-center gap-6">
        <Logo />
        <h1 className="text-2xl font-semibold">Sign in to your account</h1>
        <SignInForm />
      </div>
    </main>
  );
}

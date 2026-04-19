import Link from "next/link";
import { UserPlus } from "lucide-react";
import RegisterForm from "./ui";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:py-24">
      <div className="glass rounded-3xl p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--violet-muted)] text-[var(--violet)]">
            <UserPlus className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">Create account</h1>
            <p className="text-sm text-[var(--muted)]">
              Create your account with email and a strong password.
            </p>
          </div>
        </div>
        <RegisterForm />
        <p className="mt-8 text-center text-sm text-[var(--muted)]">
          Already registered?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

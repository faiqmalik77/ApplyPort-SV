import Link from "next/link";
import { LogIn } from "lucide-react";
import LoginForm from "./ui";

export const metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:py-24">
      <div className="glass rounded-3xl p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--accent)]">
            <LogIn className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-[var(--muted)]">
              Log in to access your dashboard and applications.
            </p>
          </div>
        </div>
        <LoginForm />
        <p className="mt-8 text-center text-sm text-[var(--muted)]">
          No account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

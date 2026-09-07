"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="rounded-md bg-black px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
      >
        Continue with Google
      </button>
    </main>
  );
}
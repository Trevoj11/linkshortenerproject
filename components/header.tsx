import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Link2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="relative z-10 w-full border-b border-zinc-800/80 bg-[#09090b]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-indigo-500 text-white">
            <Link2 className="size-4" />
          </span>
          LinkShortener
        </Link>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" size="lg">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="lg">
                Sign Up
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  );
}
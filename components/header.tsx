import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-zinc-900 dark:text-white">
          Link Shortener
        </div>
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
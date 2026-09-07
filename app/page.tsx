import { Show, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
          Welcome to LinkShortener
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl">
          Create short, memorable links and track their performance with our
          powerful link shortening service.
        </p>
        <Show when="signed-out">
          <SignUpButton mode="modal">
            <button className="px-8 py-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors">
              Get Started
            </button>
          </SignUpButton>
        </Show>
      </main>
    </div>
  );
}

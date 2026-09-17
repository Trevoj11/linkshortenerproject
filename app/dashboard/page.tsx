import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { CreateLinkDialog } from "@/components/create-link/create-link-dialog";
import { getLinksForUser } from "@/data/links";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userLinks = await getLinksForUser(userId);

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-400">Your workspace</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Your links
          </h1>
          <p className="mt-2 text-zinc-400">
            Manage the short links you have created.
          </p>
        </div>
        <CreateLinkDialog />
      </div>

        {userLinks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-12 text-center">
            <h2 className="text-lg font-medium text-white">No links yet</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Your created links will appear here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-800 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
            {userLinks.map((link) => (
              <li
                key={link.id}
                className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-indigo-300">
                    /{link.shortCode}
                  </p>
                  <p className="mt-1 truncate text-sm text-zinc-400">
                    {link.originalUrl}
                  </p>
                </div>
                <time
                  dateTime={link.createdAt.toISOString()}
                  className="shrink-0 text-sm text-zinc-500"
                >
                  {link.createdAt.toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
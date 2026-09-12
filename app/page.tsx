import { Show, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  BarChart3,
  Check,
  Copy,
  Link2,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#09090b] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.28),transparent_42%)]" />
      <main className="relative mx-auto w-full max-w-7xl px-6">
        <section className="mx-auto flex max-w-4xl flex-col items-center py-24 text-center sm:py-32">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-400/10 px-3 py-1.5 text-sm text-indigo-200">
            <Sparkles className="size-4" />
            <span>Simple links. Better reach.</span>
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-balance sm:text-7xl">
            Share less link.
            <span className="block text-indigo-400">Reach more people.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
            Turn long, messy URLs into short links that are easy to remember,
            share, and measure. LinkShortener gives every click a purpose.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-6 text-sm font-medium text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
                  Start shortening for free
                  <ArrowRight className="size-4" />
                </button>
              </SignUpButton>
            </Show>
            <a
              href="#features"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-700 px-6 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              Explore features
            </a>
          </div>
          <div className="mt-16 flex items-center gap-3 text-sm text-zinc-500">
            <div className="flex -space-x-2">
              {["bg-indigo-400", "bg-emerald-400", "bg-amber-400"].map(
                (color) => (
                  <span
                    key={color}
                    className={`size-7 rounded-full border-2 border-[#09090b] ${color}`}
                  />
                ),
              )}
            </div>
            <span>Built for creators, teams, and growing brands</span>
          </div>
        </section>

        <section
          id="features"
          className="border-t border-zinc-800/80 py-20 sm:py-28"
        >
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">
              Everything you need
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Your links, working smarter.
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-400">
              A focused toolkit for creating links that look great and give you
              the insight to make your next move.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Link2,
                title: "Short, memorable URLs",
                description:
                  "Make every link easier to read, share, and trust across any channel.",
              },
              {
                icon: BarChart3,
                title: "See what performs",
                description:
                  "Understand your audience with clear click insights and performance trends.",
              },
              {
                icon: ShieldCheck,
                title: "Reliable by design",
                description:
                  "Keep your destination links organized and your campaigns moving with confidence.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7 transition-colors hover:border-indigo-400/40"
              >
                <div className="mb-12 flex size-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid items-center gap-12 border-t border-zinc-800/80 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">
              Made for momentum
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              From long URL to live campaign in seconds.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Spend less time managing links and more time doing the work that
              matters. LinkShortener keeps the process quick and intuitive.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-zinc-300">
              {[
                "Create links without the clutter",
                "Share confidently anywhere",
                "Learn from every click",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex size-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                    <Check className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl shadow-indigo-950/30 sm:p-6">
            <div className="rounded-xl border border-zinc-800 bg-[#09090b] p-5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <Zap className="size-4 text-amber-400" />
                  Quick create
                </div>
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-400">
                  Live
                </span>
              </div>
              <div className="mt-6 space-y-3">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-500">
                  https://yourwebsite.com/your-very-long-campaign-url
                </div>
                <div className="flex items-center justify-between rounded-lg border border-indigo-400/30 bg-indigo-500/10 px-4 py-3">
                  <span className="text-sm text-indigo-200">
                    linkshortener.app/go/launch
                  </span>
                  <Copy className="size-4 text-indigo-300" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-zinc-900 p-4">
                  <MousePointerClick className="size-4 text-indigo-300" />
                  <p className="mt-3 text-2xl font-semibold">1,284</p>
                  <p className="mt-1 text-xs text-zinc-500">Total clicks</p>
                </div>
                <div className="rounded-lg bg-zinc-900 p-4">
                  <BarChart3 className="size-4 text-emerald-300" />
                  <p className="mt-3 text-2xl font-semibold">+24.8%</p>
                  <p className="mt-1 text-xs text-zinc-500">This month</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 rounded-3xl border border-indigo-400/20 bg-indigo-500/10 px-6 py-16 text-center sm:mb-28 sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to make your links work harder?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Join LinkShortener and turn your next long URL into a link worth
            clicking.
          </p>
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200">
                Create your first link
                <ArrowRight className="size-4" />
              </button>
            </SignUpButton>
          </Show>
        </section>
      </main>
    </div>
  );
}

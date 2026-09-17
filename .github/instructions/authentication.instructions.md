---
description: Read this before implementing or modifying authentication in the project.
---

# Authentication Guide

This project uses **Clerk** for all authentication. NO OTHER AUTH METHODS should be used.

## Core Rules

1. **Clerk Only**: All authentication must go through Clerk. No custom auth, JWT implementations, or third-party providers.
2. **Protected Routes**: Use middleware to protect routes that require authentication.
3. **Modal Sign-In/Sign-Up**: Auth UI launches as modals, not full pages.
4. **Homepage Redirect**: Logged-in users accessing `/` are redirected to `/dashboard`.

## Setup

Clerk is configured in this project with:
- Environment variables in `.env.local` (keys: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)
- ClerkProvider wrapped around the Next.js app in `app/layout.tsx`
- Middleware protecting routes in `middleware.ts`

## Protected Routes

### Dashboard Route (`/dashboard`)

The `/dashboard` route is protected and requires authentication. Users must be logged in to access it.

**Implementation Pattern:**

```typescript
// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  // Middleware will handle redirect, but you can also check here
  if (!userId) {
    return <div>Not authorized</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Protected content */}
    </div>
  );
}
```

**Or use client-side protection:**

```typescript
// app/dashboard/page.tsx (Client Component)
"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [userId, isLoaded, router]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Protected content */}
    </div>
  );
}
```

## Middleware Configuration

Protect routes via `middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

## Homepage Redirect

Logged-in users accessing the homepage (`/`) should be redirected to `/dashboard`.

**Implementation:**

```typescript
// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();

  // Redirect logged-in users to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Welcome</h1>
      <p>Sign in to get started</p>
      {/* Public homepage content */}
    </div>
  );
}
```

## Modal Sign-In & Sign-Up

Sign-in and sign-up should launch as modals, not full pages. Use Clerk's `<SignIn />` and `<SignUp />` components with the `routing="virtual"` prop.

### Sign-In Modal Route

```typescript
// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn routing="virtual" />
    </div>
  );
}
```

### Sign-Up Modal Route

```typescript
// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp routing="virtual" />
    </div>
  );
}
```

### Triggering Modal from Components

Use the `useSignIn()` and `useSignUp()` hooks in Client Components:

```typescript
// components/auth-button.tsx
"use client";

import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  const { startFlow: startSignIn } = useSignIn();
  const { startFlow: startSignUp } = useSignUp();

  return (
    <div className="flex gap-2">
      <Button onClick={() => startSignIn({ redirectUrl: "/dashboard" })}>
        Sign In
      </Button>
      <Button onClick={() => startSignUp({ redirectUrl: "/dashboard" })}>
        Sign Up
      </Button>
    </div>
  );
}
```

## Common Hooks

- **`useAuth()`**: Get `userId`, `sessionId`, `isLoaded`
- **`useUser()`**: Get full user object and user data methods
- **`useSignIn()`**: Trigger sign-in flow
- **`useSignUp()`**: Trigger sign-up flow
- **`useClerk()`**: Access Clerk client methods (sign out, etc.)

## User Logout

```typescript
// components/sign-out-button.tsx
"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const { signOut } = useClerk();

  return (
    <Button onClick={() => signOut({ redirectUrl: "/" })}>
      Sign Out
    </Button>
  );
}
```

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-publishable-key>
CLERK_SECRET_KEY=<your-secret-key>
```

These must match your Clerk instance configuration.

## Best Practices

1. **Always use Clerk primitives**: Use Clerk's `<SignIn />`, `<SignUp />`, and hooks—don't build custom auth.
2. **Protect server functions**: Check `userId` from `auth()` before executing Server Actions.
3. **Never expose secrets**: The `CLERK_SECRET_KEY` is server-only; never use it in client code.
4. **Check `isLoaded`**: In client components, always wait for `isLoaded` before making auth decisions.
5. **Use middleware first**: Let middleware protect routes; only add client-side checks as a fallback.
6. **Consistent redirects**: After sign-in/sign-up, redirect to `/dashboard`, not random routes.

## Testing Auth Flows

Use Clerk's test credentials in development:

- **Email**: `test@example.com`
- **Password**: Any value (test mode allows any password)

See [Clerk Testing Guide](../clerk-testing/SKILL.md) for E2E test patterns.

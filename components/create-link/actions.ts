"use server";

import { auth } from "@clerk/nextjs/server";
import { randomBytes } from "node:crypto";
import { z } from "zod";

import { createLink } from "@/data/links";

const createLinkSchema = z.object({
	originalUrl: z.string().trim().url("Enter a valid URL, including https://"),
});

type CreateLinkResult =
	| { success: true }
	| { error: string };

export async function createLinkAction(
	input: unknown,
): Promise<CreateLinkResult> {
	const { userId } = await auth();

	if (!userId) {
		return { error: "You must be signed in to create a link." };
	}

	const parsedInput = createLinkSchema.safeParse(input);

	if (!parsedInput.success) {
		return { error: parsedInput.error.issues[0]?.message ?? "Invalid URL." };
	}

	try {
		await createLink({
			originalUrl: parsedInput.data.originalUrl,
			shortCode: randomBytes(5).toString("base64url"),
			userId,
		});

		return { success: true };
	} catch {
		return { error: "We couldn't create that link. Please try again." };
	}
}
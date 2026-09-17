"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { deleteLinkForUser, updateLinkForUser } from "@/data/links";

const linkIdSchema = z.number().int().positive();
const updateLinkSchema = z.object({
	id: linkIdSchema,
	originalUrl: z.string().trim().url("Enter a valid URL, including https://"),
});

type LinkActionResult =
	| { success: true }
	| { error: string };

export async function updateLinkAction(input: unknown): Promise<LinkActionResult> {
	const { userId } = await auth();

	if (!userId) {
		return { error: "You must be signed in to edit a link." };
	}

	const parsedInput = updateLinkSchema.safeParse(input);

	if (!parsedInput.success) {
		return { error: parsedInput.error.issues[0]?.message ?? "Invalid link." };
	}

	try {
		const link = await updateLinkForUser({ ...parsedInput.data, userId });

		return link ? { success: true } : { error: "Link not found." };
	} catch {
		return { error: "We couldn't update that link. Please try again." };
	}
}

export async function deleteLinkAction(input: unknown): Promise<LinkActionResult> {
	const { userId } = await auth();

	if (!userId) {
		return { error: "You must be signed in to delete a link." };
	}

	const parsedInput = linkIdSchema.safeParse(input);

	if (!parsedInput.success) {
		return { error: "Invalid link." };
	}

	try {
		const link = await deleteLinkForUser({ id: parsedInput.data, userId });

		return link ? { success: true } : { error: "Link not found." };
	} catch {
		return { error: "We couldn't delete that link. Please try again." };
	}
}
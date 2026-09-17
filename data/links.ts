import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { links } from "@/db/schema";

export async function createLink({
	originalUrl,
	shortCode,
	userId,
}: {
	originalUrl: string;
	shortCode: string;
	userId: string;
}) {
	const [link] = await db
		.insert(links)
		.values({ originalUrl, shortCode, userId })
		.returning();

	return link;
}

export async function updateLinkForUser({
	id,
	originalUrl,
	userId,
}: {
	id: number;
	originalUrl: string;
	userId: string;
}) {
	const [link] = await db
		.update(links)
		.set({ originalUrl, updatedAt: new Date() })
		.where(and(eq(links.id, id), eq(links.userId, userId)))
		.returning();

	return link;
}

export async function deleteLinkForUser({
	id,
	userId,
}: {
	id: number;
	userId: string;
}) {
	const [link] = await db
		.delete(links)
		.where(and(eq(links.id, id), eq(links.userId, userId)))
		.returning({ id: links.id });

	return link;
}

export async function getLinksForUser(userId: string) {
	return db
		.select()
		.from(links)
		.where(eq(links.userId, userId))
		.orderBy(desc(links.updatedAt));
}

export async function getLinkByShortCode(shortCode: string) {
	const [link] = await db
		.select()
		.from(links)
		.where(eq(links.shortCode, shortCode))
		.limit(1);

	return link;
}
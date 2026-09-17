import { desc, eq } from "drizzle-orm";

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

export async function getLinksForUser(userId: string) {
	return db
		.select()
		.from(links)
		.where(eq(links.userId, userId))
		.orderBy(desc(links.updatedAt));
}
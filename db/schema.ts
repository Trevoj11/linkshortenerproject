import {
	index,
	integer,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const links = pgTable(
	"links",
	{
		id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
		userId: varchar("user_id", { length: 255 }).notNull(),
		shortCode: varchar("short_code", { length: 32 }).notNull().unique(),
		originalUrl: text("original_url").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [index("links_user_id_idx").on(table.userId)],
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;

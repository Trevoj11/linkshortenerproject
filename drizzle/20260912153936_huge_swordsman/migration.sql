CREATE TABLE "links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" varchar(255) NOT NULL,
	"short_code" varchar(32) NOT NULL UNIQUE,
	"original_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "links_user_id_idx" ON "links" ("user_id");
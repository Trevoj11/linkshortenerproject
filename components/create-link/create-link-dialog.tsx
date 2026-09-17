"use client";

import { Plus } from "lucide-react";
import { type FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { createLinkAction } from "./actions";

export function CreateLinkDialog() {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const originalUrl = formData.get("originalUrl");

		setError(null);
		startTransition(async () => {
			const result = await createLinkAction({ originalUrl });

			if ("error" in result) {
				setError(result.error);
				return;
			}

			form.reset();
			setOpen(false);
			router.refresh();
		});
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(nextOpen) => {
				setOpen(nextOpen);
				if (nextOpen) setError(null);
			}}
		>
			<DialogTrigger render={<Button><Plus /> Create link</Button>} />
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a short link</DialogTitle>
					<DialogDescription>
						Paste a long URL and we&apos;ll generate a short link for you.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="grid gap-4">
					<div className="grid gap-2">
						<label htmlFor="originalUrl" className="text-sm font-medium">
							Destination URL
						</label>
						<Input
							id="originalUrl"
							name="originalUrl"
							type="url"
							placeholder="https://example.com/article"
							required
							autoFocus
							aria-invalid={Boolean(error)}
						/>
						{error && <p className="text-sm text-red-400">{error}</p>}
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Creating..." : "Create link"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
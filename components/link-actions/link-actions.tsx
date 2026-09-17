"use client";

import { Pencil, Trash2 } from "lucide-react";
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

import { deleteLinkAction, updateLinkAction } from "./actions";

type LinkActionsProps = {
	id: number;
	originalUrl: string;
};

export function LinkActions({ id, originalUrl }: LinkActionsProps) {
	const router = useRouter();
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [editUrl, setEditUrl] = useState(originalUrl);
	const [isPending, startTransition] = useTransition();

	function handleEdit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const nextUrl = formData.get("originalUrl");

		setError(null);
		startTransition(async () => {
			const result = await updateLinkAction({ id, originalUrl: nextUrl });

			if ("error" in result) {
				setError(result.error);
				return;
			}

			setEditOpen(false);
			router.refresh();
		});
	}

	function handleDelete() {
		setError(null);
		startTransition(async () => {
			const result = await deleteLinkAction(id);

			if ("error" in result) {
				setError(result.error);
				return;
			}

			setDeleteOpen(false);
			router.refresh();
		});
	}

	return (
		<div className="flex shrink-0 items-center gap-1">
			<Dialog
				open={editOpen}
				onOpenChange={(open) => {
					setEditOpen(open);
					if (open) {
						setEditUrl(originalUrl);
						setError(null);
					}
				}}
			>
				<DialogTrigger
					render={
						<Button variant="ghost" size="icon" aria-label="Edit link" title="Edit link">
							<Pencil />
						</Button>
					}
				/>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit link</DialogTitle>
						<DialogDescription>
							Update the destination URL for this short link.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleEdit} className="grid gap-4">
						<div className="grid gap-2">
							<label htmlFor={`edit-url-${id}`} className="text-sm font-medium">
								Destination URL
							</label>
							<Input
								id={`edit-url-${id}`}
								name="originalUrl"
								type="url"
								value={editUrl}
								onChange={(event) => setEditUrl(event.target.value)}
								required
								aria-invalid={Boolean(error)}
							/>
							{error && <p className="text-sm text-red-400">{error}</p>}
						</div>
						<DialogFooter>
							<Button type="submit" disabled={isPending}>
								{isPending ? "Saving..." : "Save changes"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<Dialog
				open={deleteOpen}
				onOpenChange={(open) => {
					setDeleteOpen(open);
					if (open) setError(null);
				}}
			>
				<DialogTrigger
					render={
						<Button variant="ghost" size="icon" aria-label="Delete link" title="Delete link">
							<Trash2 />
						</Button>
					}
				/>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete link?</DialogTitle>
						<DialogDescription>
							This will permanently remove this short link. This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					{error && <p className="text-sm text-red-400">{error}</p>}
					<DialogFooter>
						<Button variant="outline" onClick={() => setDeleteOpen(false)} disabled={isPending}>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleDelete} disabled={isPending}>
							{isPending ? "Deleting..." : "Delete link"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
import { getLinkByShortCode } from "@/data/links";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ shortcode: string }> },
) {
	const { shortcode } = await params;
	const link = await getLinkByShortCode(shortcode);

	if (!link) {
		return new Response("Link not found", { status: 404 });
	}

	return Response.redirect(link.originalUrl);
}
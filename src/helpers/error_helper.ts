export function getErrorMessage(error: unknown): string
{
	if (error === null || error === undefined)
		return "Unknown error";

	if (error instanceof Error)
		return error.message;

	if (typeof error === `object` && `message` in error && typeof error.message === "string")
		return error.message;

	return error.toString();
}
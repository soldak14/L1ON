export function getProjectPath(id: number)
{
	return PagePath.PROJECT.replace(":id", id.toString());
}
export function getInvoicesPath(project_id: number)
{
	return PagePath.INVOICES.replace(":project_id", project_id.toString());
}
export function getInvoicePath(project_id: number, invoice_id: number)
{
	return PagePath.INVOICE
		.replace(":project_id", project_id.toString())
		.replace(":invoice_id", invoice_id.toString());
}

export enum PagePath
{
	LANDING = "/",
	PROJECT = "/project/:id",
	INVOICES = "/project/:project_id/invoices",
	INVOICE = "/project/:project_id/invoices/:invoice_id",
}
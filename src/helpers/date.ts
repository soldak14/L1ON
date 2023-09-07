export function formatTimeAgo(time: number): string
{
	const seconds = Math.floor((time) / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0)
		return `${days}d ago`;
	else if (hours > 0)
		return `${hours}h ago`;
	else
		return `${minutes}m ago`;
}

export function formatTimeLeft(startTime: number): string
{
	const timeNow = Date.now();
	const seconds = Math.floor((startTime - timeNow) / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0)
		return `${days}d ${hours - days * 24}h ${minutes - hours * 60}m ${seconds - minutes * 60}s`;
	else if (hours > 0)
		return `${hours}h ${minutes - hours * 60}m ${seconds - minutes * 60}s`;
	else if (minutes > 0)
		return `${minutes}m ${seconds - minutes * 60}s`;
	else
		return `${seconds}s`;
	
}

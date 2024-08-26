export function epochToDatetime(epoch: number) {
  const now = new Date();
  const then = new Date(epoch * 1000);
  const diff = now.getTime() - then.getTime();

  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffDays > 1) {
    return then.toLocaleString();
  } else if (diffDays === 1) {
    return "1 day ago";
  } else if (diffHours > 0) {
    return `${diffHours} hours ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`;
  } else if (diffSeconds > 0) {
    return `${diffSeconds} seconds ago`;
  } else {
    return "Just now";
  }
}

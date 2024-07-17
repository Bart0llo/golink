export function epochToDatetime(epoch: number) {
  const now = new Date();
  const then = new Date(epoch * 1000);
  const diff = now.getTime() - then.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  if (diffDays > 1) {
    return then.toLocaleString();
  } else if (diffDays === 1) {
    return "1 day ago";
  } else if (diffHours > 0) {
    return `${diffHours} hours ago`;
  } else {
    const diffMinutes = Math.floor((diff / 1000 / 60) % 60);
    return `${diffMinutes} minutes ago`;
  }
}

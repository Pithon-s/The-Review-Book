export default timeSince = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;
  if (interval > 1)
    return Math.floor(interval) > 1
      ? Math.floor(interval) + " years ago"
      : Math.floor(interval) + " year ago";

  interval = seconds / 2592000;
  if (interval > 1)
    return Math.floor(interval) > 1
      ? Math.floor(interval) + " months ago"
      : Math.floor(interval) + " month ago";

  interval = seconds / 86400;
  if (interval > 1)
    return Math.floor(interval) > 1
      ? Math.floor(interval) + " days ago"
      : Math.floor(interval) + " day ago";

  interval = seconds / 3600;
  if (interval > 1)
    return Math.floor(interval) > 1
      ? Math.floor(interval) + "hours ago"
      : Math.floor(interval) + "hour ago";

  interval = seconds / 60;
  if (interval > 1)
    return Math.floor(interval) > 1
      ? Math.floor(interval) + " minutes ago"
      : Math.floor(interval) + " minute ago";

  return Math.floor(seconds) > 1
    ? Math.floor(seconds) + " seconds ago"
    : Math.floor(seconds) + " second ago";
};

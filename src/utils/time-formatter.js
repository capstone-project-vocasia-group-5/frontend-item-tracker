function formatDateTimeComment(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds >= 31536000) {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} tahun `;
  }

  if (diffInSeconds >= 2592000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} bulan `;
  }

  if (diffInSeconds >= 604800) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} minggu `;
  }

  if (diffInSeconds >= 86400) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} hari `;
  }

  if (diffInSeconds >= 3600) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} jam `;
  }

  if (diffInSeconds >= 60) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} menit `;
  }

  return `${diffInSeconds} detik `;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString("id-ID", options);
}

function formatTime(dateString) {
  const date = new Date(dateString);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    timeZoneName: "short",
  };
  return date.toLocaleString("id-ID", options);
}

export { formatDateTimeComment, formatDate, formatTime };

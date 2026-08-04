const dateFormatter = new Intl.DateTimeFormat("fr-CH", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

const monthFormatter = new Intl.DateTimeFormat("fr-CH", {
  month: "long",
  year: "numeric"
});

export function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T12:00:00`));
}

export function formatDateRange(startDate: string, endDate?: string) {
  if (!endDate || endDate === startDate) return formatDate(startDate);
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export function formatMonth(date: string) {
  return monthFormatter.format(new Date(`${date}T12:00:00`));
}

export function isPastDate(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${date}T23:59:59`) < today;
}

export function compareIsoDates(a: string, b: string) {
  return a.localeCompare(b);
}

export function getTimeUntilDueDate(startDate, dueDate) {
  const start = new Date(startDate);

  // Estime la date d'accouchement à 280 jours si dueDate absente
  const estimatedDueDate = dueDate ? new Date(dueDate) : new Date(start.getTime() + 280 * 24 * 60 * 60 * 1000);

  const now = new Date();
  const diffMs = estimatedDueDate - now;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (totalDays < 0) {
    return { months: 0, weeks: 0, days: 0 };
  }

  const months = Math.floor(totalDays / 30);
  const remainingDays = totalDays % 30;
  const weeks = Math.floor(remainingDays / 7);
  const days = remainingDays % 7;

  return { months, weeks, days };
}

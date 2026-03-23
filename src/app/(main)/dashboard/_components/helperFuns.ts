export function getNextDueDate(dueDay: number): Date {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  // Try the current month
  let dueDate = new Date(year, month, dueDay);
  if (dueDate < today) {
    // Move to next month
    if (month === 11) {
      year++;
      month = 0;
    } else {
      month++;
    }
    dueDate = new Date(year, month, dueDay);
  }

  // Handle invalid dates (e.g., 31st in a 30‑day month)
  if (dueDate.getMonth() !== month) {
    // Fall back to the last day of the target month
    dueDate = new Date(year, month + 1, 0);
  }
  return dueDate;
}

// Helper: days between two dates
export function daysUntil(dueDate: Date): number {
  const today = new Date();
  const diffMs = dueDate.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
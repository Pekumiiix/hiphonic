export function getProgressPercentage(startDate: Date, endDate: Date, currentDate: Date): number {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const current = currentDate.getTime();

  const totalDuration = end - start;

  if (totalDuration <= 0) {
    return current >= end ? 100 : 0;
  }

  const elapsedDuration = current - start;

  if (elapsedDuration <= 0) {
    return 0;
  }
  if (elapsedDuration >= totalDuration) {
    return 100;
  }

  return (elapsedDuration / totalDuration) * 100;
}

export function getDaysInMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);

  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  const current = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

export function getIsToday(date: Date) {
  return (
    date.getDate() === new Date().getDate() &&
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear()
  );
}

export function getIsDateInCurrentMonth(date: Date) {
  return (
    date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()
  );
}

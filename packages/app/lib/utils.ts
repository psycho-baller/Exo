export function formatDate(inputDate: Date): string {
  // Get month abbreviation and day
  const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const monthAndDay: string = inputDate.toLocaleString('default', dateOptions);

  // Get year if it's different from the current year
  const currentYear: number = new Date().getFullYear();
  const year: string = (inputDate.getFullYear() !== currentYear) ? `, ${inputDate.getFullYear()}` : '';

  // Concatenate the results
  const formattedDate: string = `${monthAndDay}${year}`;

  return formattedDate;
}


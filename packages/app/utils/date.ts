import { format, isSameDay, isTomorrow } from "date-fns";
export const formatDate = (date: Date) => {
  if (isSameDay(date, new Date())) {
    return 'Today'
  }
  if (isTomorrow(new Date(date))) {
    return 'Tomorrow'
  }
  return format(new Date(date), 'd MMM')

};

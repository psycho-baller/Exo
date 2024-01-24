import { RouterOutputs } from "@acme/api";
import { api } from "@acme/api/utils/trpc";

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

/**
 * 
 * @param friendId 
 * @returns All questions that have the given friendId
 * @description This function is used to get all questions that have the given friendId.
 */
export function getQuestionsFromFriendId(friendId: number): RouterOutputs['question']['all'] {
  // Get all questions
  const questions
   = api.question.all.useQuery().data ?? [];

  // Filter questions by friendId
  const filteredQuestions = questions.filter((question) => question.friendId === friendId);

  return filteredQuestions;
}

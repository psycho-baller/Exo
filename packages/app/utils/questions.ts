// Data is from: https://enlightio.com/deep-conversation-topics

import type { QuestionCategory, QuestionsJson } from '../types/question';
import QuestionsData from '../assets/questions.json'
/**
 * Returns a random question from a random category.
 * @param questionsData The questions JSON object.
 * @param fallback A fallback question if none are found.
 */
export function getRandomQuestion(questionsData: QuestionsJson = QuestionsData, fallback = 'What is something that never fails to bring you joy?'): string {
  const categories = Object.keys(questionsData) as QuestionCategory[];
  if (categories.length === 0) return fallback;
  const questionsCategory = categories[Math.floor(Math.random() * categories.length)];
  if (!questionsCategory) return fallback;
  const questionsList = questionsData[questionsCategory];
  if (!questionsList || questionsList.length === 0) return fallback;
  return questionsList[Math.floor(Math.random() * questionsList.length)] || fallback;
}

/**
 * Returns an array of distinct random questions.
 * @param questionsData The questions JSON object.
 * @param count How many questions to return.
 * @param fallback A fallback question to pad the list if there aren’t enough.
 */
export function getRandomQuestions(
  questionsData: QuestionsJson = QuestionsData,
  count = 3,
  fallback = 'What is something that never fails to bring you joy?'
): string[] {
  // 1. Flatten all category arrays into one list
  const allQuestions: string[] = Object.values(questionsData).flat()//.filter((q): q is string => typeof q === 'string');
  // 2. Deduplicate
  const uniqueQuestions = Array.from(new Set(allQuestions))

  // 3. If no questions at all, return [fallback, …]
  if (uniqueQuestions.length === 0) {
    return Array(count).fill(fallback)
  }

  // Fisher–Yates shuffle
  function shuffle<T>(array: T[]): T[] {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // @ts-ignore
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // 4. Shuffle and pick
  const shuffled = shuffle<string>(uniqueQuestions);
  const picked = shuffled.slice(0, count);

  // 5. Pad with fallback if needed
  return picked.length < count
    ? picked.concat(Array(count - picked.length).fill(fallback))
    : picked;
}
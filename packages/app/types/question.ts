export type QuestionCategory =
  | "Personal Growth and Self-Reflection"
  | "Philosophical Questions"
  | "Ethics and Morality"
  | "Family Dynamics"
  | "Friendship Bonds"
  | "Romantic Relationships"
  | "Dreams and Aspirations"
  | "Society and Culture"
  | "Work, Career, and Professional Development"
  | "Life Experiences and Milestones"
  | "Science and the Future"
  | "Art, Literature, and Creativity";

export type QuestionsJson = {
  [category in QuestionCategory]: string[];
};
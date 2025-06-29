import type { RouterOutputs } from '@rooots/api';
import * as Clipboard from 'expo-clipboard';
import * as Burnt from 'burnt';

export const exportQuestionsToMarkdown = async ({ people, questions }: {
  people: RouterOutputs['person']['all']
  questions: RouterOutputs['question']['all']
}) => {

  // Group questions by person and find unassigned questions
  const questionsByPerson = people?.map(person => ({
    ...person,
    questions: questions.filter(q => q.personId === person.id)
  })) || [];

  // Find questions that don't have an assigned person
  const unassignedQuestions = questions.filter(q => !q.personId);

  // Generate markdown content
  let markdownContent = '# Conversation Questions\n\n';

  // First, add questions with assigned people
  for (const person of questionsByPerson) {
    if (person.questions.length > 0) {
      markdownContent += `## ${person.firstName} ${person.lastName || ''}\n`;

      for (const question of person.questions) {
        markdownContent += `- ${question.question}\n`;

        if (question.note) {
          markdownContent += `  - Note: ${question.note}\n`;
        }

        // if (question.reminderDatetime) {
        //   markdownContent += `  - Reminder: ${new Date(question.reminderDatetime).toLocaleDateString()}\n`;
        // }
      }
      markdownContent += '\n';
    }
  }

  // Then, add unassigned questions if any exist
  if (unassignedQuestions.length > 0) {
    markdownContent += '## Unassigned Questions\n';

    for (const question of unassignedQuestions) {
      markdownContent += `- ${question.question}\n`;

      if (question.note) {
        markdownContent += `  - Note: ${question.note}\n`;
      }

      // if (question.reminderDatetime) {
      //   markdownContent += `  - Reminder: ${new Date(question.reminderDatetime).toLocaleDateString()}\n`;
      // }

    }
    markdownContent += '\n';
  }

  // copy to the clipboard
  const success = await Clipboard.setStringAsync(markdownContent);
  // on iOS add a toast
  if (success) {
    Burnt.toast({
      title: 'Questions exported to clipboard!',
      preset: 'custom',
      icon: {
        ios: { name: 'checkmark.circle.fill', color: 'green' },
      },
      duration: 3,
    });
  } else {
    Burnt.toast({
      title: 'Failed to export questions to clipboard!',
      preset: 'custom',
      icon: {
        ios: { name: 'xmark.circle.fill', color: 'red' },
      },
      duration: 3,
    });
  }
}
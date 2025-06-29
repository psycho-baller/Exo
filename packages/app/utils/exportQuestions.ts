import type { RouterOutputs } from '@rooots/api';
import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

export const exportQuestionsToMarkdown = async ({ people, questions }: {
  people: RouterOutputs['person']['all']
  questions: RouterOutputs['question']['all']
}) => {

  // Group questions by person
  const questionsByPerson = people?.map(person => ({
    ...person,
    questions: questions.filter(q => q.personId === person.id) || []
  })) || [];

  // Generate markdown content
  let markdownContent = '# Conversation Questions\n\n';

  for (const person of questionsByPerson) {
    if (person.questions && person.questions.length > 0) {
      markdownContent += `## ${person.firstName} ${person.lastName || ''}\n\n`;

      for (const question of person.questions) {
        markdownContent += `- ${question.question}\n`;

        if (question.note) {
          markdownContent += `  - Note: ${question.note}\n`;
        }

        if (question.reminderDatetime) {
          markdownContent += `  - Reminder: ${new Date(question.reminderDatetime).toLocaleDateString()}\n`;
        }

        markdownContent += '\n';
      }

      markdownContent += '\n';
    }
  }

  // Create a temporary file
  const fileUri = `${FileSystem.documentDirectory}conversation-questions-${new Date().toISOString().split('T')[0]}.md`;

  // Write the markdown content to the file
  await FileSystem.writeAsStringAsync(fileUri, markdownContent, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  // // Share the file
  // await Sharing.shareAsync(fileUri, {
  //   mimeType: 'text/markdown',
  //   dialogTitle: 'Export Conversation Questions',
  //   UTI: 'net.daringfireball.markdown',
  // });


}
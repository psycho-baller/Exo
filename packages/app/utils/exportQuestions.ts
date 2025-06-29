import type { RouterOutputs } from '@rooots/api';
import { File, Paths } from 'expo-file-system/next';
import * as Clipboard from 'expo-clipboard';
import { Platform } from 'react-native';
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
  // try {
  // Create a new file in the documents directory
  //   const fileName = `conversation-questions-${new Date().toISOString()}.md`;
  //   const file = new File(Paths.document, fileName);

  //   // Create and write to the file
  //   await file.create();
  //   await file.write(markdownContent);

  //   // Verify the file was written
  //   if (!file.exists) {
  //     throw new Error('Failed to create the exported file');
  //   }

  //   // Show success message
  //   Alert.alert(
  //     'Export Successful',
  //     `Questions have been exported to: ${fileName}`,
  //     [{ text: 'OK' }]
  //   );

  //   // For web, trigger a download
  //   if (Platform.OS === 'web') {
  //     const content = await file.text();
  //     const blob = new Blob([content], { type: 'text/markdown' });
  //     const url = URL.createObjectURL(blob);

  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = fileName;
  //     document.body.appendChild(link);
  //     link.click();

  //     // Cleanup
  //     setTimeout(() => {
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(url);
  //     }, 0);
  //   }
  // } catch (error) {
  //   console.error('Error writing file:', error);
  //   Alert.alert('Error', 'Failed to export questions. Please try again.');
  // }


}
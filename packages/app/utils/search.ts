/**
 * This file defines the schema and types for the search functionality.
 *
 * To add a new search field, start here, then add it to the search page
 * and make sure it works there.
 * Then add it to wherever you want to use it.
 *
 */

export function filterDataFromSchema(
  data: Record<string, unknown>[],
  schema: Record<string, unknown>,
) {
  return data.map((item) => {
    const filteredItem = Object.fromEntries(
      Object.entries(item).filter(([key, value]) => key in schema && Boolean(value)),
    )

    // If 'id' exists in the filteredItem and in the schema, convert it to a string
    if ('id' in filteredItem && 'id' in schema) {
      filteredItem.id = String(filteredItem.id)
    }

    return filteredItem
  })
}
// const questions = questionQuery.data?.map((question) => {
//   return Object.keys(questionSchema).reduce((obj, key) => {
//     const typedKey = key as keyof typeof questionSchema;
//     if (key in question) {
//       obj[key] = question[typedKey];
//     }
//     return obj;
//   }, {} as Record<string, unknown>);
// }) ?? []

export const questionSchema = {
  id: 'string',
  question: 'string',
}
export type QuestionSchemaType = typeof questionSchema
export type QuestionSearchResult = {
  document: QuestionSchemaType
}

export const personSchema = {
  id: 'string',
  firstName: 'string',
  lastName: 'string',
  // email: 'string',
  // phoneNumber: 'string',
  // reminderDatetime: 'string',
}
export type PersonSchemaType = Omit<typeof personSchema, 'lastName'> & Partial<{ lastName: string }>
export type PersonSearchResult = {
  document: PersonSchemaType
}

export const groupSchema = {
  id: 'string',
  name: 'string',
}
export type GroupSchemaType = typeof groupSchema
export type GroupSearchResult = {
  document: GroupSchemaType
}

export const topicsSchema = {
  id: 'string',
  name: 'string',
}
export type TopicsSchemaType = typeof topicsSchema
export type TopicsSearchResult = {
  document: TopicsSchemaType
}

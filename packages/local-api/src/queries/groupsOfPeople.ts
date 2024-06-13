import { db, eq } from '@acme/db'
import { groupsOfPeople, people } from '@acme/db/schema'
import type { NewGroupsOfPeople } from '@acme/db/schema/types'

// READ
export async function getGroupsOfPeople() {
  return await db.query.groupsOfPeople.findMany()
}

export async function getPeopleFromGroupId(id: number) {
  const peopleFromGroup = await db
    .select({ people })
    .from(groupsOfPeople)
    .innerJoin(people, eq(people.id, groupsOfPeople.personId))
    .where(eq(groupsOfPeople.groupId, id))
  return peopleFromGroup.map((person) => ({
    ...person.people,
  }))
}

// CREATE
export async function createGroupsOfPeople(input: NewGroupsOfPeople) {
  return await db
    .insert(groupsOfPeople)
    .values({
      groupId: input.groupId,
      personId: input.personId,
    })
    .returning()
}

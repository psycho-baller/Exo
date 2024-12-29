import { db, eq } from '@rooots/db'
import { groups, groupsOfPeople, people } from '@rooots/db/schema'
import type { NewGroupsOfPeople } from '@rooots/db/schema/types'

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

export async function getGroupsFromPersonId(id: number) {
  const groupsFromPerson = await db
    .select({ groups })
    .from(groupsOfPeople)
    .innerJoin(groups, eq(groups.id, groupsOfPeople.groupId))
    .where(eq(groupsOfPeople.personId, id))
  return groupsFromPerson.map((group) => ({
    ...group.groups,
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

import {
  comments,
  follows,
  groups,
  groupsOfPeople,
  likes,
  people,
  posts,
  postTopics,
  questions,
  questionTopics,
  searchHistories,
  topics,
  users,
} from '../../schema';
import type {
  NewComment,
  NewFollow,
  NewGroup,
  NewGroupsOfPeople,
  NewLike,
  NewPerson,
  NewPost,
  NewPostTopics,
  NewQuestion,
  NewQuestionTopics,
  NewSearchHistory,
  NewTopic,
  NewUser,
} from '../../schema/types';
import type { Database } from '../../schema/_table';
import {
  createConnection,
  generateRandomFirstName,
  generateRandomId,
  generateRandomLastName,
  generateRandomUsername,
} from '../../utils';

const seedUserTable = async (db: Database, userData: NewUser[]) => {
  console.log('🌱 Seeding the user table...');
  await db.insert(users).values(userData).execute();
};

const seedPostTable = async (db: Database, postData: NewPost[]) => {
  console.log('🌱 Seeding the post table...');
  await db.insert(posts).values(postData).execute();
};

const seedSearchHistoryTable = async (db: Database, searchHistoryData: NewSearchHistory[]) => {
  console.log('🌱 Seeding the search history table...');
  await db.insert(searchHistories).values(searchHistoryData).execute();
};

const seedTopicTable = async (db: Database, topicData: NewTopic[]) => {
  console.log('🌱 Seeding the topic table...');
  await db.insert(topics).values(topicData).execute();
};

const seedPersonTable = async (db: Database, personData: NewPerson[]) => {
  console.log('🌱 Seeding the person table...');
  await db.insert(people).values(personData).execute();
};

const seedGroupTable = async (db: Database, groupData: NewGroup[]) => {
  console.log('🌱 Seeding the group table...');
  await db.insert(groups).values(groupData).execute();
};

const seedPostTopicsTable = async (db: Database, postTopicsData: NewPostTopics[]) => {
  console.log('🌱 Seeding the post topics table...');
  await db.insert(postTopics).values(postTopicsData).execute();
};

const seedFollowsTable = async (db: Database, followsData: NewFollow[]) => {
  console.log('🌱 Seeding the follows table...');
  await db.insert(follows).values(followsData).execute();
};

const seedQuestionTable = async (db: Database, questionData: NewQuestion[]) => {
  console.log('🌱 Seeding the question table...');
  await db.insert(questions).values(questionData).execute();
};

const seedQuestionTopicsTable = async (db: Database, questionTopicsData: NewQuestionTopics[]) => {
  console.log('🌱 Seeding the question topics table...');
  await db.insert(questionTopics).values(questionTopicsData).execute();
};

const seedGroupsOfPeopleTable = async (db: Database, groupsOfPeopleData: NewGroupsOfPeople[]) => {
  console.log('🌱 Seeding the groups of people table...');
  await db.insert(groupsOfPeople).values(groupsOfPeopleData).execute();
};

const seedLikesTable = async (db: Database, likesData: NewLike[]) => {
  console.log('🌱 Seeding the likes table...');
  await db.insert(likes).values(likesData).execute();
};

const seedCommentsTable = async (db: Database, commentsData: NewComment[]) => {
  console.log('🌱 Seeding the comments table...');
  await db.insert(comments).values(commentsData).execute();
};

const seedAllTables = async (db: Database) => {
  const username = generateRandomUsername();

  const postId1 = generateRandomId(3);
  const postId2 = generateRandomId(3);
  const topicId1 = generateRandomId(3);
  const topicId2 = generateRandomId(3);
  const personId1 = generateRandomId(3);
  const personId2 = generateRandomId(3);
  const groupId1 = generateRandomId(3);
  const groupId2 = generateRandomId(3);
  const questionId1 = generateRandomId(3);
  const questionId2 = generateRandomId(3);

  const userData: NewUser = {
    username: username,
    firstName: generateRandomFirstName(),
    lastName: generateRandomLastName(),
    isPublic: true,
    defaultLandingPage: 'questions',
    defaultPostVisibility: 'public',
    role: 'user',
    email: `${username}@dummy.com`,
  };

  const postData: NewPost[] = [
    {
      id: postId1,
      question: 'Sample question 1',
      createdByUsername: userData.username,
    },
    {
      id: postId2,
      question: 'Sample question 2',
      createdByUsername: userData.username,
    },
  ];

  const searchHistoryData: NewSearchHistory[] = [
    {
      query: 'Sample query 1',
      fromUsername: userData.username,
      datetime: new Date(),
    },
    {
      query: 'Sample query 2',
      fromUsername: userData.username,
      datetime: new Date(),
    },
  ];

  const topicData: NewTopic[] = [
    {
      id: topicId1,
      name: 'Sample topic 1',
      createdByUsername: userData.username,
    },
    {
      id: topicId2,
      name: 'Sample topic 2',
      createdByUsername: userData.username,
    },
  ];

  const personData: NewPerson[] = [
    {
      id: personId1,
      createdByUsername: userData.username,
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      id: personId2,
      createdByUsername: userData.username,
      firstName: 'Jane',
      lastName: 'Doe',
    },
  ];

  const groupData: NewGroup[] = [
    {
      id: groupId1,
      name: 'UCalgary',
      createdByUsername: userData.username,
    },
    {
      id: groupId2,
      name: 'IBM',
      createdByUsername: userData.username,
    },
  ];

  const postTopicsData: NewPostTopics[] = [
    {
      postId: postId1,
      topicId: topicId1,
    },
    {
      postId: postId2,
      topicId: topicId2,
    },
  ];

  const followsData: NewFollow[] = [
    {
      followingUsername: generateRandomUsername(),
      followedUsername: userData.username,
    },
    {
      followingUsername: userData.username,
      followedUsername: generateRandomUsername(),
    },
  ];

  const questionData: NewQuestion[] = [
    {
      createdByUsername: userData.username,
      question: 'Sample question',
      personId: personId1,
    },
    {
      createdByUsername: userData.username,
      question: 'Another sample question',
      personId: personId2,
    },
  ];

  const questionTopicsData: NewQuestionTopics[] = [
    {
      topicId: topicId1,
      questionId: questionId1,
    },
    {
      topicId: topicId2,
      questionId: questionId2,
    },
  ];

  const groupsOfPeopleData: NewGroupsOfPeople[] = [
    {
      groupId: groupId1,
      personId: personId1,
    },
    {
      groupId: groupId2,
      personId: personId2,
    },
    {
      groupId: groupId2,
      personId: personId1,
    },
  ];

  const likesData: NewLike[] = [
    {
      postId: postId1,
      createdByUsername: userData.username,
    },
    {
      postId: postId2,
      createdByUsername: userData.username,
    },
  ];

  const commentsData: NewComment[] = [
    {
      postId: postId1,
      createdByUsername: userData.username,
      comment: 'Sample comment 1',
    },
    {
      postId: postId2,
      createdByUsername: userData.username,
      comment: 'Sample comment 2',
    },
  ];
  try {
    await seedUserTable(db, [userData]);
    await seedPostTable(db, postData);
    await seedSearchHistoryTable(db, searchHistoryData);
    await seedTopicTable(db, topicData);
    await seedPersonTable(db, personData);
    await seedPostTopicsTable(db, postTopicsData);
    await seedFollowsTable(db, followsData);
    await seedQuestionTable(db, questionData);
    await seedQuestionTopicsTable(db, questionTopicsData);
    await seedLikesTable(db, likesData);
    await seedCommentsTable(db, commentsData);
    await seedGroupTable(db, groupData);
    await seedGroupsOfPeopleTable(db, groupsOfPeopleData);
  } catch (error) {
    console.error('Something went wrong during seeding...');
    console.error(error);
    throw new Error('Seeding failure');
  }
};

const main = async () => {
  console.log('🌱 Started seeding the database...\n');
  const { db } = createConnection();
  await seedAllTables(db);

  console.log('\n🌱 Completed seeding the database successfully!\n');
  // connection
  process.exit(0);
};

void main();

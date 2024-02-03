'use strict';
var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.groupsRelations =
  exports.friendsRelations =
  exports.usersRelations =
  exports.FriendGroups =
  exports.groups =
  exports.friends =
  exports.users =
    void 0;
var drizzle_orm_1 = require('drizzle-orm');
var mysql_core_1 = require('drizzle-orm/mysql-core');
var _table_1 = require('./_table');
var question_1 = require('./question');
// User
exports.users = (0, _table_1.mySqlTable)('user', {
  id: (0, mysql_core_1.serial)('id').primaryKey(),
  firstName: (0, mysql_core_1.varchar)('first_name', { length: 30 }).notNull(),
  lastName: (0, mysql_core_1.varchar)('last_name', { length: 30 }),
  email: (0, mysql_core_1.varchar)('email', { length: 30 }).notNull().unique(),
  username: (0, mysql_core_1.varchar)('username', { length: 30 }).notNull().unique(),
  // emailVerified: timestamp("emailVerified", {
  //   mode: "date",
  //   fsp: 3,
  // }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: (0, mysql_core_1.varchar)('image', { length: 255 }),
});
// Friend
exports.friends = (0, _table_1.mySqlTable)('friend', {
  id: (0, mysql_core_1.serial)('id').primaryKey(),
  createdByUserId: (0, mysql_core_1.int)('created_by_user_id').notNull(),
  friendUserId: (0, mysql_core_1.int)('friend_user_id'),
  name: (0, mysql_core_1.text)('name').notNull(),
  createdDatetime: (0, mysql_core_1.timestamp)('created_datetime')
    .default(
      (0, drizzle_orm_1.sql)(
        templateObject_1 ||
          (templateObject_1 = __makeTemplateObject(['CURRENT_TIMESTAMP'], ['CURRENT_TIMESTAMP'])),
      ),
    )
    .notNull(),
});
// Group
exports.groups = (0, _table_1.mySqlTable)('group', {
  id: (0, mysql_core_1.serial)('id').primaryKey(),
  createdByUserId: (0, mysql_core_1.int)('created_by_user_id').notNull(),
  name: (0, mysql_core_1.text)('name').notNull(),
  createdDatetime: (0, mysql_core_1.timestamp)('created_datetime')
    .default(
      (0, drizzle_orm_1.sql)(
        templateObject_2 ||
          (templateObject_2 = __makeTemplateObject(['CURRENT_TIMESTAMP'], ['CURRENT_TIMESTAMP'])),
      ),
    )
    .notNull(),
});
// QuestionFriend
exports.FriendGroups = (0, _table_1.mySqlTable)('friend_group', {
  questionId: (0, mysql_core_1.int)('question_id'),
  friendId: (0, mysql_core_1.int)('friend_id'),
});
// Relations
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, function (_a) {
  var many = _a.many;
  return {
    friends: many(exports.friends, {
      relationName: 'Id of user who created friend',
    }),
    questions: many(question_1.questions, {
      relationName: 'Id of user who created question',
    }),
    tags: many(question_1.tags, {
      relationName: 'Id of user who created tag',
    }),
  };
});
exports.friendsRelations = (0, drizzle_orm_1.relations)(exports.friends, function (_a) {
  var one = _a.one,
    many = _a.many;
  return {
    user: one(exports.users, {
      relationName: 'Id of user who created friend',
      fields: [exports.friends.createdByUserId],
      references: [exports.users.id],
    }),
    friend: one(exports.users, {
      relationName: 'Id of friend user (optional)',
      fields: [exports.friends.friendUserId],
      references: [exports.users.id],
    }),
    groups: many(exports.FriendGroups, {
      relationName: 'Id of friend group',
    }),
  };
});
exports.groupsRelations = (0, drizzle_orm_1.relations)(exports.groups, function (_a) {
  var one = _a.one,
    many = _a.many;
  return {
    user: one(exports.users, {
      relationName: 'Id of user who created group',
      fields: [exports.groups.createdByUserId],
      references: [exports.users.id],
    }),
    friends: many(exports.FriendGroups, {
      relationName: 'Id of group friend',
    }),
  };
});
var templateObject_1, templateObject_2;

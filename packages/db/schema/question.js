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
exports.questionTagsRelations =
  exports.tagsRelations =
  exports.questionsRelations =
  exports.questionTags =
  exports.tags =
  exports.questions =
    void 0;
var drizzle_orm_1 = require('drizzle-orm');
var mysql_core_1 = require('drizzle-orm/mysql-core');
var _table_1 = require('./_table');
var user_1 = require('./user');
// Question
exports.questions = (0, _table_1.mySqlTable)('question', {
  id: (0, mysql_core_1.serial)('id').primaryKey(),
  createdByUserId: (0, mysql_core_1.int)('created_by_user_id').notNull(),
  friendId: (0, mysql_core_1.int)('friend_id'),
  text: (0, mysql_core_1.text)('text').notNull(),
  createdDatetime: (0, mysql_core_1.timestamp)('created_datetime')
    .default(
      (0, drizzle_orm_1.sql)(
        templateObject_1 ||
          (templateObject_1 = __makeTemplateObject(['CURRENT_TIMESTAMP'], ['CURRENT_TIMESTAMP'])),
      ),
    )
    .notNull(),
});
// Tag
exports.tags = (0, _table_1.mySqlTable)('tag', {
  id: (0, mysql_core_1.serial)('id').primaryKey(),
  createdByUserId: (0, mysql_core_1.int)('created_by_user_id').notNull(),
  tagName: (0, mysql_core_1.varchar)('email', { length: 30 }).notNull(),
});
// QuestionTag
exports.questionTags = (0, _table_1.mySqlTable)('question_tag', {
  questionId: (0, mysql_core_1.int)('question_id'),
  tagId: (0, mysql_core_1.int)('tag_id'),
});
exports.questionsRelations = (0, drizzle_orm_1.relations)(exports.questions, function (_a) {
  var one = _a.one,
    many = _a.many;
  return {
    questionTags: many(exports.questionTags),
    friend: one(user_1.friends, {
      relationName: 'Friend of the question',
      fields: [exports.questions.friendId],
      references: [user_1.friends.id],
    }),
    createdByUser: one(user_1.users, {
      relationName: 'Id of user who created question',
      fields: [exports.questions.createdByUserId],
      references: [user_1.users.id],
    }),
  };
});
exports.tagsRelations = (0, drizzle_orm_1.relations)(exports.tags, function (_a) {
  var one = _a.one,
    many = _a.many;
  return {
    questionTags: many(exports.questionTags),
    createdByUser: one(user_1.users, {
      relationName: 'Id of user who created tag',
      fields: [exports.tags.createdByUserId],
      references: [user_1.users.id],
    }),
  };
});
exports.questionTagsRelations = (0, drizzle_orm_1.relations)(exports.questionTags, function (_a) {
  var one = _a.one;
  return {
    question: one(exports.questions, {
      relationName: 'Id of question',
      fields: [exports.questionTags.questionId],
      references: [exports.questions.id],
    }),
    tag: one(exports.tags, {
      relationName: 'Id of tag',
      fields: [exports.questionTags.tagId],
      references: [exports.tags.id],
    }),
  };
});
var templateObject_1;

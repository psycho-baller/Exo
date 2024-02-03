'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.db = exports.tableCreator = exports.connection = exports.schema = void 0;
var database_1 = require('@planetscale/database');
var planetscale_serverless_1 = require('drizzle-orm/planetscale-serverless');
var question = require('./schema/question');
// import * as auth from "./schema/auth";
var user = require('./schema/user');
exports.schema = __assign(__assign({}, question), user);
exports.connection = new database_1.Client({
  url: process.env.DATABASE_URL,
}).connection();
var _table_1 = require('./schema/_table');
Object.defineProperty(exports, 'tableCreator', {
  enumerable: true,
  get: function () {
    return _table_1.mySqlTable;
  },
});
__exportStar(require('drizzle-orm'), exports);
exports.db = (0, planetscale_serverless_1.drizzle)(exports.connection, {
  schema: exports.schema,
});

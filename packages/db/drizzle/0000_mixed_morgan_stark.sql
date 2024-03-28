CREATE TABLE `Comments` (
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`comment` text NOT NULL,
	`created_by_username` text,
	`post_id` integer,
	PRIMARY KEY(`created_by_username`, `created_datetime`, `post_id`)
);
--> statement-breakpoint
CREATE TABLE `Follows` (
	`following_username` text NOT NULL,
	`followed_username` text NOT NULL,
	PRIMARY KEY(`followed_username`, `following_username`)
);
--> statement-breakpoint
CREATE TABLE `Grp` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reminder_datetime` integer,
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`name` text NOT NULL,
	`created_by_username` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Groups_of_people` (
	`group_id` integer NOT NULL,
	`person_id` integer NOT NULL,
	PRIMARY KEY(`group_id`, `person_id`)
);
--> statement-breakpoint
CREATE TABLE `Likes` (
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`created_by_username` text NOT NULL,
	`post_id` integer NOT NULL,
	PRIMARY KEY(`created_by_username`, `post_id`)
);
--> statement-breakpoint
CREATE TABLE `Person` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_by_username` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text,
	`birthday` integer,
	`email` text,
	`phone_number` text,
	`reminder_datetime` integer,
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`associated_username` text
);
--> statement-breakpoint
CREATE TABLE `Post_topics` (
	`post_id` integer NOT NULL,
	`topic_id` integer NOT NULL,
	PRIMARY KEY(`post_id`, `topic_id`)
);
--> statement-breakpoint
CREATE TABLE `Post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`question` text NOT NULL,
	`created_by_username` text
);
--> statement-breakpoint
CREATE TABLE `Question_topics` (
	`topic_id` integer NOT NULL,
	`question_id` integer NOT NULL,
	PRIMARY KEY(`question_id`, `topic_id`)
);
--> statement-breakpoint
CREATE TABLE `Question` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_by_username` text NOT NULL,
	`question` text NOT NULL,
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`reminder_datetime` integer,
	`post_id` integer,
	`group_id` integer,
	`person_id` integer
);
--> statement-breakpoint
CREATE TABLE `Search_history` (
	`query` text NOT NULL,
	`from_username` text NOT NULL,
	`datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	PRIMARY KEY(`from_username`, `query`)
);
--> statement-breakpoint
CREATE TABLE `Topic` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_by_username` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `User` (
	`username` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text,
	`is_public` integer DEFAULT false,
	`default_landing_page` text DEFAULT 'questions',
	`default_post_visibility` text DEFAULT 'public',
	`role` text DEFAULT 'user',
	`email` text NOT NULL,
	`phone` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Grp_name_created_by_username_unique` ON `Grp` (`name`,`created_by_username`);--> statement-breakpoint
CREATE UNIQUE INDEX `Person_email_unique` ON `Person` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `Person_phone_number_unique` ON `Person` (`phone_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `Person_first_name_last_name_birthday_unique` ON `Person` (`first_name`,`last_name`,`birthday`);--> statement-breakpoint
CREATE UNIQUE INDEX `User_email_unique` ON `User` (`email`);
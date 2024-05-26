CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Comments` (
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`comment` text NOT NULL,
	`created_by_user_id` text NOT NULL,
	`post_id` integer,
	PRIMARY KEY(`created_by_user_id`, `created_datetime`, `post_id`),
	FOREIGN KEY (`created_by_user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Follows` (
	`following_user_id` text NOT NULL,
	`followed_user_id` text NOT NULL,
	PRIMARY KEY(`followed_user_id`, `following_user_id`),
	FOREIGN KEY (`following_user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`followed_user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Grp` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reminder_datetime` integer,
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`name` text NOT NULL,
	`created_by_user_id` text NOT NULL,
	FOREIGN KEY (`created_by_user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Groups_of_people` (
	`group_id` integer NOT NULL,
	`person_id` integer NOT NULL,
	PRIMARY KEY(`group_id`, `person_id`),
	FOREIGN KEY (`group_id`) REFERENCES `Grp`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Likes` (
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`created_by_user_id` text NOT NULL,
	`post_id` integer NOT NULL,
	PRIMARY KEY(`created_by_user_id`, `post_id`),
	FOREIGN KEY (`created_by_user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Person` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text,
	`birthday` integer,
	`email` text,
	`phone_number` text,
	`reminder_datetime` integer,
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`created_by_user_id` text NOT NULL,
	`associated_user_id` text,
	FOREIGN KEY (`created_by_user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`associated_user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Post_topics` (
	`post_id` integer NOT NULL,
	`topic_id` integer NOT NULL,
	PRIMARY KEY(`post_id`, `topic_id`),
	FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`topic_id`) REFERENCES `Topic`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_by_user_id` text,
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`question` text NOT NULL,
	FOREIGN KEY (`created_by_user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Question_topics` (
	`question_id` integer NOT NULL,
	`topic_id` integer NOT NULL,
	PRIMARY KEY(`question_id`, `topic_id`),
	FOREIGN KEY (`question_id`) REFERENCES `Question`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`topic_id`) REFERENCES `Topic`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Question` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question` text NOT NULL,
	`created_datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`reminder_datetime` integer,
	`created_by_user_id` text NOT NULL,
	`group_id` integer,
	`person_id` integer,
	`post_id` integer,
	FOREIGN KEY (`created_by_user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`group_id`) REFERENCES `Grp`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Search_history` (
	`query` text NOT NULL,
	`created_by_user_id` text NOT NULL,
	`datetime` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	PRIMARY KEY(`created_by_user_id`, `query`),
	FOREIGN KEY (`created_by_user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Topic` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_by_user_id` text NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`created_by_user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`image` text,
	`email` text NOT NULL,
	`emailVerified` integer,
	`first_name` text,
	`last_name` text,
	`is_public` integer DEFAULT false,
	`default_landing_page` text DEFAULT 'questions',
	`default_post_visibility` text DEFAULT 'public',
	`role` text DEFAULT 'user',
	`phone` text
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `account` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Grp_name_created_by_user_id_unique` ON `Grp` (`name`,`created_by_user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `Person_email_unique` ON `Person` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `Person_phone_number_unique` ON `Person` (`phone_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `Person_first_name_last_name_birthday_unique` ON `Person` (`first_name`,`last_name`,`birthday`);--> statement-breakpoint
CREATE UNIQUE INDEX `User_email_unique` ON `User` (`email`);
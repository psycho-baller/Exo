CREATE TABLE `question` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`created_by_user_id` int NOT NULL,
	`friend_id` int,
	`text` text NOT NULL,
	`created_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `question_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`created_by_user_id` int NOT NULL,
	`name` varchar(30) NOT NULL,
	CONSTRAINT `tag_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `question_tag` (
	`question_id` int,
	`tag_id` int
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`first_name` varchar(30) NOT NULL,
	`last_name` varchar(30),
	`email` varchar(30) NOT NULL,
	`username` varchar(30) NOT NULL,
	`image` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `friend` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`created_by_user_id` int NOT NULL,
	`friend_user_id` int,
	`name` text NOT NULL,
	`created_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `friend_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `group` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`created_by_user_id` int NOT NULL,
	`name` text NOT NULL,
	`created_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `group_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `friend_group` (
	`group_id` int,
	`friend_id` int
);

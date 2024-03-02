CREATE TABLE `Comments` (
	`created_datetime` timestamp NOT NULL DEFAULT (now()),
	`comment` varchar(255) NOT NULL,
	`created_by_username` varchar(31) NOT NULL,
	`post_id` int NOT NULL,
	CONSTRAINT `Comments_created_by_username_post_id_created_datetime_pk` PRIMARY KEY(`created_by_username`,`post_id`,`created_datetime`)
);
--> statement-breakpoint
CREATE TABLE `Follows` (
	`following_username` varchar(31) NOT NULL,
	`followed_username` varchar(31) NOT NULL,
	CONSTRAINT `Follows_following_username_followed_username_pk` PRIMARY KEY(`following_username`,`followed_username`)
);
--> statement-breakpoint
CREATE TABLE `Grp` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`reminder_datetime` datetime,
	`created_datetime` timestamp DEFAULT (now()),
	`name` varchar(63) NOT NULL,
	`created_by_username` varchar(31) NOT NULL,
	CONSTRAINT `Grp_id` PRIMARY KEY(`id`),
	CONSTRAINT `Grp_name_created_by_username_unique` UNIQUE(`name`,`created_by_username`)
);
--> statement-breakpoint
CREATE TABLE `Groups_of_people` (
	`group_id` int NOT NULL,
	`person_id` int NOT NULL,
	CONSTRAINT `Groups_of_people_group_id_person_id_pk` PRIMARY KEY(`group_id`,`person_id`)
);
--> statement-breakpoint
CREATE TABLE `Likes` (
	`created_datetime` timestamp DEFAULT (now()),
	`created_by_username` varchar(31) NOT NULL,
	`post_id` int NOT NULL,
	CONSTRAINT `Likes_created_by_username_post_id_pk` PRIMARY KEY(`created_by_username`,`post_id`)
);
--> statement-breakpoint
CREATE TABLE `Person` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`created_by_username` varchar(31) NOT NULL,
	`first_name` varchar(31) NOT NULL,
	`last_name` varchar(31),
	`birthday` date,
	`email` varchar(31),
	`phone_number` varchar(15),
	`reminder_datetime` datetime,
	`created_datetime` timestamp DEFAULT (now()),
	`associated_username` varchar(31),
	CONSTRAINT `Person_id` PRIMARY KEY(`id`),
	CONSTRAINT `Person_email_unique` UNIQUE(`email`),
	CONSTRAINT `Person_phone_number_unique` UNIQUE(`phone_number`),
	CONSTRAINT `Person_first_name_last_name_birthday_unique` UNIQUE(`first_name`,`last_name`,`birthday`)
);
--> statement-breakpoint
CREATE TABLE `Post_topics` (
	`post_id` int NOT NULL,
	`topic_id` int NOT NULL,
	CONSTRAINT `Post_topics_post_id_topic_id_pk` PRIMARY KEY(`post_id`,`topic_id`)
);
--> statement-breakpoint
CREATE TABLE `Post` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`created_datetime` timestamp DEFAULT (now()),
	`question` varchar(255) NOT NULL,
	`created_by_username` varchar(31),
	CONSTRAINT `Post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Question_topics` (
	`topic_id` int NOT NULL,
	`question_id` int NOT NULL,
	CONSTRAINT `Question_topics_topic_id_question_id_pk` PRIMARY KEY(`topic_id`,`question_id`)
);
--> statement-breakpoint
CREATE TABLE `Question` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`created_by_username` varchar(31) NOT NULL,
	`question` varchar(255) NOT NULL,
	`created_datetime` timestamp DEFAULT (now()),
	`reminder_datetime` datetime,
	`post_id` int,
	`group_id` varchar(63),
	`person_id` int,
	CONSTRAINT `Question_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Search_history` (
	`query` varchar(255) NOT NULL,
	`from_username` varchar(31) NOT NULL,
	`datetime` timestamp DEFAULT (now()),
	CONSTRAINT `Search_history_query_from_username_pk` PRIMARY KEY(`query`,`from_username`)
);
--> statement-breakpoint
CREATE TABLE `Topic` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_by_username` varchar(31) NOT NULL,
	CONSTRAINT `Topic_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`username` varchar(31) NOT NULL,
	`first_name` varchar(31) NOT NULL,
	`last_name` varchar(31) NOT NULL,
	`is_public` boolean NOT NULL,
	`default_landing_page` enum('questions','people','discover'),
	`default_post_visibility` enum('public','private','friends'),
	`role` enum('admin','user') NOT NULL,
	`email` varchar(31) NOT NULL,
	`phone` varchar(15),
	CONSTRAINT `User_username` PRIMARY KEY(`username`),
	CONSTRAINT `User_email_unique` UNIQUE(`email`)
);

drop database if exists chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  user_id int primary key auto_increment,
  username varchar(20) UNIQUE
);

CREATE TABLE rooms (
  room_id int primary key auto_increment,
  roomname varchar(20) UNIQUE
);

CREATE TABLE messages (
  message_id int primary key auto_increment,
  user int,
  text varchar(160),
  room int,
  foreign key (user) references users(user_id),
  foreign key (room) references rooms(room_id)
);

INSERT INTO rooms (roomname) VALUES ('living room');
INSERT INTO users (username) VALUES ('homer');
INSERT INTO messages (user, text, room) VALUES (1, 'this is the first message', 1);

INSERT INTO rooms (roomname) VALUES ('the forest');
INSERT INTO users (username) VALUES ('brian');
INSERT INTO messages (user, text, room) VALUES (2, 'heyyyoooooo!!!', 2);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


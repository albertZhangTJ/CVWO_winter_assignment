-- !!! WARNING !!!
-- This script is only for setting up the database structure on a new machine
-- NEVER run this on a machine where the application has already been deployed 
-- IT WILL DELETE ALL EXISTING RECORD IN DATABASE!!!




DROP TABLE IF EXISTS registered_users;
CREATE TABLE registered_users(
    id int NOT NULL AUTO_INCREMENT, -- user id in system, will not be exposed to user, since we are not expecting a large amount of users, int should provide enough keyspace
    username varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    passwd varchar(256) CHARACTER SET utf8 NOT NULL,
    -- profileid int NOT NULL,
    PRIMARY KEY (id) USING BTREE
) ENGINE=InnoDB;

DROP TABLE IF EXISTS events;
CREATE TABLE events(
    id bigint NOT NULL AUTO_INCREMENT, -- a unique id for each event created, the id will not be recycled since we are using AUTO-INCREMENT, but bigint should still provide enough keyspace
    username varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, -- synced with registered_users.profileid, unique for each user
    dtstamp varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL, -- date and time when the event is created
    dtstart varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, -- date and time when the event starts
    dtend varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, -- date and time when the event ends
    organizer varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL, -- organizer of the event
    mailto varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL, 
    memo varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL, -- a short memo input by the user
    iscompleted enum('N', 'Y') DEFAULT 'N',
    isdeleted enum('N', 'Y') DEFAULT 'N', -- provides a trash mechanism in case of mis-deleting
    PRIMARY KEY (id) USING BTREE 
) ENGINE=InnoDB;
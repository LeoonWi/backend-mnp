import mariadb from '../node_modules/mariadb/callback.js';

export const db = mariadb.createConnection({
    host: '127.0.1.1',
    user: 'root',
    password: '2003',
    database: "mnp",
});

var drop = 'DROP DATABASE mnp;';
var seedQuery = `SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE SCHEMA IF NOT EXISTS mnp DEFAULT CHARACTER SET utf8 ;
CREATE TABLE IF NOT EXISTS mnp.User (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(64) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(64) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
CREATE TABLE IF NOT EXISTS mnp.Meeting (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  date DATE NOT NULL,
  owner_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_Meetings_Users1_idx (owner_id ASC) VISIBLE,
  CONSTRAINT fk_Meetings_Users1
    FOREIGN KEY (owner_id)
    REFERENCES mnp.User (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
CREATE TABLE IF NOT EXISTS mnp.Participant (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) NOT NULL,
  meeting_id INT(11) NOT NULL,
  accepted TINYINT(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  INDEX fk_Participants_Users1_idx (user_id ASC) VISIBLE,
  INDEX fk_Participants_Meetings1_idx (meeting_id ASC) VISIBLE,
  CONSTRAINT fk_Participants_Users1
    FOREIGN KEY (user_id)
    REFERENCES mnp.User (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Participants_Meetings1
    FOREIGN KEY (meeting_id)
    REFERENCES mnp.Meeting (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
CREATE TABLE IF NOT EXISTS mnp.Friends (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sender INT(11) NOT NULL,
  receiver INT(11) NOT NULL,
  accepted TINYINT(4) NOT NULL,
  INDEX fk_table1_Users1_idx (sender ASC) VISIBLE,
  INDEX fk_table1_Users2_idx (receiver ASC) VISIBLE,
  PRIMARY KEY (id),
  CONSTRAINT fk_table1_Users1
    FOREIGN KEY (sender)
    REFERENCES mnp.User (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_table1_Users2
    FOREIGN KEY (receiver)
    REFERENCES mnp.User (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;`;

db.connect();
console.log("Running SQL seed...")

// Drop content
db.query(drop, err => {
    if(err) {
        throw err
    }
    // Seed content
    db.query(seedQuery, err => {
    if(err) {
        throw err
    }    
    console.log("SQL seed completed!")
    connection.end()
    })
})
create database if not exists yoga-studio;

use yoga-studio;

create table if not exists `yoga-studio`.`talleres` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `datetime` VARCHAR(255) NULL,
  `price` INT UNSIGNED NULL,
  `description` VARCHAR(255) NULL,
  `cupo` INT UNSIGNED NULL,
  `room` INT UNSIGNED NULL,
  PRIMARY KEY (`id`));

create table if not exists `yoga-studio`.`tallerAlumns` (
  `tallerId` INT UNSIGNED NOT NULL,
  `alumnName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`tallerId`, `alumnName`),
  CONSTRAINT `fk_tallerAlumn_taller`
    FOREIGN KEY (`tallerId`)
    REFERENCES `yoga-studio`.`talleres` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

insert into yoga-studio.talleres values(1,'meditacion','lunes 13 4 de la tarde',6000,'meditacion para principiantes',25,1);
insert into yoga-studio.tallerAlumns values(1,'invertidas');
insert into yoga-studio.tallerAlumns values(1,'columpios');
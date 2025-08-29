create database if not exists yoga-studio;

use yoga-studio;

create table if not exists `yoga-studio`.`talleres` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `datetime` VARCHAR(255) NULL,
  `price` INT UNSIGNED NULL,
  `description` VARCHAR(255) NULL,
  `cupo` INT UNSIGNED NULL,
  PRIMARY KEY (`id`));


create table if not exists `yoga-studio`.`user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `birthdate` varchar(45) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `phone` int(10) unsigned DEFAULT NULL,
  `dni` int(10) unsigned DEFAULT NULL,
  `rol` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

create table if not exists `yoga-studio`.`membership` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `start_date` date DEFAULT NULL,
  `finish_date` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `id_user` int(10) unsigned NOT NULL,
  `id_memb_type` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user_idx` (`id_user`),
  KEY `id_memb_type_idx` (`id_memb_type`),
  CONSTRAINT `id_memb_type` FOREIGN KEY (`id_memb_type`) REFERENCES `membership_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table if not exists `yoga-studio`.`membership_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

insert into `yoga-studio`.`membership_type`
(`id`,
`name`,
`description`)
VALUES
(<{id: 1 }>,
<{name: '2'}>,
<{description: 'dos dias a la semana'}>);



insert into yoga-studio.talleres values(1,'meditacion','lunes 13 4 de la tarde',6000,'meditacion para principiantes',25,1);
insert into yoga-studio.tallerAlumns values(1,'invertidas');
insert into yoga-studio.tallerAlumns values(1,'columpios');
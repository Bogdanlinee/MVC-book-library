CREATE TABLE `book_library`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

  INSERT INTO `book_library`.`admin`
(`email`,
`password`)
VALUES
('dan@test.test','pass123')

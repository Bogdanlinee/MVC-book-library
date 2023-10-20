create TABLE `book_library`.`authors_books` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `book_id` INT NOT NULL,
  `author_id` INT NOT NULL,
  PRIMARY KEY (`id`));

insert into `book_library`.`authors_books`
(`book_id`, `author_id`)
VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(6,7),
(6,8),
(6,9),
(7,10),
(8,11),
(9,12),
(10,13),
(11,14),
(12,15),
(13,16),
(14,17),
(15,18),
(16,19),
(17,20),
(18,21),
(19,22),
(19,23),
(20,24),
(21,25),
(22,26),
(22,27),
(23,28),
(24,29);
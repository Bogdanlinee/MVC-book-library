create TABLE `book_library`.`books` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `author` VARCHAR(200) NOT NULL,
  `year` VARCHAR(5),
  `description` VARCHAR(10000),
  PRIMARY KEY (`id`));

-- add books to table
INSERT INTO `book_library`.`books`
(`name`,
`author`)
VALUES
('СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА','Андрей Богуславский'),
('Программирование на языке Go!','Марк Саммерфильд'),
('Толковый словарь сетевых терминов и аббревиатур','М.Вильямс'),
('Python for Data Analysis','Уэс Маккинни'),
('Thinking in Java (4th Edition)','Брюс Эккель'),
('Introduction to Algorithms','Томас Кормен'),
('JavaScript Pocket Reference','Дэвид Флэнаган'),
('Adaptive Code via C#: Class and Interface Design, Design Patterns, and SOLID Principles','Гэри Маклин Холл'),
('SQL: The Complete Reference','Джеймс Р. Грофф'),
('PHP and MySQL Web Development','Люк Веллинг'),
('Статистический анализ и визуализация данных с помощью R','Сергей Мастицкий'),
('Computer Coding for Kid','Джон Вудкок'),
('Exploring Arduino: Tools and Techniques for Engineering Wizardry','Джереми Блум'),
('Программирование микроконтроллеров для начинающих и не только','А. Белов'),
('The Internet of Things','Сэмюэл Грингард'),
('Sketching User Experiences: The Workbook','Сет Гринберг'),
('InDesign CS6','Александр Сераков'),
('Адаптивный дизайн. Делаем сайты для любых устройств','Тим Кедлек'),
('Android для разработчиков','Пол Дейтел'),
('Clean Code: A Handbook of Agile Software Craftsmanship','Роберт Мартин'),
('Swift Pocket Reference: Programming for iOS and OS X','Энтони Грей'),
('NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence','Мартин Фаулер'),
('Head First Ruby','Джей Макгаврен'),
('Practical Vim','Дрю Нейл');
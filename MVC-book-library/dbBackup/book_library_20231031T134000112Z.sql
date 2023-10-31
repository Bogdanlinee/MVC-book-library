-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: book_library
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'dan@test.test','pass123');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Андрей Богуславский'),(2,'Марк Саммерфильд'),(3,'М. Вильямс'),(4,'Уэс Маккинни'),(5,'Брюс Эккель'),(6,'Томас Кормен'),(7,'Чарльз Лейзерсон'),(8,'Рональд Ривест'),(9,'Клиффорд Штайн'),(10,'Дэвид Флэнаган'),(11,'Гэри Маклин Холл'),(12,'Джеймс Р. Грофф'),(13,'Люк Веллинг'),(14,'Сергей Мастицкий'),(15,'Джон Вудкок'),(16,'Джереми Блум'),(17,'А. Белов'),(18,'Сэмюэл Грингард'),(19,'Сет Гринберг'),(20,'Александр Сераков'),(21,'Тим Кедлек'),(22,'Пол Дейтел'),(23,'Харви Дейтел'),(24,'Роберт Мартин'),(25,'Энтони Грей'),(26,'Мартин Фаулер'),(27,'Прамодкумар Дж. Садаладж'),(28,'Джей Макгаврен'),(29,'Дрю Нейл'),(75,'123'),(84,'&amp;lt;script&amp;gt;alert(&amp;#039;hello&amp;#039;)&amp;lt;/script&amp;gt;'),(85,'&amp;lt;script&amp;gt;alert(&amp;#039;hello&amp;#039;)&amp;lt;/script&amp;gt;'),(86,'&amp;lt;script&amp;gt;alert(&amp;#039;hello&amp;#039;)&amp;lt;/script&amp;gt;');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors_books`
--

DROP TABLE IF EXISTS `authors_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors_books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors_books`
--

LOCK TABLES `authors_books` WRITE;
/*!40000 ALTER TABLE `authors_books` DISABLE KEYS */;
INSERT INTO `authors_books` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,5),(6,6,6),(7,6,7),(8,6,8),(9,6,9),(10,7,10),(11,8,11),(12,9,12),(13,10,13),(14,11,14),(15,12,15),(16,13,16),(17,14,17),(18,15,18),(19,16,19),(20,17,20),(21,18,21),(22,19,22),(23,19,23),(24,20,24),(25,21,25),(26,22,26),(27,22,27),(28,23,28),(29,24,29),(69,66,75);
/*!40000 ALTER TABLE `authors_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `year` varchar(4) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА','2016','В первых двух частях учебника рассмотрен традиционный (классический) для этой дисциплины материал – элементы начертательной геометрии и основы инженерной графики, необходимые для построения изображений и создания конструкторской документации.',0),(2,'Программирование на языке Go!','2013','На сегодняшний день Go – самый впечатляющий из новых языков программирования. Изначально он создавался для того, чтобы помочь задействовать всю мощь современных многоядерных процессоров. В этом руководстве Марк Саммерфильд, один из основоположников программирования на языке Go, показывает, как писать программы, в полной мере использующие его революционные возможности и идиомы.',0),(3,'Толковый словарь сетевых терминов и аббревиатур','2002','Этот словарь представляет собой наиболее полное и свежее собрание терминов и аббревиатур, которые применяются в области сетевых технологий. В первой части собраны стандартные термины, широко используемые в области межсетевых взаимодействий, а во второй - специфические термины, характерные только для Cisco Systems и Cisco IOS. Он станет практичным и удобным справочником для всех специалистов в области сетевых технологий, который будет незаменим как при чтении вступительных обзоров общего характера, так и при изучении специализированных технических руководств.',0),(4,'Python for Data Analysis','2012','This book is concerned with the nuts and bolts of manipulating, processing, cleaning, and crunching data in Python. It is also a practical, modern introduction to scientific computing in Python, tailored for data-intensive applications.',0),(5,'Thinking in Java (4th Edition)','2006','“Thinking in Java should be read cover to cover by every Java programmer, then kept close at hand for frequent reference. The exercises are challenging, and the chapter on Collections is superb! Not only did this book help me to pass the Sun Certified Java Programmer exam; it’s also the first book I turn to whenever I have a Java question.”\n—Jim Pleger, Loudoun County (Virginia) Government',0),(6,'Introduction to Algorithms','2009','The latest edition of the essential text and professional reference, with substantial new material on such topics as vEB trees, multithreaded algorithms, dynamic programming, and edge-based flow. Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. ',0),(7,'JavaScript Pocket Reference','2020','JavaScript is the programming language of the web and is used by more software developers today than any other programming language. For nearly 25 years this best seller has been the go-to guide for JavaScript programmers. The seventh edition is fully updated to cover the 2020 version of JavaScript, and new chapters cover classes, modules, iterators, generators, Promises, async/await, and metaprogramming. You’ll find illuminating and engaging example code throughout.',0),(8,'Adaptive Code via C#: Class and Interface Design, Design Patterns, and SOLID Principles','2014','As every developer knows, requirements are subject to change. But when you build adaptability into your code, you can respond to change more easily and avoid disruptive rework. Focusing on Agile programming, this book describes the best practices, principles, and patterns that enable you to create flexible, adaptive code--and deliver better business value.',0),(9,'SQL: The Complete Reference','2009','Get comprehensive coverage of every aspect of SQL from three leading industry experts. Revised with coverage of the latest RDBMS software versions, this one-stop guide explains how to build, populate, and administer high-performance databases and develop robust SQL-based applications. ',0),(10,'PHP and MySQL Web Development','2016','PHP and MySQL are popular open-source technologies that are ideal for quickly developing database-driven Web applications. PHP is a powerful scripting language designed to enable developers to create highly featured Web applications quickly, and MySQL is a fast, reliable database that integrates well with PHP and is suited for dynamic Internet-based applications.',0),(11,'Статистический анализ и визуализация данных с помощью R','2015','Сегодня язык R является безусловным лидером среди свободно распространяемых системстатистического анализа. Ведущие университеты мира, аналитики крупнейших компаний и исследовательских центров регулярно используют R при проведении научно-технических расчетови создании крупных информационных проектов. Широкое преподавание статистики на базе этойсистемы и всемерная поддержка научным сообществом обусловили то, что приведение скриптовкода на языке R постепенно становится общепризнанным стандартом как в журнальных публикациях, так и при неформальном общении ученых всего мира',0),(12,'Computer Coding for Kid','2022','Python programming and Scratch are a doddle to learn with this easy and colourful guide to coding for kids. Just follow the simple steps and you\'ll be writing programs in no time.',0),(13,'Exploring Arduino: Tools and Techniques for Engineering Wizardry','2019','Exploring Arduino makes electrical engineering and embedded software accessible. Learn step by step everything you need to know about electrical engineering, programming, and human-computer interaction through a series of increasingly complex projects. Arduino guru Jeremy Blum walks you through each build, providing code snippets and schematics that will remain useful for future projects. Projects are accompanied by downloadable source code, tips and tricks, and video tutorials to help you master Arduino. You\'ll gain the skills you need to develop your own microcontroller projects!',0),(14,'Программирование микроконтроллеров для начинающих и не только','2016','Вы хотите научиться разрабатывать самостоятельно интересные устройства на микроконтроллерах? Хотите легко научиться придумывать схемы и писать программы? Тогда эта книга для вас! Новейший самоучитель позволит уверенно пройти путь от уровня, получившего меткое название \"чайник\", до вполне готового специалиста, умеющего самостоятельно разрабатывать готовые работоспособные микроэлектронные устройства.',0),(15,'The Internet of Things','2015','A guided tour through the Internet of Things, a networked world of connected devices, objects, and people that is changing the way we live and work.We turn on the lights in our house from a desk in an office miles away.',0),(16,'Sketching User Experiences: The Workbook','2011','Sketching Working Experience: The Workbook provides information about the step-by-step process of the different sketching techniques. It offers methods called design thinking, as a way to think as a user, and sketching, a way to think as a designer. User-experience designers are designers who sketch based on their actions, interactions, and experiences.\nThe book discusses the differences between the normal ways to sketch and sketching used by user-experience designers. It also describes some motivation on why a person should sketch and introduces the sketchbook. The book reviews the different sketching methods and the modules that contain a particular sketching method. It also explains how the sketching methods are used.',0),(17,'InDesign CS6','2007','Вашему вниманию предлагается книга - официальный учебный курс по программе Adobe® InDesign® CS2, созданный при участии команды разработчиков компании Adobe. \n\nБез преувеличения можно сказать, что программа Adobe® InDesign® CS2 является на сегодняшний день самой совершенной программой для верстки книг, газет и журналов. \n\nВ книге особое внимание уделено новым возможностям версии CS2. ',0),(18,'Адаптивный дизайн. Делаем сайты для любых устройств','2013','Новые устройства и платформы появляются каждый день. У разработчиков мобильных приложений и сайтов существует реальная проблема: как корректно и качественно отобразить весь контент на экране любого размера и соотношения сторон. Для решения этой задачи предназначен адаптивный веб-дизайн. Целью адаптивного веб-дизайна является создание универсальных веб-сайтов и приложений для различных устройств. \nПодробнее: https://www.labirint.ru/books/398847/',0),(19,'Android для разработчиков','2016','Добро пожаловать в динамичный мир разработки приложений для смартфонов и планшетов Android с использованием Android Software Development Kit (SDK), языка программирования JavaTM, а также новой и стремительно развивающейся среды разработки Android Studio. В основе книги лежит принцип разработки, ориентированной на приложения, — концепции показаны на примере полностью работоспособных приложений Android, а не фрагментов кода. Более миллиона человек уже воспользовались книгами Дейтелов, чтобы освоить Java, C#, C++, C, JavaScript, XML, Visual Basic, Visual C++, Perl, Python и другие языки программирования.',0),(20,'Clean Code: A Handbook of Agile Software Craftsmanship','2008','Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship.',0),(21,'Swift Pocket Reference: Programming for iOS and OS X','2015','This pocket reference is the perfect on-the-job tool for learning Swift\'s modern language features, including type safety, generics, type inference, closures, tuples, automatic memory management, and support for Unicode.',0),(22,'NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence','2012','The need to handle increasingly larger data volumes is one factor driving the adoption of a new class of nonrelational \"NoSQL\" databases. Advocates of NoSQL databases claim they can be used to build systems that are more performant, scale better, and are easier to program.',0),(23,'Head First Ruby','2016','What will you learn from this book?What\'s all the buzz about this Ruby language? Is it right for you? Well, ask yourself: are you tired of all those extra declarations, keywords, and compilation steps in your other language? Do you want to be a more productive programmer? Then you\'ll love Ruby. With this unique hands-on learning experience, you\'ll discover how Ruby takes care of all the details for you, so you can simply have fun and get more done with less code.',0),(24,'Practical Vim','2015','Vim is a fast and efficient text editor that will make you a faster and more efficient developer. It’s available on almost every OS, and if you master the techniques in this book, you’ll never need another text editor. In more than 120 Vim tips, you’ll quickly learn the editor’s core functionality and tackle your trickiest editing and writing tasks. This beloved bestseller has been revised and updated to Vim 8 and includes three brand-new tips and five fully revised tips.',0);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'/20231013072406-v0','2023-10-13 11:53:48'),(2,'/20231016062041-v1','2023-10-16 09:21:22'),(3,'/20231017060835-v2','2023-10-17 09:10:31'),(6,'/20231019121905-v3','2023-10-19 17:17:48'),(7,'/20231019145216-v4','2023-10-19 17:56:10'),(9,'/20231019161651-v5','2023-10-19 19:43:14'),(10,'/20231020091855-v6','2023-10-20 12:20:55'),(12,'/20231026065658-v7','2023-10-26 09:59:50'),(14,'/20231030065947-v8','2023-10-30 09:26:14');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistic`
--

DROP TABLE IF EXISTS `statistic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistic` (
  `id` int NOT NULL DEFAULT '0',
  `views` int NOT NULL DEFAULT '0',
  `clicks` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistic`
--

LOCK TABLES `statistic` WRITE;
/*!40000 ALTER TABLE `statistic` DISABLE KEYS */;
INSERT INTO `statistic` VALUES (1,7,2),(2,1,0),(3,0,0),(4,0,0),(5,0,0),(6,5,2),(7,0,0),(8,0,0),(9,0,0),(10,0,0),(11,0,0),(12,1,1),(13,0,0),(14,0,0),(15,0,0),(16,0,0),(17,0,0),(18,0,0),(19,0,0),(20,0,0),(21,0,0),(22,0,0),(23,0,0),(24,0,0),(64,0,0),(65,0,0),(66,0,0),(67,0,0),(68,0,0),(69,0,0),(70,0,0),(71,0,0),(72,0,0);
/*!40000 ALTER TABLE `statistic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-31 15:40:00

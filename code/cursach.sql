-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Дек 26 2022 г., 03:28
-- Версия сервера: 8.0.29
-- Версия PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cursach`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accounts`
--

CREATE TABLE `accounts` (
  `id` int NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password_hash` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `priveleges` enum('USER','MODERATOR','ADMIN','ROOT') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'USER',
  `status` enum('ACTIVE','BLOCKED') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `accounts`
--

INSERT INTO `accounts` (`id`, `email`, `password_hash`, `priveleges`, `status`) VALUES
(18, 'vishotax3@gmail.com', '$2y$10$nmDs15JZY5yRRGCRkoOAeuiELKWyo7d77HGoUCQKJFcvG8FRlaQkG', 'USER', 'ACTIVE'),
(32, 'vm.kefirchik@gmail.com', '$2y$10$g1dWfrGthEAYX7RA3FOkR.cGL3zWqNJbKSbpdH.L5xpwvNL8muoNe', 'USER', 'ACTIVE'),
(33, 'kostya.nazaruk@gmail.com', '$2y$10$TmG0KGlOwhqWrko/OPQMiOApVobJSoMVKpTIW47A22Sf5zYRkVSU6', 'USER', 'ACTIVE');

-- --------------------------------------------------------

--
-- Структура таблицы `accounts_verify_codes`
--

CREATE TABLE `accounts_verify_codes` (
  `identifier` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `code` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` enum('email') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `accounts_verify_codes`
--

INSERT INTO `accounts_verify_codes` (`identifier`, `code`, `type`) VALUES
('kostya.nazaruk@gmail.com', 'LXkdy3Nq', 'email'),
('vishotax3@gmail.com', 'uqc2KPYH', 'email'),
('vm.kefirchik@gmail.com', 'OaAWdmCU', 'email');

-- --------------------------------------------------------

--
-- Структура таблицы `announcements`
--

CREATE TABLE `announcements` (
  `id` int NOT NULL,
  `status` enum('ACTIVE','DELETED') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ACTIVE',
  `owner_id` int NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(1200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `features` json NOT NULL,
  `pictures` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `announcements`
--

INSERT INTO `announcements` (`id`, `status`, `owner_id`, `title`, `description`, `price`, `created`, `features`, `pictures`) VALUES
(1, 'DELETED', 18, 'aa', 'asd', 0, '2022-12-23 14:15:06', '[{\"left\": \"11\", \"right\": \"22\"}]', '[]'),
(2, 'DELETED', 18, 'Монитор LG as24mp59g-p', 'Отличное состояние, в комплекте с блоком, 75гц', 200, '2022-12-23 14:59:01', '[{\"left\": \"Производитель\", \"right\": \"LG\"}, {\"left\": \"Диагональ экрана\", \"right\": \"24\\\"\"}, {\"left\": \"Разрешение\", \"right\": \"1080р\"}, {\"left\": \"Тип матрицы\", \"right\": \"IPS\"}]', '[\"https://yams.kufar.by/api/v1/kufar-ads/images/82/8220306404.jpg?rule=gallery\"]'),
(3, 'ACTIVE', 18, 'Автомобиль Volvo S40', 'Отличное состояние, в комплекте с блоком, 75гц', 19200, '2022-12-23 15:02:51', '[{\"left\": \"Марка\", \"right\": \"Volvo\"}, {\"left\": \"Модель\", \"right\": \"S40\"}, {\"left\": \"Поколение\", \"right\": \"II\"}, {\"left\": \"Тип матрицы\", \"right\": \"IPS\"}, {\"left\": \"Пробег\", \"right\": \"285000\"}, {\"left\": \"Объем двигателя\", \"right\": \"1.8 л\"}, {\"left\": \"Коробка передач\", \"right\": \"Механика\"}]', '[\"https://yams.kufar.by/api/v1/kufar-ads/images/49/4934429801.jpg?rule=gallery\", \"https://yams.kufar.by/api/v1/kufar-ads/images/49/4951476439.jpg?rule=gallery\", \"https://yams.kufar.by/api/v1/kufar-ads/images/49/4983394031.jpg?rule=gallery\", \"https://yams.kufar.by/api/v1/kufar-ads/images/49/4900440669.jpg?rule=gallery\", \"https://yams.kufar.by/api/v1/kufar-ads/images/49/4995985157.jpg?rule=gallery\"]'),
(4, 'ACTIVE', 32, 'Чехол samsung S8 plus', 'Чехол для Samsung S8 plus , новый ,не оригинал.\n', 15, '2022-12-23 17:33:31', '[{\"left\": \"Модель телефона\", \"right\": \"Samsung S8 Plus\"}, {\"left\": \"Состояние\", \"right\": \"новый\"}]', '[\"https://yams.kufar.by/api/v1/kufar-ads/images/49/4942290068.jpg?rule=gallery\", \"https://yams.kufar.by/api/v1/kufar-ads/images/49/4967860025.jpg?rule=gallery\"]'),
(5, 'ACTIVE', 32, 'Отличный Рено-Гранд-Сценик', 'Автомобиль в отличном состоянии, обслужен, не требует вложений, версия LIMITED, крепкий кузов без коррозии и царапин, надёжный экономичный мотор (81KW110л.с.)6-ст-я КПП, аккуратный некуренный салон - трансформер, все стекла и оптика - оригинальные без трещин и соколов, богатая комплектация, оригинальный пробег подтверждён сервисными документами, отличная зимняя резина Good Year + летние шины Michelin, 2 ключа, много секретных бардачков и ниш. Пройден гостехосмотр. Диагностика на любой СТО.\n', 36000, '2022-12-23 17:37:10', '[{\"left\": \"Марка\", \"right\": \"Renault\"}, {\"left\": \"Модель\", \"right\": \"Scenic\"}, {\"left\": \"Поколение\", \"right\": \"|||\"}, {\"left\": \"Год\", \"right\": \"2016\"}, {\"left\": \"Тип двигателя\", \"right\": \"Дизель\"}, {\"left\": \"Привод\", \"right\": \"Передний\"}]', '[\"https://yams.kufar.by/api/v1/kufar-ads/images/49/4967449640.jpg?rule=gallery\", \"https://yams.kufar.by/api/v1/kufar-ads/images/49/4999263088.jpg?rule=gallery\", \"https://yams.kufar.by/api/v1/kufar-ads/images/49/4924833045.jpg?rule=gallery\", \"https://yams.kufar.by/api/v1/kufar-ads/images/49/4907786407.jpg?rule=gallery\"]'),
(6, 'ACTIVE', 18, 'Продам говно', 'Ыыы', 99, '2022-12-24 12:36:54', '[{\"_name\": \"\", \"_value\": \"\"}]', '[]'),
(7, 'DELETED', 18, 'test', 'bebr', 1, '2022-12-26 01:06:06', '[{\"left\": \"\", \"name\": \"q\", \"right\": \"\", \"value\": \"w\"}]', '[\"https://sun9-56.userapi.com/impg/Qh-UM4Lp-UPpqo_Hgkl9G---EeAehifeqCCgvg/5J7PGGHmvJI.jpg?size=577x576&quality=95&sign=6269d96944f6c33f9e22fba79a4858da&type=album\"]'),
(8, 'ACTIVE', 18, '1', '2', 0, '2022-12-26 04:45:01', '[{\"left\": \"3\", \"right\": \"4\"}, {\"left\": \"\", \"right\": \"\"}]', '[\"йцу\"]'),
(9, 'DELETED', 18, 'abc', 'xxx', 0, '2022-12-26 06:19:38', '[{\"_name\": \"dd\", \"_value\": \"dd\"}]', '[\"f\"]'),
(10, 'DELETED', 18, 'shsh', 'dd', 0, '2022-12-26 06:19:59', '[{\"left\": \"\", \"name\": \"m\", \"right\": \"\", \"value\": \"d\"}, {\"left\": \"\", \"name\": \"m\", \"right\": \"\", \"value\": \"d\"}]', '[]');

-- --------------------------------------------------------

--
-- Структура таблицы `profiles`
--

CREATE TABLE `profiles` (
  `account_id` int NOT NULL,
  `username` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `picture` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `profiles`
--

INSERT INTO `profiles` (`account_id`, `username`, `picture`) VALUES
(18, 'vishota', 'https://www.meme-arsenal.com/memes/be6e797a3168e22160b6f0cd316bc531.jpg'),
(32, 'user', ''),
(33, 'mrBebra', '');

-- --------------------------------------------------------

--
-- Структура таблицы `tokens`
--

CREATE TABLE `tokens` (
  `account_id` int NOT NULL,
  `token` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `issued` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `tokens`
--

INSERT INTO `tokens` (`account_id`, `token`, `issued`) VALUES
(18, 'iZiGPg2jkVliVcZkJn5nQC6Nrn8I2x', '2022-12-23 07:57:37'),
(18, '9rntktPPTylwrK4zKBqe8uAeVcCob7', '2022-12-23 09:28:37'),
(18, 'ARjUQlV6hc13wLUaRUjBCvu7evEDas', '2022-12-23 14:10:53'),
(32, 'hIOgkx4ijXc0F0RpSi5h6FJKI76UoU', '2022-12-23 16:50:33'),
(18, 'vDyDLINZ3MCghSitKcB52LhY6kuaai', '2022-12-24 12:34:57'),
(33, 'v56MOdesazTb2BujdSboxmnV8qrv9b', '2022-12-24 12:44:52'),
(18, 'kPgmAf8Sdu0XSKWbBzFO77fsizYPvy', '2022-12-26 06:18:05');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Индексы таблицы `accounts_verify_codes`
--
ALTER TABLE `accounts_verify_codes`
  ADD UNIQUE KEY `identifier` (`identifier`);

--
-- Индексы таблицы `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `announcements` (`owner_id`);
ALTER TABLE `announcements` ADD FULLTEXT KEY `title` (`title`,`description`);

--
-- Индексы таблицы `profiles`
--
ALTER TABLE `profiles`
  ADD UNIQUE KEY `account_id` (`account_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Индексы таблицы `tokens`
--
ALTER TABLE `tokens`
  ADD KEY `account_id` (`account_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT для таблицы `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `accounts` (`id`);

--
-- Ограничения внешнего ключа таблицы `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

--
-- Ограничения внешнего ключа таблицы `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

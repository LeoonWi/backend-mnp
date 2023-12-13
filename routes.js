import express from 'express';
import { login, reg, showUser } from './db/user.js';
import { createMeeting, showListMarker, showMeeting } from './db/meeting.js';

var router = express.Router();

router.post('/login', login); // Логин
router.post('/registration', reg); // Регистрация
router.post('/showUser', showUser); // Запрос всех данных пользователя

router.post('/showListMarker', showListMarker); // Запрос на список маркеров
router.post('/createMeeting', createMeeting); // Создание новой встречи и добавление владельца в таблицу участников
router.post('/showMeeting', showMeeting); // Запрос всех встреч


export default router;
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * api/auth/register:
 *  post:
 *      tags: [Auth]
 *      summary: Позволяет зарегистрировать пользователя
 *      response:
 *          200:
 *              description: Пользователь успешно зарегистрирован
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: user@example.com
 *                  password:
 *                    type: string
 *                    example: strongpassword123
 *
 */
router.post("/register", authController.register);

/**
 * @swagger
 * api/auth/login:
 *  post:
 *      tags:   [Auth]
 *      summary: Позволяет войти в учетную запись
 *      response:
 *          200:
 *              description: Вход выполнен успешно
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: user@example.com
 *                  password:
 *                    type: string
 *                    example: strongpassword123
 *
 */
router.post("/login", authController.login);

/**
 * @swagger
 * api/auth/get-users:
 *   get:
 *      tags:   [Auth]
 *      summary: Возвращает список пользователей
 *      responses:
 *          200:
 *              description: Пользователи успешно получены
 *
 */
router.get("/get-users", authController.getUsers);

module.exports = router;

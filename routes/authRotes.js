const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      tags: [Auth]
 *      summary: Позволяет зарегистрировать пользователя
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  login:
 *                    type: string
 *                    example: User
 *                  password:
 *                    type: string
 *                    example: User
 *      responses:
 *         200:
 *            description: Пользователь успешно зарегистрирован
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Пользователь успешно зарегистрирован"
 *
 *         400:
 *            description: Ошибка валидации данных запроса
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    error:
 *                      type: string
 *                      example: "Некорректные данные. Пожалуйста, проверьте ввод."
 *
 *         500:
 *            description: Внутренняя ошибка сервера
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    error:
 *                      type: string
 *                      example: "Произошла ошибка на сервере. Попробуйте позже."
 */
router.post("/register", authController.register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Позволяет войти в учетную запись
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: User
 *               password:
 *                 type: string
 *                 example: User
 *     responses:
 *       200:
 *         description: Вход выполнен успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/get-users:
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

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/register:
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
 *                  login:
 *                    type: string
 *                    example: User
 *                  password:
 *                    type: string
 *                    example: User
 *
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
 *                 example: UserPassword123
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

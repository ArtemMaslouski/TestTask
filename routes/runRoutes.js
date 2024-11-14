const express = require("express");
const router = express.Router();
const runController = require("../controllers/runController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Введите ваш токен в формате **Bearer <токен>**
 */

/**
 * @swagger
 * /api/runs/createRun:
 *  post:
 *      tags: [Run]
 *      summary: Позволяет создать забег
 *      security:
 *        - BearerAuth: []  # Указываем, что требуется токен
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                    distance:
 *                      type: number
 *                      format: double
 *                      example: 32.12
 *                    time:
 *                      type: string
 *                      example: "00:00:00"
 *                    date:
 *                      type: string
 *                      format: date
 *                      example: "2024-11-11"
 *      responses:
 *          201:
 *              description: Забег успешно создан
 *          500:
 *              description: Ошибка создания забега (неверный токен)
 *          400:
 *              description: Неверный токен
 */
router.post("/createRun", authMiddleware.verifyToken, runController.createRun);

/**
 * @swagger
 * /api/runs/getRuns:
 *  get:
 *      tags: [Run]
 *      summary: Позволяет получить данные обо всех забегах
 *      security:
 *        - BearerAuth: []  # Указываем, что требуется токен
 *      responses:
 *          200:
 *              description: Забеги успешно получены
 *          500:
 *              description: Ошибка сервера
 */
router.get("/getRuns", authMiddleware.verifyToken, runController.getRuns);

/**
 * @swagger
 * /api/runs/deleteRuns/{id}:
 *  delete:
 *     tags: [Run]
 *     summary: Удаляет данные о забеге исходя из его id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Введите ID забега для удаления.
 *         schema:
 *           type : integer
 *     security:
 *       - BearerAuth: []  # Указываем, что требуется токен
 *     responses:
 *       200:
 *         description: Забег успешно удален.
 *       404:
 *         description: Забег не найден.
 */
router.delete(
  "/deleteRuns/:id",
  authMiddleware.verifyToken,
  runController.deleteRun
);

/**
 * @swagger
 * /api/runs/updateRun/{id}:
 *  put:
 *      tags: [Run]
 *      summary: Обновляет запись о забеге по ID.
 *      security:
 *        - BearerAuth: []  # Указываем, что требуется токен
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        distance:
 *                          type: number
 *                          format: double
 *                          example: 32.12
 *                        time:
 *                          type: string
 *                          example: "00:00:00"
 *                        date:
 *                          type: string
 *                          format: date
 *                          example: "2024-11-11"
 *
 */
router.put(
  "/updateRuns/:id",
  authMiddleware.verifyToken,
  runController.updateRun
);

/**
 * @swagger
 * /api/runs/getWeeklyUpdates:
 *   get:
 *     tags: [Run]
 *     summary: Получает еженедельный отчет о забегах.
 *     responses:
 *          200:
 *              description: Данные о забеге
 *          500:
 *              description: Ошибка получения данных
 *     security:
 *       - BearerAuth: []  # Указываем, что требуется токен
 *
 */
router.get(
  "/getWeeklyUpdates",
  authMiddleware.verifyToken,
  runController.getWeeklyReport
);

module.exports = router;

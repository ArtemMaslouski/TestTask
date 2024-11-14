const express = require("express");
const router = express.Router();
const runController = require("../controllers/runController");
const authMiddleware = require("../middlewares/authMiddleware");
/**
 * @swagger
 * api/runs/createRun:
 *  post:
 *      tags: [Run]
 *      summary: Позволяет создать забег
 *      response:
 *          201:
 *              description: Забег успешно создан
 *          401:
 *              description: Ошибка создания забега
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
 *                      format: string
 *                      example: "00:00:00"
 *                    date:
 *                      type: string
 *                      format: string
 *                      example: "1111-11-11"
 *
 *
 */
router.post("/createRun", authMiddleware.verifyToken, runController.createRun);

/**
 * @swagger
 * api/runs/getRuns:
 *  get:
 *      tags: [Run]
 *      summary: Позволяет получить данные обо всех забегах
 *      responses:
 *          200:
 *              description: Забеги успешно получены
 *          500:
 *              description: Ошибка сервера
 *
 *
 *
 */
router.get("/getRuns", authMiddleware.verifyToken, runController.getRuns);

/**
 * @swagger
 * api/runs/deleteRun/{id}:
 *  delete:
 *     tags: [Run]
 *     summary: Удаляет данные о забеге исходя из его id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Введите ID забега
 *         schema:
 *           type : integer
 */
router.delete(
  "/deleteRuns/:id",
  authMiddleware.verifyToken,
  runController.deleteRun
);

/**
 * @swagger
 * api/runs/updateRun/{id}:
 *  put:
 *      tags: [Run]
 *      summary: Обновляет запись о забеге
 *      response:
 *          404:
 *              description: Что-то пошло не так
 *          201:
 *              description: Данные успешно обновлены
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  properties:
 *                    distance:
 *                      type: number
 *                      format: double
 *                      example: 32.12
 *                    time:
 *                      type: string
 *                      format: time
 *                      example: "00:00:00"
 *                    date:
 *                      type: string
 *                      format: date
 *                      example: "1111-11-11"
 *
 */
router.put(
  "/updateRuns/:id",
  authMiddleware.verifyToken,
  runController.updateRun
);

router.get(
  "/getWeeklyUpdates",
  authMiddleware.verifyToken,
  runController.getWeeklyReport
);

module.exports = router;

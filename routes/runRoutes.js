const express = require("express");
const router = express.Router();
const runController = require("../controllers/runController");
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
 *                      format: time
 *                      example: "00:00:00"
 *                    date:
 *                      type: string
 *                      format: date
 *                      example: "1111-11-11"
 *
 *
 */
router.post("/createRun", runController.createRun);

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
router.get("/getRuns", runController.getRuns);

router.delete("/deleteRuns/:id", runController.deleteRun);

router.put("/updateRuns/:id", runController.updateRun);

module.exports = router;

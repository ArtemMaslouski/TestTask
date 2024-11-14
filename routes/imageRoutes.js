const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

/**
 * @swagger
 * /api/image/uploadImages:
 *   post:
 *     tags: [Image]
 *     summary: Позволяет загрузить изображение на сервер
 *     description: Загружает изображение на сервер.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Изображение загружено успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 url:
 *                   type: string
 *       400:
 *         description: Ошибка загрузки изображения или файл не был загружен
 */

router.post("/uploadImages", imageController.uploadImage);

/**
 * @swagger
 * /api/image/getImages:
 *   get:
 *      tags:   [Image]
 *      summary: Возвращает список изображений
 *      responses:
 *          200:
 *              description: Изображения успешно получены
 *
 */
router.get("/getImages", imageController.getImages);

module.exports = router;

const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
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
 * /api/image/uploadImages:
 *   post:
 *     tags: [Image]
 *     summary: Позволяет загрузить изображение на сервер
 *     description: Загружает изображение на сервер.
 *     security:
 *       - BearerAuth: []  # Укажите, что требуется токен авторизации
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
 *                   example: "Изображение загружено успешно"
 *                 url:
 *                   type: string
 *                   example: "http://example.com/path/to/image.jpg"
 *       400:
 *         description: Ошибка загрузки изображения или файл не был загружен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ошибка загрузки изображения. Пожалуйста, проверьте файл."
 *
 */

router.post(
  "/uploadImages",
  authMiddleware.verifyToken,
  imageController.uploadImage
);

/**
 * @swagger
 * /api/image/getImages:
 *   get:
 *      tags:   [Image]
 *      summary: Возвращает список изображений
 *      security:
 *        - BearerAuth: []  # Указываем, что требуется токен
 *      responses:
 *          200:
 *              description: Изображения успешно получены
 *
 */
router.get("/getImages", authMiddleware.verifyToken, imageController.getImages);

module.exports = router;

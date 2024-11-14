const multer = require("multer");
const path = require("path");
const fs = require("fs");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
// Настройка хранилища мультера
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.originalname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage });

//Функция,позволяющая загрузить изображение
exports.uploadImage = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).send("Не удалось загрузить изображение");
    }

    if (!req.file) {
      return res.status(400).send("Файл не был загружен");
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    console.log(req.file.filename);
    res.json({ message: "Изображение загружено успешно", url: imageUrl });
  });
};

//Функция позволяюзая получить список изображений и ссылки на них
exports.getImages = (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) {
      return res.status(500).send(err);
    }

    const imageUrls = files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file}`
    );
    res.json(imageUrls);
  });
};

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

//Функция для регистрации
exports.register = async (req, res) => {
  const { login, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "Пользователь успешно создан" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Функция для логина
exports.login = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { login } });

    if (!user || !bcrypt.compare(password, user.password)) {
      res.status(401).json({
        message: "Пользователя не существует либо неправильный пароль",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Функция для получения всех пользователей
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

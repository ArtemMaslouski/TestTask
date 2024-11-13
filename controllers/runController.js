const { PrismaClient } = require("@prisma/client");
const { message } = require("statuses");
const prisma = new PrismaClient();

// Создание забега
exports.createRun = async (req, res) => {
  const { distance, time, date } = req.body;

  try {
    const newRun = await prisma.run.create({
      data: {
        distance,
        time,
        date: new Date(date),
      },
    });
    res.status(201).json(newRun, { message: "Забег успешно создан" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Получение данных о всех забегах
exports.getRuns = async (req, res) => {
  try {
    const runs = await prisma.run.findMany();
    res.json(runs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Удаление данных о забеге исходя из его id
exports.deleteRun = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.run.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send({ message: "Забег успешно удален" });
  } catch (error) {
    res.status(404).json({ error: "Забег не найден" });
  }
};

//Обновление данных о забеге исходя из его id
exports.updateRun = async (req, res) => {
  const { id } = req.params;
  const { distance, time, date } = req.body;

  try {
    const updatedRun = await prisma.run.update({
      where: { id: parseInt(id) },
      data: { distance, time, date: new Date(date) },
    });
    res.status(201).json(updatedRun);
  } catch (error) {
    res.status(404).json({ error: "Забег не найден" });
  }
};

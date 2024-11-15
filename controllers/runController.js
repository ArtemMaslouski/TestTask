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
        date,
        userId: req.userId,
      },
    });
    res.status(201).json({ message: "Забег успешно создан" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение данных о всех забегах
exports.getRuns = async (req, res) => {
  try {
    const runs = await prisma.run.findMany({
      where: { userId: req.userId },
    });
    res.json(runs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Удаление данных о забеге исходя из его id
exports.deleteRun = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.run.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Забег успешно удален" });
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
      data: { distance, time, date },
    });
    res.status(201).json(updatedRun);
  } catch (error) {
    res.status(404).json({ error: "Забег не найден" });
  }
};

//Создание еженедельного отчета о забеге
exports.getWeeklyReport = async (req, res) => {
  try {
    const runs = await prisma.run.findMany({
      where: { userId: req.userId },
    });

    const weeklyData = {};

    runs.forEach((run) => {
      const date = new Date(run.date);
      const firstDayOfTheWeek = new Date(
        date.setDate(date.getDate() - date.getDay() + 1)
      );
      const lastDayOfTheWeek = new Date(
        date.setDate(firstDayOfTheWeek.getDate() + 6)
      );

      const key = `${firstDayOfTheWeek.toISOString().split("T")[0]} / ${
        lastDayOfTheWeek.toISOString().split("T")[0]
      }`;

      if (!weeklyData[key]) {
        weeklyData[key] = {
          totalDistance: 0,
          totalTime: 0,
          count: 0,
        };
      }

      weeklyData[key].totalDistance += run.distance;
      weeklyData[key].totalTime += convertToSeconds(run.time);
      weeklyData[key].count++;
    });

    const report = Object.keys(weeklyData).map((week) => {
      const { totalDistance, totalTime, count } = weeklyData[week];
      const averageSpeed =
        count > 0 ? (totalDistance / (totalTime / 3600)).toFixed(2) : 0;
      const averageTime =
        count > 0 ? convertSecondsToTime(totalTime / count) : "00:00:00";

      return {
        week,
        averageSpeed,
        averageTime,
        totalDistance,
      };
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function convertToSeconds(time) {
  const parts = time.split(":");
  return (
    parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
  );
}

function convertSecondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
}

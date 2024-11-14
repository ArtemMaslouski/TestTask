// runController.test.js
const { deleteRun } = require("../controllers/runController"); // Импортируем вашу функцию
const { PrismaClient } = require("@prisma/client");

// Мокаем Prisma Client
jest.mock("@prisma/client");

describe("deleteRun", () => {
  let req, res;
  let mockDelete;

  beforeEach(() => {
    // Создаем пустые объекты запроса и ответа
    req = {
      params: {
        id: "1", // ID забега для удаления
      },
    };
    res = {
      json: jest.fn(), // Мокаем метод json
      status: jest.fn().mockReturnThis(), // Мокаем метод status для цепочки вызовов
    };

    // Настраиваем мок для метода delete
    mockDelete = jest.fn();
    PrismaClient.prototype.run = { delete: mockDelete };
  });

  it("should delete a run and return success message", async () => {
    // Устанавливаем поведение мока на успешное удаление
    mockDelete.mockResolvedValue({ id: 1 });

    await deleteRun(req, res); // Вызываем функцию

    expect(res.status).toHaveBeenCalledWith(200); // Проверяем, что статус 200 был установлен
    expect(res.json).toHaveBeenCalledWith({ message: "Забег успешно удален" }); // Проверяем сообщение об успешном удалении
  });

  it("should handle not found error", async () => {
    const mockError = new Error("Not Found");

    // Устанавливаем поведение мока на выброс ошибки при удалении
    mockDelete.mockRejectedValue(mockError);

    await deleteRun(req, res); // Вызываем функцию

    expect(res.status).toHaveBeenCalledWith(404); // Проверяем, что статус 404 был установлен
    expect(res.json).toHaveBeenCalledWith({ error: "Забег не найден" }); // Проверяем сообщение об ошибке
  });
});

const { getUsers } = require("../controllers/authController"); // Импортируем вашу функцию
const { PrismaClient } = require("@prisma/client");

jest.mock("@prisma/client");

describe("getUsers", () => {
  let req, res;
  let mockFindMany;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    mockFindMany = jest.fn();
    PrismaClient.prototype.user = { findMany: mockFindMany };
  });

  it("should return a list of users", async () => {
    const mockUsers = [
      { id: 1, login: "user1" },
      { id: 2, login: "user2" },
    ];

    mockFindMany.mockResolvedValue(mockUsers);

    await getUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(mockUsers);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should handle server error", async () => {
    const mockError = new Error("Database error");

    mockFindMany.mockRejectedValue(mockError);

    await getUsers(req, res); // Вызываем функцию

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Ошибка сервера" });
  });
});

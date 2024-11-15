const { deleteRun } = require("../controllers/runController");
const { PrismaClient } = require("@prisma/client");

jest.mock("@prisma/client");

describe("deleteRun", () => {
  let req, res;
  let mockDelete;

  beforeEach(() => {
    req = {
      params: {
        id: "1",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    mockDelete = jest.fn();
    PrismaClient.prototype.run = { delete: mockDelete };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a run and return success message", async () => {
    mockDelete.mockResolvedValue({ id: 1 });

    await deleteRun(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Забег успешно удален" });
  });

  it("should handle not found error", async () => {
    const mockError = new Error("Not Found");

    mockDelete.mockRejectedValue(mockError);

    await deleteRun(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Забег не найден" });
  });
});

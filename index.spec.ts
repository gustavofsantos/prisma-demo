import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.task.deleteMany();
});

it("Should create a task", async () => {
  await prisma.task.create({
    data: {
      title: "Minha primeira tarefa"
    }
  });

  const tasks = await prisma.task.findMany();
  expect(tasks).toHaveLength(1);
});

it("Should validate default properties of a task", async () => {
  const task = await prisma.task.create({
    data: {
      title: "Minha primeira tarefa"
    }
  });

  expect(task.id).toStrictEqual(expect.any(String));
  expect(task.state).toBe(true);
  expect(task.title).toBe("Minha primeira tarefa");
});

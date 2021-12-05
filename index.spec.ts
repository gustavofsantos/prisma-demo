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

it("Should create and find a task by its id", async () => {
  const { id } = await prisma.task.create({
    data: {
      title: "Minha primeira task"
    }
  });

  const task = await prisma.task.findUnique({
    where: { id }
  });

  expect(task.id).toBe(id);
});

it("Should create and delete a task", async () => {
  const { id } = await prisma.task.create({
    data: {
      title: "Minha primeira task"
    }
  });

  await prisma.task.delete({
    where: { id }
  });

  const tasks = await prisma.task.findMany();
  expect(tasks).toHaveLength(0);
});

it("Should create and update a task", async () => {
  const { id } = await prisma.task.create({
    data: {
      title: "Minha primeira task"
    }
  });

  await prisma.task.update({
    where: { id },
    data: {
      title: "Minha segunda task"
    }
  });

  const task = await prisma.task.findUnique({
    where: { id }
  });

  expect(task.title).toBe("Minha segunda task");
});

it("A project should have many tasks", async () => {
  const { id } = await prisma.project.create({
    data: {
      title: "Meu primeiro projeto"
    }
  });

  await prisma.task.create({
    data: {
      title: "Tarefa 1",
      projectId: id
    }
  });

  await prisma.task.create({
    data: {
      title: "Tarefa 2",
      state: false,
      projectId: id
    }
  });

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: true
    }
  });

  expect(project.tasks).toHaveLength(2);
});

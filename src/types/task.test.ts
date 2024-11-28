import { isTask, isTaskList } from "./task";

test("test Task is Task", () => {
  const task = {
    title: "New Task Added",
    dueDate: "Mon",
    id: 0,
    effortLevel: undefined,
    priority: undefined,
    status: undefined,
    project: "Kanban",
    parentId: 1,
  };

  const isTaskResult = isTask(task);
  console.log(isTaskResult);
  expect(isTaskResult).toBe(true);
});

test("test Task is not TaskList", () => {
  const task = {
    title: "New Task Added",
    dueDate: "Mon",
    id: 0,
    effortLevel: undefined,
    priority: undefined,
    status: undefined,
    project: "Kanban",
    parentId: 1,
  };

  const isTaskResult = isTaskList(task);
  console.log(isTaskResult);
  expect(isTaskResult).toBe(false);
});

test("test TaskList is TaskList", () => {
  const taskList = {
    title: "TODO",
    id: 1,
  };
  const isTaskListResult = isTaskList(taskList);
  console.log(isTaskListResult);
  expect(isTaskListResult).toBe(true);
});

test("test TaskList is not Task", () => {
  const taskList = {
    title: "TODO",
    id: 1,
  };
  const isTaskResult = isTask(taskList);
  console.log(isTaskResult);
  expect(isTaskResult).toBe(false);
});

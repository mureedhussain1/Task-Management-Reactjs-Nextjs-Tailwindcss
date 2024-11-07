import { Task, TaskAction } from "@/model/task";
import { Status } from "../enums/Status";
import * as actions from "./ActionTypes";
import { Priority } from "@/enums/Priority";
import { EffortLevel } from "@/enums/EffortLevel";

let lastTaskId = 3;

export default function tasksReducer(tasks: Task[], action: TaskAction) {
  switch (action.type) {
    case actions.TASK_ADDED: {
      const task = { ...action.task };
      task.id = ++lastTaskId;
      task.status = Status.TODO;
      return [...tasks, task];
    }
    case actions.TASK_CHANGED:
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    case actions.TASK_REMOVED:
      return tasks.filter((t) => t.id !== action.task.id);
    default:
      throw Error("Unknown action: " + action.type);
  }
}

export const initialTasks: Task[] = [
  {
    id: 1,
    dueDate: "MON",
    project: "Kanban",
    effortLevel: EffortLevel.HARD,
    priority: Priority.HIGH,
    title: "Add Drag and Drop for Kanban cards",
    status: undefined,
  },
  {
    id: 2,
    dueDate: "MON",
    project: "Kanban",
    effortLevel: EffortLevel.MODERATE,
    priority: Priority.MEDIUM,
    title: "Add Drag and Drop for Kanban cards",
    status: undefined,
  },
  {
    id: 3,
    dueDate: "MON",
    project: "Kanban",
    title: "Add configuration",
    effortLevel: undefined,
    priority: undefined,
    status: undefined,
  },
];

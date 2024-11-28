import { EffortLevel } from "@/enums/EffortLevel";
import { Priority } from "@/enums/Priority";
import { Status } from "@/enums/Status";

export type ActionData = Task | TaskList | number[];

export function isDndData(data: ActionData): data is number[] {
  return Array.isArray(data);
}

export function isTaskOrList(
  isTaskOrList: ActionData,
): isTaskOrList is Task | TaskList {
  return isTask(isTaskOrList) || isTaskList(isTaskOrList);
}

export function isTask(isTask: ActionData): isTask is Task {
  return "dueDate" in isTask;
}

export function isTaskList(isTaskList: ActionData): isTaskList is TaskList {
  return "dueDate" in isTaskList === false;
}

export type TaskList = {
  id: number;
  title: string;
};

export type Task = {
  id: number;
  title: string;
  dueDate: Required<string>;
  effortLevel: EffortLevel | undefined;
  priority: Priority | undefined;
  status: Status | undefined;
  project: string;
  parentId: number;
};



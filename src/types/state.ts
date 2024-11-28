import { Task, TaskList } from "./task";

export type AppStateType = {
  tasks: Task[];
  taskLists: TaskList[];
};

export interface ActionType<T> {
  type: string;
  payload: T;
}

export type TaskAction = {
  type: string;
  task: Task | undefined;
  indices: number[] | undefined;
};

export type TasksAction = {
  type: string;
  tasks: Task[];
};

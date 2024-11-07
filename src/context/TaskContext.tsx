"use client"; // This is a client component 👈🏽

import { Task, TaskAction } from "@/model/task";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import tasksReducer from "./TaskReducer";

const TasksContext = createContext<Task[] | null>(null);
const TasksDispatchContext = createContext<Dispatch<TaskAction> | null>(null);
// const TasksDispatchContext = createContext(null);

export function TasksProvider({
  children,
  initialTasks,
}: Readonly<{
  children: ReactNode;
  initialTasks: Task[];
}>) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

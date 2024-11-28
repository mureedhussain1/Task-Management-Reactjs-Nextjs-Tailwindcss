"use client";

import { AppStateType, ActionType } from "@/types/state";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { initialState, tasksListReducer } from "./TaskReducer";
import { ActionData } from "@/types/task";

const TasksContext = createContext<AppStateType | null>(null);
const TasksDispatchContext = createContext<
  Dispatch<ActionType<ActionData>> | undefined
>(undefined);

export const initializer = (emptyState: AppStateType) => {
  const a =
    typeof window === "object"
      ? window.localStorage.getItem("tasks")
      : undefined;
  return a === null
    ? initialState
    : typeof a === "string"
      ? JSON.parse(a)
      : emptyState;
};

export function TasksProvider({
  children,
  emptyState,
}: Readonly<{
  children: ReactNode;
  emptyState: AppStateType;
}>) {
  const [task, dispatch] = useReducer(
    tasksListReducer,
    emptyState,
    initializer,
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  return (
    <TasksContext.Provider value={task}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

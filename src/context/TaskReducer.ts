"use client";
import {
  ActionData,
  isTask,
  isTaskList,
  isTaskOrList,
  Task,
  TaskList,
} from "@/types/task";
import { ActionType, AppStateType } from "@/types/state";
import { Status } from "../enums/Status";
import * as actions from "./ActionTypes";
import { Priority } from "@/enums/Priority";
import { EffortLevel } from "@/enums/EffortLevel";
import { arrayMove } from "@dnd-kit/sortable";

const addTaskList = (taskLists: TaskList[]) => {
  const id = taskLists.length + 1;
  const taskList: TaskList = { id: id, title: `Task List ${id}` };
  return [...taskLists, taskList];
};
const addTask = (tasks: Task[], payload: ActionData) => {
  if (!payload || !isTask(payload)) return [...tasks];
  const task: Task = { ...payload };
  const lastTaskId = tasks.length + 1;
  task.id = lastTaskId;
  task.title = task.title + " " + lastTaskId;
  task.status = Status.TODO;
  task.parentId = 1;
  return [...tasks, task];
};
const updateTask = (tasks: Task[], payload: ActionData) => {
  if (!payload || !isTask(payload)) return [...tasks];
  return tasks.map((t) => {
    if (t.id === payload.id) {
      return payload;
    } else {
      return t;
    }
  });
};
const updateTaskList: (
  taskLists: TaskList[],
  payload: ActionData,
) => TaskList[] = (taskLists, payload) => {
  if (!payload || !isTaskList(payload)) return [...taskLists];
  const item = taskLists.find((list) => list.id === payload.id);
  if (!item || item.title === payload.title) return [...taskLists];
  return taskLists.map((t) => {
    if (t.id === payload.id) {
      return payload;
    } else {
      return t;
    }
  });
};
const removeTaskList = (taskLists: TaskList[], payload: ActionData) => {
  if (!payload || !isTaskOrList(payload)) return [...taskLists];
  return taskLists.filter((t) => t.id !== payload.id);
};
const removeTask = (tasks: Task[], payload: ActionData) => {
  if (!payload || !isTaskOrList(payload)) return [...tasks];
  return tasks.filter((t) => t.id !== payload.id);
};

const moveTaskToNewList = (state: AppStateType, payload: ActionData) => {
  if (!payload || !Array.isArray(payload) || payload.length < 1)
    return { ...state };
  else {
    let newId: number = 1;
    state.taskLists.forEach((list) => {
      newId = list.id > newId ? list.id : newId;
    });
    const taskList: TaskList = { id: ++newId, title: `Task List ${newId}` };
    const tasks = [...state.tasks].map((task) => {
      if (task.id === payload[0]) {
        const newTask = { ...task };
        newTask.parentId = newId;
        return newTask;
      } else return task;
    });
    return { taskLists: [...state.taskLists, taskList], tasks: [...tasks] };
  }
};

const moveTask = (tasks: Task[], payload: ActionData) => {
  if (!payload || !Array.isArray(payload) || payload.length < 2)
    return [...tasks];
  else {
    const task = [...tasks];
    if (
      payload.length >= 3 &&
      task[payload[2]] &&
      task[payload[0]].parentId !== payload[2]
    ) {
      task[payload[0]].parentId = payload[2];
    }
    return arrayMove(task, payload[0], payload[1]);
  }
};

export function tasksListReducer(
  state: AppStateType,
  action: ActionType<ActionData>,
) {
  switch (action.type) {
    case actions.TASK_ADDED: {
      const tasks = addTask(state.tasks, action.payload);
      return { ...state, tasks };
    }
    case actions.TASK_CHANGED: {
      const tasks = updateTask(state.tasks, action.payload);
      return { ...state, tasks };
    }
    case actions.TASK_REMOVED: {
      const tasks = removeTask(state.tasks, action.payload);
      return { ...state, tasks };
    }
    case actions.TASK_MOVED: {
      const tasks = moveTask(state.tasks, action.payload);
      return { ...state, tasks };
    }
    case actions.TASK_LIST_ADDED: {
      const taskLists = addTaskList(state.taskLists);
      return { ...state, taskLists };
    }
    case actions.TASK_LIST_CHANGED: {
      const taskLists = updateTaskList(state.taskLists, action.payload);
      return { ...state, taskLists };
    }
    case actions.TASK_LIST_REMOVED: {
      const taskLists = removeTaskList(state.taskLists, action.payload);
      return { ...state, taskLists };
    }
    case actions.TASK_MOVED_NEW_LIST:
      return moveTaskToNewList(state, action.payload);
    default:
      throw Error("Unknown action: " + action.type);
  }
}

// export default function tasksReducer(tasks: Task[], action: TaskAction) {
//   switch (action.type) {
//     case actions.TASK_ADDED: {
//       if (!action.task) return [...tasks];
//       const task = { ...action.task };
//       task.id = ++lastTaskId;
//       task.status = Status.TODO;
//       task.parentId = 1;
//       return [...tasks, task];
//     }
//     case actions.TASK_CHANGED:
//       if (!action.task) return [...tasks];
//       return tasks.map((t) => {
//         if (t.id === action.task!.id) {
//           return action.task;
//         } else {
//           return t;
//         }
//       });
//     case actions.TASK_REMOVED:
//       if (!action.task) return [...tasks];
//       return tasks.filter((t) => t.id !== action.task!.id);
//     case actions.TASK_MOVED:
//       if (!action.indices || action.indices.length < 2) return [...tasks];
//       return arrayMove([...tasks], action.indices[0], action.indices[1]);
//     default:
//       throw Error("Unknown action: " + action.type);
//   }
// }

export const initialTasks: Task[] = [
  {
    id: 1,
    dueDate: "MON",
    project: "Kanban",
    effortLevel: EffortLevel.HARD,
    priority: Priority.HIGH,
    title: "Add Drag and Drop",
    status: undefined,
    parentId: 1,
  },
  {
    id: 2,
    dueDate: "MON",
    project: "Kanban",
    effortLevel: EffortLevel.MODERATE,
    priority: Priority.MEDIUM,
    title: "Add Drag and Drop for Kanban cards",
    status: undefined,
    parentId: 1,
  },
  {
    id: 3,
    dueDate: "MON",
    project: "Kanban",
    title: "Add configuration",
    effortLevel: undefined,
    priority: undefined,
    status: undefined,
    parentId: 2,
  },
];

export const initialState: AppStateType = {
  tasks: initialTasks,
  taskLists: [
    { id: 1, title: "TODO" },
    { id: 2, title: "DONE" },
  ],
};
export const emptyState: AppStateType = {
  tasks: [],
  taskLists: [],
};

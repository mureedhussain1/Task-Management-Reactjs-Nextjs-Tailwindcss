"use client";
import KanbanCard from "./kanban-card";
import { FC, KeyboardEvent, ReactNode } from "react";
import { useTasksContext, useTasksDispatch } from "@/context/TaskContext";
import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TASK_LIST_CHANGED, TASK_LIST_REMOVED } from "@/context/ActionTypes";
import { PiDotsNine, PiInfo, PiX } from "react-icons/pi";
import Toasts from "./Toasts";
import { EMPTY_PLACEHOLDER_PREFIX } from "./kanban-board";
import { useDroppable } from "@dnd-kit/core";

interface IKanbanList {
  title: string | null;
  id: number;
  untitledIndex: number;
}

export function SortableItem(
  props: Readonly<{ id: number | string; children: ReactNode }>,
) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: "3px 0",
    opacity: isDragging ? "0.4" : "1",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}

const KanbanList: FC<IKanbanList> = ({ title, id = 1, untitledIndex = -1 }) => {
  const tasks = useTasksContext()?.tasks.filter((task) => {
    return task.parentId === id;
  });

  const dispatch = useTasksDispatch();
  const handleKeyDown = (event: KeyboardEvent<HTMLHeadingElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  const updateListLabel = (newTitle: string) => {
    if (id && newTitle !== title) {
      dispatch?.({
        type: TASK_LIST_CHANGED,
        payload: {
          id: id,
          title: newTitle,
        },
      });
    } else {
      title = newTitle;
    }
  };

  const ids: { id: number }[] = tasks
    ? tasks.map((task) => {
        return { id: task.id };
      })
    : [];
  const toasts = new Toasts();

  function removeList(): void {
    if (tasks?.length && tasks.length > 0) {
      toasts.showError(
        "Error",
        "Before deleting resolve all tasks in the list",
      );
    } else {
      dispatch?.({
        type: TASK_LIST_REMOVED,
        payload: {
          id: id,
          title: title ?? "",
        },
      });
      toasts.showMessage("Done", "Task List has been Removed", PiInfo);
    }
  }
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="max-h-90vh mx-3 w-1/3 min-w-80 overflow-hidden rounded-md bg-blue-100 py-3">
      <div className="group flex justify-between px-3 pt-3">
        <div className="inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="inline size-5 text-blue-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
            />
          </svg>

          <h1
            contentEditable="true"
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            onBlur={(e) => {
              updateListLabel(e.target.textContent ?? "");
            }}
            className="ms-2 inline align-middle font-sans text-lg font-bold text-blue-700"
          >
            {title && title?.length > 0
              ? title
              : "Untitled List " +
                (untitledIndex >= 0 ? untitledIndex + 1 : "")}
          </h1>
        </div>
        <div>
          <button className="float-right mx-2 text-gray-600 opacity-0 transition duration-300 ease-in hover:text-black active:scale-110 active:text-blue-700 group-hover:opacity-100">
            <PiDotsNine size={20} />
          </button>
          <button
            onClick={removeList}
            className="float-right mx-2 text-gray-600 opacity-0 transition duration-300 ease-in hover:text-black active:scale-110 active:text-blue-700 group-hover:opacity-100"
          >
            <PiX size={20} />
          </button>
        </div>
      </div>

      <SortableContext
        items={ids.length > 0 ? ids : [EMPTY_PLACEHOLDER_PREFIX + id]}
        strategy={rectSortingStrategy}
        id={`${id}`}
      >
        <div
          ref={setNodeRef}
          className="my-3 h-full overflow-y-auto overflow-x-clip px-3"
        >
          {/* {tasks?.length === 0 && (
            // <SortableItem id={EMPTY_PLACEHOLDER_PREFIX + id}>
            <div
              id={EMPTY_PLACEHOLDER_PREFIX + id}
              className="flex h-full w-full items-center justify-center border-x-slate-100 pb-20 text-blue-700 opacity-50"
            >
              No Tasks ...
            </div>
            // </SortableItem>
          )} */}
          {tasks?.map((task) => (
            <SortableItem id={task.id} key={task.id}>
              <KanbanCard
                key={task.id}
                date={task.dueDate}
                project={task.project}
                taskTitle={task.title}
                effort={task.effortLevel}
                priority={task.priority}
              />
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
export default KanbanList;

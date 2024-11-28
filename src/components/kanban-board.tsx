"use client";

import {
  closestCenter,
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import KanbanList, { SortableItem } from "./kanban-list";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useTasksContext, useTasksDispatch } from "@/context/TaskContext";
import {
  TASK_LIST_ADDED,
  TASK_MOVED,
  TASK_MOVED_NEW_LIST,
} from "@/context/ActionTypes";
import Toasts from "./Toasts";
import { useState } from "react";
import KanbanCard from "./kanban-card";
import { Task } from "@/types/task";
import { createPortal, unstable_batchedUpdates } from "react-dom";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export const EMPTY_PLACEHOLDER_PREFIX = "no-task-";

const KanbanBoard: React.FC = () => {
  const state = useTasksContext();
  const tasks = state?.tasks;
  const [isDragging, setIsDragging] = useState(false);
  const [activeId, setActiveId] = useState<number | string | null>(null);
  const activeTask: Task | undefined = activeId
    ? tasks?.find((item) => item.id === (activeId as number))
    : undefined;
  const untitledList =
    state?.taskLists
      .filter(
        (list) =>
          list.title.length === 0 ||
          list.title.toLowerCase().includes("untitled"),
      )
      ?.map((list) => list.id) ?? [];
  const dispatch = useTasksDispatch();
  const PLACEHOLDER_ID = "placeholder";
  const getUntitledIndex = (id: number) => {
    return untitledList.indexOf(id);
  };
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleAddColumn() {
    dispatch?.({
      type: TASK_LIST_ADDED,
      payload: [],
    });
    toasts.showSuccess("List Created", "New Task List has been added");
  }
  const toasts = new Toasts();

  return (
    <div className="flex">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {state?.taskLists.map((list) => (
          <KanbanList
            key={list.id}
            title={list.title}
            id={list.id}
            untitledIndex={getUntitledIndex(list.id)}
          />
        ))}

        <SortableItem id={PLACEHOLDER_ID}>
          <button
            id={PLACEHOLDER_ID}
            className="max-h-90vh mx-3 w-1/3 min-w-80 rounded-md border border-dashed border-slate-500 py-3 text-white opacity-50"
            onClick={handleAddColumn}
          >
            + Add column
          </button>
        </SortableItem>
        {/* </SortableContext> */}

        {activeId &&
          activeTask &&
          createPortal(
            <DragOverlay adjustScale={false} dropAnimation={dropAnimation}>
              <div className="opacity-100">
                <KanbanCard
                  key={activeTask.id}
                  date={activeTask.dueDate}
                  project={activeTask.project}
                  taskTitle={activeTask.title}
                  effort={activeTask.effortLevel}
                  priority={activeTask.priority}
                />
              </div>
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );

  function findContainerId(taskId: number) {
    return tasks?.find((item) => {
      return item.id === taskId;
    })?.parentId;
  }
  function handleDragStart(event: DragStartEvent) {
    setIsDragging(true);
    setActiveId(event.active.id);
  }

  function handleDragCancel() {
    if (activeId) {
      setActiveId(null);
    }

    setIsDragging(false);
  }

  function handleDragOver(event: DragOverEvent) {
    const active = event.active;
    const over = event.over;

    if (!active || !over || !tasks) {
      return;
    }
    const overId = over.id;
    const activeId = active.id;

    const activeContainer = findContainerId(activeId as number);
    const activeIndex = tasks?.findIndex((task) => task.id === activeId);

    if (
      overId &&
      typeof overId === "string" &&
      overId?.includes(EMPTY_PLACEHOLDER_PREFIX)
    ) {
      const overContainerContent = overId.replace(EMPTY_PLACEHOLDER_PREFIX, "");
      if (Number.parseInt(overContainerContent)) {
        const overContainer: number = Number.parseInt(overContainerContent);
        unstable_batchedUpdates(() => {
          if (activeContainer !== overContainer)
            dispatch?.({
              type: TASK_MOVED,
              payload: [activeIndex, activeIndex, overContainer],
            });
        });
      }

      return;
    }

    const overContainer = findContainerId(overId as number);
    const overIndex = tasks?.findIndex((task) => task.id === overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    if (activeIndex !== overIndex) {
      unstable_batchedUpdates(() => {
        dispatch?.({
          type: TASK_MOVED,
          payload:
            overContainer && overContainer != activeContainer
              ? [activeIndex, overIndex, overContainer]
              : [activeIndex, overIndex],
        });
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const active = event.active;
    const over = event.over;
    const activeId = active.id;

    if (!active || !over || !tasks) {
      setActiveId(null);
      setIsDragging(false);
      return;
    }
    const overId = over.id;

    if (overId === PLACEHOLDER_ID) {
      dispatch?.({
        type: TASK_MOVED_NEW_LIST,
        payload: [activeId as number],
      });
      toasts.showSuccess("List Created", "New Task List has been added");

      setActiveId(null);
      setIsDragging(false);
      return;
    }

    const activeContainer = findContainerId(activeId as number);
    const activeIndex = tasks?.findIndex((task) => task.id === activeId);

    const overContainer = findContainerId(overId as number);
    const overIndex = tasks?.findIndex((task) => task.id === overId);

    if (activeIndex !== overIndex && activeContainer === overContainer) {
      dispatch?.({
        type: TASK_MOVED,
        payload:
          overContainer && overContainer != activeContainer
            ? [activeIndex, overIndex, overContainer]
            : [activeIndex, overIndex],
      });
    }
    setActiveId(null);
    setIsDragging(false);
  }
};

export default KanbanBoard;

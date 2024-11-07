"use client";
import KanbanCard from "./kanban-card";
import { FC } from "react";
import { useTasks } from "@/context/TaskContext";

interface IKanbanList {
  title: string | null;
}

const KanbanList: FC<IKanbanList> = ({ title }) => {
  const tasks = useTasks();

  return (
    <div className="max-h-90vh mx-3 w-1/3 min-w-80 overflow-hidden rounded-md bg-blue-100 py-3">
      <span className="px-3 pt-3">
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

        <h1 className="ms-2 inline align-middle font-sans text-lg font-bold text-blue-700">
          {title}
        </h1>
      </span>

      <div className="my-3 max-h-full overflow-y-auto px-3">
        {tasks?.map((task) => (
          <KanbanCard
            key={task.id}
            date={task.dueDate}
            project={task.project}
            taskTitle={task.title}
            effort={task.effortLevel}
            priority={task.priority}
          />
        ))}
      </div>
      {/* <KanbanCard
          date="MON"
          project="Kanban"
          effort={EffortLevel.MODERATE}
          priority={Priority.MEDIUM}
          taskTitle={"Add Drag and Drop for Kanban cards"}
        />
        <KanbanCard
          date="MON"
          project="Kanban"
          taskTitle={"Create new Kanban Lists"}
          effort={EffortLevel.HARD}
          priority={Priority.HIGH}
        />
        <KanbanCard
          date="MON"
          project="Kanban"
          taskTitle={"Add configuration"}
          effort={undefined}
          priority={undefined}
        /> */}
    </div>
  );
};
export default KanbanList;

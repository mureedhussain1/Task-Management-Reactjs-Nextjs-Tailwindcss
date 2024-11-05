import { EffortLevel } from "@/enums/EffortLevel";
import { Priority } from "@/enums/Priority";
import DueDate from "./due-date";
import PriorityView from "./priority-view";

interface IKanbanCardProps {
  effort: EffortLevel | undefined;
  priority: Priority | undefined;
  date: string;
  project: string;
  taskTitle: string;
}

const KanbanCard: React.FC<IKanbanCardProps> = ({
  effort = EffortLevel.EASY,
  priority = Priority.LOW,
  date,
  project,
  taskTitle,
}) => {
  return (
    <div className="my-3 min-h-12 rounded bg-white p-3">
      <h6 className="mb-4 font-sans text-sm font-semibold text-black">
        {taskTitle}
      </h6>

      <div className="flex flex-row justify-between">
        <div>
          <DueDate priority={priority} date={date} />

          <PriorityView effort={effort} priority={priority} />
        </div>

        <h6 className="align-text-bottom font-sans text-sm font-normal text-blue-700">
          {project}
        </h6>
      </div>
    </div>
  );
};

export default KanbanCard;

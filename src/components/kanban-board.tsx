import KanbanList from "./kanban-list";

enum IKanbanBoardProps {}
const KanbanBoard: React.FC<IKanbanBoardProps> = ({}) => {
  return (
    <div className="flex">
      <KanbanList title="To-Do" />
      <KanbanList title="Doing" />
      <KanbanList title="Done" />
      <KanbanList title="QA" />
      <KanbanList title="Deploy" />
      <KanbanList title="Close" />
    </div>
  );
};
export default KanbanBoard;

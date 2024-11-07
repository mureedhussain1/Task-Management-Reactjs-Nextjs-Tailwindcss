import KanbanBoard from "@/components/kanban-board";

export default function page() {
  return (
    <div className="p-4 pt-10">
      {/* <h1 className="text-3xl font-bold underline">Items:</h1> */}

      <div className="w-100 container">
        <div className="h-full columns-1 gap-8">
          <KanbanBoard />
          {/* <div className="min-h-12 bg-blue-100"></div>
          <div className="min-h-12 bg-blue-100"></div>
          <div className="min-h-12 bg-blue-100"></div> */}
        </div>
      </div>
    </div>
  );
}

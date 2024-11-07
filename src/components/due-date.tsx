import { Priority } from "@/enums/Priority";
import React from "react";

interface IDueDateProps {
  priority: Priority | undefined;
  date: string;
}

const DueDate: React.FC<IDueDateProps> = ({
  priority = Priority.LOW,
  date,
}) => {
  return (
    <div
      className={`inline-block w-9 rounded-md p-1 align-middle text-xs font-light text-white ${priority === Priority.HIGH ? "bg-red-700" : priority === Priority.LOW ? "bg-blue-700" : "bg-yellow-700"}`}
    >
      {date}
    </div>
  );
};

export default DueDate;

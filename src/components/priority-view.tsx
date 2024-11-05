import { Priority } from "@/enums/Priority";
import { EffortLevel } from "@/enums/EffortLevel";
import React from "react";

interface IPriorityViewProps {
  effort: EffortLevel | undefined;
  priority: Priority | undefined;
}

const PriorityView: React.FC<IPriorityViewProps> = ({
  effort = EffortLevel.EASY,
  priority = Priority.LOW,
}) => {
  const bgColor =
    priority === Priority.HIGH
      ? "bg-red-700"
      : priority === Priority.MEDIUM
        ? "bg-yellow-700"
        : "bg-blue-700";
  return (
    <>
      <div
        className={`${bgColor} ms-2 inline-block h-2 w-4 rounded rounded-bl-2xl`}
      ></div>
      <div
        className={`${effort === EffortLevel.EASY ? "bg-gray-100" : bgColor} ms-1 inline-block h-2 w-4 rounded rounded-bl-2xl`}
      ></div>
      <div
        className={`${effort <= EffortLevel.MODERATE ? "bg-gray-100" : bgColor} ms-1 inline-block h-2 w-4 rounded rounded-bl-2xl`}
      ></div>
    </>
  );
};

export default PriorityView;

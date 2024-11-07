import { EffortLevel } from "@/enums/EffortLevel";
import { Priority } from "@/enums/Priority";
import { Status } from "@/enums/Status";

export type Task = {
  id: number;
  title: string;
  dueDate: string;
  effortLevel: EffortLevel | undefined;
  priority: Priority | undefined;
  status: Status | undefined;
  project: string;
};

export type TaskAction = {
  type: string;
  task: Task;
};

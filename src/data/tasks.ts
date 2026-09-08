import type { Task } from "../types";

export const initialTasks: Task[] = [
    {
        id: "1",
        title: "Complete React Dashboard",
        description:
            "Finish the task management dashboard project.",
        status: "inProgress",
        priority: "high",
        dueDate: "2026-09-15",
    },
    {
        id: "2",
        title: "Review TypeScript",
        description:
            "Practice TypeScript types and interfaces.",
        status: "pending",
        priority: "medium",
        dueDate: "2026-09-20",
    },
    {
        id: "3",
        title: "Submit SBA Project",
        description:
            "Review and submit the React dashboard assignment.",
        status: "pending",
        priority: "high",
        dueDate: "2026-09-25",
    },
];
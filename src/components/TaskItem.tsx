import { Pencil, Trash2 } from "lucide-react";

import type {
    Task,
    TaskStatus,
} from "../types";
import { formatDate } from "../utils/dateUtils";

interface TaskItemProps {
    task: Task;

    onTaskStatusChange: (
        id: string,
        status: TaskStatus
    ) => void;

    onDeleteTask: (
        id: string
    ) => void;

    onEditTask: (
        task: Task
    ) => void;
}

function TaskItem({
    task,
    onDeleteTask,
    onEditTask,
}: TaskItemProps) {
    const {
        id,
        title,
        description,
        status,
        priority,
        dueDate,
    } = task;

    const statusFiltercolors:
        Record<string, string> = {
        pending:
            "bg-yellow-100 text-yellow-800",

        inProgress:
            "bg-white text-blue-800",

        completed:
            "bg-white text-green-600",
    };


    const getPriorityElement = (
        priority: string
    ) => {
        const colors:
            Record<string, string> = {
            medium: "text-yellow-600",
            high: "text-red-600",
            default: "text-green-600",
        };

        const colorClass =
            colors[priority] ||
            colors.default;

        return (
            <span className={colorClass}>
                Priority: {priority}
            </span>
        );
    };

    return (
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">

            <div className="flex justify-between items-center">

                <div>
                    <h3 className="text-lg font-semibold">
                        {title} -  <span className={`px-2 py-1 ${statusFiltercolors[status]} rounded mx-2`}>{status}</span>
                    </h3>

                    <p className="text-gray-600">
                        {description}
                    </p>
                </div>

                <div className="flex gap-3">

                    <button
                        type="button"
                        onClick={() => onEditTask(task)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm"
                        aria-label="Edit task"
                        title="Edit task"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDeleteTask(id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition-all duration-200 hover:border-red-200 hover:bg-red-100 hover:text-red-600 hover:shadow-sm"
                        aria-label="Delete task"
                        title="Delete task"
                    >
                        <Trash2 size={18} />
                    </button>

                </div>
            </div>

            <div className="flex gap-4">
                {getPriorityElement(priority)}

                <span className="text-gray-500">
                    Due: {formatDate(dueDate)}
                </span>
            </div>

        </div>
    );
}

export default TaskItem;
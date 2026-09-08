import type React from "react";
import {
    Pencil,
    Trash2,
    GripVertical,
} from "lucide-react";

import type {
    Task,
    TaskStatus,
} from "../types";

import { formatDueDate } from "../utils/dateUtils";

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
    onDragStart: (
        id: string
    ) => void;
    onDragOver: (
        event: React.DragEvent<HTMLDivElement>
    ) => void;
    onDrop: (
        id: string
    ) => void;
}

function TaskItem({
    task,
    onTaskStatusChange,
    onDeleteTask,
    onEditTask,
    onDragStart,
    onDragOver,
    onDrop,
}: TaskItemProps) {
    const {
        id,
        title,
        description,
        status,
        priority,
        dueDate,
    } = task;

    const statusFiltercolors: Record<
        string,
        string
    > = {
        pending:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",

        inProgress:
            "bg-white text-blue-800 dark:bg-gray-700 dark:text-blue-300",

        completed:
            "bg-white text-green-600 dark:bg-gray-700 dark:text-green-400",
    };

    function handleStatus(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        onTaskStatusChange(
            id,
            event.target.value as TaskStatus
        );
    }

    function handleDragStart() {
        onDragStart(id);
    }

    function handleDrop() {
        onDrop(id);
    }

    const getPriorityElement = (
        taskPriority: string
    ) => {
        const colors: Record<
            string,
            string
        > = {
            medium:
                "text-yellow-600 dark:text-yellow-400",

            high:
                "text-red-600 dark:text-red-400",

            default:
                "text-green-600 dark:text-green-400",
        };

        const colorClass =
            colors[taskPriority] ||
            colors.default;

        return (
            <span className={colorClass}>
                Priority: {taskPriority}
            </span>
        );
    };

    return (
        <div
            draggable
            onDragStart={
                handleDragStart
            }
            onDragOver={
                onDragOver
            }
            onDrop={handleDrop}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700"
        >
            <div className="flex justify-between items-start">
                <div className="flex gap-3">
                    <div
                        className="cursor-grab active:cursor-grabbing text-gray-400 dark:text-gray-500 pt-1"
                        title="Drag to reorder"
                    >
                        <GripVertical
                            size={20}
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold dark:text-white">
                            {title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={status}
                        onChange={
                            handleStatus
                        }
                        className={`px-2 py-1 ${statusFiltercolors[status]} rounded mx-2`}
                    >
                        <option value="pending">
                            Pending
                        </option>

                        <option value="inProgress">
                            In Progress
                        </option>

                        <option value="completed">
                            Completed
                        </option>
                    </select>

                    <button
                        type="button"
                        onClick={() =>
                            onEditTask(task)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900"
                        aria-label="Edit task"
                        title="Edit task"
                    >
                        <Pencil
                            size={17}
                            strokeWidth={2}
                        />
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onDeleteTask(id)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition-all duration-200 hover:border-red-200 hover:bg-red-100 hover:text-red-600 hover:shadow-sm dark:border-red-900 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
                        aria-label="Delete task"
                        title="Delete task"
                    >
                        <Trash2
                            size={17}
                            strokeWidth={2}
                        />
                    </button>
                </div>
            </div>

            <div className="flex gap-4">
                {getPriorityElement(
                    priority
                )}

                <span className="text-gray-500 dark:text-gray-400">
                    Due:{" "}
                    {formatDueDate(
                        dueDate
                    )}
                </span>
            </div>
        </div>
    );
}

export default TaskItem;
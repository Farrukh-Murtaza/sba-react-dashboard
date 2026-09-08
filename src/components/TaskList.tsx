import {
    useState,
    type DragEvent,
} from "react";

import type {
    Task,
    TaskStatus,
} from "../types";

import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    onUpdateList: (
        id: string,
        status: TaskStatus
    ) => void;
    onDeleteTask: (
        id: string
    ) => void;
    onEditTask: (
        task: Task
    ) => void;
    onReorderTasks: (
        draggedTaskId: string,
        targetTaskId: string
    ) => void;
}

function TaskList({
    tasks,
    onUpdateList,
    onDeleteTask,
    onEditTask,
    onReorderTasks,
}: TaskListProps) {
    const [
        draggedTaskId,
        setDraggedTaskId,
    ] = useState<string | null>(null);

    function handleDragStart(id: string) {
        setDraggedTaskId(id);
    }

    function handleDragOver(
        event: DragEvent<HTMLDivElement>
    ) {
        event.preventDefault();
    }

    function handleDrop(
        targetTaskId: string
    ) {
        if (!draggedTaskId) {
            return;
        }

        if (
            draggedTaskId ===
            targetTaskId
        ) {
            setDraggedTaskId(null);
            return;
        }

        onReorderTasks(
            draggedTaskId,
            targetTaskId
        );

        setDraggedTaskId(null);
    }

    return (
        <div className="space-y-6">
            <div className="dark:text-gray-200">
                {`Results: ${tasks.length}`}
            </div>

            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onTaskStatusChange={
                            onUpdateList
                        }
                        onDeleteTask={
                            onDeleteTask
                        }
                        onEditTask={
                            onEditTask
                        }
                        onDragStart={
                            handleDragStart
                        }
                        onDragOver={
                            handleDragOver
                        }
                        onDrop={
                            handleDrop
                        }
                    />
                ))
            ) : (
                <div className="bg-gray-400 p-4 rounded-md text-white dark:bg-gray-700">
                    No Result Found
                </div>
            )}
        </div>
    );
}

export default TaskList;
import {
    useMemo,
    useState,
} from "react";

import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import TaskList from "../components/TaskList";
import DataManager from "../components/DataManager";
import Modal from "../components/Modal";

import type {
    Task,
    TaskFilters,
    TaskStatus,
    SortOption,
} from "../types";

import {
    filterTasks,
    sortTasks,
} from "../utils/taskUtils";

interface TasksPageProps {
    tasks: Task[];

    onUpdateTaskStatus: (
        id: string,
        status: TaskStatus
    ) => void;

    onAddTask: (
        task: Task
    ) => void;

    onUpdateTask: (
        task: Task
    ) => void;

    onDeleteTask: (
        id: string
    ) => void;

    onImportTasks?: (
        tasks: Task[]
    ) => void;

    onReorderTasks: (
        draggedTaskId: string,
        targetTaskId: string
    ) => void;
}

function TasksPage({
    tasks,
    onUpdateTaskStatus,
    onAddTask,
    onUpdateTask,
    onDeleteTask,
    onImportTasks,
    onReorderTasks,
}: TasksPageProps) {
    const [filters, setFilters] =
        useState<TaskFilters>({
            status: "all",
            priority: "all",
            search: "",
        });

    const [showForm, setShowForm] =
        useState(false);

    const [sortBy, setSortBy] =
        useState<SortOption>("manual");

    const [editingTask, setEditingTask] =
        useState<Task | null>(null);

    const displayedTasks = useMemo(() => {
        const filteredTasks =
            filterTasks(
                tasks,
                filters
            );

        return sortTasks(
            filteredTasks,
            sortBy
        );
    }, [
        tasks,
        filters,
        sortBy,
    ]);

    function handleTaskSubmit(
        task: Task
    ) {
        if (editingTask) {
            onUpdateTask(task);
        } else {
            onAddTask(task);
        }

        setShowForm(false);
        setEditingTask(null);
    }

    function handleEditTask(
        task: Task
    ) {
        setEditingTask(task);
        setShowForm(true);
    }

    function handleCancelForm() {
        setShowForm(false);
        setEditingTask(null);
    }

    return (
        <div className="max-w-7xl mx-auto">

            {/* Page Header */}
            <div className="flex justify-end mb-5">
                <DataManager
                    tasks={tasks}
                    onImport={onImportTasks}
                />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white">
                        Tasks
                    </h1>

                    <p className="text-gray-500">
                        Manage all your tasks in one place.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setEditingTask(null);
                        setShowForm(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add New Task
                </button>
            </div>

            {/* Add / Edit Form */}
            <Modal
                isOpen={showForm}
                onClose={handleCancelForm}
            >
                <TaskForm
                    key={
                        editingTask?.id ??
                        "new-task"
                    }
                    task={
                        editingTask ??
                        undefined
                    }
                    onSubmit={
                        handleTaskSubmit
                    }
                    onCancel={
                        handleCancelForm
                    }
                />
            </Modal>

            {/* Filters */}
            <TaskFilter
                filters={filters}
                onChange={setFilters}
            />

            {/* Sort */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
                <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold">
                        {
                            displayedTasks.length
                        }
                    </span>{" "}
                    of {tasks.length} tasks
                </p>

                <div className="flex items-center gap-2">
                    <label className="font-medium dark:text-white">
                        Sort:
                    </label>

                    <select
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(
                                event.target
                                    .value as SortOption
                            )
                        }
                        className="bg-white px-2 py-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="manual">
                            Manual Order
                        </option>

                        <option value="dueDate">
                            Due Date
                        </option>

                        <option value="title">
                            Title
                        </option>

                        <option value="priority">
                            Priority
                        </option>

                        <option value="status">
                            Status
                        </option>
                    </select>
                </div>
            </div>

            {/* Task List */}
            <TaskList
                tasks={displayedTasks}
                onUpdateList={
                    onUpdateTaskStatus
                }
                onDeleteTask={
                    onDeleteTask
                }
                onEditTask={
                    handleEditTask
                }
                onReorderTasks={
                    onReorderTasks
                }
            />
        </div>
    );
}

export default TasksPage;
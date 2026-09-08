import {
    useMemo,
    useRef,
    useState,
} from "react";

import TaskFilter from "../components/TaskFilter";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
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
    getActiveFilterCount,
} from "../utils/taskUtils";

import {
    exportTasks,
    importTasks,
} from "../utils/taskImportExport";

interface TasksPageProps {
    tasks: Task[];
    onUpdateTaskStatus: (
        id: string,
        status: TaskStatus
    ) => void;
    onAddTask: (task: Task) => void;
    onUpdateTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
    onImportTasks?: (tasks: Task[]) => void;
}

function TasksPage({
    tasks,
    onUpdateTaskStatus,
    onAddTask,
    onUpdateTask,
    onDeleteTask,
    onImportTasks,
}: TasksPageProps) {
    const [filters, setFilters] =
        useState<TaskFilters>({
            status: "all",
            priority: "all",
            search: "",
        });

    const [sortBy, setSortBy] =
        useState<SortOption>("title");

    const [showForm, setShowForm] =
        useState(false);

    const [editingTask, setEditingTask] =
        useState<Task | null>(null);

    const fileInputRef =
        useRef<HTMLInputElement>(null);

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
    }, [tasks, filters, sortBy]);

    const activeFilterCount =
        getActiveFilterCount(filters);

    function handleFilter(
        status: string,
        priority: string
    ) {
        setFilters((previous) => ({
            ...previous,
            status:
                status as TaskFilters["status"],
            priority:
                priority as TaskFilters["priority"],
        }));
    }

    function handleSearch(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setFilters((previous) => ({
            ...previous,
            search: event.target.value,
        }));
    }

    function handleClearFilters() {
        setFilters({
            status: "all",
            priority: "all",
            search: "",
        });
    }

    function handleAddClick() {
        setEditingTask(null);
        setShowForm(true);
    }

    function handleEditTask(task: Task) {
        setEditingTask(task);
        setShowForm(true);
    }

    function handleTaskSubmit(task: Task) {
        if (editingTask) {
            onUpdateTask(task);
        } else {
            onAddTask(task);
        }

        setEditingTask(null);
        setShowForm(false);
    }

    function handleCancel() {
        setEditingTask(null);
        setShowForm(false);
    }

    function handleExport() {
        exportTasks(tasks);
    }

    function handleImportClick() {
        fileInputRef.current?.click();
    }

    async function handleImport(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        try {
            const importedTasks =
                await importTasks(file);

            const shouldImport =
                window.confirm(
                    `Import ${importedTasks.length} tasks? This will replace your current tasks.`
                );

            if (!shouldImport) {
                return;
            }

            onImportTasks?.(importedTasks);
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to import tasks.";

            window.alert(message);
        } finally {
            event.target.value = "";
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        Tasks
                    </h1>

                    <p className="text-gray-600">
                        Manage your tasks
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleAddClick}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                    Add Task
                </button>
            </div>

            <div className="mb-4">
                <label
                    htmlFor="task-search"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Search
                </label>

                <input
                    id="task-search"
                    type="text"
                    value={filters.search}
                    onChange={handleSearch}
                    placeholder="Search tasks..."
                    className="bg-white px-3 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <TaskFilter
                selectedStatus={
                    filters.status
                }
                selectedPriority={
                    filters.priority
                }
                onFilter={handleFilter}
                activeFilterCount={
                    activeFilterCount
                }
                onClearFilters={
                    handleClearFilters
                }
            />

            <div className="flex justify-end mb-4">
                <div>
                    <label
                        htmlFor="sort-tasks"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Sort By
                    </label>

                    <select
                        id="sort-tasks"
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(
                                event.target
                                    .value as SortOption
                            )
                        }
                        className="bg-white px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="title">
                            Title
                        </option>

                        <option value="dueDate">
                            Due Date
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

            {/* Phase 3 Import / Export */}

            <div className="flex gap-3 mb-4">
                <button
                    type="button"
                    onClick={handleExport}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                    Export Tasks
                </button>

                <button
                    type="button"
                    onClick={handleImportClick}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                    Import Tasks
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleImport}
                    className="hidden"
                />
            </div>

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
            />

            <Modal
                isOpen={showForm}
                onClose={handleCancel}
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
                        handleCancel
                    }
                />
            </Modal>
        </div>
    );
}

export default TasksPage;
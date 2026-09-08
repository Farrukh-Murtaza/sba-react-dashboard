

import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";

import type {
    Task,
    TaskStatus,
} from "../types";

interface TasksPageProps {
    tasks: Task[];
    onUpdateTask: (
        id: string,
        status: TaskStatus
    ) => void;
    onDeleteTask: (id: string) => void;
}

function TasksPage({
    tasks,
    onUpdateTask,
    onDeleteTask,
}: TasksPageProps) {
    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState("all");

    const [selectedPriority, setSelectedPriority] =
        useState("all");

    const [sortBy, setSortBy] =
        useState("title");

    function handleFilter(
        status: string,
        priority: string
    ) {
        setSelectedStatus(status);
        setSelectedPriority(priority);
    }

    const filteredTasks = tasks
        .filter((task) => {
            const search = searchTerm.toLowerCase();

            return (
                task.title.toLowerCase().includes(search) ||
                task.description
                    .toLowerCase()
                    .includes(search)
            );
        })
        .filter((task) => {
            return (
                selectedStatus === "all" ||
                task.status === selectedStatus
            );
        })
        .filter((task) => {
            return (
                selectedPriority === "all" ||
                task.priority === selectedPriority
            );
        })
        .sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title);
            }

            if (sortBy === "dueDate") {
                return (
                    new Date(a.dueDate).getTime() -
                    new Date(b.dueDate).getTime()
                );
            }

            if (sortBy === "priority") {
                const priorityOrder = {
                    high: 1,
                    medium: 2,
                    low: 3,
                };

                return (
                    priorityOrder[a.priority] -
                    priorityOrder[b.priority]
                );
            }

            return 0;
        });

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Tasks
                </h1>

                <p className="text-gray-500">
                    Manage all your tasks
                </p>
            </div>

            {/* Search */}

            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 mb-4"
            />

            {/* Sorting */}

            <div className="mb-4">
                <label className="mr-3 font-medium">
                    Sort by:
                </label>

                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
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
                </select>
            </div>

            {/* Existing Filters */}

            <TaskFilter
                onFilter={handleFilter}
                selectedStatus={selectedStatus}
                selectedPriority={selectedPriority}
            />

            {/* Task List */}

            <TaskList
                tasks={filteredTasks}
                onUpdateList={onUpdateTask}
                onDeleteTask={onDeleteTask}
            />
        </div>
    );
}

export default TasksPage;
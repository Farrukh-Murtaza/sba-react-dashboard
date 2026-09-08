import type React from "react";
import { useState } from "react";

import type {
    TaskPriority,
    TaskStatus,
} from "../types";

interface TaskFilterProps {
    selectedStatus:
    | "all"
    | TaskStatus;

    selectedPriority:
    | "all"
    | TaskPriority;

    onFilter: (
        status: string,
        priority: string
    ) => void;

    activeFilterCount?: number;

    onClearFilters?: () => void;
}

function TaskFilter({
    selectedStatus,
    selectedPriority,
    onFilter,
    activeFilterCount = 0,
    onClearFilters,
}: TaskFilterProps) {
    const [statusFilter, setStatusFilter] =
        useState(selectedStatus);

    const [
        priorityFilter,
        setPriorityFilter,
    ] = useState(selectedPriority);

    function handleFilters(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        const value =
            event.target.value;

        if (
            event.target.id ===
            "status-filter"
        ) {
            setStatusFilter(
                value as
                | "all"
                | TaskStatus
            );

            onFilter(
                value,
                priorityFilter
            );
        }

        if (
            event.target.id ===
            "priority-filter"
        ) {
            setPriorityFilter(
                value as
                | "all"
                | TaskPriority
            );

            onFilter(
                statusFilter,
                value
            );
        }
    }

    function handleClearFilters() {
        setStatusFilter("all");
        setPriorityFilter("all");

        onClearFilters?.();
    }

    return (
        <div className="flex gap-4 py-4 justify-end">
            <div>
                <label
                    htmlFor="status-filter"
                    className="mr-2 font-medium dark:text-gray-200"
                >
                    Status:
                </label>

                <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={
                        handleFilters
                    }
                    className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                    <option value="all">
                        All
                    </option>

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
            </div>

            <div>
                <label
                    htmlFor="priority-filter"
                    className="mr-2 font-medium dark:text-gray-200"
                >
                    Priority:
                </label>

                <select
                    id="priority-filter"
                    value={
                        priorityFilter
                    }
                    onChange={
                        handleFilters
                    }
                    className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                    <option value="all">
                        All
                    </option>

                    <option value="low">
                        Low
                    </option>

                    <option value="medium">
                        Medium
                    </option>

                    <option value="high">
                        High
                    </option>
                </select>
            </div>

            {activeFilterCount > 0 && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        {
                            activeFilterCount
                        }{" "}
                        active
                    </span>

                    <button
                        type="button"
                        onClick={
                            handleClearFilters
                        }
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}

export default TaskFilter;
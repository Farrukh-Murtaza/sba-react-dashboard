import type React from "react";
import type {
    TaskFilters,
} from "../types";

interface TaskFilterProps {
    filters: TaskFilters;

    onChange: (
        filters: TaskFilters
    ) => void;
}

function TaskFilter({
    filters,
    onChange,
}: TaskFilterProps) {
    const activeFilters =
        [
            filters.status !== "all",
            filters.priority !== "all",
            filters.search.trim() !== "",
        ].filter(Boolean).length;

    function handleChange(
        field: keyof TaskFilters,
        value: string
    ) {
        onChange({
            ...filters,
            [field]: value,
        });
    }

    function clearFilters() {
        onChange({
            status: "all",
            priority: "all",
            search: "",
        });
    }

    return (
        <div className="py-2">
            <div className="flex justify-between items-center ">
                <div>
                    {activeFilters > 0 && (
                        <span className="text-sm text-blue-600">
                            {activeFilters} active filter
                            {activeFilters > 1 ? "s" : ""}
                        </span>
                    )}
                </div>

                {activeFilters > 0 && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="text-sm text-red-500 hover:text-red-700"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            <div className="flex gap-4 justify-end flex-wrap">

                <div className="flex-1 min-w-50">
                    <label
                        htmlFor="search"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Search
                    </label>

                    <input
                        id="search"
                        type="text"
                        placeholder="Search tasks..."
                        value={filters.search}
                        onChange={(event) =>
                            handleChange(
                                "search",
                                event.target.value
                            )
                        }
                        className="bg-white px-2 py-2 block w-full rounded-md border border-gray-300
              shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="status-filter"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Status
                    </label>

                    <select
                        id="status-filter"
                        value={filters.status}
                        onChange={(event) =>
                            handleChange(
                                "status",
                                event.target.value
                            )
                        }
                        className="bg-white px-2 py-2.5 block w-full rounded-md border-gray-300
              shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="all">
                            All Statuses
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
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Priority
                    </label>

                    <select
                        id="priority-filter"
                        value={filters.priority}
                        onChange={(event) =>
                            handleChange(
                                "priority",
                                event.target.value
                            )
                        }
                        className="bg-white px-2 py-2.5 block w-full rounded-md border-gray-300
              shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="all">
                            All Priorities
                        </option>

                        <option value="high">
                            High
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="low">
                            Low
                        </option>
                    </select>
                </div>

            </div>
        </div>
    );
}

export default TaskFilter;
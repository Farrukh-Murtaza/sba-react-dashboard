import type {
    SortOption,
    Task,
    TaskFilters,
} from "../types";

export function filterTasks(
    tasks: Task[],
    filters: TaskFilters
): Task[] {
    const searchTerm =
        filters.search.trim().toLowerCase();

    return tasks.filter((task) => {
        const matchesSearch =
            !searchTerm ||
            task.title
                .toLowerCase()
                .includes(searchTerm) ||
            task.description
                .toLowerCase()
                .includes(searchTerm);

        const matchesStatus =
            filters.status === "all" ||
            task.status === filters.status;

        const matchesPriority =
            filters.priority === "all" ||
            task.priority === filters.priority;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );
    });
}

export function sortTasks(
    tasks: Task[],
    sortBy: SortOption
): Task[] {
    const sortedTasks = [...tasks];

    sortedTasks.sort((a, b) => {
        switch (sortBy) {
            case "manual":
                return 0;

            case "title":
                return a.title.localeCompare(b.title);

            case "dueDate":
                return a.dueDate.localeCompare(
                    b.dueDate
                );

            case "priority": {
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

            case "status": {
                const statusOrder = {
                    pending: 1,
                    inProgress: 2,
                    completed: 3,
                };

                return (
                    statusOrder[a.status] -
                    statusOrder[b.status]
                );
            }

            default:
                return 0;
        }
    });

    return sortedTasks;
}

export function getActiveFilterCount(
    filters: TaskFilters
): number {
    let count = 0;

    if (filters.status !== "all") {
        count++;
    }

    if (filters.priority !== "all") {
        count++;
    }

    if (filters.search.trim()) {
        count++;
    }

    return count;
}
import type {
    Task,
    TaskFilters,
    SortOption,
} from "../types";

export function filterTasks(
    tasks: Task[],
    filters: TaskFilters
): Task[] {
    return tasks.filter((task) => {
        const matchesSearch =
            task.title
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
            task.description
                .toLowerCase()
                .includes(filters.search.toLowerCase());

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
    const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3,
    };

    const statusOrder = {
        pending: 1,
        inProgress: 2,
        completed: 3,
    };

    return [...tasks].sort((a, b) => {
        switch (sortBy) {
            case "title":
                return a.title.localeCompare(b.title);

            case "dueDate":
                return (
                    new Date(a.dueDate).getTime() -
                    new Date(b.dueDate).getTime()
                );

            case "priority":
                return (
                    priorityOrder[a.priority] -
                    priorityOrder[b.priority]
                );

            case "status":
                return (
                    statusOrder[a.status] -
                    statusOrder[b.status]
                );

            default:
                return 0;
        }
    });
}
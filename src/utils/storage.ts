import type { Task } from "../types";

const TASKS_STORAGE_KEY = "sba-task-dashboard-tasks";

export function loadTasks(): Task[] | null {
    try {
        const storedTasks =
            localStorage.getItem(
                TASKS_STORAGE_KEY
            );

        if (!storedTasks) {
            return null;
        }

        const parsedTasks: unknown =
            JSON.parse(storedTasks);

        if (!Array.isArray(parsedTasks)) {
            return null;
        }

        return parsedTasks as Task[];
    } catch (error) {
        console.error(
            "Failed to load tasks from localStorage:",
            error
        );

        return null;
    }
}

export function saveTasks(tasks: Task[]): void {
    try {
        localStorage.setItem(
            TASKS_STORAGE_KEY,
            JSON.stringify(tasks)
        );
    } catch (error) {
        console.error(
            "Failed to save tasks to localStorage:",
            error
        );
    }
}

export function clearStoredTasks(): void {
    try {
        localStorage.removeItem(
            TASKS_STORAGE_KEY
        );
    } catch (error) {
        console.error(
            "Failed to clear stored tasks:",
            error
        );
    }
}
import type { Task } from "../types";

export interface TaskErrors {
    title?: string;
    description?: string;
    dueDate?: string;
}

export function validateTask(
    task: Partial<Task>
): TaskErrors {
    const errors: TaskErrors = {};

    if (!task.title?.trim()) {
        errors.title = "Task title is required.";
    } else if (task.title.trim().length < 3) {
        errors.title =
            "Task title must be at least 3 characters.";
    }

    if (!task.description?.trim()) {
        errors.description =
            "Task description is required.";
    }

    if (!task.dueDate) {
        errors.dueDate =
            "Due date is required.";
    }

    return errors;
}

export function hasErrors(
    errors: TaskErrors
): boolean {
    return Object.keys(errors).length > 0;
}
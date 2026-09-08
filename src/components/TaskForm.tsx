import { useState } from "react";
import type {
    FormEvent,
    ChangeEvent,
} from "react";

import type {
    Task,
    TaskFormData,
    TaskFormProps,
} from "../types";

import {
    hasErrors,
    validateTask,
    type TaskErrors,
} from "../utils/validation";

function TaskForm({
    task,
    onSubmit,
    onCancel,
}: TaskFormProps) {
    const [formData, setFormData] =
        useState<TaskFormData>({
            title: task?.title ?? "",
            description:
                task?.description ?? "",
            status:
                task?.status ??
                "pending",
            priority:
                task?.priority ??
                "medium",
            dueDate:
                task?.dueDate ?? "",
        });

    const [errors, setErrors] =
        useState<TaskErrors>({});

    function handleChange(
        event: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) {
        const {
            name,
            value,
        } = event.target;

        setFormData(
            (previous) => ({
                ...previous,
                [name]: value,
            })
        );

        if (
            errors[
            name as keyof TaskErrors
            ]
        ) {
            setErrors(
                (previous) => ({
                    ...previous,
                    [name]: undefined,
                })
            );
        }
    }

    function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const validationErrors =
            validateTask(formData);

        setErrors(
            validationErrors
        );

        if (
            hasErrors(
                validationErrors
            )
        ) {
            return;
        }

        const newTask: Task = {
            id:
                task?.id ??
                crypto.randomUUID(),
            ...formData,
        };

        onSubmit(newTask);
    }

    const isEditing =
        Boolean(task);

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
            <h2 className="text-xl font-bold mb-4 dark:text-white">
                {isEditing
                    ? "Edit Task"
                    : "Add Task"}
            </h2>

            <div className="mb-4">
                <label
                    htmlFor="title"
                    className="block font-medium mb-1 dark:text-gray-200"
                >
                    Title
                </label>

                <input
                    id="title"
                    name="title"
                    type="text"
                    value={
                        formData.title
                    }
                    onChange={
                        handleChange
                    }
                    className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />

                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                    </p>
                )}
            </div>

            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="block font-medium mb-1 dark:text-gray-200"
                >
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    value={
                        formData.description
                    }
                    onChange={
                        handleChange
                    }
                    rows={4}
                    className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />

                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {
                            errors.description
                        }
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label
                        htmlFor="status"
                        className="block font-medium mb-1 dark:text-gray-200"
                    >
                        Status
                    </label>

                    <select
                        id="status"
                        name="status"
                        value={
                            formData.status
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
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
                        htmlFor="priority"
                        className="block font-medium mb-1 dark:text-gray-200"
                    >
                        Priority
                    </label>

                    <select
                        id="priority"
                        name="priority"
                        value={
                            formData.priority
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
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

                <div>
                    <label
                        htmlFor="dueDate"
                        className="block font-medium mb-1 dark:text-gray-200"
                    >
                        Due Date
                    </label>

                    <input
                        id="dueDate"
                        name="dueDate"
                        type="date"
                        value={
                            formData.dueDate
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />

                    {errors.dueDate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.dueDate}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    {isEditing
                        ? "Update Task"
                        : "Save Task"}
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
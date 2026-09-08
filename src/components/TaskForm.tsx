import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

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

    const [formData, setFormData] = useState<TaskFormData>({
        title: task?.title ?? "",
        description: task?.description ?? "",
        status: task?.status ?? "pending",
        priority: task?.priority ?? "medium",
        dueDate: task?.dueDate ?? "",
    });

    const [errors, setErrors] = useState<TaskErrors>({});

    function handleChange(
        event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        // Clear the error for the field being edited.
        if (errors[name as keyof TaskErrors]) {
            setErrors((previous) => ({
                ...previous,
                [name]: undefined,
            }));
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationErrors = validateTask(formData);

        setErrors(validationErrors);

        if (hasErrors(validationErrors)) {
            return;
        }

        const newTask: Task = {
            id: task?.id ?? crypto.randomUUID(),
            ...formData,
        };

        onSubmit(newTask);
    }

    const isEditing = Boolean(task);

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-sm"
        >
            <h2 className="text-xl font-semibold mb-6">
                {isEditing ? "Edit Task" : "Add Task"}
            </h2>

            {/* Title */}
            <div className="mb-4">
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Title
                </label>

                <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    className={`bg-white px-3 py-2 block w-full rounded-md border shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 ${errors.title
                        ? "border-red-500"
                        : "border-gray-300"
                        }`}
                    placeholder="Enter task title"
                />

                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.title}
                    </p>
                )}
            </div>

            {/* Description */}
            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`bg-white px-3 py-2 block w-full rounded-md border shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 ${errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                        }`}
                    placeholder="Enter task description"
                />

                {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.description}
                    </p>
                )}
            </div>

            {/* Status */}
            <div className="mb-4">
                <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Status
                </label>

                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="bg-white px-3 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="pending">Pending</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Priority */}
            <div className="mb-4">
                <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Priority
                </label>

                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="bg-white px-3 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {/* Due Date */}
            <div className="mb-6">
                <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Due Date
                </label>

                <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className={`bg-white px-3 py-2 block w-full rounded-md border shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 ${errors.dueDate
                        ? "border-red-500"
                        : "border-gray-300"
                        }`}
                />

                {errors.dueDate && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.dueDate}
                    </p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                    {isEditing ? "Update Task" : "Add Task"}
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
import type {
    Task,
    TaskPriority,
    TaskStatus,
} from "../types";

function isTaskStatus(
    value: unknown
): value is TaskStatus {
    return (
        value === "pending" ||
        value === "inProgress" ||
        value === "completed"
    );
}

function isTaskPriority(
    value: unknown
): value is TaskPriority {
    return (
        value === "low" ||
        value === "medium" ||
        value === "high"
    );
}

function isValidTask(
    value: unknown
): value is Task {
    if (
        typeof value !== "object" ||
        value === null
    ) {
        return false;
    }

    const task = value as Record<
        string,
        unknown
    >;

    return (
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        typeof task.description === "string" &&
        isTaskStatus(task.status) &&
        isTaskPriority(task.priority) &&
        typeof task.dueDate === "string"
    );
}

export function validateImportedTasks(
    data: unknown
): data is Task[] {
    return (
        Array.isArray(data) &&
        data.every(isValidTask)
    );
}

export function exportTasks(
    tasks: Task[]
): void {
    const jsonData = JSON.stringify(
        tasks,
        null,
        2
    );

    const blob = new Blob(
        [jsonData],
        {
            type: "application/json",
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = `tasks-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

export function importTasks(
    file: File
): Promise<Task[]> {
    return new Promise(
        (resolve, reject) => {
            const reader =
                new FileReader();

            reader.onload = () => {
                try {
                    const parsedData =
                        JSON.parse(
                            reader.result as string
                        );

                    if (
                        !validateImportedTasks(
                            parsedData
                        )
                    ) {
                        reject(
                            new Error(
                                "Invalid task file. Please select a valid exported task JSON file."
                            )
                        );

                        return;
                    }

                    resolve(parsedData);
                } catch {
                    reject(
                        new Error(
                            "The selected file is not valid JSON."
                        )
                    );
                }
            };

            reader.onerror = () => {
                reject(
                    new Error(
                        "Failed to read the selected file."
                    )
                );
            };

            reader.readAsText(file);
        }
    );
}
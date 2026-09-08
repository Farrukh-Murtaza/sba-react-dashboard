import type { Task } from "../types";

const STORAGE_KEY = "task-dashboard-tasks";

export function loadTasks(): Task[] {
    try {
        const storedTasks =
            localStorage.getItem(STORAGE_KEY);

        if (!storedTasks) {
            return [];
        }

        return JSON.parse(storedTasks);
    } catch (error) {
        console.error(
            "Failed to load tasks:",
            error
        );

        return [];
    }
}

export function saveTasks(
    tasks: Task[]
): void {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tasks)
        );
    } catch (error) {
        console.error(
            "Failed to save tasks:",
            error
        );
    }
}

export function clearStoredTasks(): void {
    localStorage.removeItem(STORAGE_KEY);
}


export function exportTasks(
    tasks: Task[]
): void {
    const data = JSON.stringify(
        tasks,
        null,
        2
    );

    const blob = new Blob(
        [data],
        {
            type: "application/json",
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "tasks-export.json";

    link.click();

    URL.revokeObjectURL(url);
}


export function importTasks(
    file: File
): Promise<Task[]> {
    return new Promise(
        (resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                try {
                    const parsedData =
                        JSON.parse(
                            reader.result as string
                        );

                    if (!Array.isArray(parsedData)) {
                        throw new Error(
                            "Invalid task file format."
                        );
                    }

                    resolve(parsedData);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => {
                reject(
                    new Error(
                        "Unable to read file."
                    )
                );
            };

            reader.readAsText(file);
        }
    );
}
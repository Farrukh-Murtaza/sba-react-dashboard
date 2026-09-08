import {
    exportTasks,
    importTasks
} from "../utils/storage";

import type { Task } from "../types";

interface DataManagerProps {
    tasks: Task[];

    onImport: (
        tasks: Task[]
    ) => void;
}

function DataManager({
    tasks,
    onImport,
}: DataManagerProps) {
    async function handleImport(
        e: React.ChangeEvent<
            HTMLInputElement
        >
    ) {
        const file =
            e.target.files?.[0];

        if (!file) {
            return;
        }

        try {
            const importedTasks =
                await importTasks(file);

            onImport(importedTasks);

            alert(
                `${importedTasks.length} tasks imported successfully.`
            );
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "Import failed."
            );
        }

        e.target.value = "";
    }

    return (
        <div className="flex flex-wrap gap-3">
            <button
                onClick={() =>
                    exportTasks(tasks)
                }
                className="border px-4 py-2 rounded-lg dark:text-white"
            >
                Export Tasks
            </button>

            <label className="border px-4 py-2 rounded-lg cursor-pointer dark:text-white">
                Import Tasks

                <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                />
            </label>
        </div>
    );
}

export default DataManager;
import TaskStats from "../components/TaskStats";
import type { Task } from "../types";

interface DashboardProps {
    tasks: Task[];
}

function Dashboard({
    tasks,
}: DashboardProps) {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold dark:text-white">
                    Dashboard
                </h1>

                <p className="text-gray-500">
                    Overview of your tasks and progress.
                </p>
            </div>

            <TaskStats tasks={tasks} />
        </div>
    );
}

export default Dashboard;
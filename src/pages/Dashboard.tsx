import type { Task } from "../types";

interface DashboardProps {
    tasks: Task[];
}

function Dashboard({
    tasks,
}: DashboardProps) {
    const pendingTasks = tasks.filter(
        (task) => task.status === "pending"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "inProgress"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Total Tasks
                    </p>

                    <h2 className="text-3xl font-bold">
                        {tasks.length}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Pending
                    </p>

                    <h2 className="text-3xl font-bold">
                        {pendingTasks}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        In Progress
                    </p>

                    <h2 className="text-3xl font-bold">
                        {inProgressTasks}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">
                        Completed
                    </p>

                    <h2 className="text-3xl font-bold">
                        {completedTasks}
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
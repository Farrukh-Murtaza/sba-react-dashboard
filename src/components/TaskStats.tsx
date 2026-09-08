import type { Task } from "../types";

interface TaskStatsProps {
    tasks: Task[];
}

function TaskStats({
    tasks,
}: TaskStatsProps) {
    const pending = tasks.filter(
        (task) =>
            task.status === "pending"
    ).length;

    const inProgress = tasks.filter(
        (task) =>
            task.status === "inProgress"
    ).length;

    const completed = tasks.filter(
        (task) =>
            task.status === "completed"
    ).length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                label="Total Tasks"
                value={tasks.length}
            />

            <StatCard
                label="Pending"
                value={pending}
            />

            <StatCard
                label="In Progress"
                value={inProgress}
            />

            <StatCard
                label="Completed"
                value={completed}
            />
        </div>
    );
}

interface StatCardProps {
    label: string;
    value: number;
}

function StatCard({
    label,
    value,
}: StatCardProps) {
    return (
        <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500 text-sm">
                {label}
            </p>

            <p className="text-3xl font-bold mt-2">
                {value}
            </p>
        </div>
    );
}

export default TaskStats;
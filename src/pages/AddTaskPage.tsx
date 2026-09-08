import { useNavigate } from "react-router-dom";

import TaskForm from "../components/TaskForm";
import type { Task } from "../types";

interface AddTaskPageProps {
    onAddTask: (task: Task) => void;
}

function AddTaskPage({
    onAddTask,
}: AddTaskPageProps) {
    const navigate = useNavigate();

    function handleAddTask(task: Task) {
        onAddTask(task);

        navigate("/tasks");
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
                Add New Task
            </h1>

            <TaskForm
                onAddTask={handleAddTask}
            />
        </div>
    );
}

export default AddTaskPage;
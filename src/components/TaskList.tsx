import type { Task, TaskStatus } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: Task[]
    onUpdateList: (id: string, status: TaskStatus) => void,
    onDeleteTask: (id: string) => void

}


function TaskList({ tasks, onUpdateList, onDeleteTask }: TaskListProps) {



    return (
        <div className="space-y-6">
            <div>{`Results: ${tasks.length}`}</div>
            {
                tasks.length > 0
                    ? tasks.map((task) =>
                        <TaskItem
                            key={task.id}
                            task={task}
                            onTaskStatusChange={onUpdateList}
                            onDeleteTask={onDeleteTask}
                        />)
                    : <div className="bg-gray-400 p-4 rounded-md text-white">No Result Found</div>
            }
        </div >
    )

}

export default TaskList;
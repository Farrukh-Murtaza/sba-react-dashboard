// types/index.ts
export type TaskStatus =
    | 'pending'
    | 'inProgress'
    | 'completed';

export type TaskPriority =
    | 'low'
    | 'medium'
    | 'high';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

export interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}


export interface TaskFilters {
    status: "all" | TaskStatus;
    priority: "all" | TaskPriority;
    search: string;
}

export type SortOption =
    | "title"
    | "dueDate"
    | "priority"
    | "status";

export interface TaskFormProps {
    task?: Task;
    onSubmit: (task: Task) => void;
    onCancel: () => void;
}

export interface TaskListProps {
    tasks: Task[];
    onUpdateList: (
        id: string,
        status: TaskStatus
    ) => void;
    onDeleteTask: (id: string) => void;
    onEditTask: (task: Task) => void;
}
export const initialTasks: Task[] = [

];
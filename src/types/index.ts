// types/index.ts
export type TaskStatus = 'pending' | 'inProgress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
}

export interface TaskListProps {
    tasks: Task[];
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
}


export interface TaskItemProps {
    task: Task;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
}


export interface TaskFilterProps {
    onFilterChange: (filters: {
        status?: TaskStatus;
        priority?: 'low' | 'medium' | 'high';
    }) => void;
}

export const initialTasks: Task[] = [
    { id: "1", title: "Task 1", description: "Description 1", status: "inProgress", priority: "low", dueDate: "8/31/2026" },
    { id: "2", title: "Task 2", description: "Description 2", status: "pending", priority: "medium", dueDate: "9/2/2026" },
    { id: "3", title: "Task 3", description: "Description 3", status: "completed", priority: "low", dueDate: "8/20/2026" },
    { id: "4", title: "Task 4", description: "Description 4", status: "inProgress", priority: "medium", dueDate: "9/5/2026" },
    { id: "5", title: "Task 5", description: "Description 5", status: "pending", priority: "low", dueDate: "9/10/2026" },
    { id: "6", title: "Task 6", description: "Description 6", status: "completed", priority: "medium", dueDate: "8/15/2026" },
    { id: "7", title: "Task 7", description: "Description 7", status: "inProgress", priority: "high", dueDate: "9/1/2026" },
    { id: "8", title: "Task 8", description: "Description 8", status: "pending", priority: "high", dueDate: "9/8/2026" },
    { id: "9", title: "Task 9", description: "Description 9", status: "inProgress", priority: "low", dueDate: "9/12/2026" },
    { id: "10", title: "Task 10", description: "Description 10", status: "pending", priority: "medium", dueDate: "9/15/2026" },
    { id: "11", title: "Task 11", description: "Description 11", status: "completed", priority: "low", dueDate: "8/10/2026" },
    { id: "12", title: "Task 12", description: "Description 12", status: "inProgress", priority: "medium", dueDate: "9/3/2026" },
    { id: "13", title: "Task 13", description: "Description 13", status: "pending", priority: "low", dueDate: "9/20/2026" },
    { id: "14", title: "Task 14", description: "Description 14", status: "completed", priority: "medium", dueDate: "8/5/2026" },
    { id: "15", title: "Task 15", description: "Description 15", status: "inProgress", priority: "high", dueDate: "9/18/2026" },
    { id: "16", title: "Task 16", description: "Description 16", status: "pending", priority: "high", dueDate: "9/22/2026" },
    { id: "17", title: "Task 17", description: "Description 17", status: "inProgress", priority: "low", dueDate: "9/25/2026" },
    { id: "18", title: "Task 18", description: "Description 18", status: "pending", priority: "medium", dueDate: "9/28/2026" },
    { id: "19", title: "Task 19", description: "Description 19", status: "completed", priority: "low", dueDate: "7/30/2026" },
    { id: "20", title: "Task 20", description: "Description 20", status: "inProgress", priority: "medium", dueDate: "9/30/2026" },
];
import type React from "react";
import { useState } from "react";

interface TaskFilterProps {
    selectedStatus: string,
    selectedPriority: string,
    onFilter: (status: string, priority: string) => void
}

function TaskFilter({ selectedStatus, selectedPriority, onFilter }: TaskFilterProps) {

    const [statusFilter, setStatusFilter] = useState(selectedStatus);
    const [priorityFilter, setPriorityFilter] = useState(selectedPriority);

    function handleFilters(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value;

        if (event.target.id === 'status-filter') {
            setStatusFilter(value);
            onFilter(value, priorityFilter)
        }

        if (event.target.id === 'priority-filter') {
            setPriorityFilter(value);
            onFilter(statusFilter, value)
        }

    }


    return (
        <div className="flex gap-4 py-4 justify-end">
            <div>
                <label
                    htmlFor="status-filter"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Status </label>

                <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={handleFilters}
                    className="bg-white px-2 py-1 block w-full rounded-md border-gray-300
                     shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div>
                <label
                    htmlFor="priority-filter"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Priority</label>

                <select
                    id="priority-filter"
                    value={priorityFilter}
                    onChange={handleFilters}
                    className="bg-white px-2 py-1 block w-full rounded-md border-gray-300
                     shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
        </div >
    )

}


export default TaskFilter;
import TextField from "./textField";

function TaskForm() {
    return (

        <form
            className="max-w-xl m-auto space-y-6 rounded-lg bg-white p-6 shadow-md">
            {/* Title */}
            <div>

                <TextField
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    placeholder="Enter task title"
                />
            </div>

            {/* Description */}
            <div>
                <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Enter task description"
                    className="w-full resize-none rounded-md border border-gray-300 px-4 py-2 text-gray-900
                 outline-none transition
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
            </div>

            {/* Status */}
            <div>
                <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Status
                </label>

                <select
                    id="status"
                    name="status"
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900
                 outline-none transition
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Priority */}
            <div>
                <label
                    htmlFor="priority"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Priority
                </label>

                <select
                    id="priority"
                    name="priority"
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900
                 outline-none transition
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {/* Due Date */}
            <div>


                <TextField
                    id="dueDate"
                    name="dueDate"
                    label="Due Date"
                    type="date"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2.5 font-medium text-white
               transition hover:bg-blue-700
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Create Task
            </button>
        </form>

    )
}


export default TaskForm;
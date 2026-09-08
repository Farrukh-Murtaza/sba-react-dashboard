import DashboardLayout from "../layout/DashboardLayout";


export default function Task() {

    const tasks = ["Review dashboard", "Update task list", "Plan next sprint"];
    return (

        <DashboardLayout>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1>All Tasks</h1>
                    <button type="button">Add Task</button>
                </div>
                <ul>
                    {tasks.map((task) => (
                        <li key={task}>{task}</li>
                    ))}
                </ul>
            </div>
        </DashboardLayout>
    )


}
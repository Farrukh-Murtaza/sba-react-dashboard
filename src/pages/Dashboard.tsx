import DashboardLayout from "../layout/DashboardLayout";


function Dashboard() {
    return (
        <DashboardLayout>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
                My Tasks
            </h2>

            <div className="rounded-lg bg-white p-6 shadow">
                Your dashboard content goes here.
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;
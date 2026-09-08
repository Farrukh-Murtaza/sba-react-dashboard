import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const DashboardLayout = () => {
    return (

        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            {/* Main Content */}
            <div className="flex min-h-screen flex-1 flex-col">

                {/* Top Header */}
                <header className="flex h-16 items-center justify-between border-b bg-white px-6">
                    <h2 className="text-lg font-semibold text-gray-800"> Dashboard </h2>
                    <div className="text-sm text-gray-600"> Welcome back! </div>
                </header>


                {/* Page Content */}
                <main className="flex-1 p-6">  <Outlet /> </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

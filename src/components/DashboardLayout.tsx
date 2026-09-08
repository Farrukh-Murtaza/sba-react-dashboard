import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";


const DashboardLayout = () => {
    return (

        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            {/* Main Content */}
            <div className="flex min-h-screen flex-1 flex-col">

                {/* Top Header */}
                <header className="flex h-16 items-center justify-between border-b bg-white dark:bg-gray-900 px-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white"> Dashboard </h2>

                    <ThemeToggle />

                </header>


                {/* Page Content */}
                <main className="flex-1 p-6 bg-white dark:bg-gray-900">  <Outlet /> </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

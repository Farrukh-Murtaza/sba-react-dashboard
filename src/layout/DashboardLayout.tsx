import type { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (

        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white">

                {/* Logo */}
                <div
                    className="flex h-16 items-center border-b border-gray-700 px-6">

                    <h1
                        className="text-xl font-bold">Task Manager</h1>
                </div>


                {/* Navigation */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="#"
                                className="block rounded-md bg-gray-800 px-4 py-3 
                                text-sm font-medium hover:bg-gray-700" >
                                Dashboard </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block rounded-md px-4 py-3 text-sm font-medium
                                 hover:bg-gray-800" >
                                Tasks </a>
                        </li>
                        <li>
                            <a href="#" className="block rounded-md px-4 py-3 text-sm font-medium hover:bg-gray-800" > Settings </a>
                        </li>
                    </ul>
                </nav> {/* Logout */}

                <div className="absolute bottom-0 w-full border-t
                 border-gray-700 p-4">
                    <button type="button" className="w-full rounded-md px-4 py-2 
                    text-left text-sm font-medium hover:bg-gray-800" >
                        Logout
                    </button>
                </div>

            </aside>

            {/* Main Content */}
            <div className="ml-64 flex min-h-screen flex-1 flex-col">

                {/* Top Header */}
                <header className="flex h-16 items-center justify-between border-b bg-white px-6">
                    <h2 className="text-lg font-semibold text-gray-800"> Dashboard </h2>
                    <div className="text-sm text-gray-600"> Welcome back! </div>
                </header>


                {/* Page Content */}
                <main className="flex-1 p-6"> {children} </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

import { NavLink } from "react-router-dom";

function Sidebar() {
    const linkClass =
        "block px-4 py-3 rounded-lg transition";

    return (
        <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r p-5">
            <h1 className="text-2xl font-bold mb-8 dark:text-white">
                Task Dashboard
            </h1>

            <nav className="space-y-3">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `${linkClass} ${isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-400 text-slate-500 "
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/tasks"
                    className={({ isActive }) =>
                        `${linkClass} ${isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100  text-gray-600 dark:text-gray-300 text-white-600 dark:text-white-300"
                        }`
                    }
                >
                    Tasks
                </NavLink>


            </nav>
        </aside>
    );
}

export default Sidebar;
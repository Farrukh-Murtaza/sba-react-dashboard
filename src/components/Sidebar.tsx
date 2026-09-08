import { NavLink } from "react-router-dom";

function Sidebar() {
    const linkClass =
        "block px-4 py-3 rounded-lg transition";

    return (
        <aside className="w-64 min-h-screen bg-white border-r p-5">
            <h1 className="text-2xl font-bold mb-8">
                Task Dashboard
            </h1>

            <nav className="space-y-3">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `${linkClass} ${isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
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
                            : "hover:bg-gray-100"
                        }`
                    }
                >
                    Tasks
                </NavLink>

                <NavLink
                    to="/tasks/new"
                    className={({ isActive }) =>
                        `${linkClass} ${isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                        }`
                    }
                >
                    Add Task
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;
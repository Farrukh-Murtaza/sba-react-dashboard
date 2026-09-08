import {
    Moon,
    Sun,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
    const {
        theme,
        toggleTheme,
    } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-lg border dark:border-white px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
            title="Toggle theme"
        >
            {theme === "light" ? (
                <>
                    <Moon size={18} />
                    <span>Dark</span>
                </>
            ) : (
                <>
                    <Sun size={18} className="dark:border-white dark:text-white" />
                    <span className="dark:text-white">Light</span>
                </>
            )}
        </button>
    );
}

export default ThemeToggle;
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

export type Theme =
    | "light"
    | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext =
    createContext<
        ThemeContextType | undefined
    >(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const [theme, setTheme] =
        useState<Theme>(() => {
            const savedTheme =
                localStorage.getItem(
                    "sba-task-dashboard-theme"
                );

            if (
                savedTheme === "dark" ||
                savedTheme === "light"
            ) {
                return savedTheme;
            }

            return "light";
        });

    useEffect(() => {
        const root =
            document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove(
                "dark"
            );
        }

        localStorage.setItem(
            "sba-task-dashboard-theme",
            theme
        );
    }, [theme]);

    function toggleTheme() {
        setTheme((currentTheme) =>
            currentTheme === "light"
                ? "dark"
                : "light"
        );
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

// This module intentionally exports both the provider component and its hook.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    const context =
        useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );
    }

    return context;
}
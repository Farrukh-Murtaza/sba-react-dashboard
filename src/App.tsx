import {
  useEffect,
  useState,
} from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import NotFound from "./pages/NotFound";

import {
  initialTasks,
  type Task,
  type TaskStatus,
} from "./types";

import {
  loadTasks,
  saveTasks,
} from "./utils/storage";

import {
  ThemeProvider,
} from "./context/ThemeContext";

function App() {
  const [tasks, setTasks] =
    useState<Task[]>(() => {
      const storedTasks =
        loadTasks();

      return (
        storedTasks ??
        initialTasks
      );
    });

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function updateTaskStatus(
    id: string,
    status: TaskStatus
  ) {
    setTasks(
      (previousTasks) =>
        previousTasks.map(
          (task) =>
            task.id === id
              ? {
                ...task,
                status,
              }
              : task
        )
    );
  }

  function addTask(
    newTask: Task
  ) {
    setTasks(
      (previousTasks) => [
        ...previousTasks,
        newTask,
      ]
    );
  }

  function updateTask(
    updatedTask: Task
  ) {
    setTasks(
      (previousTasks) =>
        previousTasks.map(
          (task) =>
            task.id ===
              updatedTask.id
              ? updatedTask
              : task
        )
    );
  }

  function deleteTask(
    id: string
  ) {
    const isConfirmed =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!isConfirmed) {
      return;
    }

    setTasks(
      (previousTasks) =>
        previousTasks.filter(
          (task) =>
            task.id !== id
        )
    );
  }

  function importTasks(
    importedTasks: Task[]
  ) {
    setTasks(
      importedTasks
    );
  }

  function reorderTasks(
    draggedTaskId: string,
    targetTaskId: string
  ) {
    setTasks((previousTasks) => {
      const draggedIndex =
        previousTasks.findIndex(
          (task) =>
            task.id ===
            draggedTaskId
        );

      const targetIndex =
        previousTasks.findIndex(
          (task) =>
            task.id ===
            targetTaskId
        );

      if (
        draggedIndex === -1 ||
        targetIndex === -1 ||
        draggedIndex === targetIndex
      ) {
        return previousTasks;
      }

      const updatedTasks = [
        ...previousTasks,
      ];

      const [draggedTask] =
        updatedTasks.splice(
          draggedIndex,
          1
        );

      updatedTasks.splice(
        targetIndex,
        0,
        draggedTask
      );

      return updatedTasks;
    });
  }

  return (
    <ThemeProvider>
      <Routes>
        <Route
          element={
            <DashboardLayout />
          }
        >
          <Route
            path="/"
            element={
              <Dashboard
                tasks={
                  tasks
                }
              />
            }
          />

          <Route
            path="/tasks"
            element={
              <TasksPage
                tasks={tasks}
                onUpdateTaskStatus={
                  updateTaskStatus
                }
                onAddTask={addTask}
                onUpdateTask={
                  updateTask
                }
                onDeleteTask={
                  deleteTask
                }
                onImportTasks={
                  importTasks
                }
                onReorderTasks={
                  reorderTasks
                }
              />
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <NotFound />
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
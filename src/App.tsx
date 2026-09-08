import { useEffect, useState } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import NotFound from "./pages/NotFound";
import { initialTasks } from "./data/tasks";

import {

  type Task,
  type TaskStatus,
} from "./types";

import {
  loadTasks,
  saveTasks,
} from "./utils/storage";

function App() {
  const [tasks, setTasks] =
    useState<Task[]>(() => {
      const storedTasks =
        loadTasks();

      return storedTasks ??
        initialTasks;
    });

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function updateTaskStatus(
    id: string,
    status: TaskStatus
  ) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
            ...task,
            status,
          }
          : task
      )
    );
  }

  function addTask(newTask: Task) {
    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);
  }

  function updateTask(
    updatedTask: Task
  ) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  }

  function deleteTask(id: string) {
    const isConfirmed =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!isConfirmed) {
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) =>
          task.id !== id
      )
    );
  }

  function importTasks(
    importedTasks: Task[]
  ) {
    setTasks(importedTasks);
  }

  return (
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
              tasks={tasks}
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
              onAddTask={
                addTask
              }
              onUpdateTask={
                updateTask
              }
              onDeleteTask={
                deleteTask
              }
              onImportTasks={
                importTasks
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
  );
}

export default App;
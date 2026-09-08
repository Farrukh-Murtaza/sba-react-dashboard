import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import NotFound from "./pages/NotFound";

import type {
  initialTasks,
  Task,
  TaskStatus,
} from "./types";

import {
  loadTasks,
  saveTasks,
} from "./utils/storage";

function App() {
  const [tasks, setTasks] = useState<Task[]>(
    () => loadTasks()
  );

  // Save tasks whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function handleAddTask(
    newTask: Task
  ) {
    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);
  }

  function handleUpdateTask(
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

  function handleUpdateStatus(
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

  function handleDeleteTask(
    id: string
  ) {

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (isConfirmed) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    }


  }

  function handleImportTasks(
    importedTasks: Task[]
  ) {
    setTasks(importedTasks);
  }

  return (
    <Routes>
      <Route element={<DashboardLayout />}>

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
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onUpdateStatus={
                handleUpdateStatus
              }
              onDeleteTask={
                handleDeleteTask
              }
              onImportTasks={
                handleImportTasks
              }
            />
          }
        />

      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;
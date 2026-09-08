import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";

import {
  initialTasks,
  type Task,
  type TaskStatus,
} from "./types";
import NotFound from "./pages/NotFound";
import AddTaskPage from "./pages/AddTaskPage";

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function updateTaskStatus(id: string, status: TaskStatus) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status }
          : task
      )
    );
  }

  function addTask(newTask: Task) {
    setTasks((prevTasks) => [
      ...prevTasks,
      newTask,
    ]);
  }

  function deleteTask(id: string) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (isConfirmed) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    }
  }

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route
          path="/"
          element={<Dashboard tasks={tasks} />}
        />

        <Route
          path="/tasks"
          element={
            <TasksPage
              tasks={tasks}
              onUpdateTask={updateTaskStatus}
              onDeleteTask={deleteTask}
            />
          }
        />

        <Route
          path="/tasks/new"
          element={
            <AddTaskPage
              onAddTask={addTask}
            />
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
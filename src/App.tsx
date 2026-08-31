import { useState } from "react";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import { initialTasks, type Task, type TaskStatus } from "./types";

function App() {

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setPriorityStatus] = useState<string>('all');

  const [tasks, setTasks] = useState<Task[]>(initialTasks);


  function updateList(id: string, status: TaskStatus) {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, status } : task))
    );
  }

  function deleteTask(id: string) {
    const isConfirm: boolean = window.confirm(`Are you sure you want to delete task with id : ${id}`)
    if (isConfirm) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  }

  function onFilterChange(status: string, priority: string) {
    setSelectedStatus(status);
    setPriorityStatus(priority);
  }

  let filteredTasks = tasks;

  if (selectedStatus !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.status === selectedStatus);
  }

  if (selectedPriority !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.priority === selectedPriority);
  }


  return (
    <div className="max-w-200 m-auto ">
      <h2
        className="tracking-tight text-slate-900 font-semibold
        target:animate-[fade-in_1.5s] mt-10 border-b
         pb-1 text-3xl nextra-border"
      >Task Manager</h2>

      <TaskFilter
        onFilter={onFilterChange}
        selectedStatus={selectedStatus}
        selectedPriority={selectedPriority} />


      <TaskList
        tasks={filteredTasks}
        onUpdateList={updateList}
        onDeleteTask={deleteTask} />

    </div>
  )
}

export default App;
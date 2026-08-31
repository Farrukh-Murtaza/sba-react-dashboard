# Task Manager

A small React + TypeScript task management app. Tasks can be filtered by status and priority, have their status updated inline, and be deleted with confirmation.

## Features

- List tasks with status, priority, and due date
- Filter tasks by status (`pending`, `inProgress`, `completed`) and priority (`low`, `medium`, `high`)
- Change a task's status directly from the list
- Delete a task (with a confirmation prompt)
- Empty-state message when no tasks match the current filters
- Color-coded badges for status and priority

## Project Structure

```
src/
├── App.tsx                 # Top-level state and composition
├── types/
│   └── index.ts             # Task types and seed data
└── components/
    ├── TaskFilter.tsx       # Status/priority dropdowns
    ├── TaskList.tsx         # Renders the list, handles empty state
    └── TaskItem.tsx         # Single task row: status select + delete
```

## Data Model

```ts
type TaskStatus = 'pending' | 'inProgress' | 'completed';
type TaskPriority = 'low' | 'medium' | 'high';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}
```

## `types/index.ts`

This file is the single source of truth for the app's data shape and seed data — every component imports its types from here rather than redeclaring them.

```ts
export type TaskStatus = 'pending' | 'inProgress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}
```

It exports:

- **`TaskStatus`** — the union of valid status strings. Used anywhere a status is *set* (e.g. `updateList`'s parameter), so the compiler rejects typos like `'inprogress'`.
- **`TaskPriority`** — the union of valid priority strings, same reasoning as `TaskStatus`.
- **`Task`** — the shape of a single task object. Every component (`TaskItem`, `TaskList`, `TaskFilter`) imports this instead of declaring its own local version, so there's one definition to update if the data model changes.
- **`initialTasks`** — an array of 20 sample `Task` objects used to seed `App`'s state via `useState<Task[]>(initialTasks)`. This is what makes the app usable out of the box without a backend or manual data entry.

> **Note:** `types/index.ts` also originally exported `TaskListProps`, `TaskItemProps`, and `TaskFilterProps` interfaces. These aren't used — each component declares its own local prop interface instead (e.g. `TaskFilter.tsx` has its own `TaskFilterProps` with different fields: `onFilter` instead of `onFilterChange`, `selectedStatus`/`selectedPriority` instead of nothing). Having two differently-shaped interfaces with the same name in the codebase is confusing and easy to edit in the wrong place. Recommended cleanup: delete the unused ones from `types/index.ts`, or delete the local ones and have components import from `types/index.ts` instead — pick one and keep it consistent.

## Architecture

`App` owns the single source of truth: the full `tasks` array, plus the two filter values (`selectedStatus`, `selectedPriority`).

- **`tasks`** is never mutated by filtering — only `updateList` and `deleteTask` change it.
- The **visible list** (`filteredTasks`) is a plain variable computed at the top of `App`'s render, by filtering `tasks` against the current `selectedStatus`/`selectedPriority`. Because it's recalculated on every render, it's always in sync with the latest data — there's no separate "filtered" state that can drift out of date.

```tsx
let filteredTasks = tasks;

if (selectedStatus !== 'all') {
  filteredTasks = filteredTasks.filter(task => task.status === selectedStatus);
}

if (selectedPriority !== 'all') {
  filteredTasks = filteredTasks.filter(task => task.priority === selectedPriority);
}
```

Data flows one direction: `App` passes `tasks`/callbacks down to `TaskList`, which passes a single task and callbacks down to `TaskItem`. Events flow back up: `TaskItem` calls the callback it was given, which calls the callback `TaskList` was given, which ultimately calls `updateList` / `deleteTask` in `App`.

## Component API

### `TaskFilter`

```ts
interface TaskFilterProps {
  selectedStatus: string;
  selectedPriority: string;
  onFilter: (status: string, priority: string) => void;
}
```

Two `<select>` dropdowns (status, priority). On change, calls `onFilter` with the *new* status and priority together, so `App` always receives both current values, not just the one that changed.

### `TaskList`

```ts
interface TaskListProps {
  tasks: Task[];
  onUpdateList: (id: string, status: string) => void;
  onDeleteTask: (id: string) => void;
}
```

Renders one `TaskItem` per task, using `task.id` as the React `key`. Shows a result count and an empty-state message when `tasks.length === 0`.

### `TaskItem`

```ts
interface TaskItemProps {
  task: Task;
  onTaskStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}
```

Renders a task's title, description, due date, and priority. Includes a status `<select>` (colored per status) and a delete button (confirms via `window.confirm` before calling `onDelete`).

## Example Usage

```tsx
import { useState } from "react";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import { initialTasks, type Task, type TaskStatus } from "./types";

function App() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function updateList(id: string, status: TaskStatus) {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, status } : task))
    );
  }

  function deleteTask(id: string) {
    const isConfirm = window.confirm(`Are you sure you want to delete task with id: ${id}`);
    if (isConfirm) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  }

  function onFilterChange(status: string, priority: string) {
    setSelectedStatus(status);
    setSelectedPriority(priority);
  }

  let filteredTasks = tasks;
  if (selectedStatus !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.status === selectedStatus);
  }
  if (selectedPriority !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.priority === selectedPriority);
  }

  return (
    <div className="max-w-200 m-auto">
      <h2 className="text-3xl font-semibold border-b pb-1 mt-10">Task Manager</h2>

      <TaskFilter
        onFilter={onFilterChange}
        selectedStatus={selectedStatus}
        selectedPriority={selectedPriority}
      />

      <TaskList
        tasks={filteredTasks}
        onUpdateList={updateList}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
```

**To try it:** change a task's status dropdown, filter by a different status/priority, then clear the filter back to "All" — every task, including the one you just updated, is still present, because `tasks` itself is never touched by filtering.

## Running Locally

```bash
npm install
npm run dev
```

## Reflection

**How did you ensure unique keys for your list items?**
Each `Task` has a stable `id` string from the seed data, and `TaskList` uses `task.id` as the `key` prop when mapping over tasks. Using the id (rather than the array index) means React can correctly track each row's identity even after the list is filtered, reordered, or has an item removed — an index-based key would cause React to misattribute state to the wrong row in those situations.

**What considerations did you make when implementing the filtering functionality?**
The main decision was *where* the filtered result lives. Early on, it was tempting to store the filtered list in its own state variable and update it inside the filter handler — but that creates two sources of truth that can fall out of sync (for example, updating a task's status after filtering would silently drop the filter, because the "filtered" copy wasn't being recalculated from the latest data). The fix was to keep `tasks` as the single source of truth and derive the visible list as a plain variable computed at the top of the render function, filtered against the current `selectedStatus` and `selectedPriority`. Because it's recalculated every render, it's always correct with no risk of going stale.

**How did you handle state updates for task status changes?**
Status changes flow up through callbacks: `TaskItem`'s `<select>` fires `onTaskStatusChange(id, newStatus)`, which `TaskList` forwards to `App`'s `updateList`. `updateList` is the only place that actually calls `setTasks`, using `.map()` to return a new array with just the matching task replaced (`{ ...task, status }`), leaving everything else untouched. Keeping a single owner of the state, rather than mirroring `status` in local component state as well, avoids the two-sources-of-truth problem.

**What challenges did you face when implementing conditional rendering?**
The two main cases were: (1) mapping status/priority values to display colors, where a `default` fallback in `getPriorityElement` prevents an unstyled or broken badge if an unexpected value ever shows up, and (2) the empty state — `TaskList` needs to render a "No Result Found" message instead of an empty list when a filter combination matches nothing, which meant checking `tasks.length > 0` before mapping rather than assuming there's always at least one task to render.
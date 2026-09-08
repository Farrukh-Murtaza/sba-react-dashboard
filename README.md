# Task Manager Dashboard

A responsive React + TypeScript task management dashboard built as a Software Development Assignment (SBA). The application allows users to create, edit, delete, search, filter, sort, reorder, import, and export tasks. It also includes form validation, localStorage persistence, responsive UI, and light/dark mode support.

## Features

### Task Management

* Display a list of tasks with:

  * Title
  * Description
  * Status
  * Priority
  * Due date
* Add new tasks
* Edit existing tasks
* Delete tasks with confirmation
* Update task status directly from the task list
* Drag and drop tasks to manually reorder them
* Empty-state message when no tasks match the current filters

### Search, Filtering & Sorting

* Search tasks by title or description
* Filter tasks by status:

  * `pending`
  * `inProgress`
  * `completed`
* Filter tasks by priority:

  * `low`
  * `medium`
  * `high`
* Combine search, status, and priority filters
* Sort tasks by:

  * Manual Order
  * Due Date
  * Title
  * Priority
  * Status

### Form Validation

Task forms include validation for:

* Required title
* Minimum title length
* Required description
* Minimum description length
* Required due date
* Validation feedback displayed directly below the relevant field

The same form component is used for both creating and editing tasks.

### Data Persistence

Tasks are automatically saved to browser `localStorage`.

This means:

* Tasks remain available after refreshing the page
* Adding a task persists automatically
* Editing a task persists automatically
* Deleting a task persists automatically
* Status changes persist automatically
* Drag-and-drop ordering persists automatically

### Import & Export

Tasks can be exported as a JSON file and imported again later.

#### Export

The application creates a JSON file containing the current task list.

Example filename:

```text
tasks-2026-09-08.json
```

#### Import

Users can select a previously exported JSON file.

The application:

* Reads the selected file
* Parses the JSON
* Validates the task structure
* Displays an error for invalid files
* Asks for confirmation before replacing the current task list

### Light & Dark Mode

The application supports both light and dark themes.

Features include:

* Light mode
* Dark mode
* Theme toggle
* Theme saved to `localStorage`
* Theme remains selected after refreshing the page
* Dark-mode styling for task cards, forms, inputs, dropdowns, buttons, and other UI elements

The theme is managed centrally through React Context.

### Responsive Design

The dashboard uses Tailwind CSS responsive utilities to support:

* Desktop
* Tablet
* Mobile

Task forms, filters, sorting controls, task cards, and dashboard content adapt to different screen sizes.

---

# Technologies

* React
* TypeScript
* React Router
* Tailwind CSS
* Lucide React
* Vite
* Browser Local Storage
* Native HTML5 Drag and Drop API

---

# Project Structure

```text
src/
├── App.tsx
│
├── components/
│   ├── DashboardLayout.tsx
│   ├── DataManager.tsx
│   ├── Modal.tsx
│   ├── TaskFilter.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   └── ThemeToggle.tsx
│
├── context/
│   └── ThemeContext.tsx
│
├── pages/
│   ├── Dashboard.tsx
│   ├── NotFound.tsx
│   └── TasksPage.tsx
│
├── types/
│   └── index.ts
│
└── utils/
    ├── date.ts
    ├── storage.ts
    ├── taskImportExport.ts
    ├── taskUtils.ts
    └── validation.ts
```

---

# Data Model

The application uses TypeScript interfaces and union types to provide type safety throughout the application.

```ts
export type TaskStatus =
    | "pending"
    | "inProgress"
    | "completed";

export type TaskPriority =
    | "low"
    | "medium"
    | "high";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}
```

The task form uses a separate type:

```ts
export interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}
```

Filtering is represented by:

```ts
export interface TaskFilters {
    status: "all" | TaskStatus;
    priority: "all" | TaskPriority;
    search: string;
}
```

Sorting is represented by:

```ts
export type SortOption =
    | "manual"
    | "title"
    | "dueDate"
    | "priority"
    | "status";
```

---

# TypeScript Organization

`src/types/index.ts` acts as the central source of truth for the application's data types and seed data.

It contains:

* `TaskStatus`
* `TaskPriority`
* `Task`
* `TaskFormData`
* `TaskFilters`
* `SortOption`
* `initialTasks`

Using shared TypeScript types prevents different components from defining conflicting versions of the same data.

For example, a status update must use one of the valid values:

```ts
function updateTaskStatus(
    id: string,
    status: TaskStatus
) {
    // ...
}
```

This prevents invalid values such as:

```ts
"inprogress"
```

because the valid value is:

```ts
"inProgress"
```

---

# Application Architecture

The application follows a component-based React architecture.

`App.tsx` owns the main task state and provides the functions required to modify it.

The general data flow is:

```text
App
 │
 ├── tasks
 ├── addTask()
 ├── updateTask()
 ├── updateTaskStatus()
 ├── deleteTask()
 ├── importTasks()
 └── reorderTasks()
        │
        ▼
   TasksPage
        │
        ├── TaskFilter
        ├── TaskForm
        └── TaskList
              │
              ▼
          TaskItem
```

Child components do not directly modify the main task array.

Instead, they receive callback functions through props.

For example:

```text
TaskItem
   │
   │ onTaskStatusChange()
   ▼
TaskList
   │
   │ onUpdateList()
   ▼
TasksPage
   │
   │ onUpdateTaskStatus()
   ▼
App
   │
   ▼
setTasks()
```

This keeps `tasks` as the single source of truth.

---

# Task Filtering

Filtering is handled by the `filterTasks()` utility in:

```text
src/utils/taskUtils.ts
```

The function accepts the complete task array and the current filter settings.

```ts
filterTasks(
    tasks,
    filters
);
```

The function checks:

1. Search term
2. Status
3. Priority

For example:

```ts
const matchesSearch =
    !searchTerm ||
    task.title
        .toLowerCase()
        .includes(searchTerm) ||
    task.description
        .toLowerCase()
        .includes(searchTerm);
```

The filtered list is derived from the original task list instead of being stored as separate state.

This avoids having two sources of truth.

---

# Sorting

Sorting is handled by:

```text
src/utils/taskUtils.ts
```

The application supports five sorting modes:

```text
Manual Order
Due Date
Title
Priority
Status
```

The manual order option is especially important for drag-and-drop.

When `Manual Order` is selected, the original task array order is preserved.

When another sorting option is selected, the displayed tasks are sorted according to that option.

---

# Drag & Drop Reordering

Tasks can be reordered using the native HTML5 Drag and Drop API.

Each `TaskItem` is draggable:

```tsx
<div
    draggable
    onDragStart={handleDragStart}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
>
```

The task ID is stored when dragging begins.

When the task is dropped onto another task, the application sends both IDs back to `App`.

```ts
onReorderTasks(
    draggedTaskId,
    targetTaskId
);
```

`App.tsx` then creates a new task array with the dragged task moved to the target position.

The task IDs are used instead of array indexes so that React can maintain stable task identity.

---

# Form Validation

Validation is separated into:

```text
src/utils/validation.ts
```

The main validation function is:

```ts
validateTask(formData)
```

It returns an object containing any validation errors.

Example:

```ts
{
    title: "Title is required.",
    description: "Description is required."
}
```

The form checks the validation result before creating or updating a task.

This keeps validation logic separate from the UI component.

---

# Date Formatting

Due dates are formatted using:

```text
src/utils/date.ts
```

The application stores dates in the HTML date input format:

```text
YYYY-MM-DD
```

For example:

```text
2026-09-07
```

is displayed as:

```text
07-9-2026
```

This is handled by:

```ts
formatDueDate(dateString);
```

---

# Local Storage

Task persistence is handled by:

```text
src/utils/storage.ts
```

The main functions are:

```ts
loadTasks()
saveTasks(tasks)
clearStoredTasks()
```

When the application starts, it attempts to load tasks from localStorage.

If no saved tasks exist, it falls back to the initial seed data.

```ts
const storedTasks = loadTasks();

return storedTasks ?? initialTasks;
```

Whenever the task array changes:

```ts
useEffect(() => {
    saveTasks(tasks);
}, [tasks]);
```

This automatically keeps localStorage synchronized with the application state.

---

# Import & Export

Import/export functionality is contained in:

```text
src/utils/taskImportExport.ts
```

Main functions:

```ts
exportTasks(tasks)
importTasks(file)
validateImportedTasks(data)
```

Imported data is validated before being accepted.

Each imported task must contain:

```text
id
title
description
status
priority
dueDate
```

The status and priority values are also validated against their TypeScript-compatible values.

---

# Theme Management

Theme state is managed through:

```text
src/context/ThemeContext.tsx
```

The context provides:

```ts
theme
toggleTheme()
```

The application supports:

```ts
"light"
"dark"
```

The theme is applied to the root HTML element using the `dark` class.

```ts
if (theme === "dark") {
    document.documentElement.classList.add(
        "dark"
    );
} else {
    document.documentElement.classList.remove(
        "dark"
    );
}
```

The selected theme is also stored in localStorage.

---

# Component API

## TaskFilter

The current `TaskFilter` component receives the complete filter object:

```ts
interface TaskFilterProps {
    filters: TaskFilters;

    onChange: (
        filters: TaskFilters
    ) => void;
}
```

It handles:

* Status filtering
* Priority filtering
* Search filtering
* Active filter state

---

## TaskList

```ts
interface TaskListProps {
    tasks: Task[];

    onUpdateList: (
        id: string,
        status: TaskStatus
    ) => void;

    onDeleteTask: (
        id: string
    ) => void;

    onEditTask: (
        task: Task
    ) => void;

    onReorderTasks: (
        draggedTaskId: string,
        targetTaskId: string
    ) => void;
}
```

`TaskList`:

* Renders the task collection
* Uses `task.id` as the React key
* Displays the result count
* Displays the empty state
* Handles drag-and-drop communication

---

## TaskItem

```ts
interface TaskItemProps {
    task: Task;

    onTaskStatusChange: (
        id: string,
        status: TaskStatus
    ) => void;

    onDeleteTask: (
        id: string
    ) => void;

    onEditTask: (
        task: Task
    ) => void;

    onDragStart: (
        id: string
    ) => void;

    onDragOver: (
        event: React.DragEvent<HTMLDivElement>
    ) => void;

    onDrop: (
        id: string
    ) => void;
}
```

`TaskItem` displays:

* Task title
* Description
* Status
* Priority
* Due date
* Edit button
* Delete button
* Drag handle

---

## TaskForm

`TaskForm` is used for both adding and editing tasks.

It receives:

```ts
interface TaskFormProps {
    task?: Task;

    onSubmit: (
        task: Task
    ) => void;

    onCancel: () => void;
}
```

When no task is provided, the form creates a new task.

When a task is provided, the form edits that existing task.

---

# Dashboard

The dashboard provides an overview of the current task collection.

Task statistics can be calculated from the central `tasks` array, including:

* Total tasks
* Pending tasks
* In-progress tasks
* Completed tasks
* Priority information

Because the dashboard receives the same task state owned by `App`, its statistics stay synchronized with changes made elsewhere in the application.

---

# Unique React Keys

Every task contains a stable unique ID:

```ts
id: string;
```

`TaskList` uses this ID as the React key:

```tsx
tasks.map((task) => (
    <TaskItem
        key={task.id}
        task={task}
        ...
    />
))
```

Using the task ID instead of the array index is important because tasks can be:

* Filtered
* Sorted
* Reordered
* Added
* Deleted

A stable ID allows React to correctly identify each task even when the array order changes.

---

# Conditional Rendering

The application uses conditional rendering in several areas.

### Empty Task List

When no tasks match the current filters:

```tsx
tasks.length > 0
    ? ...
    : ...
```

The user sees:

```text
No Result Found
```

### Edit vs Add

The task form determines whether it is creating or editing:

```tsx
{isEditing
    ? "Edit Task"
    : "Add Task"}
```

The submit button also changes:

```tsx
{isEditing
    ? "Update Task"
    : "Save Task"}
```

### Theme Toggle

The theme toggle displays a moon icon in light mode and a sun icon in dark mode.

---

# Error Handling

The application includes error handling for:

* Invalid imported JSON
* Invalid imported task structures
* File reading failures
* localStorage errors
* Invalid task data

Import errors are presented to the user instead of causing the application to crash.

---

# State Management

The application uses React state management through:

```ts
useState()
```

and:

```ts
useEffect()
```

The main task array is owned by `App.tsx`.

Task modifications are performed through functions such as:

```ts
updateTaskStatus()
addTask()
updateTask()
deleteTask()
reorderTasks()
importTasks()
```

This keeps task state centralized and prevents different components from maintaining conflicting copies of the same data.

---

# Running Locally

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local development URL shown by Vite.

---

# Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

# SBA Requirements Checklist

The project implements the requested SBA functionality:

* [x] TypeScript interfaces and types
* [x] Task data model
* [x] Component prop types
* [x] Form data types
* [x] Filter types
* [x] Task list rendering
* [x] Proper React keys
* [x] Task status updates
* [x] Add tasks
* [x] Edit tasks
* [x] Delete tasks
* [x] Delete confirmation
* [x] Search
* [x] Status filtering
* [x] Priority filtering
* [x] Active filter handling
* [x] Clear filters
* [x] Task sorting
* [x] Task statistics
* [x] Form validation
* [x] Validation feedback
* [x] Date formatting
* [x] localStorage persistence
* [x] JSON export
* [x] JSON import
* [x] Imported data validation
* [x] Drag-and-drop task reordering
* [x] Light/dark mode
* [x] Theme persistence
* [x] Responsive layout
* [x] Modal-based add/edit form
* [x] Error handling
* [x] React component composition
* [x] TypeScript type safety
* [x] Utility functions for reusable logic

---

# Reflection

## How did you ensure unique keys for your list items?

Each task has a stable `id` string. `TaskList` uses `task.id` as the React `key` when rendering each task.

```tsx
<TaskItem
    key={task.id}
    task={task}
/>
```

Using the task ID instead of the array index allows React to correctly track individual tasks when tasks are filtered, sorted, reordered, added, or removed.

---

## What considerations did you make when implementing filtering?

The application keeps the complete task array as the single source of truth.

Instead of creating a second state variable containing filtered tasks, the visible task list is derived using:

```ts
filterTasks(
    tasks,
    filters
);
```

This prevents the filtered list from becoming out of sync with the original task data.

For example, changing a task's status updates the main `tasks` array. The filtering logic then automatically recalculates which tasks should be displayed.

---

## How did you handle state updates for task status changes?

Status changes flow from the `TaskItem` back to the application through callback props.

The flow is:

```text
TaskItem
    ↓
onTaskStatusChange()
    ↓
TaskList
    ↓
onUpdateList()
    ↓
TasksPage
    ↓
onUpdateTaskStatus()
    ↓
App
    ↓
setTasks()
```

The task array is updated immutably using `.map()`:

```ts
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
```

This changes only the matching task while keeping the remaining tasks unchanged.

---

## What challenges did you face when implementing conditional rendering?

One challenge was handling different task states and ensuring the interface always provides useful feedback.

The application conditionally renders:

* Empty task results
* Add vs edit form content
* Different task status styles
* Different priority styles
* Light vs dark theme controls
* Import errors

For example, when no tasks match the filters, the task list displays:

```text
No Result Found
```

instead of rendering an empty area.

---

## How did you implement drag-and-drop reordering?

Native HTML5 drag-and-drop events were used to reorder tasks.

Each task stores its ID when dragging begins. When the task is dropped onto another task, both IDs are passed to the application.

The application then:

1. Finds the dragged task
2. Finds the target task
3. Removes the dragged task from its original position
4. Inserts it at the target position
5. Saves the updated task array

The `Manual Order` sorting option preserves this custom order.

---

## How did you implement persistence?

The task array is stored in browser localStorage.

The application loads saved tasks when it starts and saves the current task array whenever it changes.

This provides persistence without requiring a backend database.

The selected light/dark theme is also stored in localStorage so the user's theme preference remains after refreshing the page.

---

## What did you learn from this project?

This project provided practice with:

* React component architecture
* TypeScript type safety
* Props and callback communication
* React state management
* Derived state
* Form handling
* Form validation
* Search and filtering
* Sorting
* Local storage
* File import/export
* Drag-and-drop interactions
* React Context
* Theme management
* Responsive Tailwind CSS
* Error handling
* Reusable utility functions

The project also reinforced the importance of maintaining a single source of truth for application state and keeping reusable business logic separate from presentation components.

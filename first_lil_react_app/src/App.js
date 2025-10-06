import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import KanbanColumn from "./components/KanbanColumn";

const generateId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const initialBoard = {
  tasks: {
    1: { id: "1", title: "Ticket anlegen", description: "", done: false },
    2: { id: "2", title: "UI bauen", description: "", done: false },
  },
  columns: {
    todo: { id: "todo", title: "To Do", taskIds: ["1"] },
    doing: { id: "doing", title: "Doing", taskIds: ["2"] },
    done: { id: "done", title: "Done", taskIds: [] },
  },
  columnOrder: ["todo", "doing", "done"],
};

function App() {
  const [board, setBoard] = useState(initialBoard);

  const handleAddTask = (columnId, title) => {
    const id = generateId();

    setBoard((prev) => {
      const targetColumn = prev.columns[columnId];

      if (!targetColumn) {
        return prev;
      }

      const newTask = {
        id,
        title,
        description: "",
        done: false,
      };

      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [id]: newTask,
        },
        columns: {
          ...prev.columns,
          [columnId]: {
            ...targetColumn,
            taskIds: [...targetColumn.taskIds, id],
          },
        },
      };
    });
  };

  const handleToggleTask = (taskId) => {
    setBoard((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [taskId]: {
          ...prev.tasks[taskId],
          done: !prev.tasks[taskId].done,
        },
      },
    }));
  };

  const handleDeleteTask = (taskId, columnId) => {
    setBoard((prev) => {
      const { [taskId]: _removedTask, ...remainingTasks } = prev.tasks;
      const targetColumn = prev.columns[columnId];

      if (!targetColumn) {
        return prev;
      }

      return {
        ...prev,
        tasks: remainingTasks,
        columns: {
          ...prev.columns,
          [columnId]: {
            ...targetColumn,
            taskIds: targetColumn.taskIds.filter(
              (existingId) => existingId !== taskId
            ),
          },
        },
      };
    });
  };

  const orderedColumns = board.columnOrder
    .map((columnId) => board.columns[columnId])
    .filter(Boolean);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Mein Kanban-Board</h1>
      </header>

      <main className="app-content">
        <TaskForm columns={orderedColumns} onAddTask={handleAddTask} />

        <div className="kanban-board">
          {orderedColumns.map((column) => {
            const tasks = column.taskIds
              .map((taskId) => board.tasks[taskId])
              .filter(Boolean);

            return (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;

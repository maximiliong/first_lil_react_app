import { useState } from "react";
import "./App.css";
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

  // Move a task between columns (append or insert at index)
  const handleMoveTask = (taskId, fromColumnId, toColumnId, toIndex = null) => {
    setBoard((prev) => {
      const fromCol = prev.columns[fromColumnId];
      const toCol = prev.columns[toColumnId];
      if (!fromCol || !toCol) return prev;

      // If dropping into the same column and order stays the same, do nothing
      const fromIds = [...fromCol.taskIds];
      const toIds = fromColumnId === toColumnId ? fromIds : [...toCol.taskIds];

      const currentIndex = fromIds.indexOf(taskId);
      if (currentIndex === -1) return prev;

      // Remove from source
      fromIds.splice(currentIndex, 1);

      // Determine insertion index
      const insertAt = toIndex == null ? toIds.length : Math.max(0, Math.min(toIndex, toIds.length));

      // If moving within same column, adjust target list after removal
      if (fromColumnId === toColumnId) {
        const adjustedIndex = insertAt > currentIndex ? insertAt - 1 : insertAt;
        toIds.splice(adjustedIndex, 0, taskId);
        return {
          ...prev,
          columns: {
            ...prev.columns,
            [toColumnId]: { ...toCol, taskIds: toIds },
          },
        };
      }

      // Moving across columns
      toIds.splice(insertAt, 0, taskId);
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [fromColumnId]: { ...fromCol, taskIds: fromIds },
          [toColumnId]: { ...toCol, taskIds: toIds },
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
        <h1>My Kanban Board</h1>
      </header>

      <main className="app-content">
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
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onMoveTask={handleMoveTask}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;

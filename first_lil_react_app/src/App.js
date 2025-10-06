import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (title) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now().toString(),
        title: trimmedTitle,
        done: false,
      },
    ]);
  };

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  console.log(tasks);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>To-do-list</h1>
      </header>

      <main className="app-content">
        {/*space for content*/}
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;

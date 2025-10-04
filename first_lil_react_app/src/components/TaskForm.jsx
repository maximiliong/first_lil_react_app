import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    onAddTask(trimmed);
    setTitle("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-title" className="task-form__label">
        Neue Aufgabe
      </label>

      <div className="task-form__controls">
        <input
          id="task-title"
          type="text"
          value={title}
          placeholder="Was steht an?"
          onChange={(event) => setTitle(event.target.value)}
          className="task-form__input"
        />

        <button type="submit" className="task-form__button">
          Hinzufügen
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

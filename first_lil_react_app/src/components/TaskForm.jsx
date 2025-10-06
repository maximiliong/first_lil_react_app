import { useState } from "react";
import styles from "./TaskForm.module.css";

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
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="task-title" className={styles.label}>
        Neue Aufgabe
      </label>

      <div className={styles.controls}>
        <input
          id="task-title"
          type="text"
          value={title}
          placeholder="Was steht an?"
          onChange={(event) => setTitle(event.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Hinzufügen
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

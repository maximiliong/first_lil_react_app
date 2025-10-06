import { useEffect, useState } from "react";
import styles from "./TaskForm.module.css";

function TaskForm({ columns, onAddTask }) {
  const [title, setTitle] = useState("");
  const [columnId, setColumnId] = useState(columns[0]?.id ?? "");

  useEffect(() => {
    if (columns.length === 0) {
      setColumnId("");
      return;
    }

    if (!columns.some((column) => column.id === columnId)) {
      setColumnId(columns[0].id);
    }
  }, [columns, columnId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = title.trim();
    if (!trimmed || !columnId) {
      return;
    }

    onAddTask(columnId, trimmed);
    setTitle("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldsRow}>
        <label className={styles.field}>
          <span className={styles.label}>Aufgabe</span>
          <input
            type="text"
            value={title}
            placeholder="Was steht an?"
            onChange={(event) => setTitle(event.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Spalte</span>
          <select
            value={columnId}
            onChange={(event) => setColumnId(event.target.value)}
            className={styles.select}
          >
            {columns.map((column) => (
              <option key={column.id} value={column.id}>
                {column.title}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className={styles.submitButton}>
          Karte hinzufügen
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
import { useState } from "react";
import styles from "./KanbanColumn.module.css";
import Modal from "./Modal";
import { ReactComponent as DeleteIcon } from "../icons/icons8-delete-button.svg";

function KanbanColumn({
  column,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onMoveTask,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const close = () => {
    setIsOpen(false);
    setTitle("");
  };

  const submit = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onAddTask(column.id, t);
    close();
  };

  // DnD helpers
  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ taskId, fromColumnId: column.id })
    );
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e) => {
    // Necessary to allow dropping
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e) => {
    e.preventDefault();
    try {
      const raw = e.dataTransfer.getData("application/json");
      if (!raw) return;
      const { taskId, fromColumnId } = JSON.parse(raw);
      if (!taskId || !fromColumnId) return;
      if (typeof onMoveTask === "function") {
        onMoveTask(taskId, fromColumnId, column.id);
      }
    } catch {
      // ignore malformed payloads
    }
  };

  return (
    <section className={styles.column} onDragOver={onDragOver} onDrop={onDrop}>
      <header className={styles.header}>
        <h2 className={styles.columnTitle}>{column.title}</h2>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
      </header>

      {tasks.length === 0 ? (
        <p className={styles.emptyHint}>No tasks yet</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={styles.card}
              draggable
              onDragStart={(e) => onDragStart(e, task.id)}
            >
              <label className={styles.cardMain}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={task.done}
                  onChange={() => onToggleTask(task.id)}
                />
                <span
                  className={
                    task.done ? styles.cardTitleDone : styles.cardTitle
                  }
                >
                  {task.title}
                </span>
              </label>

              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => onDeleteTask(task.id, column.id)}
                aria-label="Aufgabe löschen"
              >
                <DeleteIcon className={styles.deleteIcon} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Modal open={isOpen} onClose={close}>
        <form onSubmit={submit}>
          <label>
            <div className={styles.modalTitle}>Add card</div>
            <input
              className={styles.modalInput}
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title…"
            />
          </label>
          <div className={styles.addActions} style={{ marginTop: 12 }}>
            <button type="button" className={styles.addCancel} onClick={close}>
              Cancel
            </button>
            <button type="submit" className={styles.addSubmit}>
              Add
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}

export default KanbanColumn;

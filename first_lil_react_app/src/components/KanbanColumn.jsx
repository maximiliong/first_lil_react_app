import styles from "./KanbanColumn.module.css";
import { ReactComponent as DeleteIcon } from "../icons/icons8-delete-button.svg";

function KanbanColumn({ column, tasks, onToggleTask, onDeleteTask }) {
  return (
    <section className={styles.column}>
      <header className={styles.header}>
        <h2 className={styles.columnTitle}>{column.title}</h2>
        <span className={styles.count}>{tasks.length}</span>
      </header>

      {tasks.length === 0 ? (
        <p className={styles.emptyHint}>Noch keine Aufgaben</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.card}>
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
              >
                <DeleteIcon
                  className={styles.deleteIcon}
                  aria-hidden="true"
                ></DeleteIcon>
                <span className="sr-only">Aufgabe löschen</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default KanbanColumn;

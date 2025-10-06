/*
TaskList bekommt den State bereits als Prop (tasks) von App. 
Die App-Komponente ist der “Single Source of Truth” für die Aufgaben. 
TaskList muss daher kein eigenes useState haben – sie rendert nur, 
was sie via Props erhält, und meldet Änderungen (toggle/delete) 
durch die Callback-Props zurück, damit App den zentralen State anpasst. 
So bleibt die Datenquelle an einem Ort, und die Liste bleibt eine pure 
Präsentations-/Delegationskomponente.
*/

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="task-list__empty">No tasks added yet</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-list__item${
            task.done ? " task-list__item--done" : ""
          }`} // die veränderung findet über toggle statt, und dann über den Klassenenamen
        >
          <label className="task-list__task">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggle(task.id)} // hier dann halt was auch immer mit onToggle passiert
              className="task-list__checkbox"
            />
            <span className="task-list__title">{task.title}</span>
          </label>

          <button // neuer Button, wenn klickt wird die id an onDelete übergeben, löscht dann aus array tasks in app.jsx
            type="button"
            className="task-list__delete"
            onClick={() => onDelete(task.id)}
          >
            Löschen
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

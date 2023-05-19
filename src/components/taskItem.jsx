import { useState } from 'react';
import styles from './taskItem.module.css';
import { CheckIcon,PencilIcon, TrashIcon } from "@heroicons/react/outline";

const TaskItem = ({ task, deleteTask, toggleTask, enterEditMode }) => {
  const [isChecked, setIsChecked] = useState(task.checked);

  const handleCheckbox = (e) => {
    setIsChecked(!isChecked);
    toggleTask(task.id);
    console.log(`${task.name} has been checked as completed`);
  };

  return (
    <li className={styles.task}>
      <div className={styles["task-group"]}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={handleCheckbox}
          id={task.id}
          name={task.name}
          checked={isChecked}
        />
        <label htmlFor={task.id} className={styles.label}>
          {task.name}
          <p  className={styles.checkmark}>
            <CheckIcon strokeWidth={2} width={24} height={24}/></p>
        </label>
      </div>
      <div className={styles["task-group"]}>
        <button
          className="btn"
          aria-label={`Update ${task.name} Task`}
          onClick={() => enterEditMode(task)}
        >
          <PencilIcon width={24} height={24}/>
        </button>
        <button
          className={`btn ${styles.delete}`}
          aria-label={`Delete ${task.name} Task`}
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon width={24} height={24} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;

import React, { useState } from 'react';
import './App.css';
import Form from "./components/form";
import TaskList from './components/taskList';
import styles from './components/taskItem.module.css';
import EditForm from "./components/edit";
import { TrashIcon } from '@heroicons/react/solid';
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
 
  const addTask = (task) => {
    setTasks(prevState => [...prevState, task]);
    console.log(`added ${task.name} to the list`);
  };

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(task => task.id !== id));
    console.log(`Task with id ${id} deleted`);
  };

  const toggleTask = (id) => {
    setTasks(prevState =>
      prevState.map(task =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const updateTask = (task) => {
    setTasks(prevState =>
      prevState.map(t =>
        t.id === task.id ? { ...t, name: task.name } : t
      )
    );
    console.log(`Task has been updated to ${task.name}`);
    closeEditMode();
  };

  const closeEditMode = () => {
    setIsEditing(false);
  };

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
  };

  const clearCompletedTasks = () => {
    setTasks(prevState => prevState.filter(task => !task.checked));
    console.log('Completed tasks have been deleted');
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "checked") {
      return task.checked;
    } else if (filter === "unchecked") {
      return !task.checked;
    }
    return true;
  });

  return (
    <>
    <div className='container'>
      <header>
        <h1>Track your Tasks</h1>
      </header>
      {isEditing && (
        <EditForm
          editedTask={editedTask}
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
      )}

      <Form addTask={addTask} />
      <div id="filter">
        <div className={styles["task-group"]}>
          <label htmlFor="task" className='btn'>
            Filter:
          </label>
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="checked">Completed</option>
            <option value="unchecked">Incomplete</option>
          </select>
        </div>
        <button onClick={clearCompletedTasks} className='btn' id='clear'>
          <TrashIcon width={24} height={24} />
          Clear Completed Tasks
        </button>
      </div>
      {tasks && (
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
     </>
  );
}

export default App;

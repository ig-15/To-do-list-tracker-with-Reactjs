import { ThumbUpIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
// import { ThumbUpIcon} from "@heroicons/react/solid";

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  const [updatedtask, setUpdatedTask] = useState(editedTask.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask({... editedTask, name: updatedtask})

  };

  return (
    <div role="dialog"
    arial-aria-labelledby='editTask'
    onClick={(e)=>{e.target===e.currentTarget && closeEditMode()}}
    >
    <form className='todo' onSubmit={handleSubmit}>
      <div className="wrapper">
        <input
          type="text"
          id="editTask"
          className='input'
          value={updatedtask}
          onInput={(e) => setUpdatedTask(e.target.value)}
          required
          autoFocus
          maxLength={100}
          placeholder="Update Task"
        />
        <label htmlFor="editTask" className='label'>Update Task</label>
      </div>
      <button
        className='btn'
        aria-label='update Task'
        type='submit'
      >
        <ThumbUpIcon width={24} height={24} 
        strokeWidth={2}
        />
      </button>
    </form>
    </div>
  );
};

export default EditForm;

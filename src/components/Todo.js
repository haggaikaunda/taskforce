import React, { useState } from "react";

export default function Todo({
  id,
  name,
  completed,
  toggleTaskCompleted,
  editTask,
  deleteTask,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  /**
   * handles name change on the editing template.
   * @param {*} e event that intiated the callback.
   */
  function handleChange(e) {
    setNewName(e.target.value);
  }

  /**
   * handles the submission of a new name in the editing template
   * @param {*} e event that initialed the callback.
   */
  function handleSubmit(e) {
    e.preventDefault();

    if (newName) {
      editTask(id, newName);
    }
    setNewName("");
    setEditing(false);
  }

  const _editingTemplate = () => (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );

  const _viewTemplate = () => (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  return (
    <li className="todo">{isEditing ? _editingTemplate() : _viewTemplate()}</li>
  );
}

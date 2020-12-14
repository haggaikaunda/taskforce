import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_TASK_COMPLETED = gql`
  mutation ToggleTaskCompletion($id: ID!, $isCompleted: Boolean!) {
    editTask(id: $id, isCompleted: $isCompleted) {
      id
      isCompleted
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

const EDIT_TASK = gql`
  mutation EditTask($id: ID!, $name: String) {
    editTask(id: $id, name: $name) {
      id
      isCompleted
      name
    }
  }
`;

export default function Todo({ id, name, completed }) {
  // Apollo will automatically udate the global cache for single value changes.
  const [toggleTaskCompleted] = useMutation(TOGGLE_TASK_COMPLETED);
  const [editTask] = useMutation(EDIT_TASK);
  const [deleteTask] = useMutation(DELETE_TASK, {
    update(cache, { data: { deleteTask } }) {
      cache.modify({
        fields: {
          id: deleteTask.id,
          tasks(_, { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  /**
   * handles name change on the editing template.
   * @param e event that intiated the callback.
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
      editTask({ variables: { id, name: newName } });
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
          onChange={() =>
            toggleTaskCompleted({ variables: { id, isCompleted: !completed } })
          }
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
          onClick={() => deleteTask({ variables: { id } })}
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

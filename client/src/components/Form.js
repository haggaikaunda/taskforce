import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_TASK = gql`
  mutation CreateTask($name: String!) {
    createTask(name: $name) {
      success
      message
      task {
        id
        name
        isCompleted
      }
    }
  }
`;

export default function FormData() {
  const [addTask, { loading, error }] = useMutation(ADD_TASK, {
    // cache update funtion so that our global todo list is updated too.
    update(cache, { data: { createTask } }) {
      cache.modify({
        fields: {
          tasks(existingTasks = []) {
            const newTask = cache.writeFragment({
              // extract the task property from the UpdateTaskResponse
              data: createTask?.task,
              fragment: gql`
                fragment NewTask on Task {
                  id
                  name
                  isCompleted
                }
              `,
            });
            return [...existingTasks, newTask];
          },
        },
      });
    },
  });
  // used to update the name in the UI as a use types.
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      // pass the argument as a variable to the gql query.
      addTask({ variables: { name } }).then((res) => setName(""));
    }
  }

  if (loading) return <p>Loading</p>;
  if (error) return <p>error: ${error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

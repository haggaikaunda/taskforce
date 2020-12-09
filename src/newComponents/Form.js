import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, FormControl, InputGroup } from "react-bootstrap";

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
  const [addTask, { loading }] = useMutation(ADD_TASK, {
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

  return (
    <InputGroup as="form" size="lg" className="mb-3 " onSubmit={handleSubmit}>
      <FormControl
        placeholder={loading ? "Saving" : "What needs to be done?"}
        // aria-label="Add a task"
        // aria-describedby="basic-addon2"
        className="bg-dark border-top-0 border-left-0 border-success"
        onChange={handleChange}
        value={name}
        style={{ color: "white" }}
      />
      <InputGroup.Append>
        <Button variant="success" onClick={handleSubmit}>
          Add
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

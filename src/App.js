import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { gql, useQuery } from "@apollo/client";

const GET_TASKS = gql`
  query tasks {
    tasks {
      id
      name
      isCompleted
      notes {
        id
        description
      }
    }
  }
`;
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.isCommpleted,
  Completed: (task) => task.isCommpleted,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const { data, loading, error } = useQuery(GET_TASKS);
  const [filter, setFilter] = useState("All");
  // const [tasks, setTasks] = useState(props.tasks);
  console.log("data?.tasks", data?.tasks);

  function toggleTaskCompleted(id) {
    // const updatedTasks = tasks.map((task) => {
    //   if (task.id === id) {
    //     return { ...task, completed: !task.completed };
    //   } else {
    //     return task;
    //   }
    // });
    // console.log(updatedTasks[0]);
    // setTasks(updatedTasks);
  }

  function deleteTask(id) {
    // const remainingTasks = tasks.filter((task) => task.id !== id);
    // setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    // const editedTaskList = tasks.map((task) => {
    //   if (id === task.id) {
    //     return { ...task, name: newName };
    //   } else {
    //     return task;
    //   }
    // });
    // setTasks(editedTaskList);
  }

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR: {error}</p>;
  if (!data) return <p>Not Found</p>;

  const tasksNoun = data.tasks.length !== 1 ? "tasks" : "task";
  const headingText = `${data.tasks.length} ${tasksNoun} remaining`;

  console.log("data", data);

  return (
    <div className="todoapp stack-large">
      <h1>Haggai's Todo</h1>
      <Form />
      <div className="filters btn-group stack-exception">
        {FILTER_NAMES.map((name) => (
          <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
          />
        ))}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        // role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {data.tasks.filter(FILTER_MAP[filter]).map((task) => (
          <Todo
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.isCompleted}
            toggleTaskCompleted={toggleTaskCompleted}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

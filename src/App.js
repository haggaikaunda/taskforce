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
  Active: (task) => !task.isCompleted,
  Completed: (task) => task.isCompleted,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const { data, loading, error } = useQuery(GET_TASKS);
  const [filter, setFilter] = useState("All");
  console.log("filter", filter);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR: {error}</p>;
  if (!data) return <p>Not Found</p>;
  const activeTasks = data.tasks.filter(FILTER_MAP["Active"]);
  const tasksNoun = activeTasks.length !== 1 ? "tasks" : "task";
  const headingText = `${activeTasks.length} ${tasksNoun} remaining`;

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
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

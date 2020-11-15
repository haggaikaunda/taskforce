import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = {
      id: `todo-${nanoid()}`,
      name: name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    console.log(updatedTasks[0]);
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      } else {
        return task;
      }
    });
    setTasks(editedTaskList);
  }

  const tasksNoun = tasks.length !== 1 ? "tasks" : "task";
  const headingText = `${tasks.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
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
        {tasks.filter(FILTER_MAP[filter]).map((task) => (
          <Todo
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.completed}
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

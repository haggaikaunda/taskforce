import "./boot.css";

import React, { useState } from "react";
import Todo from "./newComponents/Todo";
import Form from "./newComponents/Form";
import FilterButton from "./components/FilterButton";
import ListGroup from "react-bootstrap/ListGroup";

import { Container } from "react-bootstrap";

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

function BootstrapApp() {
  const { data, loading, error } = useQuery(GET_TASKS);
  const [filter, setFilter] = useState("All");

  let res;
  if (loading) {
    res = <p>Loading</p>;
  } else if (error) {
    res = <p>ERROR: {error}</p>;
  } else if (!data) {
    res = <p>Not Found</p>;
  } else {
    const activeTasks = data.tasks.filter(FILTER_MAP["Active"]);
    const tasksNoun = activeTasks.length !== 1 ? "tasks" : "task";
    const headingText = `${activeTasks.length} ${tasksNoun} remaining`;
    res = (
      <ListGroup as="ul" variant="flush" className="list-group-task">
        {data.tasks.filter(FILTER_MAP[filter]).map((task, index) => (
          <Todo
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.isCompleted}
            isLastItem={index === data.tasks.length - 1}
          />
        ))}
      </ListGroup>
    );
  }
  // if (loading) return <p>Loading</p>;
  // if (error) return <p>ERROR: {error}</p>;
  // if (!data) return <p>Not Found</p>;

  return (
    <Container>
      <h1>Haggai's Todo</h1>
      <Form />
      {res}
    </Container>
  );
}

export default BootstrapApp;

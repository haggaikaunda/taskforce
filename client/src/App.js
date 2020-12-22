import "./index.css";

import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";

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
        createdAt
        noteType
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
    res = (
      <Spinner animation="border" role="status" className="loading-animation">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else if (error) {
    res = <p>ERROR: {error}</p>;
  } else if (!data) {
    res = <p>Not Found</p>;
  } else {
    const activeTasks = data.tasks.filter(FILTER_MAP["Active"]);
    const tasksNoun = activeTasks.length !== 1 ? "tasks" : "task";
    const headingText = `${activeTasks.length} ${tasksNoun} remaining`;
    
    res = (
      <Card border="success" bg="dark">
        <Card.Header className="h5 p-2 border-success border-bottom">
          <span className="d-flex ">
            <p className="header-text">{headingText}</p>
            <DropdownButton
              as={ButtonGroup}
              key="down"
              id={`dropdown-button-drop-$down`}
              drop="right"
              variant="outline-info"
              title="Filter"
            >
              {FILTER_NAMES.map((name) => (
                <Dropdown.Item
                  active={filter === name ? true : false}
                  eventKey={name}
                  onClick={() => setFilter(name)}
                >
                  {name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </span>
        </Card.Header>
        <Accordion as="ul" variant="flush" className="pl-0 mb-0 list-group-task">
          {data.tasks.filter(FILTER_MAP[filter]).map((task, index) => (
            <Todo
              key={task.id}
              id={task.id}
              name={task.name}
              completed={task.isCompleted}
              notes={task.notes}
              isLastItem={index === data.tasks.length - 1}
              position={index}
            />
          ))}
        </Accordion>
      </Card>
    );
  }

  return (
    <div class="container-wrapper">
      <Container>
        <h1 style={{ textAlign: "center" }} className="mb-3">
          Haggai's Todo
        </h1>
        <Form />
        {res}
      </Container>
    </div>
  );
}

export default BootstrapApp;

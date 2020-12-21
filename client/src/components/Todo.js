import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Accordion,
  Button,
  ButtonGroup,
  Card,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

import Notes from "./Notes"

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

export default function Todo({ id, name, completed, notes, isLastItem, position }) {
  // Apollo will automatically udate the global cache for single value changes.
  const [toggleTaskCompleted] = useMutation(TOGGLE_TASK_COMPLETED);
  const [editTask] = useMutation(EDIT_TASK);
  const [deleteTask] = useMutation(DELETE_TASK, {
    update(cache, { data: { deleteTask } }) {
      cache.modify({
        fields: {
          id: deleteTask?.id,
          tasks(_, { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [isMouseOver, setMouseOver] = useState(false);

  /**
   * handles name change on the editing template.
   * @param e event that intiated the callback.
   */
  function handleChange(e) {
    setNewName(e.target.value);
  }

  const _handleMouseEnter = () => {
    setMouseOver(true);
  };

  const _handleMouseLeave = () => {
    setMouseOver(false);
  };

  /**
   * handles the submission of a new name in the editing template
   * @param e event that initialed the callback.
   */
  function handleSubmit(e) {
    e.preventDefault();

    if (newName) {
      editTask({ variables: { id, name: newName } });
    }
    setEditing(false);
  }
  const _editingTemplate = () => (
    <Modal
      show={isEditing}
      scrollable
      onHide={() => setEditing(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="bg-dark border-success">
        <h4 id="contained-modal-title-vcenter">{name}</h4>
      </Modal.Header>
      <Modal.Body className="bg-dark border-success">
        <h5 style={{ textAlign: "center" }}>Comments</h5>
        <Card bg="dark">
          <Card.Body>
            <Card.Subtitle>21.12.2020</Card.Subtitle>
            <Card.Body>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into...</p>
            </Card.Body>
          </Card.Body>
        </Card>
        <br />
        <Card bg="dark">
          <Card.Body>
            <Card.Subtitle>21.12.2020</Card.Subtitle>
            <Card.Body>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into...</p>
            </Card.Body>
          </Card.Body>
        </Card>
        <br />
        <Card bg="dark">
          <Card.Body>
            <Card.Subtitle>21.12.2020</Card.Subtitle>
            <Card.Body>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into...</p>
            </Card.Body>
          </Card.Body>
        </Card>
        {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <br />
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> */}
      </Modal.Body>
      <Modal.Footer className="bg-dark border-success">
        <Button variant="secondary" onClick={() => setEditing(false)}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>

  // const _editingTemplate = () => (
  //   <Modal
  //     show={isEditing}
  //     onHide={() => setEditing(false)}
  //     size="lg"
  //     aria-labelledby="contained-modal-title-vcenter"
  //     centered
  //     dialogClassName="bg-dark"
  //   >
  //     <Modal.Header closeButton className="bg-dark">
  //       <Modal.Title id="contained-modal-title-vcenter">Edit</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body className="bg-dark">
  //       <InputGroup
  //         as="form"
  //         size="lg"
  //         className="mb-3"
  //         onSubmit={handleSubmit}
  //       >
  //         <FormControl
  //           placeholder="What needs to be done?"
  //           // aria-label="Add a task"
  //           // aria-describedby="basic-addon2"
  //           className="bg-dark"
  //           onChange={handleChange}
  //           value={newName}
  //           style={{ color: "white" }}
  //         />
  //       </InputGroup>
  //     </Modal.Body>
  //     <Modal.Footer className="bg-dark">
  //       <Button variant="secondary" onClick={() => setEditing(false)}>
  //         Cancel
  //       </Button>
  //       <Button variant="success" onClick={handleSubmit}>
  //         Save changes
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>
  );
  
  const _viewTemplate = () => {
    const itemStyle = isLastItem ? "border-0" : "border-bottom-color";
    const todoIcons = (
      <ButtonGroup className="p-0 todo-icons" aria-label="Basic example">
        <Button variant="outline-info" onClick={() => setEditing(true)}>
          <BsPencilSquare />
        </Button>
        <Button
          variant="outline-info"
          onClick={() => deleteTask({ variables: { id } })}
        >
          <BsTrash />
        </Button>
      </ButtonGroup>
    )

    return (
      <Card as="li" className="border-0" bg="dark">
        <Accordion.Toggle as={Card.Header} className="p-0 bg-dark" eventKey={`${id}`}>
          <ListGroup.Item
            onMouseEnter={_handleMouseEnter}
            onMouseLeave={_handleMouseLeave}
            className={`d-flex p-1 bg-dark ${itemStyle}`}
          >
          <Form className="p-2">
            <Form.Check
              type="checkbox"
              defaultChecked={completed}
              onChange={() =>
                toggleTaskCompleted({ variables: { id, isCompleted: !completed } })
              }
            />
          </Form>
          <p>{name}</p>
          {isMouseOver ? todoIcons : null}
          </ListGroup.Item>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={`${id}`}>
          <Card.Body className="pl-4 pr-1 p-0">
            <Notes task_id={id} notes={notes} position={position}/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

  return (
    isEditing ? _editingTemplate() : _viewTemplate()
  );
}

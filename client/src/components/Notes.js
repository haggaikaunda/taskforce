import React from "react"
import { ListGroup } from "react-bootstrap";

export default function Notes({task_id, notes, position}) {

  return (
      <ListGroup variant="flush">
        {
          notes.map(note => (
            <ListGroup.Item
              key={note.id}
              variant="dark"
            >
              {note.description}
            </ListGroup.Item>
            
          ))
        }
      </ListGroup>
    )
}
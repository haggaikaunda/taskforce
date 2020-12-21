import React from "react"
import { ListGroup } from "react-bootstrap";

export default function Notes({task_id, notes, position}) {

  return (
      <ListGroup variant="flush">
        {
          notes.map(note => (
            <ListGroup.Item
              key={note.id}
              variant="info"
              className="list-group-notes"
            >
              <p>{note.description}</p>
            </ListGroup.Item>
            
          ))
        }
      </ListGroup>
    )
}
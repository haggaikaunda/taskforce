import React from "react";
import Button from "react-bootstrap/Button";

export default function FilterButton(props) {
  return (
    <Button
      variant="light"
      active={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      {props.name}
    </Button>
    // <button
    //   type="button"
    //   className="btn toggle-btn"
    //   aria-pressed={props.isPressed}
    //   onClick={() => props.setFilter(props.name)}
    // >
    //   <span className="visually-hidden">Show </span>
    //   <span>{props.name}</span>
    //   <span className="visually-hidden"> tasks</span>
    // </button>
  );
}

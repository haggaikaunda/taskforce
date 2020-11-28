import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "./cache";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const client = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
});

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

ReactDOM.render(
  <ApolloProvider client={client}>
    <App tasks={DATA} />
  </ApolloProvider>,
  document.getElementById("root")
);

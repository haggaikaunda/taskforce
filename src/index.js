import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "./cache";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
const client = new ApolloClient({
  cache,
  uri: "https://hkaunda-todo.herokuapp.com/",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

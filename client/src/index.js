import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "./cache";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const client = new ApolloClient({
  cache,
  uri: "https://api.hkaunda.com",
});
document.body.style = "background: rgb(50, 50, 50); color: white";
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "./cache";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const client = new ApolloClient({
  cache,
  uri: "http://192.168.0.103:4000",
});
// https://coolors.co/343a40 for color pallete: bg-dark is #343A40
document.body.style = "background: #1E2225; color: white";
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

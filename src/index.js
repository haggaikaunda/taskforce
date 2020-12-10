import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "./cache";
import React from "react";
import ReactDOM from "react-dom";
import BootstrapApp from "./BootstrapApp";

const client = new ApolloClient({
  cache,
  uri: "https://kampala.ew.r.appspot.com/",
});
document.body.style = "background: rgb(50, 50, 50); color: white";
ReactDOM.render(
  <ApolloProvider client={client}>
    <BootstrapApp />
  </ApolloProvider>,
  document.getElementById("root")
);

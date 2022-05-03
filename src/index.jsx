// src/index.jsx
import Server from "react-dom/server";
import React from 'react'
import ReactDOM from "react-dom/client";

// SSR
const HelloWorldSSR = () => <h1>Hello World!</h1>;
console.log(Server.renderToString(<HelloWorldSSR />));

// CSR
const HelloWorldCSR = <h1>Hello World!</h1>;

// React 17
// ReactDOM.createRoot(<HelloWorld />, document.querySelector("#app"));

// React 18
const root = ReactDOM.createRoot(
  document.getElementById('app')
);
root.render(HelloWorldCSR);
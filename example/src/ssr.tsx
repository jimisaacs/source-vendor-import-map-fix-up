import React from "react";
import ReactDOMServer from "react-dom/server";

export const App = () => <h1>Hello, World!</h1>;

export const ssr = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
  <title>Deno Example</title>
</head>
<body >
  <div id="root">${ReactDOMServer.renderToString(<App />)}</div>
</body>
</html>`;

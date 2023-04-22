import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Module (react-router-dom) Description
The react-router-dom module is a collection of navigation components for React applications 
that allows you to handle routing and navigation between different views in a declarative and intuitive way. 
Here's a brief explanation of each module that is being imported:

BrowserRouter: This component is a high-level router that listens for changes to the URL 
and renders the appropriate component based on the current URL. 
It uses HTML5 history API to manipulate the browser history, 
and supports routing for client-side React applications.

Routes: This component is used to define the routes for your application. 
It takes an array of Route components as its children, 
and renders the component that matches the current URL path.

Route: This component is used to define a single route in your application. 
It takes two props: path, which defines the URL path to match, and element, 
which specifies the component to render when the path matches. 
You can also use other props to customize how the route is matched and rendered, 
such as exact to match the path exactly, and fallback to specify a fallback route if no other route matches.
*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

/* <Route path="/*" element={<App />} />
This Route component defines a catch-all route that will render the App component 
for any URL path that doesn't match any of the other defined routes. 
This is commonly used as a fallback route to handle 404 errors or other cases 
where the user navigates to an unknown or invalid URL.
*/

/* <React.StrictMode>
It is a component provided by the React library that helps developers 
write better React code by highlighting potential issues and best practices during development.

When you wrap your React application in <React.StrictMode>, 
React will perform additional checks and verifications during development mode, 
such as identifying unsafe lifecycle methods and detecting potential bugs in the application code. 
These checks help developers catch and fix issues early in the development process, 
before they can cause problems for end-users.
*/

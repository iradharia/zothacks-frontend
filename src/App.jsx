import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { Main } from "./components/main.jsx";
import { Camera } from "./components/camera.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Main />} />
      <Route path="/camera" element={<Camera />} />
    </Route>
  )
);

function App({ routes }) {
  const [count, setCount] = useState(0);

  // console.log('234')

  // const data = ['abc']

  // console.log(data)

  return (
    <div data-theme="light">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

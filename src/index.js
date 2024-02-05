import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App'
import { Info, Input } from "./pages";
import { Provider } from 'react-redux'
import store from './redux/store'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/info",
    element: <Info/>
  },
  {
    path: "/input",
    element: <Input/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

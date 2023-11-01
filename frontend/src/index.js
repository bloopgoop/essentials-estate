import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorPage from './pages/Error';
import Login from './pages/Authenticate/Login';
import Register from './pages/Authenticate/Register';
import Contact from './pages/Contact';
import Search from './pages/Search/Search';
import Property from './pages/Property/Property';

import Profile from './pages/Profile/Profile';

import Profilemain from "./pages/Profile/Profilemain";
import Assets from './pages/Profile/Assets';
import Status from './pages/Profile/Status';
import Watchlist from './pages/Profile/Watchlist';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "search",
    element: <Search />,
    errorElement: <ErrorPage />,
  },
  {
    path: "property/:id",
    element: <Property />,
    errorElement: <ErrorPage />,
  },

    {
    path: "profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profile",
        element: <Profilemain />
      },
      {
        path: "/profile/assets",
        element: <Assets />
      },
      {
        path: "/profile/status",
        element: <Status />
      },
      {
        path: "/profile/watchlist",
        element: <Watchlist />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

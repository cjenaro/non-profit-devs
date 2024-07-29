import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './i18n';
import { UserProvider } from './context/UserContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './views/home/index.jsx';
import Profile from './views/profile';
import Pitch from './views/pitch';
import Projects from './views/projects';
import Project from './views/project';
import Login from './views/login';
import Signup from './views/signup';
import NotFound from './views/not-found';

const root = createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: () => ({ message: 'HOME' }),
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/pitch',
        element: <Pitch />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/projects/:id',
        element: <Project />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

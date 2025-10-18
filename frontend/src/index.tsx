import React from 'react'
import './main.css'
import { ApolloProvider } from '@apollo/client/react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import './i18n'
import client from './apollo-client'
import { Layout } from './components/Layout'
import { UserProvider } from './context/UserContext'
import { Home } from './views/home/index'
import { Login } from './views/login'
import { NotFound } from './views/not-found'
import { Pitch } from './views/pitch'
import { Profile } from './views/profile'
import { Project } from './views/project'
import { Projects } from './views/projects'
import { Signup } from './views/signup'

const root = createRoot(document.getElementById('root')!)
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
])

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

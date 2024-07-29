import React from 'react';
import Layout from './components/Layout.jsx';
import Home from './views/home/index.jsx';
import Profile from './views/profile.jsx';
import Pitch from './views/pitch.jsx';
import Projects from './views/projects.jsx';
import Project from './views/project.jsx';
import Login from './views/login.jsx';
import Signup from './views/signup.jsx';
import NotFound from './views/not-found.jsx';
import { UserProvider } from './context/UserContext.jsx';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/pitch"
            element={
              <Layout>
                <Pitch />
              </Layout>
            }
          />
          <Route
            path="/projects"
            element={
              <Layout>
                <Projects />
              </Layout>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <Layout>
                <Project />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <Signup />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;

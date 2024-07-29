import React from 'react';
import Layout from './components/Layout.jsx';
import { Router, Location } from '@reach/router';
import Home from './views/home/index.jsx';
import Profile from './views/profile.jsx';
import Pitch from './views/pitch.jsx';
import Projects from './views/projects.jsx';
import Project from './views/project.jsx';
import Login from './views/login.jsx';
import Signup from './views/signup.jsx';
import NotFound from './views/not-found.jsx';
import { UserProvider } from './context/UserContext.jsx';
import posed, { PoseGroup } from 'react-pose';

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: 300 },
  exit: { opacity: 0 },
});

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
);

function App() {
  return (
    <div className="App">
      <UserProvider>
        <PosedRouter>
          <Layout path="/">
            <Home path="/" />
            <Profile path="/profile" />
            <Pitch path="/pitch" />
            <Projects path="/projects" />
            <Project path="/projects/:id" />
            <Login path="/login" />
            <Signup path="/signup" />
            <NotFound path="/*" />
          </Layout>
        </PosedRouter>
      </UserProvider>
    </div>
  );
}

export default App;

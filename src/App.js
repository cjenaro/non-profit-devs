import React from 'react';
import Layout from './components/Layout';
import { Router, Location } from '@reach/router';
import { ApolloWrapper } from './utils/apollo';
import Home from './views/home/index';
import Profile from './views/profile';
import Pitch from './views/pitch';
import Projects from './views/projects';
import Project from './views/project';
import Login from './views/login';
import Signup from './views/signup';
import NotFound from './views/not-found';
import { UserProvider } from './context/UserContext';
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
        <ApolloWrapper>
          <Layout>
            <PosedRouter>
              <Home path="/" />
              <Profile path="/profile" />
              <Pitch path="/pitch" />
              <Projects path="/projects" />
              <Project path="/projects/:id" />
              <Login path="/login" />
              <Signup path="/signup" />
              <NotFound path="/*" />
            </PosedRouter>
          </Layout>
        </ApolloWrapper>
      </UserProvider>
    </div>
  );
}

export default App;

import React from "react";
import Layout from "./components/Layout";
import { Router } from "@reach/router";
import { ApolloWrapper } from "./utils/apollo";
import Home from "./views/home/index";
import Profile from "./views/profile";
import Pitch from "./views/pitch";
import Projects from "./views/projects";
import Project from "./views/project";
import Project from "./views/login";
import Signup from "./views/signup";
import NotFound from "./views/not-found";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ApolloWrapper>
          <Layout>
            <Router>
              <Home path="/" />
              <Profile path="/profile" />
              <Pitch path="/pitch" />
              <Projects path="/projects" />
              <Project path="/projects/:slug" />
              <Login path="/login" />
              <Signup path="/signup" />
              <NotFound path="/*" />
            </Router>
          </Layout>
        </ApolloWrapper>
      </UserProvider>
    </div>
  );
}

export default App;

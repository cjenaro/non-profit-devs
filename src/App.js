import React from "react";
import Layout from "./components/Layout";
import { Router, navigate } from "@reach/router";
import { AuthProvider } from "react-use-auth";
import { ApolloWrapper } from "./utils/apollo";
import Auth0CallbackPage from "./views/callback";
import Home from "./views/home/index";
import Profile from "./views/profile";
import Pitch from "./views/pitch";
import Projects from "./views/projects";
import NotFound from "./views/not-found";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <AuthProvider
        navigate={navigate}
        auth0_domain={process.env.REACT_APP_AUTH0_DOMAIN}
        auth0_client_id={process.env.REACT_APP_AUTH0_CLIENTID}
      >
        <UserProvider>
          <ApolloWrapper>
            <Layout>
              <Router>
                <Home path="/" />
                <Profile path="/profile" />
                <Pitch path="/pitch" />
                <Projects path="/projects" />
                <Auth0CallbackPage path="/auth0_callback" />
                <NotFound path="/*" />
              </Router>
            </Layout>
          </ApolloWrapper>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

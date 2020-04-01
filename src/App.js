import React, { Suspense, lazy } from "react";
import Layout from "./components/layout";
import { Router, navigate } from "@reach/router";
import { AuthProvider } from "react-use-auth";
import { ApolloWrapper } from "./utils/apollo";

const Home = lazy(() => import("./views/home"));
const Projects = lazy(() => import("./views/projects"));
const NewProject = lazy(() => import("./views/projects/new"));
const Auth0CallbackPage = lazy(() => import("./views/callback"));
const Account = lazy(() => import("./views/account"));

function App() {
  return (
    <div className="App">
      <AuthProvider
        navigate={navigate}
        auth0_domain={process.env.REACT_APP_AUTH0_DOMAIN}
        auth0_client_id={process.env.REACT_APP_AUTH0_CLIENTID}
      >
        <ApolloWrapper>
          <Layout>
            <Suspense fallback={<div>LOADING...</div>}>
              <Router>
                <Home path="/" />
                <Projects path="/projects" />
                <NewProject path="/projects/new" />
                <Account path="/account" />
                <Auth0CallbackPage path="/auth0_callback" />
              </Router>
            </Suspense>
          </Layout>
        </ApolloWrapper>
      </AuthProvider>
    </div>
  );
}

export default App;

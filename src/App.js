import React, { Suspense, lazy } from "react";
import Layout from "./components/layout";
import { Router } from "@reach/router";

const Home = lazy(() => import("./views/home"));
const Projects = lazy(() => import("./views/projects"));
const NewProject = lazy(() => import("./views/projects/new"));
const Callback = lazy(() => import("./views/callback"));

function App() {
  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<div>LOADING...</div>}>
          <Router>
            <Home path="/" />
            <Projects path="/projects" />
            <NewProject path="/projects/new" />
            <Callback path="/callback" />
          </Router>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;

import React, { Suspense } from "react";
import { Switch, Redirect } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import HomeComponent from "./Home/Home";
import Header from "../shared/Header/Header";

const Routes = () => {
  return (
    <>
      <Header />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" component={HomeComponent} />
            <Route path="/notfound" component={NotFound} />
            <Redirect from="**" to="notfound" />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default Routes;

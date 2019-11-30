import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";
import { createBrowserHistory } from "history";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import GlobalStyle from "../components/GlobalStyle";
import PresentationPage from "../pages/PresentationPage";
import BackstagePage from "../pages/BackstagePage";

export const history = createBrowserHistory();

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 220, beforeChildren: true },
  exit: { opacity: 0 }
});

export default () => (
  <Router hitory={history}>
    <GlobalStyle />
    <Route
      render={({ location }) => (
        <PoseGroup>
          <RouteContainer key={location.pathname}>
            <Switch location={location}>
              <Route exact path="/" key="main">
                <MainPage />
              </Route>
              <Route exact path="/presentation" key="presentation">
                <PresentationPage />
              </Route>
              <Route exact path="/backstage" key="backstage">
                <BackstagePage />
              </Route>
              <Route path="*" key="not-found">
                <NotFoundPage />
              </Route>
            </Switch>
          </RouteContainer>
        </PoseGroup>
      )}
    />
  </Router>
);

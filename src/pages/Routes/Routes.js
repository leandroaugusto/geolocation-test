import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, NotFound, Content } from 'pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/content" component={Content} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;

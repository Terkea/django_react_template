import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
    <Switch>
        {/* <Route exact path='/' /> HOMEPAGE */}
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup/' component={Signup} />
    </Switch>
)

export default BaseRouter;
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './containers/Login';
import Signup from './containers/Signup';
import MyProfile from './containers/MyProfile/MyProfile';

const BaseRouter = () => (
    <Switch>
        {/* <Route exact path='/' /> HOMEPAGE */}
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup/' component={Signup} />
        <Route exact path='/my_profile' component={MyProfile} />
    </Switch>
)

export default BaseRouter;
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';

import CustomLayout from './containers/Layout';

import Login from './containers/Login';
import Signup from './containers/Signup';
import MyProfile from './containers/MyProfile/MyProfile';

const App = (props) => {

  useEffect(() => {
    props.onTryAutoSignup();
  })

  return (
    <div>
      <Router>
        <Switch>

          <Route {...props} exact path='/login/' component={Login} />
          <Route {...props} exact path='/signup/' component={Signup} />


          <CustomLayout {...props}>
            <Route path='/my_profile/' component={MyProfile} />
          </CustomLayout>

        </Switch>
      </Router>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
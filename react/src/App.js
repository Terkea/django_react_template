import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import * as actions from './store/actions/user';

import CustomLayout from './containers/Layout';

import Login from './containers/Login';
import MyProfile from './containers/MyProfile/MyProfile';
import Errors from './containers/Errors/Error';

const App = (props) => {

  useEffect(() => {
    props.autologin();
  })

  return (
    <div>
      <Router>
        <Switch>
          {/* i read this is how you pass down props, but it causes a weird error on the console, I didn't look further into it but here you have it: */}
          {/* <Route exact path="/login/" render={(props) => <Login {...props}/>} /> */}
          <Route exact path='/login/' component={Login} />
          {/* Signup is the same page as success because due to this method of authentification registering is not required
          but it will be implemented anyways as visitors may not know this */}
          <Route exact path='/signup/' render={() => <Login formTitle="Register" formSuccessTitle="Register Success" />} />

          <Route path='/error/' component={Errors} />

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
    isAuthenticated: state.user.payload.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autologin: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
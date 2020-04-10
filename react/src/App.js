import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './BaseRouter';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';

import CustomLayout from './containers/Layout';

const App = (props) => {

  useEffect(() => {
    props.onTryAutoSignup();
  })

  return (
    <div>
      <Router>
        <CustomLayout {...props}>
          <BaseRouter />
        </CustomLayout>
      </Router>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
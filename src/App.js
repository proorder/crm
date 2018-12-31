import React, { Component } from 'react';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import AuthPage from './pages/auth/AuthPage';
import AdminPage from './pages/admin/AdminPage';
import ManagerPage from './pages/manager/ManagerPage';
import './scss/base.scss';

class PageStructure extends Component {
  render() {
    return <div className="h-100">{this.props.children}</div>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    loadProgressBar();
  }

  render() {
    if (this.props.store.user) {
      return (
        <PageStructure>
          <Router>
            <Switch>
              <Route component={AdminPage} path={AdminPage.path} />
              <Route component={ManagerPage} path={ManagerPage.path} />
            </Switch>
          </Router>
        </PageStructure>
      );
    } else {
      return <AuthPage />;
    }
  }
}

export default connect(
  state => ({ store: state }),
  dispatch => ({ action: bindActionCreators({}, dispatch) })
)(App);

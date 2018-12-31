import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MDCDialog } from '@material/dialog';
import Menu from '../../components/Menu';
import { bindActionCreators } from 'redux';
import AdminGroupsPage from './AdminGroupsPage';
import AdminClientsPage from './AdminClientsPage';
import DocumentsEdit from '../documents-edit/DocumentsEditPage';
import { showMenu } from '../../reducer';
import { setAuthorizationToken, adminMenu } from '../../utils';
import TopAppBar from '../../components/TopAppBar';

class AdminPage extends Component {
  static path = '/admin';

  routes = {
    '/admin/groups': 'Менеджеры',
    '/admin/clients': 'Клиенты',
    '/admin/documents-edit': 'Редактирование документов',
  };

  menuHandle = e => {
    this.props.actions.showMenu(!this.props.store.showMenu);
  };

  getOut = () => {
    setAuthorizationToken(false);
  };

  render() {
    const { showMenu } = this.props.store;

    return (
      <>
        <header>
          <TopAppBar
            title={this.routes[this.props.location.pathname]}
            menuHandle={this.menuHandle}
          />
        </header>

        <Menu
          getOut={this.getOut}
          links={adminMenu}
          open={showMenu}
          menuHandle={this.menuHandle}
        />

        <div className="content">
          <Switch>
            <Route
              component={AdminGroupsPage}
              path={AdminPage.path + AdminGroupsPage.path}
            />
            <Route
              component={AdminClientsPage}
              path={AdminPage.path + AdminClientsPage.path}
            />
            <Route
              component={DocumentsEdit}
              path={AdminPage.path + DocumentsEdit.path}
            />
          </Switch>
        </div>
      </>
    );
  }
}

export default connect(
  state => ({ store: state }),
  dispatch => ({ actions: bindActionCreators({ showMenu }, dispatch) })
)(AdminPage);

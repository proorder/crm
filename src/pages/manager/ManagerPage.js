import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MDCDialog } from '@material/dialog';
import Menu from '../../components/Menu';
import { bindActionCreators } from 'redux';
import ClientsPage from './ManagerClientsPage';
import DocumentsEdit from '../documents-edit/DocumentsEditPage';
import { showMenu } from '../../reducer';
import { setAuthorizationToken, managerMenu } from '../../utils';
import TopAppBar from '../../components/TopAppBar';

class ManagerPage extends Component {
  static path = '/manager';

  routes = {
    '/manager/clients': 'Клиенты',
    '/manager/documents-edit': 'Редактирование документов',
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
          links={managerMenu}
          open={showMenu}
          menuHandle={this.menuHandle}
        />

        <div className="content">
          <Switch>
            <Route
              component={ClientsPage}
              path={ManagerPage.path + ClientsPage.path}
            />
            <Route
              component={DocumentsEdit}
              path={ManagerPage.path + DocumentsEdit.path}
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
)(ManagerPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import isEmpty from 'validator/lib/isEmpty';
import axios from 'axios';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { setAuthorizationToken } from '../../utils';

class AuthPage extends Component {
  static path = '/auth';

  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {
        identifier: '',
        password: '',
      },
    };
  }

  isValid() {
    let errors = {};
    let isValid = true;

    if (isEmpty(this.state.identifier)) {
      errors.identifier = 'Поле обязательно к заполнению';
      isValid = false;
    } else {
      errors.identifier = '';
    }
    if (isEmpty(this.state.password)) {
      isValid = false;
      errors.password = 'Поле обязательно к заполнению';
    } else {
      errors.password = '';
    }

    this.setState({ errors });

    return isValid;
  }

  onSubmit = function(e) {
    e.preventDefault();
    if (this.isValid()) {
      axios
        .post('http://localhost:8000/api-auth', {
          username: this.state.identifier,
          password: this.state.password,
        })
        .then(res => {
          localStorage.setItem('jwtToken', res.data.token);
          setAuthorizationToken(res.data.token);
          if(res.data.superuser) {
            window.location = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/admin/clients';
          } else {
            window.location = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/manager/clients';
          }
        });
    }
  }.bind(this);

  onChange = function(target, value) {
    this.setState({ [target]: value });
  }.bind(this);

  render() {
    return (
      <div className="container h-100" id="block_auth">
        <form
          className="highlight p-3 col-autp ml-auto mr-auto mdc-elevation--z4"
          onSubmit={this.onSubmit}>
          <TextField
            outline={true}
            type="text"
            onChange={e => {
              this.onChange('identifier', e.target.value);
            }}
            error={this.state.errors.identifier}>
            Логин / Email
          </TextField>
          <TextField
            outline={true}
            type="password"
            onChange={e => {
              this.onChange('password', e.target.value);
            }}
            error={this.state.errors.password}>
            Пароль
          </TextField>
          <Button onClick={this.onSubmit}>Войти</Button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({
    store: state,
  }),
  dispatch => ({ action: bindActionCreators({}, dispatch) })
)(AuthPage);

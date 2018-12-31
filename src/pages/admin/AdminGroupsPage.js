import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { errorProcessing } from '../../utils';
import { GROUPS, MANAGERS } from '../../queries';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Modal from '../../components/Modal';

class AdminGroupsPage extends React.Component {
  static path = '/groups';

  groups_columns = [
    {
      Header: 'Группа',
      accessor: 'group',
    },
    {
      Header: 'Менеджер',
      accessor: 'full_name',
    },
    {
      Header: 'Добавить менеджера',
      accessor: 'extra',
    },
  ];

  constructor() {
    super();

    this.state = {
      newGroup: '',
      groups: [],
      showModal: false,
      modalAddManager: {
        title: 'Добавить менеджера в группу',
        buttonOne: 'Сохранить',
      },
      newManagerGroupKey: '',
      newManagerFullName: '',
      newManagerLogin: '',
      newManagerPassword: '',
      showMenu: false,
    };
  }

  newGroupFieldHandler = e => {
    this.setState({ newGroup: e.target.value });
  };

  addNewGroup = () => {
    axios
      .post(GROUPS, { group: this.state.newGroup })
      .then(res => {
        this.setState({ groups: [...this.state.groups, res.data] });
      })
      .catch(err => {
        errorProcessing(err);
      });
  };

  addManager = key => {
    this.setState({ showModal: true, newManagerGroupKey: key });
  };

  modalAddManagerData = () => {
    return (
      <>
        <TextField
          onChange={e => {
            this.changeModalFields('newManagerFullName', e.target.value);
          }}>
          Полное Имя
        </TextField>
        <div className="mt-20">
          <TextField
            onChange={e => {
              this.changeModalFields('newManagerLogin', e.target.value);
            }}>
            Логин / Email
          </TextField>
        </div>
        <div className="mt-20">
          <TextField
            type="password"
            onChange={e => {
              this.changeModalFields('newManagerPassword', e.target.value);
            }}>
            Пароль
          </TextField>
        </div>
      </>
    );
  };

  modalAddManagerExitHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  saveManager = () => {
    axios
      .post(MANAGERS, {
        full_name: this.state.newManagerFullName,
        username: this.state.newManagerLogin,
        password: this.state.newManagerPassword,
        group: this.state.groups[this.state.newManagerGroupKey].group,
      })
      .then(res => {
        const groups = this.state.groups;
        groups[this.state.newManagerGroupKey].children === undefined
          ? (groups[this.state.newManagerGroupKey].children = [res.data])
          : groups[this.state.newManagerGroupKey].children.push(res.data);
        groups[this.state.newManagerGroupKey].toggle = true;
        this.setState({ showModal: false, groups: groups });
      })
      .catch(err => {
        errorProcessing(err);
      });
  };

  changeModalFields = (name, value) => {
    this.setState({ [name]: value });
  };

  componentDidMount() {
    axios
      .get(GROUPS)
      .then(res => {
        this.setState({ groups: res.data });
      })
      .catch(err => {
        errorProcessing(err);
      });
  }

  render() {
    return (
      <>
        <div className="add_group">
          <TextField
            outline
            value={this.state.newGroup}
            onChange={this.newGroupFieldHandler}>
            Добавить новую группу
          </TextField>
          <Button
            fab={true}
            icon={<span className="material-icons mdc-fab__icon">add</span>}
            onClick={this.addNewGroup}>
            Добавить
          </Button>
        </div>
        <div className="mt-20">
          {this.state.showModal && (
            <Modal
              exitHandler={this.modalAddManagerExitHandler}
              title={this.state.modalAddManager.title}
              data={this.modalAddManagerData}
              buttonOne={this.state.modalAddManager.buttonOne}
              buttonOneHandler={this.saveManager}
            />
          )}
          <Table
            columns={this.groups_columns}
            extra={this.addManager}
            data={this.state.groups}
          />
        </div>
      </>
    );
  }
}

export default connect(state => ({ store: state }))(AdminGroupsPage);

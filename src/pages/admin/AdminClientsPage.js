import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { errorProcessing } from '../../utils';
import { GROUPS, MANAGERS, CLIENTS } from '../../queries';
import TextField from '../../components/TextField';
import FullTextField from '../../components/FullTextField';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import TabBar from '../../components/TabBar';

class AdminClientsPage extends React.Component {
  static path = '/clients';

  groups_columns = [
    {
      Header: 'Ф.И.О.',
      accessor: 'full_name',
    },
    {
      Header: 'Адрес',
      accessor: 'address',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Телефон',
      accessor: 'phone',
    },
    {
      Header: 'Паспортные данные',
      accessor: 'passport',
    },
    {
      Header: 'Комментарии',
      accessor: 'comments',
    },
    {
      Header: 'Состояние',
      accessor: 'extra',
    },
  ];

  constructor() {
    super();

    this.state = {
      group: '',
      activeTab: 'raw',
      tabs: [
        { header: 'raw', name: 'Сырой клиент' },
        { header: 'signed', name: 'Подписал договор' },
        { header: 'allowed', name: 'Одобрен' },
      ],
      clients: [],
      showModal: false,
      modalAddClientTitle: 'Добавить клиента',
      modalAddClientButton: 'Сохранить',
      newClient: {
        full_name: '',
        address: '',
        email: '',
        phone: '',
        passport: '',
        comments: '',
      },
      showMenu: false,
    };
  }

  componentDidMount() {
    this.showCurrentData();
  }

  showCurrentData(name = false) {
    axios
      .get(CLIENTS, { params: { state: !name ? this.state.activeTab : name } })
      .then(res => {
        this.setState({ clients: res.data });
      })
      .catch(err => {
        errorProcessing(err);
      });
  }

  onChangeNewClientFields = (name, value) => {
    this.setState({ newClient: { ...this.state.newClient, [name]: value } });
  };

  modalAddClientData = () => {
    return (
      <div className="child-mt-20">
        <FullTextField
          outline={true}
          value={this.state.newClient.full_name}
          onChange={e => {
            this.onChangeNewClientFields('full_name', e.target.value);
          }}>
          Ф.И.О.
        </FullTextField>
        <FullTextField
          outline={true}
          value={this.state.newClient.address}
          onChange={e => {
            this.onChangeNewClientFields('address', e.target.value);
          }}>
          Адрес
        </FullTextField>
        <FullTextField
          outline={true}
          value={this.state.newClient.email}
          onChange={e => {
            this.onChangeNewClientFields('email', e.target.value);
          }}>
          Email
        </FullTextField>
        <FullTextField
          outline={true}
          value={this.state.newClient.phone}
          onChange={e => {
            this.onChangeNewClientFields('phone', e.target.value);
          }}>
          Телефон
        </FullTextField>
        <FullTextField
          outline={true}
          value={this.state.newClient.passport}
          onChange={e => {
            this.onChangeNewClientFields('passport', e.target.value);
          }}>
          Паспортные данные
        </FullTextField>
        <TextArea
          value={this.state.newClient.comments}
          onChange={e => {
            this.onChangeNewClientFields('comments', e.target.value);
          }}>
          Комментарии
        </TextArea>
      </div>
    );
  };

  modalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  saveClient = () => {
    const { full_name } = this.state.newClient;
    axios
      .post(CLIENTS, this.state.newClient)
      .then(res => {
        this.setState({
          clients: [...this.state.clients, res.data],
          showModal: false,
        });
      })
      .catch(err => {
        errorProcessing(err);
      });
  };

  tabsHandler = header => {
    this.setState({ activeTab: header });
    this.showCurrentData(header);
  };

  table_extra = ['Сырой', 'Подписал договор', 'Одобрен'];

  changeClientState = (selectedIndex, menuRowIndex) => {
    const client_status = ['raw', 'signed', 'allowed'];

    axios
      .put(CLIENTS, {
        id: this.state.clients[selectedIndex].id,
        status: client_status[menuRowIndex],
      })
      .then(res => {
        if (res.status === 204) {
          let mass = this.state.clients;
          delete mass[selectedIndex];
          this.setState({ clients: mass });
        }
      })
      .catch(err => {
        errorProcessing(err);
      });
  };

  render() {
    return (
      <>
        <div className="space-between">
          <div>
            <TabBar
              clickHandler={this.tabsHandler}
              activeTab={this.state.activeTab}
              tabs={this.state.tabs}
            />
          </div>
          <Button
            fab={true}
            icon={<span className="material-icons mdc-fab__icon">add</span>}
            onClick={this.modalHandler}>
            Добавить
          </Button>
        </div>
        <div className="mt-20">
          {this.state.showModal && (
            <Modal
              exitHandler={this.modalHandler}
              title={this.state.modalAddClientTitle}
              data={this.modalAddClientData}
              buttonOne={this.state.modalAddClientButton}
              buttonOneHandler={this.saveClient}
            />
          )}
          <Table
            extra={this.table_extra}
            extraMenu={this.changeClientState}
            columns={this.groups_columns}
            data={this.state.clients}
          />
        </div>
      </>
    );
  }
}

export default connect(state => ({ store: state }))(AdminClientsPage);

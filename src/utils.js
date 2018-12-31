import axios from 'axios';
import { CLIENTS } from './queries';

export function setAuthorizationToken(token = false) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['Authorization'];
    window.location.reload();
  }
}

export function errorProcessing(error) {
  if (error.response === undefined) {
    return;
  }
  if (error.response.status === 401) {
    setAuthorizationToken(false);
  } else if (error.response.status === 400) {
    // Требуется создать tost о не загруженном файле
  }
}

export const adminMenu = [
  {
    name: 'Менеджеры',
    link: '/admin/groups',
  },
  {
    name: 'Клиенты',
    link: '/admin/clients',
  },
  {
    name: 'Редактор документов',
    link: '/admin/documents-edit',
  },
];

export const managerMenu = [
  {
    name: 'Клиенты',
    link: '/manager/clients',
  },
  {
    name: 'Редактор документов',
    link: '/manager/documents-edit',
  },
];

export const changeClientState = (selectedIndex, menuRowIndex) => {
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

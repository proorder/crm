import React from 'react';
import { NavLink } from 'react-router-dom';
import { MDCDrawer } from '@material/drawer';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

    this.drawer.listen('MDCDrawer:closed', this.props.menuHandle);
  }

  componentWillReceiveProps = props => {
    this.drawer.open = props.open;
  };

  render() {
    return (
      <>
        <aside className="mdc-drawer mdc-drawer--modal">
          <div className="mdc-drawer__content">
            <nav className="mdc-list">
              {this.props.links.map((e, index) => (
                <NavLink
                  key={index}
                  onClick={() => {
                    this.drawer.open = false;
                  }}
                  className="mdc-list-item"
                  to={e.link}
                  activeClassName="mdc-list-item--activated">
                  <span className="mdc-list-item__text">{e.name}</span>
                </NavLink>
              ))}
              <a className="mdc-list-item" onClick={this.props.getOut}>
                <span className="mdc-list-item__text">Выход</span>
              </a>
            </nav>
          </div>
        </aside>

        <div className="mdc-drawer-scrim" />
      </>
    );
  }
}

export default Menu;

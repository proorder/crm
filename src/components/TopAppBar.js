import React from 'react';
import { MDCTopAppBar } from '@material/top-app-bar/index';

class TopAppBar extends React.Component {
  componentDidMount() {
    const topAppBarElement = document.querySelector('.mdc-top-app-bar');
    const topAppBar = new MDCTopAppBar(topAppBarElement);
  }

  render() {
    return (
      <header className="mdc-top-app-bar">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <a
              className="material-icons mdc-top-app-bar__navigation-icon"
              onClick={this.props.menuHandle}>
              menu
            </a>
            <span className="mdc-top-app-bar__title">{this.props.title}</span>
          </section>
        </div>
      </header>
    );
  }
}

export default TopAppBar;

import React from 'react';
import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';

export default class Button extends React.Component {
  constructor(props) {
    super(props);

    this.mdcButton = React.createRef();
  }

  componentDidMount() {
    const button = new MDCRipple(this.mdcButton.current);
  }

  render() {
    return (
      <>
        <button
          ref={this.mdcButton}
          onClick={this.props.onClick}
          className={classnames({
            'mdc-button mdc-button--raised': this.props.fab === undefined,
            'mdc-fab mdc-fab--extended': this.props.fab !== undefined,
          })}>
          {this.props.icon !== undefined && this.props.icon}
          {this.props.children}
        </button>
      </>
    );
  }
}

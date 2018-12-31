import React from 'react';
import { MDCTextField } from '@material/textfield';
import classnames from 'classnames';

export default class FullTextField extends React.Component {
  constructor(props) {
    super(props);

    this.mdcTextField = React.createRef();
  }

  componentDidMount() {
    const textField = new MDCTextField(this.mdcTextField.current);
  }

  render() {
    return (
      <>
        <div
          ref={this.mdcTextField}
          className={classnames({
            'mdc-text-field mdc-text-field--fullwidth': true,
            'mdc-text-field--invalid':
              this.props.error !== undefined && this.props.error !== '',
          })}>
          <input
            onChange={this.props.onChange}
            type={this.props.type}
            placeholder={this.props.children}
            className="mdc-text-field__input"
          />
        </div>
        <p
          className={classnames({
            'mdc-text-field-helper-text': true,
            'mdc-text-field-helper-text--persistent':
              this.props.error !== undefined && this.props.error !== '',
            'd-none': this.props.error === undefined || this.props.error === '',
            'mdc-text-field-helper-text--validation-msg': true,
          })}
          aria-hidden="true">
          {this.props.error}
        </p>
      </>
    );
  }
}

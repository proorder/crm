import React from 'react';
import { MDCTextField } from '@material/textfield';
import { MDCFloatingLabel } from '@material/floating-label';
import classnames from 'classnames';

export default class TextArea extends React.Component {
  constructor(props) {
    super(props);

    this.mdcTextField = React.createRef();
    this.mdcFloatingLabel = React.createRef();
  }

  componentDidMount() {
    const textField = new MDCTextField(this.mdcTextField.current);
    const floatingLabel = new MDCFloatingLabel(this.mdcFloatingLabel.current);
  }

  render() {
    return (
      <>
        <div
          ref={this.mdcTextField}
          className={classnames({
            'mdc-text-field mdc-text-field--textarea': true,
            'mdc-text-field--invalid':
              this.props.error !== undefined && this.props.error !== '',
          })}>
          <textarea
            onChange={this.props.onChange}
            type={this.props.type}
            rows="3"
            cols="40"
            className="mdc-text-field__input"
          />
          <label ref={this.mdcFloatingLabel} className="mdc-floating-label">
            {this.props.children}
          </label>
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

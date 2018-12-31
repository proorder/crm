import React from 'react';
import { MDCTextField } from '@material/textfield';
import { MDCLineRipple } from '@material/line-ripple';
import { MDCFloatingLabel } from '@material/floating-label';
import classnames from 'classnames';

export default class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.mdcTextField = React.createRef();
    this.mdcLineRipple = React.createRef();
    this.mdcFloatingLabel = React.createRef();
  }

  componentDidMount() {
    const textField = new MDCTextField(this.mdcTextField.current);
    const floatingLabel = new MDCFloatingLabel(this.mdcFloatingLabel.current);
    if (this.props.outline !== true) {
      const lineRipple = new MDCLineRipple(this.mdcLineRipple.current);
    }
  }
  //'is-invalid': this.state.errors.identifier !== '',
  //{/* 'd-block': this.state.errors.identifier !== '', */}
  //{/* this.state.errors.identifier */}

  render() {
    return (
      <>
        <div
          ref={this.mdcTextField}
          className={classnames({
            'mdc-text-field': true,
            'mdc-text-field--outlined': this.props.outline,
            'mdc-text-field--invalid':
              this.props.error !== undefined && this.props.error !== '',
          })}>
          <input
            onChange={this.props.onChange}
            type={this.props.type}
            className="mdc-text-field__input"
          />
          <label ref={this.mdcFloatingLabel} className="mdc-floating-label">
            {this.props.children}
          </label>
          {this.props.outline ? (
            <>
              <div className="mdc-notched-outline">
                <svg>
                  <path className="mdc-notched-outline__path" />
                </svg>
              </div>
              <div className="mdc-notched-outline__idle" />
            </>
          ) : (
            <div
              ref={this.mdcLineRipple}
              className="mdc-line-ripple"
              ref={this.mdcLineRipple}
            />
          )}
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

import React from 'react';
import { MDCDialog } from '@material/dialog';
import isNil from 'lodash/fp/isNil';

class Modal extends React.Component {
  getDialogRef = node => {
    this.dialogRef = new MDCDialog(node);
  };

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = e => {
    const { exitHandler } = this.props;

    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        exitHandler();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  };

  render() {
    return (
      <div
        className="mdc-dialog mdc-dialog--open"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="my-dialog-title"
        aria-describedby="my-dialog-content">
        <div
          className="mdc-dialog__container"
          ref={node => {
            this.modal = node;
          }}>
          <div className="mdc-dialog__surface">
            <h2 className="mdc-dialog__title" id="my-dialog-title">
              {this.props.title}
            </h2>
            <div className="mdc-dialog__content" id="my-dialog-content">
              {this.props.data()}
            </div>
            <footer className="mdc-dialog__actions">
              {this.props.buttonOne !== undefined && (
                <button
                  onClick={this.props.buttonOneHandler}
                  type="button"
                  className="mdc-button mdc-dialog__button"
                  data-mdc-dialog-action="no">
                  {this.props.buttonOne}
                </button>
              )}
              {this.props.buttonTwo !== undefined && (
                <button
                  onClick={this.props.buttonTwoHandler}
                  type="button"
                  className="mdc-button mdc-dialog__button"
                  data-mdc-dialog-action="yes">
                  {this.props.buttonTwo}
                </button>
              )}
            </footer>
          </div>
        </div>
        <div class="mdc-dialog__scrim" />
      </div>
    );
  }
}

export default Modal;

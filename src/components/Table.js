import ReactDOM from 'react-dom';
import React from 'react';
import classnames from 'classnames';
import { MDCMenu } from '@material/menu';
import './table.scss';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.selectedIndex = 0;
    this.menuAnchors = [];

    this.state = {
      data: this.props.data,
    };
  }

  componentDidMount() {
    if (this.props.extraMenu !== undefined) {
      this.mdcMenu = new MDCMenu(this.mdcMenuRef);
      this.mdcMenu.listen('MDCMenu:selected', e => {
        this.props.extraMenu(this.selectedIndex, e.detail.index);
      });
    }
  }

  componentWillReceiveProps = props => {
    this.setState({ data: props.data });
  };

  selectRow = function(targetIndex) {
    this.setState({
      data: this.state.data.map((el, key) => {
        if (key === targetIndex && el.toggle !== true) {
          el.toggle = true;
          return el;
        }
        if (el.toggle !== undefined && el.toggle === true) {
          el.toggle = false;
        }
        return el;
      }),
    });
  }.bind(this);

  render() {
    return (
      <div className="table-constraint mdc-elevation--z4">
        {this.props.extraMenu !== undefined && (
          <div
            ref={node => {
              this.mdcMenuRef = node;
            }}
            className="mdc-menu mdc-menu-surface"
            tabIndex="-1">
            <ul
              className="mdc-list"
              role="menu"
              aria-hidden="true"
              aria-orientation="vertical">
              {this.props.extra.map((e, index) => (
                <li key={index} className="mdc-list-item" role="menuitem">
                  <span className="mdc-list-item__text">{e}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <table className="">
          <thead>
            <tr>
              {this.props.columns.map((c, index) => {
                if (c.accessor !== 'extra') {
                  return <th key={index}>{c.Header}</th>;
                } else {
                  return <th key={index} className="extra" />;
                }
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((el, key) => (
              <React.Fragment key={key}>
                <tr
                  onClick={e => {
                    if (e.target.classList.contains('mdc-chip')) {
                      return;
                    }
                    this.selectRow(key);
                  }}
                  className={classnames({
                    'with-child': el.children !== undefined,
                    'opened-childs': el.toggle === true,
                  })}>
                  {this.props.columns.map((c, index) => {
                    if (c.accessor === 'extra') {
                      if (this.props.extraMenu !== undefined) {
                        return (
                          <td key={index} className="extra">
                            <div
                              ref={node => {
                                this.mdcMenuRef = node;
                              }}
                              className="mdc-chip"
                              tabIndex="0"
                              onClick={e => {
                                const {
                                  x,
                                  y,
                                } = e.target.getBoundingClientRect();
                                this.mdcMenu.setAbsolutePosition(x, y);
                                this.mdcMenu.open = true;
                                this.selectedIndex = key;
                              }}>
                              <div className="mdc-chip__text">{c.Header}</div>
                            </div>
                          </td>
                        );
                      } else {
                        return (
                          <td key={index} className="extra">
                            <div
                              className="mdc-chip"
                              tabIndex="0"
                              onClick={() => {
                                this.props.extra(key);
                              }}>
                              <div className="mdc-chip__text">{c.Header}</div>
                            </div>
                          </td>
                        );
                      }
                    } else {
                      return <td key={index}>{el[c.accessor]}</td>;
                    }
                  })}
                </tr>
                {el.children !== undefined &&
                  el.children.map((child, index) => (
                    <tr
                      key={index}
                      className={classnames({
                        child: true,
                        visible: el.toggle === true,
                      })}>
                      {this.props.columns.map((c, index) => (
                        <td
                          key={index}
                          className={classnames({
                            'without-child': child[c.accessor] === undefined,
                          })}>
                          {child[c.accessor]}
                        </td>
                      ))}
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;

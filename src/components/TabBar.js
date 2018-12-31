import React from 'react';
import { MDCTabBar } from '@material/tab-bar';
import { MDCTab } from '@material/tab';
import classnames from 'classnames';

class TabBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const tabBar = new MDCTabBar(this.mdcTabBar);
  }

  render() {
    return (
      <div
        ref={node => {
          this.mdcTabBar = node;
        }}
        className="mdc-tab-bar"
        role="tablist">
        <div className="mdc-tab-scroller">
          <div className="mdc-tab-scroller__scroll-area">
            <div className="mdc-tab-scroller__scroll-content">
              {this.props.tabs.map((e, index) => (
                <button
                  key={index}
                  onClick={() => {
                    this.props.clickHandler(e.header);
                  }}
                  className={classnames({
                    'mdc-tab': true,
                    'mdc-tab--active': e.header === this.props.activeTab,
                  })}
                  role="tab"
                  tabIndex="0">
                  <span className="mdc-tab__content">
                    <span className="mdc-tab__text-label">{e.name}</span>
                  </span>
                  <span
                    className={classnames({
                      'mdc-tab-indicator': true,
                      'mdc-tab-indicator--active':
                        e.header === this.props.activeTab,
                    })}>
                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
                  </span>
                  <span className="mdc-tab__ripple" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TabBar;

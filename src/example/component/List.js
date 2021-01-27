import React, { Component } from 'react';
import Fragment from 'lib/component/Fragment';

export default class List extends Component {
  render() {
    var { fragment } = this.props
    const { children, icon, overrides } = this.props
    const overrides_ = overrides == undefined ? {} : overrides

    const fragmentAll = fragment == "all"
    fragment = fragment != undefined && fragment != false

    const children_ = Array.isArray(children) ? children : [children]

    return (
      <div className="left">
        <ul className="fa-ul">
          {
            children_.map((child, i) => {
              const iconName = (overrides_[i] == undefined) ? icon : overrides_[i]
              const iconClassName = `fas ${iconName}`
              const key = `list-${i}`
              if (fragment && (fragmentAll || i != 0)) {
                return (
                  <li key={key}><Fragment><span className="fa-li"><i className={iconClassName}></i></span>{child}</Fragment></li>
                )
              } else {
                return (
                  <li key={key}><span className="fa-li"><i className={iconClassName}></i></span>{child}</li>
                )
              }
            })
          }
        </ul>
      </div>
    )
  }
}

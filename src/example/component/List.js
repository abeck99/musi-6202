import React, { Component } from 'react';
import Fragment from 'lib/component/Fragment';

export default class List extends Component {
  render() {
    const { children, icon, overrides } = this.props
    const overrides_ = overrides == undefined ? {} : overrides

    const children_ = Array.isArray(children) ? children : [children]

    return (
      <div className="left">
      <ul className="fa-ul">
        {
          children_.map((child, i) => {
          const iconName = (overrides_[i] == undefined) ? icon : overrides_[i]
          const iconClassName = `fas ${iconName}`
          const key = `list-${i}`
          return (
            <li key={key}><span className="fa-li"><i className={iconClassName}></i></span>{child}</li>
          )
        })
        }
      </ul>
        </div>
    )
  }
}

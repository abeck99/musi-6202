import React, { Component } from 'react';
import Fragment from 'lib/component/Fragment';

const defaultProps = {
  icon: "fa-angle-double-right",
  overrides: [],
  fragment: false,
  align: "left",
  fullWidth: false,
  ordered: false,
}

export default class List extends Component {
  render() {
    const props = {
      ...defaultProps,
      ...this.props,
    }
    
    var { fragment } = props
    const { children, icon, overrides, fullWidth, ordered } = props
    const overrides_ = overrides == undefined ? {} : overrides

    const fragmentAll = fragment == "all"
    fragment = fragment != undefined && fragment != false

    const children_ = Array.isArray(children) ? children : [children]

    const style = fullWidth ? {width: "100%"} : {}

    return (
      <div className={props.align}>
        {
          ordered ?
            (
              <ol style={style}>
                {
                  children_.map((child, i) => {
                    const key = `${i}`
                    if (fragment && (fragmentAll || i != 0)) {
                      return (
                        <li key={key}><Fragment>{child}</Fragment></li>
                      )
                    } else {
                      return (
                        <li key={key}>{child}</li>
                      )
                    }
                  })
                }
              </ol>
            )
            :
            (
              <ul className="fa-ul" style={style}>
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
            )
        }
      </div>
    )
  }
}

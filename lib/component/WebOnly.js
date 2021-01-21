import React, { Component } from 'react';
import Fragment from 'lib/component/Fragment';

export default class WebOnly extends Component {
  render() {
    const { children, isPdf } = this.props

    if (!isPdf) {
      return (
        <div>
          {children}
        </div>
      )
    } else {
      return (
        <div/>
      )
    }
  }
}
        

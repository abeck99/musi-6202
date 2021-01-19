import React, { Component } from 'react';
import Fragment from 'lib/component/Fragment';

export default class Table extends Component {
  render() {
    const { leftSize, children, bordered, tableClass, fragmented } = this.props

    const rowClass = bordered ? "row framed bordered" : "row"

    var pairChildren = new Array();
    children.reduce(function(result, value, index) {
      if (index % 2 === 0) {
        pairChildren.push([value])
      } else {
        pairChildren[pairChildren.length - 1].push(value)
      }
      return pairChildren;
    }, []);

    const rightSize = 100 - leftSize
    const leftColClass = `col-${leftSize}`
    const rightColClass = `col-${rightSize}`
    var isLeft = true

    return (
      <div className={tableClass}>
        {pairChildren.map((childPair, i) => {
          const key = `table-${i}`
          if (childPair.length === 2) {
            if (fragmented && i > 0) {
              return (
                <Fragment key={key}>
              <div className={rowClass}>
                <div className={leftColClass}>
                  {childPair[0]}
                </div>
                <div className={rightColClass}>
                  {childPair[1]}
                </div>
              </div>
                  </Fragment>
            )
            } else {
            return (
              <div key={key} className={rowClass}>
                <div className={leftColClass}>
                  {childPair[0]}
                </div>
                <div className={rightColClass}>
                  {childPair[1]}
                </div>
              </div>
            )
            }
          } else if (childPair.length === 1) {
            if (fragmented && i > 0) {
              return (
                <Fragment key={key}>
              <div  className={rowClass}>
                <div className={leftColClass}>
                  {childPair[0]}
                </div>
              </div>
                  </Fragment>
            )
            } else {
            return (
              <div key={key} className={rowClass}>
                <div className={leftColClass}>
                  {childPair[0]}
                </div>
              </div>
            )
            }
          }
        })}
      </div>
    );
  }
}

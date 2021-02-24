import React, { Component } from 'react';
import Fragment from 'lib/component/Fragment';

const defaultProps = {
  sizes: [],
  tableClass: "",
  firstRowClass: "heading",
  evenRowClass: "evenRow",
  oddRowClass: "oddRow",
  bordered: false,
  fragment: false,
}

export default class MultiTable extends Component {
  render() {
    const props = {
      ...defaultProps,
      ...this.props,
    }
    const { children, sizes, tableClass, firstRowClass, evenRowClass, oddRowClass, bordered, fragment } = props

    const baseRowClass = bordered ? "row framed bordered" : "row"

    const numCols = sizes.length

    var pairChildren = new Array();
    children.reduce(function(result, value, index) {
      if (index % numCols == 0) {
        pairChildren.push([value])
      } else {
        pairChildren[pairChildren.length - 1].push(value)
      }
      return pairChildren;
    }, []);

    const colClasses = sizes.map(val => {
      return `col-${val}`
    })

    return (
      <div className={tableClass}>
        {
          pairChildren.map((childPair, i) => {
            const key = `table-${i}`

            var rowClass = baseRowClass

            if (i == 0) {
              rowClass = `${rowClass} ${firstRowClass}`
            } else if ((i % 2) == 0) {
              rowClass = `${rowClass} ${evenRowClass}`
            } else {
              rowClass = `${rowClass} ${oddRowClass}`
            }

            if (fragment && i != 0) {
              return (
                <Fragment>
                  <div key={key} className={rowClass}>
                    {
                      childPair.map((child, j) => {
                        const innerKey = `table-item-${j}`
                        return (
                          <div key={innerKey} className={colClasses[j]}>
                            {child}
                          </div>
                        )
                      })
                    }
                  </div>
                </Fragment>
              )
            }
            return (
              <div key={key} className={rowClass}>
                {
                  childPair.map((child, j) => {
                    const innerKey = `table-item-${j}`
                    return (
                      <div key={innerKey} className={colClasses[j]}>
                        {child}
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

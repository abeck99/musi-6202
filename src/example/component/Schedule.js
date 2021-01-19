import React, { Component } from 'react';

export default class Schedule extends Component {


  render() {
    const { sizes, items, tableClass, firstRowClass, evenRowClass, oddRowClass } = this.props

    const colSizes = sizes.map(size => `col-${size}`)

    const fRowClass = `row ${firstRowClass}`
    const eRowClass = `row ${evenRowClass}`
    const oRowClass = `row ${oddRowClass}`
   
    return (
      <div className={tableClass}>
        {items.map((itemList, i) => {
          const key = `schedule-${i}`
          const rowClass = (i === 0) ? fRowClass : (((i % 2) === 0) ? eRowClass : oRowClass)

          return (<div key={key} className={rowClass}>
                    {
                      itemList.map((item, j) => {
                        const itemKey = `schedule-item-${i}-${j}`
                        return (<div key={itemKey} className={colSizes[j]}>
                                  {item}
                                </div>
                               )
                      })
                    }
                  </div>
                 )
        })
        }
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, Legend,
} from 'recharts';
import {
  AnnotationBracket, AnnotationXYThreshold
} from 'react-annotation'
import { MathComponent } from 'mathjax-react'

const makeData = (numPoints) => {
  var ret = []
  for (var i = 0; i < numPoints; i++) {
    const a = (i / numPoints) * 2 - 1
    const v = Math.floor(a * 8)
    ret.push({name: a, val: v})
  }
  return ret
}

class XAxisLabel extends PureComponent {
  render() {
    const {viewBox: {width, height, x, y}} = this.props
    const transform = `translate(${Math.round(width/2)-30}px, 40px)`
    return (
      <g>
        <foreignObject x={x} y={y} width={width} height={height} style={{transform}}>
          <div className="big">
            <MathComponent tex={String.raw`x \rightarrow`} display={false}/>
          </div>
        </foreignObject>
      </g>
    )
  }  
}

class YAxisLabel extends PureComponent {
  render() {
    const {viewBox: {width, height, x, y}} = this.props
    const transform = `translate(10px, ${Math.round(height/2)+30}px) rotate(-90deg)`
    return (
      <g>
        <foreignObject x={x} y={y} width={width} height={height} style={{transform}}>
          <div className="big">
            <MathComponent tex={String.raw`x_\mathrm{Q} / \Delta`} display={false}/>
          </div>
        </foreignObject>
      </g>
    )
  }  
}

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
  }

  formatLegend = (value, entry, index) => {
    if (value == 'alph-0.1') {
      return <span>σ = 0.1</span>
    } else if (value == 'alph-0.2') {
      return <span>σ = 0.2</span>
    } else if (value == 'alph-0.3') {
      return <span>σ = 0.3</span>
    }
    return value
  }
                                 
  render() {
    const {width, height} = this.props
    const data = makeData(128)

    const halfWidth = width / 2


    return (
      <div className="">
        <div className="highlight-bar-charts small" style={{ userSelect: 'none' }}>
          <LineChart
            width={halfWidth}
            height={height}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              allowDataOverflow
              dataKey="name"
              domain={[-1.0, 1.0]}
              type="number"
              label={<XAxisLabel/>}
              ticks={[-1, -0.5, 0, 0.5, 1]}
              height={100}
            />
            <YAxis
              allowDataOverflow
              domain={[-8, 8]}
              type="number"
              yAxisId="1"
              ticks={[-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]}
              label={<YAxisLabel/>}
              width={100}
            />
            <Line yAxisId="1" type="step" dataKey="val" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

          </LineChart>
        </div>
      </div>
    );
  }
}



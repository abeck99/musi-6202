import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, Legend,
} from 'recharts';
import {
  AnnotationBracket, AnnotationXYThreshold
} from 'react-annotation'
import { MathComponent } from 'mathjax-react'


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
    const {winData, dbData, width, height} = this.props

    const halfWidth = width / 2

    // const data = winHamming

    // const width = 900
    // const height = 400
    const className = "row windowPlot-" + height

    return (
      <div className={className}>
        <div className="col-50">
          <div className="highlight-bar-charts smallest" style={{ userSelect: 'none' }}>
            <LineChart
              width={halfWidth}
              height={height}
              data={winData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                allowDataOverflow
                dataKey="name"
                domain={[-0.5, 0.5]}
                type="number"
                label="Time"
                height={80}
              />
              <YAxis
                allowDataOverflow
                domain={[0, 1.1]}
                type="number"
                yAxisId="1"
                ticks={[0, 0.25, 0.5, 0.75, 1.0]}
                label="Amp"
              />
              <Line yAxisId="1" type="monotone" dataKey="val" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

            </LineChart>
          </div>
        </div>
        <div className="col-50">
          <div className="highlight-bar-charts smallest" style={{ userSelect: 'none' }}>
            <LineChart
              width={halfWidth}
              height={height}
              data={dbData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                allowDataOverflow
                dataKey="name"
                domain={[0.1, 0.4]}
                type="number"
                ticks={[0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4]}
                label="Scaled Frequency (f / f_s)"
                height={80}
              />
              <YAxis
                allowDataOverflow
                domain={[-100, 0]}
                type="number"
                yAxisId="1"
                label="dB"
              />
              <Line yAxisId="1" type="monotone" dataKey="val" stroke="#fcf8e3" dot={<div/>} strokeWidth="1px" isAnimationActive={false} />

            </LineChart>
          </div>
        </div>
      </div>
    );
  }
}



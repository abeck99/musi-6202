import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, Legend,
} from 'recharts';
import {
  AnnotationBracket, AnnotationXYThreshold
} from 'react-annotation'
import Fragment from 'lib/component/Fragment';
import { MathComponent } from 'mathjax-react'


const buildData = (points) => {
  const min = -1
  const max = 1
  const range = max - min
  const alph = 0.5
  const mean = 0
  var data = []
  for (var i = 0; i <= points; i++) {
    const a = i/points
    const t = min + (range * a)
    const p = -0.5 * Math.pow((t - mean)/alph, 2)
    const v = (1/(Math.sqrt(2*Math.PI) * alph))*Math.pow(Math.E, p)
    data.push({"name": t, "value": v})
  }
  return data;
}

const initialState = {
  data: buildData(128),
  left: -1.1,
  right: 1.1,
  top: 1.1,
  bottom: 0,
  animation: true,
};

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    const {
      data, left, right, top, bottom,
    } = this.state;

    const width = 400
    const height = 150

    return (
      <div className="highlight-bar-charts small" style={{ userSelect: 'none' }}>
        <div className="small">
        <LineChart
          width={width}
          height={height}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="name"
            domain={[left, right]}
            type="number"
            ticks={[-1,-0.5,0,0.5,1]}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            ticks={[0, 0.5, 1]}
          />
          <Line yAxisId="1" type="monotone" dataKey="value" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

        </LineChart>
        </div>
      </div>
    );
  }
}



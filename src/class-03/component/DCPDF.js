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
  return [{"name": -1, "value": 0},
          {"name": -0.999, "value": 0},
          {"name": 0.999, "value": 0},
          {"name": 1, "value": 100}]

  return data

  // var data = []
  // for (var i = 0; i <= points; i++) {
  //   const a = i/points
  //   const t = min + (range * a)
  //   var newData = {name: t} 
  //   for (var j = 0; j <= alphs.length; j++) {
  //     const alph = alphs[j]
  //     const p = -1 * Math.sqrt(2) * (Math.abs(t - mean) / alph)
  //     const v = (1 / (alph * Math.sqrt(2))) * Math.pow(Math.E, p)
  //     newData[`alph-${alph}`] = v
  //   }
  //   data.push(newData)
  // }
  // return data;
}

const initialState = {
  data: buildData(20),
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
        <div className="smaller">
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
              ticks={[0,0.5,1]}
            />
            <Line yAxisId="1" type="monotone" dataKey="value" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

          </LineChart>
        </div>
      </div>
    );
  }
}



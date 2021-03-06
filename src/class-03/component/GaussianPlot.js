import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, Legend,
} from 'recharts';
import {
  AnnotationBracket, AnnotationXYThreshold
} from 'react-annotation'
import Fragment from 'lib/component/Fragment';
import { MathComponent } from 'mathjax-react'


const buildData = (min, max, mean, alphs, points) => {
  const range = max - min
  var data = []
  for (var i = 0; i <= points; i++) {
    const a = i/points
    const t = min + (range * a)
    var newData = {name: t} 
    for (var j = 0; j <= alphs.length; j++) {
      const alph = alphs[j]
      const p = -0.5 * Math.pow((t - mean)/alph, 2)
      const v = (1/(Math.sqrt(2*Math.PI) * alph))*Math.pow(Math.E, p)
      newData[`alph-${alph}`] = v
    }
    data.push(newData)
  }
  return data;
}

const initialState = {
  data: buildData(-1, 1, 0, [0.1, 0.2, 0.3], 32),
  left: -1,
  right: 1,
  top: 4,
  bottom: 0,
  animation: true,
};

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
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
    const {
      data, left, right, top, bottom,
    } = this.state;

    const width = 900
    const height = 400

    return (
      <div className="highlight-bar-charts small" style={{ userSelect: 'none' }}>
        <LineChart
          width={width}
          height={height}
          data={data}
        >
        <Legend iconType="plainline" iconSize={30} layout="vertical" align="right" verticalAlign="top" formatter={this.formatLegend}/>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="name"
            domain={[left, right]}
      type="number"
      label="(u-μx)"
      height={100}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
      label="px(u)"
      width={150}
      
          />
          <Line yAxisId="1" type="natural" dataKey="alph-0.1" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
          <Line yAxisId="1" strokeDasharray="10 10" type="natural" dataKey="alph-0.2" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
          <Line yAxisId="1" strokeDasharray="5 5" type="natural" dataKey="alph-0.3" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

        </LineChart>
      </div>
    );
  }
}



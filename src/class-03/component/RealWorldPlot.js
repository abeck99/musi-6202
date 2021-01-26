import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, Legend,
} from 'recharts';
import {
  AnnotationBracket, AnnotationXYThreshold
} from 'react-annotation'
import Fragment from 'lib/component/Fragment';
import { MathComponent } from 'mathjax-react'

import { realWorldData } from '../content/orc-talk-dist.json';

const addData = (inData, alph, scale, alph2, scale2) => {
  var outData = []
  for (var i = 0; i < inData.length; i++) {
    var data = inData[i]
    const t = data.name
    const mean = 0

    const p = -1 * Math.sqrt(2) * (Math.abs(t - mean) / alph)
    const v = (1 / (alph * Math.sqrt(2))) * Math.pow(Math.E, p)
    data["laplace1"] = v * scale

    const p2 = -1 * Math.sqrt(2) * (Math.abs(t - mean) / alph2)
    const v2 = (1 / (alph2 * Math.sqrt(2))) * Math.pow(Math.E, p2)
    data["laplace2"] = v2 * scale2

    outData.push(data)
  }
  return outData
}

const initialProps = {
  left: -0.55,
  right: 0.55,
  top: 0.4,
  bottom: 0,
};

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.renderProps = {
      ...initialProps,
      ...props,
    }
    this.state = {
      data: addData(realWorldData, 0.02, 0.01, 0.10, 0.01),
    }
  }

  render() {
    const {
      data,
    } = this.state

    const {
      left, right, top, bottom,
    } = this.renderProps;

    const width = 900
    const height = 500

    return (
      <div className="highlight-bar-charts small" style={{ userSelect: 'none' }}>
        <div className="normal">
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
            ticks={[-0.5, -0.25, 0, 0.25, 0.5]}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
      
          />
          <Line yAxisId="1" type="monotone" dataKey="orch" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
          <Line yAxisId="1" type="monotone" strokeDasharray="3 3" dataKey="laplace1" stroke="#00BFFF" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

        </LineChart>
        </div>
      </div>
    );
  }
}



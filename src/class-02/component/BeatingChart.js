import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea,
} from 'recharts';
import {
  AnnotationBracket, AnnotationXYThreshold
} from 'react-annotation'
import Fragment from 'lib/component/Fragment';

const modu = (x, y) => {
  if (x >= y) {
    while (x >= y) {

      x = x - y
    }
  }
  return x
}

/*const data = [
  { name: 1, cost: 4.11, impression: 100 },
  { name: 2, cost: 2.39, impression: 120 },
  { name: 3, cost: 1.37, impression: 150 },
  { name: 4, cost: 1.16, impression: 180 },
  { name: 5, cost: 2.29, impression: 200 },
  { name: 6, cost: 3, impression: 499 },
  { name: 7, cost: 0.53, impression: 50 },
  { name: 8, cost: 2.52, impression: 100 },
  { name: 9, cost: 1.79, impression: 200 },
  { name: 10, cost: 2.94, impression: 222 },
  { name: 11, cost: 4.3, impression: 210 },
  { name: 12, cost: 4.41, impression: 300 },
  { name: 13, cost: 2.1, impression: 50 },
  { name: 14, cost: 8, impression: 190 },
  { name: 15, cost: 0, impression: 300 },
  { name: 16, cost: 9, impression: 400 },
  { name: 17, cost: 3, impression: 200 },
  { name: 18, cost: 2, impression: 50 },
  { name: 19, cost: 3, impression: 100 },
  { name: 20, cost: 7, impression: 100 },
];*/

const buildData = (min, max, amp, freq, freq2, points) => {
  const range = max - min
  var data = []
  for (var i = 0; i <= points; i++) {
    const a = i/points
    const t = min + (range * a)
    const v = Math.sin(2 * Math.PI * t * freq) * amp
    const v2 = Math.sin(2 * Math.PI * t * freq2) * amp
    data.push({name: t, wave: v, wave2: v2, wave3: v+v2})
  }
  return data;
}

const initialState = {
  data: buildData(0, 0.27, 1, 100, 101, 200),
  mixedData: buildData(0, 2, 1, 100, 101, 800),
  left: 0,
  right: 0.27,
  refAreaLeft: '',
  refAreaRight: '',
  top: 1.2,
  bottom: -1.2,
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  animation: true,
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

  constructor(props) {
    super(props);
    this.state = initialState;
    this.renderProps = {
      scaleX: 1,
      scaleY: 1,
      ...this.props
    }
  }

  render() {
    const {
      data, mixedData, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2,
    } = this.state;

    const {scaleX, scaleY} = this.renderProps

    const smallWidth = 450 * scaleX
    const smallHeight = 200 * scaleY
    const width = 940 * scaleX
    const height = 350 * scaleY

    return (
        <div className="highlight-bar-charts small" style={{ userSelect: 'none' }}>
        <div className="row">
        <div className="col-50">
        <div className="center">100 hz</div>
        <LineChart
          width={smallWidth}
          height={smallHeight}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="name"
      domain={[left, right]}
      ticks={[0, 0.125, 0.25]}
            type="number"
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
      yAxisId="1"
      ticks={[-1,0,1]}
          />
          <Line yAxisId="1" type="natural" dataKey="wave" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
        </LineChart>
        </div>
        <div className="col-50">
        <div className="center">101 hz</div>
        <LineChart
          width={smallWidth}
          height={smallHeight}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="name"
            domain={[left, right]}
      ticks={[0, 0.125, 0.25]}
            type="number"
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
      yAxisId="1"
      ticks={[-1,0,1]}
          />
          <Line yAxisId="1" type="natural" dataKey="wave2" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
        </LineChart>
        </div>
        </div>

      <br/>
      <div className="center">100hz + 101hz</div>
        <LineChart
          width={width}
          height={height}
          data={mixedData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="name"
            domain={[0, 2]}
            type="number"
          />
          <YAxis
            allowDataOverflow
      domain={[-2.5, 2.5]}
            type="number"
      yAxisId="1"
      ticks={[-2, -1,0,1, 2]}
          />
          <Line yAxisId="1" type="natural" dataKey="wave3" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
        </LineChart>
      
      </div>
    );
  }
}



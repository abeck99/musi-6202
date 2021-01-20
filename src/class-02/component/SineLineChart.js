import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea,
} from 'recharts';
import {
  AnnotationBracket, AnnotationXYThreshold
} from 'react-annotation'
import Fragment from 'lib/component/Fragment';

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

const buildData = (min, max, amp, freq, points) => {
  const range = max - min
  var data = []
  for (var i = 0; i <= points; i++) {
    const a = i/points
    const t = min + (range * a)
    const v = Math.sin(2 * Math.PI * t * freq) * amp
    data.push({name: t, wave: v})
  }
  return data;
}

const initialState = {
  data: buildData(0, 3, 0.5, 1, 128),
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+0.5',
  bottom: 'dataMin-0.5',
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  animation: true,
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    const {
      data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2,
    } = this.state;

    const width = 800
    const height = 400

    return (
      <div className="highlight-bar-charts small" style={{ userSelect: 'none' }}>
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
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
          />
          <YAxis
            orientation="right"
            allowDataOverflow
            domain={[bottom2, top2]}
            type="number"
            yAxisId="2"
          />
          <Line yAxisId="1" type="natural" dataKey="wave" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

          {
            (refAreaLeft && refAreaRight) ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
            }
        </LineChart>

        <Fragment>

          <div className="large">
        <svg style={{position: "relative", top: "-420px"}} width={width} height={height}>

          <AnnotationXYThreshold
            x={450}
            y={115}
            dy={-30}
            dx={-50}
            color={"#00BFFF"}
            editMode={false}
            connector={{"end":"dot"}}
            note={{"title":"Period Length"}}
            subject={{"x1": 350, "x2": 575, "width":100,"type":"square"}}
          />

          
          <AnnotationXYThreshold
            x={122}
            y={150}
            dy={150}
            dx={50}
            color={"#00BFFF"}
            editMode={false}
            connector={{"end":"dot"}}
            note={{"title":"Amplitude",
                   "lineType":"horizontal",
                   "align": "middle"}}
            subject={{"y1": 115, "y2": 206, "width":100,"type":"square"}}
          />
        </svg>
            </div>
          </Fragment>


      </div>
    );
  }
}



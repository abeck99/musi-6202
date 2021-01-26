import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, Legend,
  ComposedChart, Area,
} from 'recharts';
import Fragment from 'lib/component/Fragment';
import { MathComponent } from 'mathjax-react'


const buildData = (pos) => {
  const triEnd = 350 - pos
  const triMid = 300 - pos
  const triSta = 250 - pos

  var data = [
    {"name": 0, "value": 0},
    {"name": 149, "value": 0},
    {"name": 150, "value": 1},
    {"name": 200, "value": 1},
    {"name": 201, "value": 0},
    {"name": 500, "value": 0},
    {"name": 0, "tri": 0},
    {"name": triSta, "tri": 0},
    {"name": triMid, "tri": 1},
    {"name": triEnd, "tri": 0},
    {"name": 500, "tri": 0},
  ]
  
  if (triMid >= 150 && triMid <= 200) {
    const startIntersectY = Math.max(0, 150 - triSta) / 50
    const endIntersectY = Math.max(0, triEnd - 200) / 50
    data.push({"name": 0, "fill": 0})
    data.push({"name": 149, "fill": 0})
    data.push({"name": 150, "fill": startIntersectY})
    data.push({"name": triMid, "fill": 1})
    data.push({"name": 200, "fill": endIntersectY})
    data.push({"name": 201, "fill": 0})
    data.push({"name": 500, "fill": 0})
  } else if (triMid > 100 && triMid < 150) {
    const endIntersectY = Math.max(0, triEnd - 150) / 50
    data.push({"name": 0, "fill": 0})
    data.push({"name": 149, "fill": 0})
    data.push({"name": 150, "fill": endIntersectY})
    data.push({"name": triEnd, "fill": 0})
    data.push({"name": 500, "fill": 0})
  } else if (triMid > 200 && triMid < 250) {
    const startIntersectY = Math.max(0, 200 - triSta) / 50
    data.push({"name": 0, "fill": 0})
    data.push({"name": triSta, "fill": 0})
    data.push({"name": 200, "fill": startIntersectY})
    data.push({"name": 201, "fill": 0})
    data.push({"name": 500, "fill": 0})
  } else {
    data.push({"name": 0, "fill": 0})
    data.push({"name": 500, "fill": 0})
  }    

  return data
}

const buildInitialCorrData = () => {
  var data = [
    // {"name": 0, "corr": 0},
    // {"name": -1, "corr": 0}
  ]
  for (var i = 0; i < 251; i++) {
    data.push({"name": 0-i, "corr": 0})
  }

  return data
}

const updateCorrData = (pos, corrData) => {
  const triEnd = 350 - pos
  const triMid = 300 - pos
  const triSta = 250 - pos

  var total = 0
  if (triMid >= 150 && triMid <= 200) {
    const startIntersectY = Math.max(0, 150 - triSta) / 50
    const endIntersectY = Math.max(0, triEnd - 200) / 50

    for (var i = 150; i < triMid; i++) {
      total += Math.max(0, i - triSta) / 50
    }
    for (var i = triMid; i <= 200; i++) {
      total += Math.max(0, triEnd - i) / 50
    }
  } else if (triMid > 100 && triMid < 150) {
    for (var i = 150; i <= triEnd; i++) {
      total += Math.max(0, triEnd - i) / 50
    }
  } else if (triMid > 200 && triMid < 250) {
    for (var i = triSta; i <= 200; i++) {
      total += Math.max(0, i - triSta) / 50
    }
  } else {
  }    

  //  corrData.push({"name": 0-pos, "corr": total})//[250-pos].corr = total
  corrData[pos].corr = total
}

const initialState = {
  data: buildData(0),
  corrData: buildInitialCorrData(),
  left: 0,
  right: 500,
  top: 1.1,
  bottom: 0,
  pos: 0,
  animation: true,
};

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  startAnim = () => {
    this.setState({...this.state,
                   pos: 0,
                   corrData: buildInitialCorrData()
                  })
    this.interval = setInterval(() => {
      const newPos = Math.min(250, this.state.pos + 2)
      if (newPos >= 250) {
        clearInterval(this.interval)
      }
      for (var i = this.state.pos; i <= newPos; i++) {
        updateCorrData(i, this.state.corrData)
      }
      this.setState({...this.state, pos: newPos})
    }, 120)
  }

  render() {
    const {
      pos, left, right, top, bottom, corrData,
    } = this.state;

    const data = buildData(pos)

    const width = 900
    const height = 200

    return (
      <div>
      <div className="highlight-bar-charts small" style={{ userSelect: 'none' }}>
        <div className="small">
          <div className="row">
            <div className="col-50">
              <div className="bigger center"><a onClick={this.startAnim}><i className="bigger fas fa-play-circle"></i></a></div>
            </div>
            <div className="col-25">
              <i>x(t)</i>
            </div>
            <div className="col-25 heading"><i>y(t - {pos})</i>
            </div>
          </div>
        <ComposedChart
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
            ticks={[0, 50, 100, 150, 200, 250, 300, 350, 400, 450]}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            ticks={[0, 0.5, 1]}
          />
          <Line yAxisId="1" type="normal" dataKey="value" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={true} />
          <Line yAxisId="1" type="normal" dataKey="tri" stroke="#00BFFF" dot={<div/>} strokeWidth="3px" isAnimationActive={true} />
          <Area yAxisId="1" type="normal" dataKey="fill" fill="#FF8B22" dot={<div/>} isAnimationActive={true} />

        </ComposedChart>
          <br/>
        <ComposedChart
          width={width}
          height={height}
          data={corrData}
          isAnimationActive={false}
          animationDuration={1}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="name"
            domain={[-250, 0]}
            type="number"
            ticks={[-250, -200, -150, -100, -50, 0]}
          />
          <YAxis
            allowDataOverflow
            domain={[0, 40]}
            type="number"
            yAxisId="1"
          />
          <Line yAxisId="1" type="normal" dataKey="corr" stroke="#FF8B22" dot={<div/>} strokeWidth="3px" animationDuration={1} isAnimationActive={false} />

        </ComposedChart>
        </div>
      </div>
        </div>
    );
  }
}



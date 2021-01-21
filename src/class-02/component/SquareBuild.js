import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, BarChart, Bar
} from 'recharts';
import {
  AnnotationBracket, AnnotationXYThreshold
} from 'react-annotation'
import Fragment from 'lib/component/Fragment';
import { faCoffee,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

const modu = (x, y) => {
  if (x >= y) {
    while (x >= y) {

      x = x - y
    }
  }
  return x
}

const buildData = (min, max, amp, freq, numHarmonics, points) => {
  const range = max - min
  var data = []
  for (var i = 0; i <= points; i++) {
    const a = i/points
    const t = min + (range * a)
    const v = (modu(a, 1) < 0.5) ? 1 : -1

    var additive = 0
    for (var j = 1; j <= numHarmonics; j++) {
      if ((j % 2) == 1) {
        const a1 = a * j
        const t1 = min + (range * a1)
        const phaseOffset = ((j % 2) == 0) ? j * Math.PI : 0
        const amp1 = 4 / (j * Math.PI)
        const v1 = Math.sin((2 * Math.PI * t1)) * amp1// * 0.5
        additive = additive + v1
      }
    }
          //Math.sin(2 * Math.PI * t * freq) * amp
    data.push({name: t, wave: v, add: additive})
  }
  return data;
}

const buildHarmonicsData = (numHarmonics) => {
  if (numHarmonics === 1) {
    return [{name:1, harm:1.275},{name:2, harm:0}]
  }
  var data = []
  for (var i = 1; i <= numHarmonics; i++) {
    if ((i % 2) == 1) {
      data.push({name: i, harm: (1/i) * 1.275})
    } else {
      data.push({name: i, harm: 0})
    }
  }
  return data
}

const initialState = {
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 1.3,
  bottom: -1.3,
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  animation: false,
  numHarmonics: 1,
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  setOneHundred = () => {
      this.setState({
        ...this.state,
        numHarmonics: 100
      })
  }
  setTen = () => {
    this.setState({
      ...this.state,
      numHarmonics: 10,
    })
  }
  setTwenty = () => {
    this.setState({
      ...this.state,
      numHarmonics: 20,
    })
  }

  setFifty = () => {
    this.setState({
      ...this.state,
      numHarmonics: 50,
    })
  }

  setOne = () => {
    if (this.state.numHarmonics > 1) {
      this.setState({
        ...this.state,
        numHarmonics: 1
      })
    }
  }

  clickDown = () => {
    if (this.state.numHarmonics > 1) {
      this.setState({
        ...this.state,
        numHarmonics: this.state.numHarmonics - 1
      })
    }
  }

  clickUp = () => {
    this.setState({
      ...this.state,
      numHarmonics: this.state.numHarmonics + 1
    })
  }

  render() {
    const {
      barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2, numHarmonics
    } = this.state;

    const data = buildData(0, 1, 0.5, 1, numHarmonics, 129)
    const harmData = buildHarmonicsData(numHarmonics)

    const width = 800
    const height = 400

    return (
        <div className="highlight-bar-charts small" style={{ userSelect: 'none' }}>
        <div className="row">
        <div className="col-30">
        <div className="center">
        <h4>Num Harmonics</h4>
        <div className="row framed bordered" style={{"width": "200px"}}>
        <div className="col-12">
        <a onClick={this.clickDown}><i className="fas fa-arrow-left"/></a>
        </div>
        <div className="col-76">
        <div className="center">{numHarmonics}</div>
      </div>
        <div className="col-12">
        <div classNAme="right">
        <a onClick={this.clickUp}><i className="fas fa-arrow-right"/></a>
        </div>
        </div>
        </div>
        </div>
        <a  onClick={this.setOne}>1</a>, 
        <a  onClick={this.setTen}>10</a>, 
        <a  onClick={this.setTwenty}>20</a>, 
        <a  onClick={this.setFifty}>50</a>, 
        <a  onClick={this.setOneHundred}>100</a>
        </div>
        <div className="col-70 smaller">
        <div className="right">Harmonic Amplitudes</div>
                <BarChart
          width={550}
      height={200}
          data={harmData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="name"
      domain={[0, 21]}
      ticks={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
      type="number"
          />
          <YAxis
            allowDataOverflow
            domain={[0, 1.35]}
            type="number"
            yAxisId="1"
            ticks={[0, 0.5, 1]}
          />
          <Bar yAxisId="1" type="monotone" dataKey="harm" stroke="#fcf8e3" fill="#fcf8e3" dot={<div/>} isAnimationActive={false} />

        </BarChart>

      </div>
        </div>
      

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
            ticks={[-1, -0.5, 0, 0.5, 1]}
          />
          <Line yAxisId="1" type="monotone" dataKey="wave" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
          <Line yAxisId="1" type="natural" dataKey="add" stroke="#00BFFF" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

          {
            (refAreaLeft && refAreaRight) ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
            }
        </LineChart>
      </div>
    );
  }
}



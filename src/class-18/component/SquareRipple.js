import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, BarChart, Bar
} from 'recharts';
import {
  AnnotationBracket, AnnotationXYThreshold
} from 'react-annotation'
import Fragment from 'lib/component/Fragment';
import WebOnly from 'lib/component/WebOnly';
import { faCoffee,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  numHarmonics: 20,
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

  constructor(props) {
    super(props);
    this.state = initialState;
    if (props.numHarmonics != undefined) {
      this.state.numHarmonics = props.numHarmonics;
    }
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

    const {
      isPdf
    } = this.props

    const data = buildData(0, 1, 0.5, 1, numHarmonics, 129)
    const harmData = buildHarmonicsData(numHarmonics)

    const width = 800
    const height = 350

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



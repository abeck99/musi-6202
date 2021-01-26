import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, Legend,
  ComposedChart, Area,
} from 'recharts';
import Fragment from 'lib/component/Fragment';
import { MathComponent } from 'mathjax-react'

const standardDev = (l) => {
  var mean = 0
  for (var i = 0; i < l.length; i++) {
    mean += l[i]
  }
  mean /= l.length
  var stdDevSquared = 0
  for (var i = 0; i < l.length; i++) {
    stdDevSquared += Math.pow(l[i] - mean, 2)
  }
  stdDevSquared /= l.length
  return {mean,
          stdev: Math.sqrt(stdDevSquared)
         }
}


const crossCorrelate = (r, l) => {
  const numPoints = l.length
  const halfPoints = numPoints/2
  var data = []
  for (var i = -numPoints; i <= numPoints; i++) {
    var total = 0;
    for (var j = 0; j < numPoints; j++) {
      const k = j+i
      if (k >= 0 && k < numPoints) {
        var lV = l[j]
        var rV = r[j+i]
        total += (lV * rV)
      }
    }
    data.push(total)
  }
  return data
}


const buildData = () => {
  const numPoints = 200

  var aNoise = []
  var bSine = []
  var cRectWin = []

  for (var i = 0; i < numPoints; i++) {
    aNoise[i] = (Math.random() * 2) - 1
    bSine[i] = Math.sin(Math.PI * 2 * (i/numPoints))
    cRectWin[i] = 1
  }
  cRectWin[0] = 0
  cRectWin[numPoints-1] = 0

  var a = []
  var b = []
  var c = []
  for (var i = 0; i < numPoints*2; i++) {
    a[i] = (Math.random() * 2) - 1
    b[i] = Math.sin(Math.PI * 2 * (i/(numPoints*2)))
    c[i] = 1
  }
  c[0] = 0
  c[(numPoints*2)-1] = 0
  

  var aa = crossCorrelate(aNoise, aNoise)
  var ab = crossCorrelate(aNoise, bSine)
  var ac = crossCorrelate(aNoise, cRectWin)
  var ba = crossCorrelate(bSine, aNoise)
  var bb = crossCorrelate(bSine, bSine)
  var bc = crossCorrelate(bSine, cRectWin)
  var ca = crossCorrelate(cRectWin, aNoise)
  var cb = crossCorrelate(cRectWin, bSine)
  var cc = crossCorrelate(cRectWin, cRectWin)
  
  var data = []
  for (var i = 0; i < (numPoints*2); i++) {
    data.push({name: i,
               a: a[i],
               b: b[i],
               c: c[i],
               aa: aa[i],
               ab: ab[i],
               ac: ac[i],
               ba: ba[i],
               bb: bb[i],
               bc: bc[i],
               ca: ca[i],
               cb: cb[i],
               cc: cc[i],
              })
  }

  return data
}

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: buildData()
    }
  }

  render() {
    const {
      data
    } = this.state;

    const top = 1
    const bottom = -1
    const left = 0
    const right = 100
    const width = 230
    const height = 150

    const corTop = 200
    const corBottom = -200
    const corLeft = 0
    const corRight = 200

    return (
      <div>
      <div className="row">
        <div className="col-25">
        </div>
        <div className="col-25">
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
            tick={false}
            width={0}
            height={0}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            tick={false}
            width={0}
            height={0}
          />
          <Line yAxisId="1" type="monotone" dataKey="c" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
          </LineChart>
        </div>
        <div className="col-25">
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
            tick={false}
            width={0}
            height={0}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            tick={false}
            width={0}
            height={0}
          />
          <Line yAxisId="1" type="monotone" dataKey="b" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
          </LineChart>
        </div>
        <div className="col-25">
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
            tick={false}
            width={0}
            height={0}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            tick={false}
            width={0}
            height={0}
          />
          <Line yAxisId="1" type="monotone" dataKey="a" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
          </LineChart>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
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
            tick={false}
            width={0}
            height={0}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            tick={false}
            width={0}
            height={0}
          />
          <Line yAxisId="1" type="monotone" dataKey="c" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
          </LineChart>
        </div>
        <div className="col-25 normal center">
        Rect Window x Rect Window
        </div>
        <div className="col-25 normal center">
        Rect Window x Windowed Sine
        </div>
        <div className="col-25 normal center">
        Rect Window x Noise
        </div>
      </div>
      <div className="row">
        <div className="col-25">
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
            tick={false}
            width={0}
            height={0}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            tick={false}
            width={0}
            height={0}
          />
          <Line yAxisId="1" type="monotone" dataKey="b" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
          </LineChart>
        </div>
        <div className="col-25 normal center">
        Windowed Sine x Rect Window
        </div>
        <div className="col-25 normal center">
        Windowed Sine x Windowed Sine
        </div>
        <div className="col-25 normal center">
        Windowed Sine x Noise
        </div>
        </div>
      <div className="row">
        <div className="col-25">
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
            tick={false}
            width={0}
            height={0}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            tick={false}
            width={0}
            height={0}
          />
          <Line yAxisId="1" type="monotone" dataKey="a" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />
          </LineChart>
        </div>
        <div className="col-25 normal center">
        Noise x Rect Window
        </div>
        <div className="col-25 normal center">
        Noise x Windowed Sine
        </div>
        <div className="col-25 normal center">
        Noise x Noise
        </div>
        </div>
      </div>
    );
  }
}



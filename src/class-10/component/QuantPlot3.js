import React, { PureComponent } from 'react';
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, Legend,
} from 'recharts';
import {
  AnnotationBracket, AnnotationXYThreshold
} from 'react-annotation'
import { MathComponent } from 'mathjax-react'

import quantErr02 from '../data/2hz-quant-err-04.csv'
import quantErr04 from '../data/2hz-quant-err-16.csv'
import quantErr08 from '../data/2hz-quant-err-256.csv'
import quantErr12 from '../data/2hz-quant-err-4096.csv'

import quantErrSpec02 from '../data/2hz-quant-err-spec-04.csv'
import quantErrSpec04 from '../data/2hz-quant-err-spec-16.csv'
import quantErrSpec08 from '../data/2hz-quant-err-spec-256.csv'
import quantErrSpec12 from '../data/2hz-quant-err-spec-4096.csv'

class YAxisLabelLeftA extends PureComponent {
  render() {
    const {viewBox: {width, height, x, y}} = this.props
    const transform = `translate(10px, ${Math.round(height/2)+30}px) rotate(-90deg)`
    return (
      <g>
        <foreignObject x={x} y={y} width={width} height={height} style={{transform}}>
          <div className="normal">
            <MathComponent tex={String.raw`q(i)`} display={false}/> @ 2
          </div>
        </foreignObject>
      </g>
    )
  }  
}

class YAxisLabelLeftB extends PureComponent {
  render() {
    const {viewBox: {width, height, x, y}} = this.props
    const transform = `translate(10px, ${Math.round(height/2)+30}px) rotate(-90deg)`
    return (
      <g>
        <foreignObject x={x} y={y} width={width} height={height} style={{transform}}>
          <div className="normal">
            <MathComponent tex={String.raw`q(i)`} display={false}/> @ 4
          </div>
        </foreignObject>
      </g>
    )
  }  
}

class YAxisLabelLeftC extends PureComponent {
  render() {
    const {viewBox: {width, height, x, y}} = this.props
    const transform = `translate(10px, ${Math.round(height/2)+30}px) rotate(-90deg)`
    return (
      <g>
        <foreignObject x={x} y={y} width={width} height={height} style={{transform}}>
          <div className="normal">
            <MathComponent tex={String.raw`q(i)`} display={false}/> @ 8
          </div>
        </foreignObject>
      </g>
    )
  }  
}

class YAxisLabelLeftD extends PureComponent {
  render() {
    const {viewBox: {width, height, x, y}} = this.props
    const transform = `translate(10px, ${Math.round(height/2)+30}px) rotate(-90deg)`
    return (
      <g>
        <foreignObject x={x} y={y} width={width} height={height} style={{transform}}>
          <div className="normal">
            <MathComponent tex={String.raw`q(i)`} display={false}/> @ 12
          </div>
        </foreignObject>
      </g>
    )
  }  
}

class YAxisLabelRight extends PureComponent {
  render() {
    const {viewBox: {width, height, x, y}} = this.props
    const transform = `translate(10px, ${Math.round(height/2)+60}px) rotate(-90deg)`
    return (
      <g>
        <foreignObject x={x} y={y} width={width*8} height={height} style={{transform}}>
          <div className="normal">
            <MathComponent tex={String.raw`|Q(f)| [\mathrm{dB}]`} display={false}/>
          </div>
        </foreignObject>
      </g>
    )
  }  
}



export default class Example extends PureComponent {
  constructor(props) {
    super(props);
  }
                                 
  render() {
    const {width, height} = this.props

    const halfWidth = width / 2
    const fourthHeight = height / 4

    const timeAmpTop = 0.25
    const timeAmpBot = -0.25

    const timeAmpWid = 80
    const timeAmpTicks = [-0.2, 0, 0.2]

    const freqDbTop = 0
    const freqDbBot = -90

    const freqDbWid = 40

    return (
      <div className="">
        <div className="row">
          <div className="col-50">
            <div className="highlight-bar-charts smallest" style={{ userSelect: 'none' }}>
              <LineChart
                width={halfWidth}
                height={fourthHeight}
                data={quantErr02}
              >
                <CartesianGrid strokeDasharray="3 3" />
        <XAxis
      height={0}
                  allowDataOverflow
                  dataKey="name"
                  domain={[0, 512]}
                  type="number"
      tick={false}
                />
                <YAxis
                  allowDataOverflow
                  domain={[timeAmpBot, timeAmpTop]}
                  width={timeAmpWid}
                  type="number"
                  yAxisId="1"
      tick= {false}
                  label={<YAxisLabelLeftA/>}
                />
                <Line yAxisId="1" type="step" dataKey="val" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

              </LineChart>
            </div>
          </div>
          <div className="col-50">
            <div className="highlight-bar-charts smallest" style={{ userSelect: 'none' }}>
              <LineChart
                width={halfWidth}
                height={fourthHeight}
                data={quantErrSpec02}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
      height={0}
                  allowDataOverflow
                  dataKey="name"
                  domain={[0, 256]}
                  type="number"
      tick={false}
                />
                <YAxis
      allowDataOverflow
      domain={[freqDbBot, freqDbTop]}
                  width={freqDbWid}
      tick={false}
                  type="number"
                  yAxisId="1"
                  label={<YAxisLabelRight/>}
                />
                <Line yAxisId="1" type="monotone" dataKey="val" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

              </LineChart>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-50">
            <div className="highlight-bar-charts smallest" style={{ userSelect: 'none' }}>
              <LineChart
                width={halfWidth}
                height={fourthHeight}
                data={quantErr04}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
      height={0}
                  allowDataOverflow
                  dataKey="name"
                  domain={[0, 512]}
                  type="number"
      tick={false}
                />
                <YAxis
                  allowDataOverflow
                  domain={[timeAmpBot, timeAmpTop]}
                  width={timeAmpWid}
      tick= {false}
                  type="number"
                  yAxisId="1"
                  label={<YAxisLabelLeftB/>}
                />
                <Line yAxisId="1" type="step" dataKey="val" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

              </LineChart>
            </div>
          </div>
          <div className="col-50">
            <div className="highlight-bar-charts smallest" style={{ userSelect: 'none' }}>
              <LineChart
                width={halfWidth}
                height={fourthHeight}
      data={quantErrSpec04}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
      height={0}
                  allowDataOverflow
                  dataKey="name"
                  domain={[0, 256]}
                  type="number"
      tick={false}
                />
                <YAxis
      allowDataOverflow
      domain={[freqDbBot, freqDbTop]}
                  width={freqDbWid}
      tick={false}
                  type="number"
                  yAxisId="1"
                  label={<YAxisLabelRight/>}
                />
                <Line yAxisId="1" type="monotone" dataKey="val" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

              </LineChart>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-50">
            <div className="highlight-bar-charts smallest" style={{ userSelect: 'none' }}>
              <LineChart
                width={halfWidth}
                height={fourthHeight}
                data={quantErr08}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
      height={0}
                  allowDataOverflow
                  dataKey="name"
                  domain={[0, 512]}
                  type="number"
      tick={false}
                />
                <YAxis
                  allowDataOverflow
                  domain={[timeAmpBot, timeAmpTop]}
                  width={timeAmpWid}
      tick= {false}
                  type="number"
                  yAxisId="1"
                  label={<YAxisLabelLeftC/>}
                />
                <Line yAxisId="1" type="step" dataKey="val" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

              </LineChart>
            </div>
          </div>
          <div className="col-50">
            <div className="highlight-bar-charts smallest" style={{ userSelect: 'none' }}>
              <LineChart
                width={halfWidth}
                height={fourthHeight}
                data={quantErrSpec08}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
      height={0}
                  allowDataOverflow
                  dataKey="name"
                  domain={[0, 256]}
                  type="number"
      tick={false}
                />
                <YAxis
      allowDataOverflow
      domain={[freqDbBot, freqDbTop]}
                  width={freqDbWid}
      tick={false}
                  type="number"
                  yAxisId="1"
                  label={<YAxisLabelRight/>}
                />
                <Line yAxisId="1" type="monotone" dataKey="val" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

              </LineChart>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-50">
            <div className="highlight-bar-charts smallest" style={{ userSelect: 'none' }}>
              <LineChart
                width={halfWidth}
                height={fourthHeight}
                data={quantErr12}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
      height={0}
                  allowDataOverflow
                  dataKey="name"
                  domain={[0, 512]}
                  type="number"
      tick={false}
                />
                <YAxis
                  allowDataOverflow
                  domain={[timeAmpBot, timeAmpTop]}
                  width={timeAmpWid}
      tick= {false}
                  type="number"
                  yAxisId="1"
                  label={<YAxisLabelLeftD/>}
                />
                <Line yAxisId="1" type="step" dataKey="val" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

              </LineChart>
            </div>
          </div>
          <div className="col-50">
            <div className="highlight-bar-charts smallest" style={{ userSelect: 'none' }}>
              <LineChart
                width={halfWidth}
                height={fourthHeight}
                data={quantErrSpec12}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
      height={0}
                  allowDataOverflow
                  dataKey="name"
                  domain={[0, 256]}
                  type="number"
      tick={false}
                />
                <YAxis
      allowDataOverflow
      domain={[freqDbBot, freqDbTop]}
                  width={freqDbWid}
      tick={false}
                  type="number"
                  yAxisId="1"
                  label={<YAxisLabelRight/>}
                />
                <Line yAxisId="1" type="monotone" dataKey="val" stroke="#fcf8e3" dot={<div/>} strokeWidth="3px" isAnimationActive={false} />

              </LineChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



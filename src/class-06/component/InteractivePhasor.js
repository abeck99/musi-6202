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

import PhasorAnim from './PhasorAnim'

const buildHarmonics = (numHarmonics) => {
  var data = [{amp: 1, freq: 1, color: "rgb(66, 44, 255)"}]
  if (numHarmonics >= 2) {
    data.push({amp: 1/3, freq: 3, color: "rgb(66, 255, 44)"})
  }
  if (numHarmonics >= 3) {
    data.push({amp: 1/5, freq: 5, color: "rgb(255, 66, 44)"})
  }
  if (numHarmonics >= 4) {
    data.push({amp: 1/7, freq: 7, color: "rgb(66, 255, 44)"})
  }
  if (numHarmonics >= 5) {
    data.push({amp: 1/9, freq: 9, color: "rgb(255, 44, 255)"})
  }
  if (numHarmonics >= 6) {
    data.push({amp: 1/11, freq: 11, color: "rgb(255, 255, 44)"})
  }
  if (numHarmonics >= 7) {
    data.push({amp: 1/13, freq: 13, color: "rgb(66, 255, 255)"})
  }
  if (numHarmonics >= 8) {
    data.push({amp: 1/15, freq: 15, color: "rgb(255, 255, 255)"})
  }
  if (numHarmonics >= 9) {
    data.push({amp: 1/17, freq: 17, color: "rgb(255, 44, 255)"})
  }
  if (numHarmonics >= 10) {
    data.push({amp: 1/19, freq: 19, color: "rgb(255, 255, 44)"})
  }
  if (numHarmonics >= 11) {
    data.push({amp: 1/21, freq: 21, color: "rgb(66, 255, 255)"})
  }
  if (numHarmonics >= 12) {
    data.push({amp: 1/23, freq: 23, color: "rgb(255, 255, 255)"})
  }
  if (numHarmonics >= 13) {
    data.push({amp: 1/25, freq: 25, color: "rgb(255, 44, 255)"})
  }
  if (numHarmonics >= 14) {
    data.push({amp: 1/27, freq: 27, color: "rgb(255, 255, 44)"})
  }
  if (numHarmonics >= 15) {
    data.push({amp: 1/29, freq: 29, color: "rgb(66, 255, 255)"})
  }
  if (numHarmonics >= 16) {
    data.push({amp: 1/31, freq: 31, color: "rgb(255, 255, 255)"})
  }
  if (numHarmonics >= 17) {
    data.push({amp: 1/33, freq: 33, color: "rgb(255, 44, 255)"})
  }
  if (numHarmonics >= 18) {
    data.push({amp: 1/35, freq: 35, color: "rgb(255, 255, 44)"})
  }
  if (numHarmonics >= 19) {
    data.push({amp: 1/37, freq: 37, color: "rgb(66, 255, 255)"})
  }
  if (numHarmonics >= 20) {
    data.push({amp: 1/39, freq: 39, color: "rgb(255, 255, 255)"})
  }

  return data
}

const initialState = {
  numHarmonics: 1,
};

export default class Example extends PureComponent {

  constructor(props) {
    super(props);
    this.state = initialState;
    if (props.numHarmonics != undefined) {
      this.state.numHarmonics = props.numHarmonics;
    }
  }


  clickDown = () => {
    this.setState({
      ...this.state,
      numHarmonics: Math.max(1, this.state.numHarmonics - 1)
    })
  }

  clickUp = () => {
    this.setState({
      ...this.state,
      numHarmonics: Math.min(20, this.state.numHarmonics + 1)
    })
  }

  render() {
    const {
      numHarmonics
    } = this.state;

    const {
      isPdf, width, height
    } = this.props

    const partials = buildHarmonics(numHarmonics)
    console.log(partials)

    return (
        <div>
        <div className="center">
        <h4>Num Harmonics</h4>
        <div className="row framed bordered" style={{"width": "400px"}}>
        <div className="col-12">
        <a onClick={this.clickDown}><i className="fas fa-arrow-left"/></a>
        </div>
        <div className="col-76">
        <div className="center">{numHarmonics}</div>
      </div>
        <div className="col-12">
        <div className="right">
        <a onClick={this.clickUp}><i className="fas fa-arrow-right"/></a>
        </div>
        </div>
        </div>
        </div>
        <PhasorAnim partials={partials} width={width} height={height}/>
        </div>
    );
  }
}



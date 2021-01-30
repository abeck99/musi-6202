import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';

const draw = (ctx, s, props) => {
  const partials = props.partials

  const width = ctx.canvas.width
  const height = ctx.canvas.height

  const midLine = width / 3 * 2
  const waveFormWidth = width - midLine
  

  const baseFreq = 0.125
  const baseRadiusSize = midLine / 6

  ctx.clearRect(0, 0, width, height);

  var curX = midLine / 2
  var curY = height / 2
  
  partials.forEach(partial => {
    const theta = s * Math.PI * 2 * partial.freq * baseFreq
    const x = Math.cos(theta) * partial.amp * baseRadiusSize
    const y = Math.sin(theta) * partial.amp * baseRadiusSize

    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = partial.color

    ctx.save()
    ctx.moveTo(curX + Math.abs(baseRadiusSize * partial.amp), curY)
    ctx.arc(curX, curY, Math.abs(baseRadiusSize * partial.amp), 0, 2*Math.PI)
    ctx.stroke();
    
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = partial.color

    ctx.moveTo(curX, curY)
    curX += x
    curY += y
    ctx.lineTo(curX, curY)

    ctx.restore()
    ctx.stroke();
  })

  ctx.beginPath()
  ctx.lineWidth = 2

  var grd = ctx.createLinearGradient(midLine, 0, width, 0);
  grd.addColorStop(0, "white");
  grd.addColorStop(1, "gray");

  ctx.strokeStyle = grd //"rgb(255, 255, 255)"

  ctx.moveTo(curX, curY)
  ctx.lineTo(midLine, curY)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(midLine, curY)
  for (var waveformInd = 0; waveformInd <= waveFormWidth; waveformInd++) {
    const dS = (waveformInd / waveFormWidth * 10)
    const waveformS = s - dS
    const x = waveformInd + midLine

    var val = 0
    partials.forEach(partial => {
      const theta = waveformS * Math.PI * 2 * partial.freq * baseFreq
      val += Math.sin(theta) * partial.amp * baseRadiusSize
    })

    const y = val + height / 2

    ctx.lineTo(x, y)
  }

  ctx.stroke()
}

export default class PhasorAnim extends Component {

  classAddedCallback = () => {
    alert("I'm triggered when the class is added")
  }

  classRemovedCallback = () => {
    alert("I'm triggered when the class is removed")
  }

  animate = () => {
    const canvas = this.canvasRef.current
    const context = canvas.getContext('2d')

    const curTime = new Date()
    const timeDiff = (curTime - this.state.startTime) / 1000

    this.state.frameCount++
    draw(context, timeDiff, this.props)
    this.state.animationFrameId = window.requestAnimationFrame(this.animate)
  }

  componentDidMount() {
    this.state.startTime = new Date()
    this.animate()
  }
  componentWillUnmount() {
      window.cancelAnimationFrame(this.state.animationFrameId)
  }

  constructor(props) {
    super(props)
    this.canvasRef = createRef()
    this.state = {
      animationFrameId: undefined,
      frameCount: 0
    }
  }

  init() {
    this.observer = new MutationObserver(this.mutationCallback)
    this.observe()
  }

  render(props) {
    const { dataId, width, height } = this.props;
    return <canvas data-id={dataId} ref={this.canvasRef} {...props} width={width} height={height}/>
  }
  
  mutationCallback = mutationsList => {
      console.log(mutationsList);
    for(let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        let currentClassState = mutation.target.classList.contains('present')
        console.log(currentClassState)
        if(this.lastClassState !== currentClassState) {
          this.lastClassState = currentClassState
          if(currentClassState) {
            this.classAddedCallback()
          }
          else {
            this.classRemovedCallback()
          }
        }
      }
    }
  }
}

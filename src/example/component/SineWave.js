import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';

const plotSine = (ctx, xOffset, yOffset, amplitude, frequency, quant) => {
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var scale = 10;

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgb(66,44,255)";

  // console.log("Drawing point...");
  // drawPoint(ctx, yOffset+step);
  
  var x = -10;
  var y = 0;
  //ctx.moveTo(x, y);
  ctx.moveTo(x, 50);
  while (x < width) {
    y = height/2 + amplitude * Math.sin((x+xOffset)/frequency);
    //x = Math.floor(x / quant) * quant
    y = Math.floor(y / quant) * quant
    ctx.lineTo(x, y);
    x++;
    // console.log("x="+x+" y="+y);
  }
  ctx.stroke();
}

const draw = (ctx, frameCount, props) => {
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  ctx.clearRect(0, 0, width, height);

  props.offsets.forEach(offset => {
    ctx.save();
    plotSine(ctx, frameCount + offset, 20, 40, 30, props.quant);
    ctx.restore();
  })
}

export default class SineWave extends Component {

  classAddedCallback = () => {
    alert("I'm triggered when the class is added")
  }

  classRemovedCallback = () => {
    alert("I'm triggered when the class is removed")
  }

  animate = () => {
    const canvas = this.canvasRef.current
    const context = canvas.getContext('2d')

    this.state.frameCount++
    draw(context, this.state.frameCount, this.animProps)
    this.state.animationFrameId = window.requestAnimationFrame(this.animate)
  }

  componentDidMount() {
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
    this.animProps = {
      quant: 0.1,
      offsets: [0],
      ...props,
    }
  }

  init() {
    this.observer = new MutationObserver(this.mutationCallback)
    this.observe()
  }

  render(props) {
    const { dataId } = this.props;
    return <canvas data-id={dataId} ref={this.canvasRef} {...props}/>
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

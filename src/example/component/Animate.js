import React, { Component } from 'react';
import Fragment from 'lib/component/Fragment';

const defaultProps = {
  images: [],
  animSpeed: 1,
  repeat: false,
}

const initialState = {
  showPlayPause: false,
  animIndex: 0,
  isPlaying: false,
}

export default class List extends Component {
  mouseIn = () => {
    this.setState({
      ...this.state,
      showPlayPause: true,
    })
  }

  mouseOut = () => {
    this.setState({
      ...this.state,
      showPlayPause: false,
    })
  }

  anim = () => {
    const props = {
      ...defaultProps,
      ...this.props,
    }

    if (this.state.animIndex >= props.images.length - 1) {
      if (props.repeat) {
        this.setState({
          ...this.state,
          animIndex: 0,
        })
      } else {
        this.stopAnim()
      }
    } else {
      const nextIndex = this.state.animIndex + 1
      this.setState({
        ...this.state,
        animIndex: nextIndex,
      })
    }
  }

  startAnim = () => {
    const props = {
      ...defaultProps,
      ...this.props,
    }

    clearInterval(this.timer)
    this.timer = setInterval(this.anim, props.animSpeed * 1000)
    var newAnimIndex = this.state.animIndex
    if (newAnimIndex >= props.images.length - 1) {
      newAnimIndex = 0
    }
    this.setState({
      ...this.state,
      animIndex: newAnimIndex,
      isPlaying: true,
    })
  }

  stopAnim = () => {
    clearInterval(this.timer)
    this.setState({
      ...this.state,
      isPlaying: false,
    })
  }

  pressPlayPause = () => {
    if (this.state.isPlaying) {
      this.stopAnim()
    } else {
      this.startAnim()
    }
  }
  
  constructor(props) {
    super(props)
    this.state = initialState
    this.timer = 0    
  }

  render() {
    const props = {
      ...defaultProps,
      ...this.props,
    }

    if (props.images.length == 0) {
      return (<div></div>)
    }

    if (this.state.showPlayPause) {
      return (
        <div style={{position: "relative"}}
             onMouseEnter={this.mouseIn}
             onMouseLeave={this.mouseOut}>
          <img style={{display: "block", margin: "auto", opacity: "0.75"}} src={props.images[this.state.animIndex]}/>
          {this.state.isPlaying
           ? (<a className="center" onClick={this.stopAnim} style={{opacity: "1", position: "absolute", zIndex: "1", top: "0", width: "100%"}}>
                <span style={{position: "absolute", zIndex: "2", left: "0", right: "0", top: "0", bottom: "0", margin: "auto"}}>
                  <i className="fas fa-pause"/>
                </span>
              </a>)
           : (<a className="center" onClick={this.startAnim} style={{opacity: "1", position: "absolute", zIndex: "1", top: "0", width: "100%"}}>
                <span style={{position: "absolute", zIndex: "2", left: "0", right: "0", top: "0", bottom: "0", margin: "auto"}}>
                  <i className="fas fa-play"/>
                </span>
              </a>)
          }
        </div>
      )
    } else {
      return (
        <div style={{position: "relative"}}>
          <img style={{display: "block", margin: "auto"}} src={props.images[this.state.animIndex]}
               onMouseEnter={this.mouseIn}
               onMouseLeave={this.mouseOut}/>
        </div>
      )
    }
  }
}

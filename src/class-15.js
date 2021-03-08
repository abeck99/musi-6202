import React, { Component } from 'react'
import Section from 'lib/component/Section'
import ReactAudioPlayer from 'react-audio-player'
import { Graphviz } from 'graphviz-react'
import ReactPlayer from 'react-player'

import Presentation from 'lib/template/Presentation'
import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment'

import Counter from './example/component/Counter'
import SineWave from './example/component/SineWave'
import Table from './example/component/Table'
import MultiTable from './example/component/MultiTable'
import List from './example/component/List'
import Schedule from './example/component/Schedule'
import MyPieChart from './example/component/MyPieChart'
import Plot from './example/component/Plot'
import Animate from './example/component/Animate'

import bqVid from './class-15/img/BqPZ.mp4'

import image00 from './class-15/img/image00.png'
import image01 from './class-15/img/image01.png'
import image02 from './class-15/img/image02.png'
import image03 from './class-15/img/image03.png'
import image04 from './class-15/img/image04.png'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 15: Digital Filters II</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      <p>Pretty condensed, not covering a lot of filter design</p>
      <p>First part from user perspective, different parameters, meanings, definition</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Z-Transform: Introduction</h4>
      <div>The z-transform is</div>
      <List>
      <div>A generalization of DFT,</div>
      <div>Widely used in DSP as analysis,</div>
      <div>A useful tools to describe systems,</div>
      <div>The discrete-time counterpart of the Laplace transform</div>
      </List>
        <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Z-Transform Definition</h4>
      <MathComponent tex={String.raw`X(z) = \sum\limits_{i=-\infty}^{\infty}{x(i)z^{-i}},\quad z\in \mathfrak{C}`}/>
      <List fragment="all">
      <div><MathComponent tex={String.raw`X(z)`} display={false}/>: complex function of a complex number</div>
      <div>Compare Fourier transform <MathComponent tex={String.raw`X(\mathrm{j}\omega)`} display={false}/>: complex function of real-valued <MathComponent tex={String.raw`\omega`} display={false}/></div>
      </List>
      <Fragment>
      <MathComponent tex={String.raw`X(\mathrm{j}\omega) = \sum\limits_{i=-\infty}^{\infty}{x(i)e^{-\mathrm{j}\omega i}}
            \Rightarrow X(\mathrm{j}\omega) = X(z) \text{ at }z=e^{\mathrm{j}\omega}`}/>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Z-plane</h4>
      <img src={image00}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <div className="row">
      <div className="col-60">
      <List fragment={true}>
      <div><MathComponent tex={String.raw`X(z)`} display={false}/> defined on complex plane</div>
      <div><MathComponent tex={String.raw`X(\mathrm{j}\omega)`} display={false}/> defined on unit circle</div>
      <div>Observation: <MathComponent tex={String.raw`X(\mathrm{j}\omega)`} display={false}/> is periodic with <MathComponent tex={String.raw`2\pi`} display={false}/></div>
      </List>
      </div>
      <div className="col-40">
      <img src={image00}/>
      </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Trivial Examples</h4>
      <img src={image01} style={{width:"80%"}}/>
      <div><b>What is the magnitude for <MathComponent tex={String.raw`X(z) = \frac{1}{(z - 0.5)}`} display={false}/></b></div>
      <Fragment><div className="center">Same as <MathComponent tex={String.raw`\frac{1}{z}`} display={false}/> but shifted</div></Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>System Description</h4>
      <div>Fourier transform and z-transform have largely similar properties, most importantly</div>
      <List>
      <div><b>Linearity</b><MathComponent tex={String.raw`\eqalign{y(i) = c_1 x_1(i) + c_2 x_2(i) &\Rightarrow& Y(\mathrm{j}\omega) = c_1 X_1(\mathrm{j}\omega) + c_2 X_2(\mathrm{j}\omega)\\
                     &\Rightarrow& Y(z) = c_1 X_1(z) + c_2 X_2(z)}`}/></div>
      <div><b>Time Shift</b><MathComponent tex={String.raw`\eqalign{y(i) = x(i-n) &\Rightarrow& Y(\mathrm{j}\omega) = e^{-\mathrm{j}\omega n} X(\mathrm{j}\omega) \\
                     &\Rightarrow& Y(z) =  z^{-n} X(z)}`}/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Biquad: Difference Equation</h4>
      <img src={image02} style={{width:"100%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Biquad: Difference Equation</h4>
      <div className="row">
      <div className="col-30">
      <img src={image02} style={{width:"100%"}}/>
      </div>
      <div className="col-70">
      <div className="normal">
      <div style={{position: "relative", left:"0px"}}>
        <MathComponent tex={String.raw`y(i) = \sum\limits_{j=0}^{2}{b_j x(i-j)} - \sum\limits_{k=1}^{2}{a_j y(i-j)}\nonumber`}/>
      </div>
      <Fragment>
      <div style={{position: "relative", left:"0px"}}>
        <MathComponent tex={String.raw`Y(z) = \sum\limits_{j=0}^{2}{b_j X(z) z^{-j}} - \sum\limits_{k=1}^{2}{a_j Y(z) z^{-j}}\nonumber`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left:"-267px"}}>
        <MathComponent tex={String.raw`Y(z)\left(1+\sum\limits_{j=1}^{2}{a_j z^{-j}}\right) = X(z) \sum\limits_{j=0}^{2}{b_j z^{-j}}\nonumber`}/>
      </div>
      </Fragment>
      </div>
      </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Biquad: Transfer Function</h4>
      <div className="normal">
      <div style={{position: "relative", left:"-105px"}}>
        <MathComponent tex={String.raw`H(z) = \frac{Y(z)}{X(z)}\nonumber`}/>
      </div>
      <Fragment>
      <div style={{position: "relative", left:"0px"}}>
        <MathComponent tex={String.raw`= \frac{\sum\limits_{j=0}^{2}{b_j z^{-j}}}{1+\sum\limits_{j=1}^{2}{a_j z^{-j}}}\nonumber`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left:"95px"}}>
        <MathComponent tex={String.raw`\eqalign{&=& \frac{b_0 + b_1\cdot z^{-1} + b_2\cdot z^{-2}}{1 + a_1\cdot z^{-1} + a_2\cdot z^{-2}}\nonumber\\
					 &=&\frac{\text{numerator polynomial}}{\text{denominator polynomial}}\nonumber}`}/>
      </div>
      </Fragment>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Biquad: Poles and Zeroes</h4>
      <List>
      <div>Numerator <i className="fas fa-long-arrow-alt-right"/> 0: Zero</div>
      <div>Denominator <i className="fas fa-long-arrow-alt-right"/> 0: Pole</div>
      </List>
      <Fragment>
      <div style={{position: "relative", left: "-200px"}}>
      <MathComponent tex={String.raw`1 + a_1\cdot z^{-1} + a_2\cdot z^{-2} = 0\nonumber`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left: "65px"}}>
      <MathComponent tex={String.raw`\Longrightarrow z_{\infty1,2} = \frac{a_1}{2} \pm \frac{1}{2}\sqrt{a_1^2-4a_2}`}/>
      </div>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Biquad: Z-Plane Example</h4>
      <img src={image03} style={{width: "80%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Biquad: Z-Plane Example</h4>
      <img src={image04} style={{width: "80%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
        <h4>Animation</h4>
        <ReactPlayer url={bqVid} muted={true} controls={true} width="100%" height="100%"/>
        <aside className="notes">
          <p>Closer the pole to unit circle, higher the gain</p>
          <p>Closer the zero to unit circle, tighter the bandwidth</p>
          <p>Order of filter, number of poles</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Filters: Z-Plane Characteristics</h4>
      <List fragment={true}>
      <div><div><b>Stability:</b></div><div>Poles within unit circle</div></div>
      <div><div><b>Zero points and poles:</b></div><div>Are either real or complex conjugate</div></div>
      <div><div><b>Minimal phase systems:</b></div><div>No zero points outside of unit circle</div></div>
      <div><div><b>All pass system:</b></div><div>Poles and zeroes symmetric wrt unit circle</div></div>
      <div><div><b>Linear phase:</b></div><div>Zero points within and outside unit circle symmetric wrt unit circle</div></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Filters: Filter Design</h4>
      <List>
      <div><b>Impulse invariance</b>: sample impulse response
      <div className="small"><List>
      <div>If continuous system is band-limited, frequency response will be approximately equal (below <MathComponent tex={String.raw`f_S / 2`} display={false}/>)</div>
      <div>Special case: No filter definition available <i className="fas fa-long-arrow-alt-right"/> FIR coefficients</div>
      </List></div></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

import React, { Component } from 'react';
import Section from 'lib/component/Section';

import Presentation from 'lib/template/Presentation';

import Counter from './example/component/Counter';
import SineWave from './example/component/SineWave';
import Table from './example/component/Table';
import List from './example/component/List';
import Schedule from './example/component/Schedule';
import MyPieChart from './example/component/MyPieChart';
import Plot from './example/component/Plot';

import image00 from './class-05/img/image00.jpg';
import image01 from './class-05/img/image01.jpg';
import image02 from './class-05/img/image02.jpg';

import video00 from './class-05/img/video00.mp4';

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment';



const jsName = document.getElementById('reveal').attributes.jsName.value;
const isPdf = jsName.endsWith("-pdf")

const slides = [
    () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 5: LTI Systems & Convolution</div>
        </div>
        <br/>
        <div className="center">Andrew Beck</div>
         <aside className="notes">
         </aside>
      </Section>
    ), () => (
        <Section>
        <h3>Systems</h3>
        <List icon="fa-angle-double-right" overrides={{}}>
        <div>Any process producing an output signal in response to an input signal</div>
        </List>
        <img src={image00} style={{width:"75%"}}/>
        <br/>
        <Fragment><h4>Examples of systems in signal processing</h4></Fragment>
        <div className="smaller">
        <List icon="fa-angle-double-right" overrides={{}} fragment="all">
        <div>Filters, Effects</div>
        <div>Vocal Tract</div>
        <div>Room</div>
        <div>Audio cable</div>
        <div>...</div>
        </List>
        </div>
        </Section>
    ), () => (
        <Section>
        <h3>Linearity & Non-Linearity</h3>
        <div className="row">
        <div className="col-70">
        <h4>Examples for (mostly) linear systems</h4>
        <div className="normal">
        <List icon="fa-angle-double-right" overrides={{}} fragment="all">
        <div>Room</div>
        <div>EQ</div>
        <div>Echo</div>
        <div>Envelope</div>
        </List>
        </div>
        </div>
        <div className="col-30">
        <img src={image01} style={{width:"100%"}}/>
        </div>
        </div>
        <Fragment>
        <div className="row">
        <div className="col-70">
        <h4>Examples for non-linear systems</h4>
        <div className="normal">
        <List icon="fa-angle-double-right" overrides={{}} fragment={true}>
        <div>Diode</div>
        <div>Vacuum Tube</div>
        <div>Optical Compressor</div>
        <div>Distortion</div>
        </List>
        </div>
        </div>
        <div className="col-30">
        <img src={image02} style={{width:"100%"}}/>
        </div>
        </div>
        </Fragment>
        </Section>
    ), () => (
        <Section>
        <h3>Properties of Linear Systems</h3>
        <br/>
        <ol>
        <li>
        <div className="row">
        <div className="col-50">
        <b>Homogeneity</b>
        </div>
        <div className="col-50">
        <MathComponent tex={String.raw`f(ax) = a f(x)`}/>
        </div>
        </div>
        </li>
        <li>
        <div className="row">
        <div className="col-50">
        <b>Superposition</b> (additivity)
        </div>
        <div className="col-50">
        <MathComponent tex={String.raw`f(x+y) = f(x) + f(y)`}/>
        </div>
        </div>
        </li>
        </ol>
        </Section>
    ), () => (
        <Section>
        <h3>Properties of Time Invariant Systems</h3>
        <br/>
        Systems do not change with time
        <MathComponent tex={String.raw`f\left(x(t-\tau)\right) = f(x)(t-\tau)`}/>
        </Section>
    ), () => (
        <Section>
        <h3>LTI: Linear Time-Invariant Systems</h3>
        <div className="left">Systems with these constraints are a great simplification for many real-world systems we would like to model:</div>
        <br/>
        <div className="normal">
        <List icon="fa-angle-double-right" overrides={{}}>
        <div>Circuits</div>
        <div>Spring-Mass-Damper</div>
        <div>Reverbs</div>
        <div>Resonance</div>
        <div>etc...</div>
        </List>
        </div>
      
        </Section>
    ), () => (
        <Section>
        <h3>LTI System Example</h3>
        <ol>
        <li>Hammer gives <i>impulse</i></li>
        <li>System <i>responds</i> with velocity</li>
        </ol>
        <br/><br/>
        <Fragment>
        <div className="left framed bordered">
        <p><b>Linearity:</b></p>
        <p>Double force, double velocity, multiple strikes add up</p>
        <p><b>Time Invariance:</b></p>
        <p>System reacts the same whether I do it now or tomorrow</p>
        </div>
        </Fragment>
        </Section>
    ), () => (
        <Section>
        <h3>Other LTI system characteristics</h3>
        <br/>
        <List icon="fa-angle-double-right" overrides={{}}>
        <div><p><b>Causality:</b></p>Output depends only on past and present input</div>
        <div><p><b>BIBO Stability:</b></p>Output is bounded for bounded input</div>
        </List>
        </Section>
    ), () => (
        <Section>
        <h3>Convolution</h3>
        <div className="small"><p><i>It's easy to visualize how a system reacts to an impulse, but what about a more complex input signal?'</i></p></div>
        <div className="normal">
        <List icon="fa-angle-double-right" overrides={{}} fragment="all">
        <div>Assume that the signal is constructed from many densely packed impulses (impulse train)</div>
        <div>Output is then a superposition of all individual responses</div>
        <div>For discrete systems this is literal, use integration</div>
        </List>
        </div>
        <Fragment>
        <br/><b>Convolution:</b>
        <MathComponent tex={String.raw`y(t) = (x \ast h)(t) := \int\limits_{-\infty}^{\infty}x(\tau)h(t-\tau)d\tau`}/>
        </Fragment>
        </Section>
    ), () => (
        <Section>
        <MathComponent tex={String.raw`y(t) = (x \ast h)(t) := \int\limits_{-\infty}^{\infty}x(\tau)h(t-\tau)d\tau`}/>
        <h3>Steps</h3>
        <ol>
        <li>Flip one signal</li>
        <li>Multiply the two signals</li>
        <li>Integrate the result</li>
        <li>Shift</li>
        <li>Go to step 2</li>
        </ol>
        </Section>
    ), () => (
        <Section>
        <h3>Convolution Example</h3>
        <div className="normal">
        <div className="row">
        <div className="col-50">
        <div className="row">
        <div className="col-10">
        <div className="left heading"><MathComponent tex={String.raw`x`} display={false}/></div>
        </div>
        <div className="col-90">
        <div className="monospace">
-1,&nbsp; 0,&nbsp; 1
      </div>
        </div>
        </div>
        </div>
        <div className="col-50">
        <div className="row">
        <div className="col-10">
        <div className="left heading"><MathComponent tex={String.raw`h`} display={false}/></div>
        </div>
        <div className="col-90">
        <div className="monospace">
&nbsp;1,&nbsp; 1,&nbsp; 1
      </div>
        </div>
        </div>
        </div>
        </div>
        <br/>
        <div className="left">
        <div className="heading"><MathComponent tex={String.raw`x \ast h`} display={false}/>:</div>

      <Fragment>
        <div className="row">
        <div className="col-10">
        0
        </div>
        <div className="col-80">
        <MathComponent tex={String.raw`x(-2) * h(0) + x(-1) * h(1) + x(0) * h(2) = -1`} display={false}/>
        </div>
        </div>
        </Fragment>

        <Fragment>
        <div className="row">
        <div className="col-10">
        1
        </div>
        <div className="col-80">
        <MathComponent tex={String.raw`x(-1) * h(0) + x(0) * h(1) + x(1) * h(2) = -1`} display={false}/>
        </div>
        </div>
        </Fragment>

        <Fragment>
        <div className="row">
        <div className="col-10">
        2
        </div>
        <div className="col-80">
        <MathComponent tex={String.raw`x(0) * h(0) + x(1) * h(1) + x(2) * h(2) = 0`} display={false}/>
        </div>
        </div>
        </Fragment>

        <Fragment>
        <div className="row">
        <div className="col-10">
        3
        </div>
        <div className="col-80">
        <MathComponent tex={String.raw`x(1) * h(0) + x(2) * h(1) + x(3) * h(2) = 1`} display={false}/>
        </div>
        </div>
        </Fragment> 

        <Fragment>
        <div className="row">
        <div className="col-10">
        4
        </div>
        <div className="col-80">
        <MathComponent tex={String.raw`x(2) * h(0) + x(3) * h(1) + x(4) * h(2) = 1`} display={false}/>
        </div>
        </div>
        </Fragment>
      
      <Fragment>
        <div className="row">
        <div className="col-10">
        </div>
        <div className="col-20">
        <MathComponent tex={String.raw`x \ast h`} display={false}/>
        </div>
        <div className="col-70">
        <div className="monospace">
        -1, -1,&nbsp;&nbsp;0,&nbsp;&nbsp;1,&nbsp;&nbsp;1
      </div>
        </div>
        </div>
        </Fragment>

        </div>
        </div>
        </Section>
    ), {target: 'html', slide: () => (
        <Section>
        <h3>Convolution Animation</h3>
        <video width="640" height="480" controls>
        <source src={video00} type="video/mp4"/>
        </video>
        <aside className="notes">
        <p>Example by integrating the area</p>
        <ol>
        <li>Flip one signal</li>
        <li>Multiply the two signals</li>
        <li>Integrate the result</li>
        <li>Shift</li>
        <li>Go to 2</li>
        </ol>
        </aside>
        </Section>
    )}, {target: 'pdf', slide: () => (
        <Section>
        <h3>Convolution Animation</h3>
        <br/>
        <a href="https://mediaspace.gatech.edu/media/t/1_xr9ei6rt">Click here for convolution animation example</a>
        </Section>
    )}, () => (
        <Section>
        <h3>Convolution as Echo</h3>
        <br/>
        <h3>Steps</h3>
        <ol>
        <li>Scale</li>
        <li>Delay</li>
        <li>Sum</li>
        <li>Repeat</li>
        </ol>
        </Section>
    ), () => (
        <Section>
        <h3>Convolution as Echo Example</h3>
        <div className="normal">
        <div className="row">
        <div className="col-50">
        <div className="row">
        <div className="col-10">
        <div className="left heading"><MathComponent tex={String.raw`x`} display={false}/></div>
        </div>
        <div className="col-90">
        <div className="monospace">
-1,&nbsp; 0,&nbsp; 1
      </div>
        </div>
        </div>
        </div>
        <div className="col-50">
        <div className="row">
        <div className="col-10">
        <div className="left heading"><MathComponent tex={String.raw`h`} display={false}/></div>
        </div>
        <div className="col-90">
        <div className="monospace">
&nbsp;1,&nbsp; 1,&nbsp; 1
      </div>
        </div>
        </div>
        </div>
        </div>
        <br/>
        <div className="left">
        <div className="heading"><MathComponent tex={String.raw`x \ast h`} display={false}/>:</div>

      <Fragment>
        <div className="row">
        <div className="col-10">
        </div>
        <div className="col-20">
        <MathComponent tex={String.raw`x(0)`} display={false}/>
        </div>
        <div className="col-70">
        <div className="monospace">
        -1, -1, -1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
        </div>
        </div>
        </Fragment>

      <Fragment>
        <div className="row">
        <div className="col-10">
        </div>
        <div className="col-20">
        <MathComponent tex={String.raw`x(1)`} display={false}/>
        </div>
        <div className="col-70">
        <div className="monospace">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,&nbsp;&nbsp;0,&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
        </div>
        </div>
        </Fragment>

      <Fragment>
        <div className="row">
        <div className="col-10">
        </div>
        <div className="col-20">
        <MathComponent tex={String.raw`x(2)`} display={false}/>
        </div>
        <div className="col-70">
        <div className="monospace">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1,&nbsp;&nbsp;1,&nbsp;&nbsp;1
      </div>
        </div>
        </div>
        <br/>
        </Fragment>

      <Fragment>
        <div className="row">
        <div className="col-10">
        </div>
        <div className="col-20">
        <MathComponent tex={String.raw`x \ast h`} display={false}/>
        </div>
        <div className="col-70">
        <div className="monospace">
        -1, -1,&nbsp;&nbsp;0,&nbsp;&nbsp;1,&nbsp;&nbsp;1
      </div>
        </div>
        </div>
        </Fragment>

        </div>
        </div>
        </Section>
    ), () => (
        <Section>
        <h3>Identity and Impulse Response</h3>
        <MathComponent tex={String.raw`x(t) = \delta(t)\ast x(t)`}/>
        <MathComponent tex={String.raw`h(t) = \delta(t)\ast h(t)`}/>
        <List icon="fa-angle-double-right" overrides={{}} fragment={true}>
        <div>Describes the response of a system to an impulse as a function of time</div>
        <div>As an impulse includes all frequency, the resulting IR defines the response for all frequencies</div>
        <div>The convolution of <MathComponent tex={String.raw`\delta(t)`} display={false}/> with a signal/impulse response results in that impulse response</div>
        </List>
        </Section>
    ), () => (
        <Section>
        <div className="smaller"><MathComponent tex={String.raw`y(t) = x(t) \ast h(t) = \int\limits_{-\infty}^{\infty}{h(\tau)\cdot x(t-\tau)} d\tau`}/></div>
        <h4>Convolution - Properties</h4>
        <List icon="fa-angle-double-right" overrides={{}} fragment={true}>
        <div><div className="row"><div className="col-30"><b>Commutativity</b></div><div className="col-70"><MathComponent tex={String.raw`h(t) \ast x(t)	= x(t) \ast h(t)`}/></div></div></div>
        <div><div className="row"><div className="col-30"><b>Associativity</b></div><div className="col-70"><MathComponent tex={String.raw`\big(g(t) \ast h(t)\big) \ast x(t) = g(t) \ast \big(h(t) \ast x(t)\big)`}/></div></div></div>
        <div><div className="row"><div className="col-30"><b>Distributivity</b></div><div className="col-75"><MathComponent tex={String.raw`g(t) \ast \big(h(t) + x(t)\big) = \big(g(t) \ast h(t)\big) + \big(g(t) \ast x(t)\big)`}/></div></div></div>
        </List>
        </Section>
    ), () => (
        <Section>
        <h3>Derivation: Commutativity</h3>
        <div className="small"><MathComponent tex={String.raw`h(t) \ast x(t)	= x(t) \ast h(t)`}/></div>
        <div className="left small">Substituting <MathComponent tex={String.raw`\tau'=t-\tau`} display={false}/></div>
        <div className="small">
        <div style={{position: "relative", top: "0px"}}>
        <MathComponent tex={String.raw`x(t) \ast h(t) = \int\limits_{-\infty}^{\infty}{h(\tau)\cdot x(t-\tau)} d\tau\nonumber`}/>
        </div>
        <Fragment>
        <div className="row" style={{padding: "0px", margin: "0px", top: "-30px", position: "relative"}}>
        <div className="col-24">
        </div>
        <div className="col-76">
        <MathComponent tex={String.raw`= \int\limits_{-\infty}^{\infty}{h(t-\tau')\cdot x(\tau')}d(t-\tau')`}/>
        </div>
        </div>
        </Fragment>
        <Fragment>
        <div className="row" style={{padding: "0px", margin: "0px", top: "-60px", position: "relative"}}>
        <div className="col-18">
        </div>
        <div className="col-82">
        <MathComponent tex={String.raw`= \int\limits_{-\infty}^{\infty}{x(\tau')\cdot h(t-\tau')}d\tau'`}/>
        </div>
        </div>
        </Fragment>
        <Fragment>
        <div className="row" style={{padding: "0px", margin: "0px", top: "-90px", position: "relative"}}>
        <div className="col-2">
        </div>
        <div className="col-98">
        <MathComponent tex={String.raw`= h(t) \ast x(t)`}/>
        </div>
        </div>
        </Fragment>
        </div>
        </Section>
    ), () => (
        <Section>
        <h3>Derivation: Associativity</h3>
          <div className="smaller"><MathComponent tex={String.raw`\big(g(t) \ast h(t)\big) \ast x(t) = g(t) \ast \big(h(t) \ast x(t)\big)`}/></div>
          <div className="row">
          <div className="col-20">
        <div className="smaller">Changing the order of sums and shifting the operands as shown</div>
        </div>
        <div className="smaller col-80">
        <div style={{position: "relative", top: "-30px"}}>
        <MathComponent tex={String.raw`\big(g(t) \ast h(t)\big) \ast x(t) = \int\limits_{\tau=-\infty}^{\infty}{\big(g(\tau) \ast h(\tau)\big)\cdot x(t-\tau)}d\tau`}/>
        </div>

        <Fragment>
        <div className="row"style={{position: "relative", top: "-75px", left:"23px"}}>
        <div className="col-28">
        </div>
        <div className="col-72">
        <MathComponent tex={String.raw`= \int\limits_{-\infty}^{\infty}{\int\limits_{-\infty}^{\infty}{g(\xi)\cdot h(\tau-\xi)}\cdot x(t-\tau)}d\tau d\xi`}/>
        </div>
        </div>
        </Fragment>

        <Fragment>
        <div className="row" style={{position: "relative", top: "-120px", left:"23px"}}>
        <div className="col-28">
        </div>
        <div className="col-72">
        <MathComponent tex={String.raw`= \int\limits_{-\infty}^{\infty}{g(\xi)\cdot \int\limits_{-\infty}^{\infty}{h(\tau-\xi)}\cdot x(t-\tau)}d\tau d\xi`}/>
        </div>
        </div>
        </Fragment>

        <Fragment>
        <div className="row" style={{position: "relative", top: "-155px", left:"27px"}}>
        <div className="col-30">
        </div>
        <div className="col-70">
        <MathComponent tex={String.raw`= \int\limits_{-\infty}^{\infty}{g(\xi)\cdot \int\limits_{-\infty}^{\infty}{h(\tau')}\cdot x(t-\xi-\tau')d\tau' d\xi}`}/>
        </div>
        </div>
        </Fragment>

        <Fragment>
        <div className="row" style={{position: "relative", top: "-200px", left:"21px"}}>
        <div className="col-23">
        </div>
        <div className="col-77">
        <MathComponent tex={String.raw`= \int\limits_{-\infty}^{\infty}{g(\xi)\cdot  \big(h(t-\xi) \ast x(t-\xi)\big)} d\xi`}/>
        </div>
        </div>
        </Fragment>

        <Fragment>
        <div className="row" style={{position: "relative", top: "-245px", left:"-20px"}}>
        <div className="col-15">
        </div>
        <div className="col-85">
        <MathComponent tex={String.raw`= g(t) \ast \big(h(t) \ast x(t)\big)`}/>
        </div>
        </div>
        </Fragment>

        </div>
        </div>
        
        </Section>
    ), () => (
        <Section>
        <h3>Derivation: Distributivity</h3>
        <div className="small"><MathComponent tex={String.raw`g(t) \ast \big(h(t) + x(t)\big) = g(t) \ast h(t) + g(t) \ast x(t)`}/></div>
        <div className="small">
        <div style={{position: "relative", top: "0px"}}>
        <MathComponent tex={String.raw`g(t) \ast \big(h(t) + x(t)\big) = \int\limits_{-\infty}^{\infty}{g(\tau) \cdot\big(h(t-\tau) + x(t-\tau)\big)}d\tau`}/>
        </div>
        <Fragment>
        <div className="row" style={{padding: "0px", margin: "0px", top: "0px", position: "relative"}}>
        <div className="col-30">
        </div>
        <div className="col-70">
        <MathComponent tex={String.raw`= \int\limits_{-\infty}^{\infty}{g(\tau) \cdot h(t-\tau) + g(\tau) \cdot x(t-\tau)}d\tau`}/>
        </div>
        </div>
        </Fragment>
        <Fragment>
        <div className="row" style={{padding: "0px", margin: "0px", top: "-0px", position: "relative"}}>
        <div className="col-38">
        </div>
        <div className="col-62">
        <MathComponent tex={String.raw`= \int\limits_{-\infty}^{\infty}{g(\tau) \cdot h(t-\tau)}d\tau + \int\limits_{-\infty}^{\infty}{g(\tau) \cdot x(t-\tau)}d\tau`}/>
        </div>
        </div>
        </Fragment>
        <Fragment>
        <div className="row" style={{padding: "0px", margin: "0px", top: "-0px", position: "relative"}}>
        <div className="col-12">
        </div>
        <div className="col-88">
        <MathComponent tex={String.raw`= g(t) \ast h(t) + g(t) \ast x(t)`}/>
        </div> 
        </div>
        </Fragment>
        </div>
        </Section>
    ), () => (
        <Section>
        <h3>Importance of convolution for audio DSP</h3>
        <List icon="fa-angle-double-right" overrides={{}}>
        <div>Ability to model LTI systems</div>
        <div>Used both as a runtime technique and mathematical tool</div>
        </List>
        <Fragment>
        <h4>Uses</h4>
        <List icon="fa-angle-double-right" overrides={{}} fragment={true}>
        <div>FIR Filters</div>
        <div>Reverbs</div>
        <div>Windowing effects</div>
        <div>Modeling analog systems</div>
        </List>
        </Fragment>
        <aside className="notes">
        <p>Talk about recording IR from impulses</p>
        <p>Talk about using sine sweep instead of impulse</p>
        <p>Using real impulse more likely to trigger non-linearities due to volume</p>
        <p>Clarity of IR based on volume (noise floors/etc)</p>
        <p>Using sine sweep and deconvolving the response using input sine sweep gives cleaner result</p>
        <p>Deconvolution can also model results of system (mic, speakers/etc)</p>
        </aside>
        </Section>
    ), () => (
        <Section>
        <h3>Summary - LTI</h3>
        <List icon="fa-angle-double-right" overrides={{}} fragment={true}>
        <div>Many real-world systems can be approximated by an <b>LTI system</b></div>
        <div>Properties of an LTI system:
        <ol>
        <li>Linearity 1: Homogeneity (Scaling)</li>
        <li>Linearity 2: Superposition (additivity)</li>
        <li>Time Invariance (system doesn't change')</li>
        </ol>
        </div>
        <div>Additional Properties
        <ol>
        <li>Causality (no future input)</li>
        <li>BIBO - Bounded input bounded output</li>
        </ol>
        </div>
        <div>Impulse response is a <b>complete</b> description of an LTI system</div>
        </List>
        </Section>
    ), () => (
        <Section>
        <h3>Summary - Convolution</h3>
        <br/>
        <div className="left">Convolution:</div>
        <List icon="fa-angle-double-right" overrides={{}} fragment={true}>
        <div>Describes the process of generating the output of an LTI system from the input</div>
        <div>Is commutative</div>
        <div>Is associative</div>
        <div>Is distributive</div>
        </List>
        </Section>
    )
  ]

Presentation(slides, module.id)

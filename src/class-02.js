import React, { Component } from 'react';
import Section from 'lib/component/Section';

import Counter from './example/component/Counter';
import SineWave from './example/component/SineWave';
import Table from './example/component/Table';
import Schedule from './example/component/Schedule';
import MyPieChart from './example/component/MyPieChart';
import SineLineChart from './class-02/component/SineLineChart';
import SawToothBuild from './class-02/component/SawToothBuild';
import SquareBuild from './class-02/component/SquareBuild';
import BeatingChart from './class-02/component/BeatingChart';

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment';

import image00 from './content/imgs/class-02/WaveInMedium.gif';
import image01 from './content/imgs/class-02/WaveInMediumVsSignal.gif';
import image02 from './content/imgs/class-02/image02.gif';
import image03 from './content/imgs/class-02/image03.gif';
import image04 from './content/imgs/class-02/image04.gif';
import image05 from './content/imgs/class-02/image05.gif';
import image06 from './content/imgs/class-02/image06.gif';
import image07 from './content/imgs/class-02/image07.gif';
import image08 from './content/imgs/class-02/image08.png';
import image09 from './content/imgs/class-02/image09.jpg';
import image10 from './content/imgs/class-02/image10.jpg';



export default function Class02(isPdf) {
  return [
    () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 2: Signals</div>
        </div>
        <br/>
        <div className="center">Andrew Beck</div>
      </Section>
    ), () => (
      <Section>
        <h3 className="center">Sound is a vibration <b>propagating through a medium.</b></h3>
        <img src={image00}/>
      </Section>
    ), () => (
        <Section>
        <h4 className="center">The <i>audio signal</i> is a measure of the compression of the medium at a given point</h4>
        <img style={{width: "70%"}} src={image01}/>
        </Section>
    ), () => (
        <Section>
        <h3 className="center">Vibration in medium is caused by an objects motion</h3>
        <img src={image02}/>
        </Section>
    ), () => (
        <Section>
        <h4 className="center">Objects vibrate in many different modes simultanously</h4>
        <Table leftSize="50">
        <div><p>As Integer Multiples</p>
        <img style={{width: "60%"}} src={image03}/>
        </div>
        <div><p>Or inharmonically</p>
        <img style={{width: "50%"}} src={image04}/>
        <img style={{width: "50%"}} src={image05}/>
        <img style={{width: "50%"}} src={image06}/>
        <img style={{width: "50%"}} src={image07}/>
        </div>
        </Table>
        </Section>
    ), `
* __Partials__: a set of frequencies comprising a (pitched) sound
* __Overtones__: as partials but without the fundamental frequency
* __Harmonics__: integer multiples of the fundamental frequency, including the fundamental frequency
`, `
### Physical Properties of Sound Production
* Larger objects produce larger sine waves (lower frequencies)
* The relative strength of various partials indicate different materials
`, () => (
    <Section>
    <h2>Physical Properties of the Ear</h2>
    <Table leftSize="50">
    <img src={image08}/>
    <div className="normal"><ul>
    <li>The cochlea resonates via thickness and stiffness across our hearing spectrum</li>
    <li>In a sense, our inner ear mirrors the way sound resonates in object modes</li>
    </ul></div>
    </Table>
    </Section>
), () => (
    <Section>
    <div>
    <Table leftSize="40" bordered={true}>
    <h3>Deterministic Signals</h3>
    <div className="normal"><i>Predictable</i>: future shape of the signal can be known (example: sinusoidal)</div>
    <h3>Random Signals</h3>
    <div className="normal"><i>Unpredictable</i>: no knowledge can help to predict what is coming next (example: white noise)</div>
    </Table>
    <Fragment>
    <br/>
    <div className="normal">
    <p>Every "real-world" audio signal can be modeled as time-varying combination of</p>
    <ul>
    <li>(Quasi-)periodic parts</li>
    <li>(Quasi-)random parts</li>
    </ul>
    </div>
    </Fragment>
    </div>
    </Section>
), () => (
    <Section>
    <h2> Properties of Real-World Signals</h2>
    <Table leftSize="40">
    <div className="normal">
    <br/><br/><br/>
    <ul><li>Real-Valued</li>
    <Fragment index="2"><li>Finite Energy</li></Fragment>
    <Fragment index="3"><li>Finite Bandwidth <i>(aka smooth)</i></li></Fragment></ul>
    </div>
    <div>
    <Fragment index="2">
    <div className="bordered framed">
    <div className="small">Amplitude:</div> <MathComponent tex={String.raw`max|x(t)| < \infty`}/></div>
    <div className="bordered framed">
    <div className="small">Energy:</div>
      <MathComponent tex={String.raw`E = \int _{-\infty}^{\infty} x^2(t)dt`}/>
    <MathComponent tex={String.raw`P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} x^2(t)dt`}/>
    </div>
    </Fragment>
    </div>
    </Table>
    </Section>
), () => (
    <Section>
    <h3>Periodic Signals</h3>
    <div className="row">
    <div className="col-33"><MathComponent tex={String.raw`x(t) = x(t + T_0)`}/></div>
    <div className="col-33"><MathComponent tex={String.raw`f_0 = \frac{1}{T_0}`}/></div>
    <div className="col-33"><MathComponent tex={String.raw`\omega_0 = \frac{2\pi}{T_0}`}/></div>
    </div>
    
    <div className="center" style={{width: "800px", "padding-left": "100px", "padding-right": "100px"}}>
    <SineLineChart/>
    </div>
    </Section>
), () => (
    <Section>
    <h2>Real-World Example of Periodicity</h2>
    <img src={image09}/>
    </Section>
), () => (
    <Section>
    <h2>Reconstruction</h2>
    <p>Periodic Signals can be reconstructed through a sum of sinusoidals at frequencies $k\cdot\omega$</p>
    <div className="small"><MathComponent tex={String.raw`\hat{x}(t) = a_1 \cdot sin(\omega_0t) + a_2\cdot sin(2\cdot\omega_0t)+ ... +a_3\cdot sin(n\cdot\omega_0t)`}/></div>
    </Section>
), () => (
    <Section>
    <h2>Sawtooth Wave</h2>
    <div className="center" style={{width: "800px", "padding-left": "100px", "padding-right": "100px"}}>
    <SawToothBuild isPdf={isPdf}/>
    </div>
    </Section>
), {target: 'pdf', slide: () => (
    <Section>
    <h2>Sawtooth Wave</h2>
    <div className="center" style={{width: "800px", "padding-left": "100px", "padding-right": "100px"}}>
    <SawToothBuild numHarmonics={2} isPdf={isPdf}/>
    </div>
    </Section>
)}, {target: 'pdf', slide: () => (
    <Section>
    <h2>Sawtooth Wave</h2>
    <div className="center" style={{width: "800px", "padding-left": "100px", "padding-right": "100px"}}>
    <SawToothBuild numHarmonics={10} isPdf={isPdf}/>
    </div>
    </Section>
)}, {target: 'pdf', slide: () => (
    <Section>
    <h2>Sawtooth Wave</h2>
    <div className="center" style={{width: "800px", "padding-left": "100px", "padding-right": "100px"}}>
    <SawToothBuild numHarmonics={20} isPdf={isPdf}/>
    </div>
    </Section>
)}, {target: 'pdf', slide: () => (
    <Section>
    <h2>Sawtooth Wave</h2>
    <div className="center" style={{width: "800px", "padding-left": "100px", "padding-right": "100px"}}>
    <SawToothBuild numHarmonics={50} isPdf={isPdf}/>
    </div>
    </Section>
)}, () => (
    <Section>
    <h2>Square Wave</h2>
    <div className="center" style={{width: "800px", "padding-left": "100px", "padding-right": "100px"}}>
    <SquareBuild isPdf={isPdf}/>
    </div>
    </Section>
), {target: 'pdf', slide: () => (
    <Section>
    <h2>Square Wave</h2>
    <div className="center" style={{width: "800px", "padding-left": "100px", "padding-right": "100px"}}>
    <SquareBuild numHarmonics={3} isPdf={isPdf}/>
    </div>
    </Section>
)}, {target: 'pdf', slide: () => (
    <Section>
    <h2>Square Wave</h2>
    <div className="center" style={{width: "800px", "padding-left": "100px", "padding-right": "100px"}}>
    <SquareBuild numHarmonics={11} isPdf={isPdf}/>
    </div>
    </Section>
)}, {target: 'pdf', slide: () => (
    <Section>
    <h2>Square Wave</h2>
    <div className="center" style={{width: "800px", "padding-left": "100px", "padding-right": "100px"}}>
    <SquareBuild numHarmonics={21} isPdf={isPdf}/>
    </div>
    </Section>
)}, {target: 'pdf', slide: () => (
    <Section>
    <h2>Square Wave</h2>
    <div className="center" style={{width: "800px", "padding-left": "100px", "padding-right": "100px"}}>
    <SquareBuild numHarmonics={51} isPdf={isPdf}/>
    </div>
    </Section>
)}, () => (
    <Section>
    <div className="small">Square wave additive synthesis, try at <a href="https://intonal.io/">https://intonal.io/</a></div>
          <pre className="javascript smallest"><code data-trim>
    {`main = {sr: float32 in
  numHarmonics = 25
  blSquare = makeBlAdditiveSquareWave(numHarmonics)
  out = blSquare(440, sr) * 0.25
}

phasor = {hz: float32, sr: float32 in
  out = 0 fby ((prev + (hz/sr)) % 1)
}

PI = 3.14159265358

makeBlAdditiveSquareWave = {numHarmonics: uint64 in
  out = {hz: float32, sr: float32 in
    curHarmonic: float32 = 1 fby prev + 1
    harmonics = render(2 * curHarmonic - 1, numHarmonics) on init
  
    out = harmonics.multiReduce(0, {prev, harmonic in
      p = phasor(hz * harmonic, sr)
      amp = 4 / (harmonic * PI)
      out = (sin(p * 2 * PI) * amp) + prev
    })
  }
}
`}
    </code></pre>

    </Section>
  ), () => (
    <Section>
    <h2>Mechanical Additive Synthesis</h2>
    <a href="https://youtu.be/8KmVDxkia_w">https://youtu.be/8KmVDxkia_w</a>
  </Section>
), () => (
    <Section>
    <BeatingChart/>
    </Section>
), () => (
    <Section>
    <div className="smaller">
    <MathComponent tex={String.raw`\eqalign{y(t) &=& \underbrace{\sin\left(2\pi (f+\frac{\Delta f}{2})t\right)}_{\sin(2\pi f)\cos\left(2\pi t\frac{\Delta f}{2}\right) + \cos(2\pi f)\sin\left(2\pi t\frac{\Delta f}{2}\right)} + \underbrace{\sin\left(2\pi (f-\frac{\Delta f}{2})t\right)}_{\sin(2\pi f)\cos\left(-2\pi t\frac{\Delta f}{2}\right) + \cos(2\pi f)\sin\left(-2\pi t\frac{\Delta f}{2}\right)}\\
          &=& 2\sin\left(2\pi f\right)\cdot \cos\left(2\pi\frac{\Delta f}{2}t\right)}`}/>
    <BeatingChart scaleY={0.5}/>
    </div>
    </Section>
), () => (
    <Section>
    <div className="small">Beating examples, try at <a href="https://intonal.io/">https://intonal.io/</a></div>
          <pre className="javascript smallest"><code data-trim>
    {`main = {sr: float32 in
  hzs = [500]
//  hzs = [500, 1000]
//  hzs = [500, 750]
//  hzs = [500, 667]
//  hzs = [500, 625]
//  hzs = [500, 600]
//  hzs = [500, 600, 750]
//  hzs = [500, 530]
//  hzs = [500, 502]
//  hzs = [500, 501]
//  hzs = [500, 500 + playSin(0.01, 100, sr)]

  amp = 0.5 / float32(hzs.len())

  out = hzs
    .multiReduce(0, {prev, hz in
      prev + playSin(hz, amp, sr)
    })
}

playSin = {hz, amp, sr in
  p = phasor(hz, sr)
  out = sin(p * 2 * PI) * amp
}

phasor = {hz: float32, sr: float32 in
  out = 0 fby ((prev + (hz/sr)) % 1)
}

PI = 3.14159265358
`}
    </code></pre>

    </Section>
), () => (
    <Section>
    <h3>Random Process</h3>
    <p>Ensemble of random series</p>
    <img style={{width: "50%"}} src={image10}/>
    <div className="normal">
    <div className="heading">Special Cases:</div>
    <div className="normal">
    <ul>
    <li><b>Stationarity:</b> all parameters (such as the mean) are time invariant</li>
    <li><b>Ergodicity:</b> process with equal time and ensemble mean (implies stationarity)</li>
    </ul>
    </div>
    </div>
    
        </Section>
    ), () => (
        <Section>
        <h3>Common Periodic Signals</h3>
        <div className="row evenRow">
        <div className="col-25">Sinusoidal</div>
        <div className="col-75"><MathComponent tex={String.raw`x(t) = \sin(\underbrace{2\pi f}_{\omega} t + \Phi)`}/></div>
        </div>
        <div className="row oddRow">
        <div className="col-25">Sawtooth</div>
        <div className="col-75"><MathComponent tex={String.raw`x(t) = 2\left(\frac{t}{T_0}-\mathrm{floor}\left(\frac{1}{2}+\frac{t}{T_0}\right)\right)`}/></div>
        </div>
        <div className="row evenRow">
        <div className="col-25">Square Wave</div>
        <div className="col-75"><MathComponent tex={String.raw`x(t) = \mathrm{sign}\left(\sin(\omega t)\right)`}/></div>
        </div>
        </Section>
    ), () => (
        <Section>
        <h3>Common Periodic Signals</h3>
        <div className="row evenRow">
        <div className="col-25">DC</div>
        <div className="col-75"><MathComponent tex={String.raw`x(t) = 1`}/></div>
        </div>
        <div className="row oddRow">
        <div className="col-25">Impulse</div>
        <div className="col-75"><MathComponent tex={String.raw`                \delta(t) = 
                    \cases{
                            \infty & if t = 0 \cr
                            0   & if t != 0
                    }
`}/></div>
        </div>
        </Section>
    ), `
## Summary

* Two basic signal classes, **deterministic** and **random**
* *Deterministic* signals can be described by a function and are predictable
* Special case: Periodic signals - sum of sinusoidals with freq. integer ratio
* *Random* signals are not predictable
* Special case: Ergodic signals can be described staticstically
`
  ]
}

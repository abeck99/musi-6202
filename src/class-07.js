import React, { Component } from 'react'
import Section from 'lib/component/Section'

import Presentation from 'lib/template/Presentation'

import Counter from './example/component/Counter'
import SineWave from './example/component/SineWave'
import Table from './example/component/Table'
import List from './example/component/List'
import Schedule from './example/component/Schedule'
import MyPieChart from './example/component/MyPieChart'
import Plot from './example/component/Plot'

import image00 from './class-07/img/image00.jpg'

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
        <div className="right">Part 7: Fourier Transform</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Fourier Transform: Overview</h3>
      <List>
        <div>Fourier series to Fourier Transform</div>
        <div>Properties of the Fourier Transform</div>
        <div>Windowed Fourier Transform (STFT)</div>
        <div>Transform of sampled time signals</div>
        <div>Discrete Fourier Transform</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Fourier Transform: Introduction</h3>
      <img src={image00} style={{width:"75%"}}/>
      <List icon="none">
        <div>Fourier series is a brilliant insight, but:
          <List fragment="all" overrides={{2: "fa-arrow-right"}}>
            <div>Works only for periodic signals</div>
            <div>Difficult to use for real-world analysis as it requires knowledge of fundamental frequency</div>
            <div><b>Fourier Transform</b></div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Fourier series, revisited</h4>
      <div className="normal">
        <MathComponent tex={String.raw`c_k = \frac{1}{T_0}\int\limits_{-\frac{T_0}{2}}^{\frac{T_0}{2}} x(t) \mathrm{e}^{-\mathrm{j}\omega_0kt}\, dt`}/>
      </div>
      <div className="normal">
        <List fragment={true}>
          <div>Fourier series coefficient can be interpreted as <b>correlation coefficient</b> between signal and sinusoidals of different frequencies</div>
          <div>Only frequencies <MathComponent tex={String.raw`k\omega_0`} display={false}/> are used (<MathComponent tex={String.raw`\omega_0`} display={false}/> <i>has to be known</i>)</div>
          <div>Fourier series produces a <b>'line spectrum'</b></div>
        </List>
        <br/>
      </div>
    </Section>
  ), () => (
    <Section>
      <h4>Fourier series, revisited</h4>
      <div className="normal">
        <MathComponent tex={String.raw`c_k = \frac{1}{T_0}\int\limits_{-\frac{T_0}{2}}^{\frac{T_0}{2}} x(t) \mathrm{e}^{-\mathrm{j}\omega_0kt}\, dt`}/>
      </div>
      
      <List fragment={true}>
        <div>Distance betwen frequency components decreases as <MathComponent tex={String.raw`T_0`} display={false}/> increases</div>
        <div>Aperiodic functions could be analyzed by increasing <MathComponent tex={String.raw`T_0 \to \infty`} display={false}/></div>
      </List>
      <aside className="notes">
      </aside>
      </Section>
  ),
  () => (
    <Section>
      <h4>Fourier series, revisited</h4>
      <div className="row">
        <div className="col-50">
          <MathComponent tex={String.raw`c_k = \frac{1}{T_0}\int\limits_{-\frac{T_0}{2}}^{\frac{T_0}{2}} x(t) \mathrm{e}^{-\mathrm{j}\omega_0kt}\, dt`}/>
        </div>
        <div className="col-50">
          <List icon="fa-arrow-right" align="center">
            <MathComponent tex={String.raw`T_0 \rightarrow \infty`} display={false}/>
            <MathComponent tex={String.raw`k\omega_0 \rightarrow \omega`} display={false}/>
            <MathComponent tex={String.raw`\frac{1}{T_0} \rightarrow 0`} display={false}/>
          </List>
        </div>
      </div>
      <br/>
      <div className="left">To avoid zero result, multiply with <MathComponent tex={String.raw`T_0`} display={false}/></div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Definition of Fourier Transform (Continuous)</h3>
      <MathComponent tex={String.raw`X(\mathrm{j}\omega) = \mathfrak{F}[x(t)] = \int\limits_{-\infty}^{\infty} {x(t) \mathrm{e}^{-\mathrm{j}\omega t}\, dt}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h5>Example 1: Rect Window</h5>
      <MathComponent tex={String.raw`w_{\mathrm{R}}(t) = \left\lbrace \begin{array}{ll} 1, & -\frac{1}{2} \leq t \leq \frac{1}{2} \cr  0, & \text{otherwise} \end{array}\right.`}/>
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

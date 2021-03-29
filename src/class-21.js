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

import image00 from './class-21/img/image00.png'
import image01 from './class-21/img/image01.png'
import image02 from './class-21/img/image02.png'
import image03 from './class-21/img/image03.png'
import image04 from './class-21/img/image04.png'
import image05 from './class-21/img/image05.png'
import image06 from './class-21/img/image06.png'
import image07 from './class-21/img/image07.png'
import image08 from './class-21/img/image08.png'
import image09 from './class-21/img/image09.png'
import image10 from './class-21/img/image10.png'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 21: Fast Convolution</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Intro</h4>
      <div>Convolution: Measure impulse response h(i) and apply FIR filter to signal</div>
      <MathComponent tex={String.raw`\eqalign{y(i) &=& x(i) \ast h(i)\\
				 &=& \sum\limits_{j=-\infty}^{\infty}{h(j)\cdot x(i-j)}\\
			Y(z) &=& X(z) \cdot H(z)}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Signal and Impulse Response</h4>
      <List>
        <div>Multiplication: Length of <MathComponent tex={String.raw`H(z) = M`} display={false}/> must equal length of <MathComponent tex={String.raw`X(z) = N`} display={false}/></div>
        <div>Minimum DFT length: <MathComponent tex={String.raw`L \leq M + N - 1`} display={false}/></div>
      </List>
      <img src={image00} style={{width:"80%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <List>
        <div>Multiplication: Length of <MathComponent tex={String.raw`H(z) = M`} display={false}/> must equal length of <MathComponent tex={String.raw`X(z) = N`} display={false}/></div>
        <div>Minimum DFT length: <MathComponent tex={String.raw`L \leq M + N - 1`} display={false}/></div>
      </List>
      <ol>
        <li><MathComponent tex={String.raw`X = DFT(x'(i))`} display={false}/></li>
        <li><MathComponent tex={String.raw`H = DFT(h'(i))`} display={false}/></li>
        <li><MathComponent tex={String.raw`Y = X \cdot H`} display={false}/></li>
        <li><MathComponent tex={String.raw`y = DFT^{-1}(Y)`} display={false}/></li>
        <li>Throw away zeroes if DFT was longer than <MathComponent tex={String.raw`M + N`} display={false}/></li>
      </ol>
      <img src={image01} style={{width:"70%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Downsides</h4>
      <List>
        <div>No real-time: Signal has to be known completely</div>
        <div>High memory requirements (signal length <i>N</i> + impulse response length <i>M</i>)
          <List>
            <div>When FFT: Next larger power of two</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Blocked Input Convolution</h4>
      <ol>
        <li>Split input signal into blocks of length <i>M</i></li>
        <li>DFT convolution with each block (zero padding)</li>
        <li>Overlap and save</li>
      </ol>
      <img src={image02}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Blocked Input Convolution</h4>
      <ol>
        <li>Split input signal into blocks of length <i>M</i></li>
        <li>DFT convolution with each block (zero padding)</li>
        <li>Overlap and save</li>
      </ol>
      <img src={image03}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Blocked Input Convolution</h4>
      <ol>
        <li>Split input signal into blocks of length <i>M</i></li>
        <li>DFT convolution with each block (zero padding)</li>
        <li>Overlap and save</li>
      </ol>
      <img src={image04}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Blocked Input Convolution</h4>
      <ol>
        <li>Split input signal into blocks of length <i>M</i></li>
        <li>DFT convolution with each block (zero padding)</li>
        <li>Overlap and save</li>
      </ol>
      <img src={image05}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Blocked Input: Properties</h4>
      <List>
        <div>Minimum latency: Impulse response length</div>
        <div>Long FFT, but more efficient</div>
        <div>FFT of impulse response <i>is only computed once</i></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Blocked Input / Blocked Impulse Response</h4>
      <ol>
        <li>Split <b>both</b> input signal and impulse response into blocks of arbitrary length</li>
        <li>DFT convolution with each signal block with each impulse response block (zero padding)</li>
        <li>Overlap and save</li>
      </ol>
      <img src={image06}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Blocked Input / Blocked Impulse Response</h4>
      <ol>
        <li>Split <b>both</b> input signal and impulse response into blocks of arbitrary length</li>
        <li>DFT convolution with each signal block with each impulse response block (zero padding)</li>
        <li>Overlap and save</li>
      </ol>
      <img src={image07} style={{width: "60%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Blocked Input / Blocked Impulse Response</h4>
      <ol>
        <li>Split <b>both</b> input signal and impulse response into blocks of arbitrary length</li>
        <li>DFT convolution with each signal block with each impulse response block (zero padding)</li>
        <li>Overlap and save</li>
      </ol>
      <img src={image08}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image09} style={{width: "50%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>How does block size affect processing?</h4>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Blocked Input / Blocked Impulse Properties</h4>
      <List>
        <div>Arbitrary choice of latency / FFT length
          <List>
            <div>Long FFT: High latency, low workload</div>
            <div>Short FFT: Short latency, high workload</div>
          </List>
        </div>
        <div>FFTs of IR computed only once</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Variable Block Lengths</h4>
      <div className="normal">
      <List>
        <div>Fast convolution: latency still formidable for efficient implementation</div>
        <div>Non-Uniform block lengths
          <img src={image10}/>
        </div>
      </List>
      <List fragment="all">
        <div><b>Advantages</b>:
          <div className="small">
            <List>
              <div><i>any</i> desirable latency</div>
            </List>
          </div>
        </div>
        <div><b>Disadvantages</b>:
          <div className="small">
            <List>
              <div>Less efficient due to multiple FFT lengths (but: inefficiency of short FFT partly compensated by very long FFTs)</div>
              <div>Complex implementation</div>
              <div>Comparably high memory usage (IR in many different FFT lengths</div>
            </List>
          </div>
        </div>
      </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

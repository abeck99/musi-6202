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

import image00 from './class-17/img/image00.png'
import image01 from './class-17/img/image01.png'
import image02 from './class-17/img/image02.png'
import image03 from './class-17/img/image03.png'
import image04 from './class-17/img/image04.png'
import image05 from './class-17/img/image05.png'
import image06 from './class-17/img/image06.png'
import image07 from './class-17/img/image07.png'
import image08 from './class-17/img/image08.png'
import image09 from './class-17/img/image09.png'
import image10 from './class-17/img/image10.png'
import image11 from './class-17/img/image11.png'
import image12 from './class-17/img/image12.png'
import image13 from './class-17/img/image13.png'

import sax1 from './class-17/snd/alto-sax.mp3'
import sax2 from './class-17/snd/alto-saxds8.mp3'
import sax3 from './class-17/snd/alto-saxds8_proper.mp3'
import bigband1 from './class-17/snd/bigband.mp3'
import bigband2 from './class-17/snd/bigbandds8.mp3'
import bigband3 from './class-17/snd/bigbandds8_proper.mp3'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 17: Sample Rate Conversion (SRC)</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Sample Rate Conversion</h4>
      <div className="bordered framed">
      <i>From Wikipedia:</i> "Changing the sampling rate of a discrete signal to obtain a new discrete representation of the underlying continusous signal"
      </div>
        <br/>
        <div className="row">
          <div className="col-40">
            <img src={image00}/>
          </div>
          <div className="col-60">
            <div><b>Typical Applications</b></div>
            <List>
              <div>Audio file/media conversion</div>
              <div>Word clock synchronization</div>
              <div>Oversampling</div>
              <div>DJing / Scratching</div>
            </List>
          </div>
        </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Introduction</h4>
      <List fragment={true}>
        <div><b>Terminology</b>
          <div className="small">
            <List fragment={true}>
              <div><i>Synchronous</i>
                <List>
                  <div>Clock rates are coupled</div>
                  <div>Reasampling factor stays constant</div>
                </List>
              </div>
              <div><i>Asynchronous</i>
                <List>
                  <div>Clock rates are independent</div>
                  <div>Resampling factory may change</div>
                </List>
              </div>
            </List>
          </div>
        </div>
        <div><b>Ideal Result</b>
          <div className="small">
            <List>
              <div>Spectrum in the used band unchanged</div>
              <div>Spectral periodicity (determined by sample rate) changed</div>
            </List>
          </div>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Upsampling by Inserting Zeros</h4>
      <div>Task: <b>Upsample by integer factor <i>L</i></b></div>
      <ol><li>Insert <i>L</i> - 1 zeros between all samples</li><li>Apply Anti-Imaging filter</li></ol>
      <img src={image01}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image02}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Downsampling by Removing Samples</h4>
      <div>Task: <b>Downsample by integer factor <i>M</i></b></div>
      <ol><li>Apply anti-aliasing filter</li><li>Take every <i>M</i>th sample</li></ol>
      <div className="center"><img src={image03}/></div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image04}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Resampling by Rational Factor</h4>
      <div>Task: <b>Convert sample rate</b> to any other (coupled) sample rate)</div>
      <ol>
        <li><div>Convert Sample rate ratio to integer factors</div>
          <div>e.g.: <MathComponent tex={String.raw`\frac{48}{44.1} \mapsto L = 160 \mathrm{,} M = 147`} display={false}/></div>
        </li>
        <li><Fragment>Insert zeros</Fragment></li>
        <li><Fragment>Apply anti-imaging filter</Fragment></li>
        <li><Fragment>Apply anti-aliasing filter</Fragment></li>
        <li><Fragment>Remove Samples</Fragment></li>
      </ol>
      <Fragment>
        <img src={image05}/>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Sinc Interpolation</h4>
      <List>
        <div>Perfect reconstruction of the sample spectrum is possible with ideal filter</div>
        <div>Resampling should be possible by time domain convolution with sinc</div>
        </List>
      <img src={image06}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
        <MathComponent tex={String.raw`x(i-\alpha) = \sum\limits_{m=-\infty}^{\infty}x(m)\frac{\Omega_C}{\pi}\frac{sin\left(\Omega_C(i-\alpha-m)\right)}{\Omega_C(i-\alpha-m)}`}/>
        <div><MathComponent tex={String.raw`\Omega_C`} display={false}/> is the cutoff frequency of the ideal lowpass</div>
      <img src={image07}/>

      <List fragment="all">
        <div className="heading">Practical implementation: <b>Windowed Sinc</b></div>
      </List>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Polynomial Interpolation</h4>
      <div><b>Interpolation Methods</b></div>
      <List>
        <div>Can be interpreted as filters with time-variant filter coefficients</div>
        <div>Not based on traditional filter design methods</div>
      </List>
      <div>Polynomial interpolation</div>
      <MathComponent tex={String.raw`\eqalign{f(t) &=& \sum\limits_{k=0}^\mathcal{O}x_k p_k(t)\\
                    p_k(t) &=& \prod\limits_{j=0}^\mathcal{O}\frac{t-t_j}{t_k-t_j}}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <MathComponent tex={String.raw`\eqalign{x(t) &=& \frac{1}{t}\\
            \text{nodes: } t &=& [2, 4, 5]\\
            p_0(t) &=& \frac{(t-4)(t-5)}{(2-4)(2-5)} = \frac{(t-4)(t-5)}{6}\\
            p_1(t) &=& \frac{(t-2)(t-5)}{(4-2)(4-5)} = -\frac{(t-2)(t-5)}{2}\\
            p_2(t) &=& \frac{(t-2)(t-4)}{(5-2)(5-4)} = \frac{(t-2)(t-4)}{3}\\
             f(t) &=& \sum\limits_{k=0}^\mathcal{O}x_k p_k(t)\\
            \Rightarrow f(t) &=& p_0\frac{1}{2}+p_1\frac{1}{4}+p_2\frac{1}{5}\\
            &=& 0.025t^2 - 0.275t + 0.95 .}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image08}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <List><div>Linear Interpolation (1st order -> 2 points)</div></List>
      <div className="small">
      <MathComponent tex={String.raw`\eqalign{x(t) &=& \frac{1}{t}\\
            \text{nodes: } t &=& [2, 4]\\
            p_0(t) &=& \frac{(t-4)}{(2-4)} = \frac{(4-t)}{2}\\
            p_1(t) &=& \frac{(t-2)}{(4-2)} = \frac{(t-2)}{2}\\
             f(t) &=& \sum\limits_{k=0}^\mathcal{O}x_k p_k(t)\\
            \Rightarrow f(t) &=& p_0\frac{1}{2}+p_1\frac{1}{4}\\
            &=& - \frac{1}{8}t + \frac{3}{4}.}`}/>
        </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image09}/>
      <MathComponent tex={String.raw`\hat{x} = x_l\cdot (1-frac) + x_r\cdot frac`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <div className="row">
        <div className="col-50">
          <img src={image10}/>
        </div>
        <div className="col-50">
          <img src={image11}/>
        </div>
      </div>
      <div className="row">
        <div className="col-50">
          <img src={image12}/>
        </div>
        <div className="col-50">
          <img src={image13}/>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <MultiTable sizes={[40, 20, 20, 20]}>
        <div/>
        <div>Orig (48kHz)</div>
        <div>ds (6kHz, w/o filt)</div>
        <div>ds (6kHz, w/ filt)</div>
        <div>Sax</div>
        <ReactAudioPlayer src={sax1} style={{width: "125px"}} controls/>
        <ReactAudioPlayer src={sax2} style={{width: "125px"}} controls/>
        <ReactAudioPlayer src={sax3} style={{width: "125px"}} controls/>
        <div>Big Band</div>
        <ReactAudioPlayer src={bigband1} style={{width: "125px"}} controls/>
        <ReactAudioPlayer src={bigband2} style={{width: "125px"}} controls/>
        <ReactAudioPlayer src={bigband3} style={{width: "125px"}} controls/>
      </MultiTable>

      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Summary</h4>
      <List>
        <div>resampling: estimate different sample points of underlying continuous signal</div>
        <div>as with sampling, proper filtering has to take place</div>
        <div>some interpolation approaches have filter “built-in”</div>
        <div>perfect reconstruction impossible (infinite sinc), however, perceptually artifact-free resampling is possible
          <List>
            <div>main issue: filter cut-off and steepness vs. aliasing</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

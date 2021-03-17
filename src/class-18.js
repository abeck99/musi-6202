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

import SquareBuild from './class-02/component/SquareBuild'
import SquareRipple from './class-18/component/SquareRipple'

import image00 from './class-18/img/image00.png'
import image01 from './class-18/img/image01.png'
import image02 from './class-18/img/image02.png'
import image03 from './class-18/img/image03.png'
import image04 from './class-18/img/image04.png'
import image05 from './class-18/img/image05.png'
import image06 from './class-18/img/image06.png'
import image07 from './class-18/img/image07.png'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 18: Source Generation</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Introduction</h4>
      <List>
        <div><b>Tone Generation</b>
          <div className="small">
            <div className="row">
              <div className="col-50">
                <List>
                  <div><i>Direct Generation</i>
                    <List>
                      <div>Naive function generator</div>
                      <div>Additive synthesis</div>
                      <div>Oversampled naive</div>
                      <div>BLEP / PolyBLEP</div>
                    </List>
                  </div>
                </List>
              </div>
              <div className="col-50">
                <List>
                  <div><i>Wavetable</i>
                    <List>
                      <div>Single cycle</div>
                      <div>Morphing</div>
                      <div>Mixed direct & wavetable</div>
                    </List>
                  </div>
                  <div><i>Specific techniques</i>
                    <List>
                      <div><strike>FM synthesis</strike></div>
                      <div>Karpluss-strong</div>
                    </List>
                  </div>
                </List>
              </div>
            </div>
          </div>
        </div>
        <div><b>Source playback</b>
          <div className="small">
            <List>
              <div>Sample playback</div>
              <div>Granular synthesis</div>
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
      <h4>Naive Function Generation</h4>
      <div className="row">
        <div className="col-50">
          <div className="center"><i>Process</i></div>
          <List>
            <div>Keep track of phase <MathComponent tex={String.raw`\phi`} display={false}/></div>
            <div>Transform to desired function</div>
          </List>
        </div>
        <div className="col-50">
          <img src={image07}/>
        </div>
      </div>
        
      <aside className="notes">
        <p>Pros: Easy to implement</p>
        <p>Cons: Aliasing, expensive</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Naive downsides</h4>
      <div className="row">
        <div className="col-50">
          <div>Simple to implement but:</div>
          <List>
            <div>Potentially expensive</div>
            <div>Causes aliasing</div>
          </List>
        </div>
        <div className="col-50">
          <img src={image00}/>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Additive Synthesis</h4>
      <div>Build function from list of sinusodials</div>
      <div className="center" style={{width: "800px", "paddingLeft": "100px", "paddingRight": "100px"}}>
        <SquareBuild isPdf={isPdf}/>
      </div>
      <aside className="notes">
        <p>Can still alias, perhaps use adaptive number of harmonics</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Additive downsides</h4>
      <div className="row">
        <div className="col-50">
          <div>Offers tight control over spectral domain but:</div>
          <List>
            <div>Expensive</div>
            <div>Can still alias</div>
          </List>
        </div>
        <div className="col-50">
          <img src={image01}/>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Oversampling Naive</h4>
      <div className="center"><i>Process</i></div>
      <List>
        <div>Generate naive function at higher sample rate</div>
        <div>Apply anti-aliasing filter</div>
        <div>Downsample</div>
      </List>
      <Fragment>
        <div className="row">
          <div className="col-50">
            <div>Flexible approach but:</div>
            <List>
              <div>Expensive</div>
              <div>Aliasing artifacts still exist</div>
            </List>
          </div>
          <div className="col-50">
            <img src={image02}/>
          </div>
        </div>
      </Fragment>
      
      <aside className="notes">
        <p>Works better for waveforms whose amplitudes decay faster</p>
        <p>Note that smoothing does not show the characteristic ripple</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>BLIT/BLEP/PolyBLEP</h4>
      <div>Observations:</div>
      <List>
        <div>Aliasing is caused by sharp jumps (IE high frequencies)</div>
        <div>Smoothing (lowpassing) sharp jumps still causes aliasing</div>
        <div>True anti-aliased signals have ripples</div>
      </List>
      <div className="center" style={{width: "800px", "paddingLeft": "100px", "paddingRight": "100px"}}>
        <SquareRipple isPdf={isPdf}/>
      </div>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>BLEP</h4>
      <div>Solution: Add ripple across edges</div>
      <List>
        <div><b>B</b>and <b>L</b>imited st<b>EP</b> function</div>
        <div>Adding in idealized lowpass filter of step function</div>
        <div>Integrate sinc function and add to naive signal</div>
      </List>
      <img src={image03}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>PolyBLEP</h4>
      <div>Special case of BLEP, smoothing discontinuity</div>
      <div>Where <MathComponent tex={String.raw`t`} display={false}/> is normalized distance to the discontinuity (typically use one sample)</div>
          <MathComponent tex={String.raw`polyblep(t) = \left\lbrace \begin{array}{ll} 0, & t < -1  \cr  \frac{t^2}{2} + t + \frac{1}{2}, & -1 \leq t \leq 0 \cr  t - \frac{t^2}{2} + \frac{1}{2}, & 0 < t \leq 1 \cr  1 & t > 1 \end{array}\right.`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>PolyBLEP</h4>
      <div className="row">
        <div className="col-50">
          <img src={image05}/>
        </div>
        <div className="col-50">        
          <img src={image04}/>
        </div>
      </div>
      <List fragment="all">
        <div>Not suitable for modulating control values</div>
        <div>Often good comprimise between speed and quality</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Wavetable Synthesis</h4>
      <List fragment={true}>
        <div><b>Problem</b>: Some functions (particularly sine) can be expensive</div>
        <div><b>Solution</b>: Render into a single cycle buffer and use <MathComponent tex={String.raw`\phi`} display={false}/> to index into wavetable</div>
      </List>
      <Fragment>
      <pre className="javascript smallest"><code data-trim>
                                             {`phi = phasor(hz, sr)
out = wavetable[int64(phi * (len(wavetable) - 1))]`}</code></pre>
      </Fragment>
      <List fragment="all">
        <div>Playing back at different speeds is effectively resampling, so must use resampling techniques discussed earlier</div>
        <div>Typically add redundant samples at start and end of wavetable to allow cubic interpolation without bounds checking</div>
        <div>Can draw arbitrary waveforms</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Wavetable Morphing</h4>
      <List>
        <div><b>Time Domain</b>: Interpolating between two wavetables</div>
        <div><b>Frequency Domain</b>: Interpolate complex results of FFT, IFFT for playback</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Combining Wavetable and Direct</h4>
      <List>
        <div>Example: Casio keyboards</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Sample Playback</h4>
      <div>Simply a large wavetable that doesn't repeat</div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Granular Synthesis</h4>
      <div>Indexing into small segments (aka Grains) from a wavetable</div>
      <img src={image06} style={{width:"45%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Granular Synth Properties</h4>
      <div className="row">
        <div className="col-50">
          <List>
            <div>Grain Size</div>
            <div>Hop Size
              <List>
                <div>Periodic</div>
                <div>Stochastic</div>
                <div>Random</div>
              </List>
            </div>
            <div>Grain Pitch</div>
          </List>
        </div>
        <div className="col-50">
          <img src={image06}/>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Karpluss-Strong</h4>
      <div className="center"><i>Process</i></div>
      <List>
        <div>Fill single cycle buffer with random noise</div>
        <div>As you index, run low pass filter (averaging filter) over buffer, either in time with playback index or independently</div>
        <div>Periodicity of buffer creates tone</div>
        <div>Simulates noisey impulse and decay</div>
      </List>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Summary</h4>
      <List>
        <div>No "one-size-fits-all" solution to function generation</div>
        <div>Overlap between different techniques</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

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

import image00 from './class-19/img/image00.png'
import image01 from './class-19/img/image01.png'
import image02 from './class-19/img/image02.png'
import image03 from './class-19/img/image03.png'
import image04 from './class-19/img/image04.png'
import image05 from './class-19/img/image05.png'
import image06 from './class-19/img/image06.png'
import image07 from './class-19/img/image07.png'
import image08 from './class-19/img/image08.png'
import image09 from './class-19/img/image09.png'
import image10 from './class-19/img/image10.png'
import image11 from './class-19/img/image11.png'

import sv from './class-19/snd/sv.mp3'
import sv94 from './class-19/snd/sv@94.mp3'
import sv106 from './class-19/snd/sv@106.mp3'
import svChorus from './class-19/snd/svChorus.mp3'
import svEcho from './class-19/snd/svEcho.mp3'
import svFlanger from './class-19/snd/svFlanger.mp3'
import svFlangerFb from './class-19/snd/svFlangerFb.mp3'
import svPhaser from './class-19/snd/svPhaser.mp3'
import svSlapback from './class-19/snd/svSlapback.mp3'
import svVibrato from './class-19/snd/svVibrato.mp3'
import svWhiteChorus from './class-19/snd/svWhiteChorus.mp3'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 19: Modulated Effects</div>
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
      <List fragment={true}>
        <div>Modulated effects belong to one of the oldest class of audio effects</div>
        <div>Often used for guitar</div>
        <div><b>Examples:</b>
          <List>
            <div>Delay-Line Modulation
              <List>
                <div>Vibrato</div>
                <div>Chorus, Flanger</div>
              </List>
            </div>
            <div>Other
              <List>
                <div>Phaser</div>
                <div>Wah-Wah</div>
              </List>
            </div>
          </List>
        </div>
      </List>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Delay Line</h4>
      <img src={image00}/>
      <div><b>Implementation</b></div>
      <img src={image01}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Ring Buffer</h4>
      <div className="row">
        <div className="col-70">
          <div className="small">
          <List fragment={true}>
            <div><b>Idea</b>
              <List>
                <div>Do not move buffer contents</div>
                <div>Instead, increment write and read positions</div>
              </List>
            </div>
            <div><b>Implementation</b>
              <List>
                <div>Buffer length <MathComponent tex={String.raw`L`} display={false}/>: <MathComponent tex={String.raw`L \geq M`} display={false}/></div>
                <div>Store current write index <MathComponent tex={String.raw`n_w`} display={false}/> and read index <MathComponent tex={String.raw`n_r`} display={false}/></div>
              </List>
            </div>
            <div>For a simple delay <MathComponent tex={String.raw`(n_w - n_r) \bmod L = M`} display={false}/></div>
          </List>
          </div>
        </div>
        <div className="col-30">
          <img src={image02}/>
        </div>
      </div>
      <Fragment>
        <img src={image03}/>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Modulated Delay Line</h4>
      <img src={image04}/>
      <Fragment>
        <MathComponent tex={String.raw`n.frac = M + A \cdot (2 \pi \frac{f_{mod}}{f_s} i)`}/>
      </Fragment>
      <List fragment="all">
        <div><MathComponent tex={String.raw`M`} display={false}/>: Static delay in samples</div>
        <div><MathComponent tex={String.raw`A`} display={false}/>: Modulation amplitude in samples</div>
        <div><MathComponent tex={String.raw`f_{mod}`} display={false}/>: Modulation frequency in Hertz</div>
        <div><MathComponent tex={String.raw`\sin`} display={false}/>: Oscillator function</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Fractional indexing</h4>
      <img src={image05}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Linear Interpolation Examples</h4>
      <List>
        <div><b>Original</b>: <ReactAudioPlayer src={sv} controls/></div>
        <div><b>6% speed-up</b>: <ReactAudioPlayer src={sv106} controls/></div>
        <div><b>6% slow-up</b>: <ReactAudioPlayer src={sv94} controls/></div>
      </List>

      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Vibrato</h4>
      <img src={image04}/>
      <ReactAudioPlayer src={svVibrato} controls/>
      <List>
        <div><MathComponent tex={String.raw`M`} display={false}/> = any</div>
        <div><MathComponent tex={String.raw`A`} display={false}/> = 200 samples</div>
        <div><MathComponent tex={String.raw`f_{mod}`} display={false}/> = 1 Hz</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Vibrato + Input Signal</h4>
      <img src={image06}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Vibrato + Input Signal</h4>
      <img src={image06} style={{width:"20%"}}/>
      <div><ReactAudioPlayer src={svSlapback} controls/></div>
      <div><b>Slapback</b></div>
      <List>
        <div><MathComponent tex={String.raw`f_{mod}`} display={false}/> = 0</div>
        <div><MathComponent tex={String.raw`A`} display={false}/> = 0</div>
        <div><MathComponent tex={String.raw`M`} display={false}/> = 20 ms</div>
        <div><MathComponent tex={String.raw`BL`} display={false}/> = 0.7</div>
        <div><MathComponent tex={String.raw`FF`} display={false}/> = 0.7</div>
      </List>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Vibrato + Input Signal</h4>
      <img src={image06} style={{width:"20%"}}/>
      <div><ReactAudioPlayer src={svEcho} controls/></div>
      <div><b>Simple echo</b></div>
      <List>
        <div><MathComponent tex={String.raw`f_{mod}`} display={false}/> = 0</div>
        <div><MathComponent tex={String.raw`A`} display={false}/> = 0</div>
        <div><MathComponent tex={String.raw`M`} display={false}/> = 50 ms</div>
        <div><MathComponent tex={String.raw`BL`} display={false}/> = 0.7</div>
        <div><MathComponent tex={String.raw`FF`} display={false}/> = 0.7</div>
      </List>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Vibrato + Input Signal</h4>
      <img src={image06} style={{width:"20%"}}/>
      <div><ReactAudioPlayer src={svFlanger} controls/></div>
      <div><b>Simple Flanger</b></div>
      <List>
        <div><MathComponent tex={String.raw`f_{mod}`} display={false}/> = 0.2 Hz</div>
        <div><MathComponent tex={String.raw`A`} display={false}/> = 2 ms</div>
        <div><MathComponent tex={String.raw`M`} display={false}/> = 0</div>
        <div><MathComponent tex={String.raw`BL`} display={false}/> = 0.7</div>
        <div><MathComponent tex={String.raw`FF`} display={false}/> = 0.7</div>
      </List>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Vibrato + Input Signal</h4>
      <img src={image06} style={{width:"20%"}}/>
      <div><ReactAudioPlayer src={svChorus} controls/></div>
      <div><b>Simple Chorus</b></div>
      <List>
        <div><MathComponent tex={String.raw`f_{mod}`} display={false}/> = 1.5 Hz</div>
        <div><MathComponent tex={String.raw`A`} display={false}/> = 2 ms</div>
        <div><MathComponent tex={String.raw`M`} display={false}/> = 2 ms</div>
        <div><MathComponent tex={String.raw`BL`} display={false}/> = 1.0</div>
        <div><MathComponent tex={String.raw`FF`} display={false}/> = 0.7</div>
      </List>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Modulated Effect with Feedback Path</h4>
      <img src={image07}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Modulated Effect with Feedback Path</h4>
      <img src={image07} style={{width:"20%"}}/>
      <div><ReactAudioPlayer src={svFlangerFb} controls/></div>
      <div><b>Simple Flanger with Feedback</b></div>
      <List>
        <div><MathComponent tex={String.raw`f_{mod}`} display={false}/> = 0.1 Hz</div>
        <div><MathComponent tex={String.raw`A`} display={false}/> = 5 ms</div>
        <div><MathComponent tex={String.raw`M`} display={false}/> = 0</div>
        <div><MathComponent tex={String.raw`BL`} display={false}/> = 0.7</div>
        <div><MathComponent tex={String.raw`FF`} display={false}/> = 0.7</div>
        <div><MathComponent tex={String.raw`FB`} display={false}/> = -0.7</div>
      </List>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Modulated Effect with Feedback Path</h4>
      <img src={image07} style={{width:"20%"}}/>
      <div><ReactAudioPlayer src={svWhiteChorus} controls/></div>
      <div><b>Simple Flanger with Feedback</b></div>
      <List>
        <div><MathComponent tex={String.raw`f_{mod}`} display={false}/> = 1.5 Hz</div>
        <div><MathComponent tex={String.raw`A`} display={false}/> = 2 ms</div>
        <div><MathComponent tex={String.raw`M`} display={false}/> = 2 ms</div>
        <div><MathComponent tex={String.raw`BL`} display={false}/> = 1.0</div>
        <div><MathComponent tex={String.raw`FF`} display={false}/> = 0.7</div>
        <div><MathComponent tex={String.raw`FB`} display={false}/> = -0.7</div>
      </List>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Chorus: Implementation Variant</h4>
      <img src={image08}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Modulated Effects: Typical Variants</h4>
      <img src={image07}/>
      <List>
        <div>Add lowpass / transfer function to feedback path</div>
        <div>Use stereo feedback</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Modulated Effects: Modulation Signal</h4>
      <List fragment={true}>
        <div><b>Shape</b>
          <List>
            <div>Low frequency</div>
            <div><i>Sinusoidal</i> (typically) or <i>noise</i> (low pass filtered)</div>
          </List>
        </div>
        <div><b>Phase</b>
          <List>
            <div><b>Phase response</b> becomes perceptually relevant when
              <List>
                <div>2 or more signals are added</div>
                <div>Phase is time-variant</div>
                <div>Phase shift between channels (localization)</div>
              </List>
            </div>
          </List>
        </div>
      </List>
                   
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Modulated Effects: Phaser</h4>
      <List fragment={true}>
        <div>Sounds similar to delay line effects</div>
        <div>but: different implementation</div>
        <div className="row">
          <div className="col-50">
            Notch Filters
            <img src={image09}/>
          </div>
          <div className="col-50">
            All-pass Filters
            <img src={image10}/>
          </div>
        </div>
      </List>
      <Fragment>
        <div><ReactAudioPlayer src={svPhaser} controls/></div>
      </Fragment>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Modulated Effects: Wah-Wah</h4>
      <img src={image11}/>
      <List>
        <div>'Modulated' by pedal</div>
        <div>Often a biquad implementation</div>
        <div>Not really a bandpass
          <List>
            <div>Changes shape depending on frequency (resonant at low freqs, broad at high freqs)</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Summary</h4>
      <List fragment={true}>
        <div>Most modulated effects are based on <b>delay lines</b>:
          <List>
            <div>Input signal is added to a delayed version of itself</div>
            <div>Delay time is modulated</div>
          </List>
        </div>
        <div>Modulation is at very low frequencies (or manually controlled)
          <List><div>Often sinusoidal</div></List>
        </div>
        <div>Filters can also be used to create wanted phasing artifacts
          <List>
            <div>All-pass and notch filters for phaser</div>
            <div>Band-pass for wah-wah</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

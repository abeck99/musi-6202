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

import image00 from './class-20/img/image00.png'
import image01 from './class-20/img/image01.png'
import image02 from './class-20/img/image02.png'
import image03 from './class-20/img/image03.png'
import image04 from './class-20/img/image04.png'
import image05 from './class-20/img/image05.png'
import image06 from './class-20/img/image06.png'
import image07 from './class-20/img/image07.png'
import image08 from './class-20/img/image08.png'
import image09 from './class-20/img/image09.png'
import image10 from './class-20/img/image10.png'

import sv from './class-20/snd/sv.mp3'
import svRevDattorroCathed from './class-20/snd/svRevDattorroCathed.mp3'
import svRevDattorroMedHall from './class-20/snd/svRevDattorroMedHall.mp3'
import svRevDattorroPlate from './class-20/snd/svRevDattorroPlate.mp3'
import svRevMoorer from './class-20/snd/svRevMoorer.mp3'
import svRevSchroeder from './class-20/snd/svRevSchroeder.mp3'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 20: Reverb</div>
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
      <List fragment={true}>
        <div><b>Idea:</b>
          <List>
            <div>Artifically generate the impression of envelopment and reverberation</div>
            <div>Possibly allow to modify specific characteristics of the "modeled" room</div>
          </List>
        </div>
        <div><b>Approaches</b>
          <List>
            <div>(Digital) parametric reverberation (predecessors: spring, plate, room, ...)</div>
            <div>Fast convolution</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Artificial Reverberation: Room Impulse Response</h4>
      <img src={image00}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Room Impulse Response: Properties</h4>
      <div className="normal">Room impulse response is sum of (filtered and delayed) reflections</div>
      <List fragment="all">
        <div><b>Properties</b>
          <div className="small">
            <List>
              <div>Level decrease is approximately linear</div>
              <div>Density of reflections increases</div>
            </List>
          </div>
        </div>
        <div><b>Description</b>
          <div className="small">
            <List>
              <div>Reverberation time: time in seconds for a level decrease of 60 dB</div>
              <div>Depends mainly on
                  <List>
                    <div>Room <i>volume</i></div>
                    <div>Surface <i>area</i></div>
                    <div>Surface <i>absorption</i></div>
                  </List>
              </div>
              <div>Sabine: <MathComponent tex={String.raw`T_\mathrm{RT} = 0.163 \mathrm{m^{-1}} \frac{V}{\sum{\alpha_n\cdot S_n}}`}/></div>
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
      <h4>Room Simulation</h4>
      <img src={image01}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Traditionally Used Filters: Comb Filter</h4>
      <img src={image02}/>
      <MathComponent tex={String.raw`\eqalign{y(n) &=& b_0\cdot x(n) - a_N\cdot y(n-N)\\
	    		H(z) &=& \frac{b_0}{1-a_N\cdot z^{-N}}}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Traditionally Used Filters: All Pass Filter</h4>
      <img src={image03}/>
      <MathComponent tex={String.raw`\eqalign{y(n) &=& g\cdot x(n) + x(n-M) - g\cdot y(n-M)\\
				H(z) &=& \frac{z^{-M} + g}{1 + g\cdot z^{-M}}}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Reverberation: Schroeder</h4>
      <img src={image04}/>
      <Fragment>
        <div><b>Questions:</b></div>
        <List>
          <div>How to change the reverberation time?</div>
          <div>How to change the density?</div>
        </List>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Reverberation: Schroeder</h4>
      <List fragment={true}>
        <div><b>Problems</b>
          <List>
            <div>sound coloring (→ prime numbers)</div>
            <div>Periodicity</div>
          </List>
        </div>
        <div><b>Audio</b>
          <List>
            <div>Original: <ReactAudioPlayer src={sv} controls/></div>
            <div>Wet: <ReactAudioPlayer src={svRevSchroeder} controls/></div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Reverberation: Moorer</h4>
      <div className="row">
        <div className="col-60">
          <List>
            <div>Similar to Schroeder's model</div>
            <div>More comb filters</div>
            <div>Low pass in feedback paths</div>
            <div>Simple FIR model for early reflections</div>
          </List>
        </div>
        <div className="col-40">
          <img src={image05}/>
        </div>
      </div>
      <List>
        <div>Original: <ReactAudioPlayer src={sv} controls/></div>
        <div>Wet: <ReactAudioPlayer src={svRevMoorer} controls/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Other Reverberation Approaches: Gardner</h4>
      <img src={image06}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Other Reverberation Approaches: Jot (Feedback Delay Network)</h4>
      <img src={image07}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Dattorro</h4>
      <img src={image08}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Dattorro Examples</h4>
      <div>Intention: Plate Reverb Model (Dense, Bright, Fast Build-Up Time)</div>
      <List>
        <div>Original: <ReactAudioPlayer src={sv} controls/></div>
        <div>Wet (Plate): <ReactAudioPlayer src={svRevDattorroPlate} controls/></div>
        <div>Wet (Medium Hall): <ReactAudioPlayer src={svRevDattorroMedHall} controls/></div>
        <div>Wet (Cathedral): <ReactAudioPlayer src={svRevDattorroCathed} controls/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Early Reflections: Models</h4>
      <img src={image09}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Early Reflections: Models</h4>
      <img src={image10}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Quality Enhancements</h4>
      <List fragment={true}>
        <div><b>Multi-Channel Processing</b>
          <List>
            <div>Mono In → Mono Out</div>
            <div>Mono In → Stereo Out</div>
            <div>Stereo In → Stereo Out</div>
          </List>
        </div>
        <div><b>Delay Modulation</b>
          <List>
            <div>Increase "diffusity" and "liveliness</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Common Parameters</h4>
      <List fragment={true}>
        <div>Wetness</div>
        <div>Reverberation Time</div>
        <div>Pre-Delay</div>
        <div>Low Pass Cutoff</div>
        <div>Low Pass Slope</div>
        <div>Bass Boost</div>
        <div>Ratio of Early Reflection / Late Reverberation</div>
        <div>Diffusion, Liveliness, etc</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Summary</h4>
      <List fragment={true}>
        <div><b>Advantages</b> over convolution reverbs
          <List>
            <div>Fully parametrizable - not restricted to predefined IR library</div>
            <div>Works well with already somewhat reverberated recordings</div>
            <div>Lower workload (IIR vs. FIR)</div>
          </List>
        </div>
        <div><b>Disadvantages</b> over convolution reverbs
          <List>
            <div>Less realistic, no real-world IRs</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

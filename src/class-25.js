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

import image00 from './class-25/img/image00.png'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
    <div className="right">Part 25: Waveform Coding</div>
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
        <div><div><b>Goal</b></div>
          <div>Encode waveform in a way that the decoded waveform is as close to the original waveform as possible</div>
        </div>
        <div><b>Approaches</b>:
          <List>
            <div>PCM (analogue to digital</div>
            <div>Non-linear quantization</div>
            <div><b>DPCM & ADPCM</b></div>
          </List>
        </div>
      </List>
      <aside className="notes">
        <p>Waveform is lossy coding</p>
        <p>We look at time domain, and want to reconstruct the waveform, using something like squared difference between reconstructed and original waveform</p>
        <p>We might lose data, but don't expect user to notcie differences if they look similar enough</p>
        <p>ADC can be considered waveform coding, lots of things can be considered waveform coding</p>
        <p>But we are interested in non-linear quantization here</p>
        <p>Non-linear quantization is kind of like the inverse of entropy coding - </p>
        <p>Percetually non-linear quantization</p>
        <p>Differiental PCM, Adaptive Differiential PCM</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>DPCM</h4>
      <img src={image00}/>
      <aside className="notes">
        <p>Assume here a fixed predictor</p>
        <p>Quantized error</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <List>
        <div>Predictor is updated from <b>reconstructed signal</b></div>
        <div>No transmission of predictor coefficients necessary</div>
        <div><i>Reconstruction error</i>
          <MathComponent tex={String.raw`\eqalign{(i) &=& x(i) - y(i)\\
                            &=& x(i) - (\hat{x}(i) + e_\mathrm{Q}(i))\\
                            &=& e_\mathrm{P}(i) - e_\mathrm{Q}(i)\\
                            &=& q(i)}`}/>
        </div>
        <div>Reconstruction error <b>identical</b> to quantization error</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>ADPCM</h4>
      <List fragment = {true}>
        <div>ADPCM:
          <List>
            <div>Coefficient <b>adaptation for every block of samples</b></div>
            <div>Quantization step size (scale) adjuists to signal power</div>
          </List>
        </div>
        <div>Forward adaptive implementation
          <List>
            <div>Coefficients are <i>calculated from the input</i> signal and <i>transmitted</i></div>
            <div><i>Robust</i> against transmission errors</div>
            <div>Requires <i>additional side information</i> (coefficients)</div>
          </List>
        </div>
        <div>Backwards adaptive implementation
          <List>
            <div>Coefficients are <i>calculated from the reconstructed signal</i></div>
            <div><i>No additional side information</i></div>
            <div><i>Error propagation</i></div>
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
        <div>Waveform coding aims at efficiently representing the time domain signal</div>
        <div><b>Idea:</b> Non-redundant parts are quantized (lossy) according to transmission bandwidth</div>
        <div><b>Advantages</b>
          <List>
            <div>Low latency</div>
            <div>Low complexity</div>
            <div>High quality at high bitrates</div>
          </List>
        </div>
        <div><b>Disadvantage</b>
          <List>
            <div>Quality loss is attempted to minimize waveform similarity</div>
            <div>Not perceptually meaningful</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

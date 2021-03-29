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

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 22: Dynamics Processing</div>
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
        <div><b>Basic Principle:</b>
          <List>
            <div><i>Apply time-variant audio gain</i></div>
            <div>Gain depends on signal properties or external factors</div>
          </List>
        </div>
        <div><b>Applications</b>
          <List>
            <div>Avoid clipping (unknown input level)</div>
            <div>Suppress noise</div>
            <div>Adjust playback level (playlist)</div>
            <div>Decrease dynamic range (environmental noise)</div>
            <div>Increase loudness / energy (commericals)</div>
            <div>Adjust (recording) level</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Effects</h4>
      <List fragment={true}>
        <div>(Noise) <b>Gate</b>
          <List><div>Suppression of low levels in pauses</div></List>
        </div>
        <div><b>Compressor</b>
          <List><div>Reduction of the dynamic range</div></List>
        </div>
        <div><b>Expander</b>
          <List><div>Expansion of the dynamic range</div></List>
        </div>
        <div><b>Limiter</b>
          <List><div>Limitation of maximum gain</div></List>
        </div>
        <div><b>AGC</b> (Automatic Gain Control)
          <List><div>Slow adaptation of recording/playback gain</div></List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
        <h4>Overview</h4>
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

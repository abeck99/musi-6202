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

import React, { Component } from 'react';
import Section from 'lib/component/Section';

import Presentation from '/lib/template/Presentation';

import Counter from './example/component/Counter';
import SineWave from './example/component/SineWave';
import Table from './example/component/Table';
import Schedule from './example/component/Schedule';
import MyPieChart from './example/component/MyPieChart';

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment';

const slides = [
    () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 0: Meta</div>
        </div>
        <br/>
        <div className="center"><a href="class-00.html">Click here for Slides</a></div>
      </Section>
    ), () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 1: Intro</div>
        </div>
        <br/>
        <div className="center"><a href="class-01.html">Click here for Slides</a></div>
      </Section>
    ), () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 2: Signals</div>
        </div>
        <br/>
        <div className="center"><a href="class-02.html">Click here for Slides</a></div>
      </Section>
    ),     () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 3: Signal Descriptions</div>
        </div>
        <br/>
        <div className="center"><a href="class-03.html">Click here for Slides</a></div>
      </Section>
    ), () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 4: Signal Similarity - Correlation</div>
        </div>
        <br/>
        <div className="center"><a href="class-04.html">Click here for Slides</a></div>
      </Section>
    )
  ]

Presentation(slides, module.id)

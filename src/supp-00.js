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

import blockDiagram00 from './supp-00/img/blockDiagramLegend-00.png'
import blockDiagram01 from './supp-00/img/blockDiagramLegend-01.png'
import blockDiagram02 from './supp-00/img/blockDiagramLegend-02.png'
import blockDiagram03 from './supp-00/img/blockDiagramLegend-03.png'
import blockDiagram04 from './supp-00/img/blockDiagramLegend-04.png'
import blockDiagram05 from './supp-00/img/blockDiagramLegend-05.png'
import blockDiagram06 from './supp-00/img/blockDiagramLegend-06.png'
import blockDiagram07 from './supp-00/img/blockDiagramLegend-07.png'
import blockDiagram08 from './supp-00/img/blockDiagramLegend-08.png'
import blockDiagram09 from './supp-00/img/blockDiagramLegend-09.png'

import example00 from './class-14/img/image16.png'
import example01 from './supp-00/img/example00.png'
import example02 from './supp-00/img/example01.gif'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Supplement 00 - Block Diagram Legend</div>
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
        <div>There is no official standard for block diagrams</div>
        <div>Each domain has their own unoffical standard for block diagrams</div>
        <div>Audio domain<List><div>Low level sample manipulation</div><div>Higher level signal chains</div></List></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Adding</h4>
      <div className="normal">
      <Table leftSize={30}>
        <div><img src={blockDiagram00}/></div>
        <div className="normal"><div className="heading"><b>Addition</b></div> <MathComponent tex={String.raw`a(n) = b(n) + c(n)`}/></div>
        <div><img src={blockDiagram01}/></div>
        <div className="normal"><div className="heading"><b>Subtraction</b></div> <MathComponent tex={String.raw`a(n) = b(n) - c(n)`}/></div>
        <div><img src={blockDiagram02}/></div>
        <div className="normal"><div className="heading"><b>Summation</b></div> <MathComponent tex={String.raw`a(n) = b(n) - c(n)`}/></div>
        <div><img src={blockDiagram03}/></div>
        <div className="normal"><div className="heading"><b>Adding a Constant</b></div> <MathComponent tex={String.raw`a(n) = b(n) + 0.5`}/></div>
      </Table>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Multiplying</h4>
      <Table leftSize={30}>
        <div><img src={blockDiagram04}/></div>
        <div className="normal"><div className="heading"><b>Multiplication</b></div> <MathComponent tex={String.raw`a(n) = b(n) \cdot c(n)`}/></div>
        <div><img src={blockDiagram05}/></div>
        <div className="normal"><div className="heading"><b>Multiplication</b></div> (from circuit diagram) <MathComponent tex={String.raw`a(n) = b(n) - c(n)`}/></div>
        <div><img src={blockDiagram09}/></div>
        <div className="normal"><div className="heading"><b>Multiplying a Constant</b></div> <MathComponent tex={String.raw`a(n) = b(n) - c(n)`}/></div>
      </Table>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Delays</h4>
      <div className="row">
        <div className="col-50">
            <div><img src={blockDiagram06}/><img src={blockDiagram07}/></div>
            <div><div className="heading"><b>Delay</b></div>
              <List><div><i>Time Domain</i>: <MathComponent tex={String.raw`a(n) = b(n - 1)`} display={true}/></div>
                <div><i>Z-Plane</i>: <MathComponent tex={String.raw`A(z) = B(z) \cdot z^{-1}`} display={true}/></div>
              </List></div>
        </div>
        <div className="col-50">
          <div><img src={blockDiagram08}/></div>
          <div><div className="heading"><b>Arbitrary Delay</b></div>
            <List><div><i>Time Domain</i>: <MathComponent tex={String.raw`a(n) = b(n - N)`} display={true}/></div>
              <div>Z-Plane: <MathComponent tex={String.raw`A(z) = B(z) \cdot z^{-N}`} display={true}/></div>
            </List></div>
        </div>
      </div>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example</h4>
      <div className="row">
        <div className="col-40">
          <div><img src={example00} style={{width:"100%"}}/></div>
        </div>
        <div className="col-60">
          <List>
            <div><i>Time Domain</i> <MathComponent tex={String.raw`y(i) = x(i) \cdot \frac{1}{2} + x(i - 1) \cdot \frac{1}{2}`}/></div>
            <div><i>Z-Plane</i> <MathComponent tex={String.raw`\eqalign{Y(z) &=& X(z) \cdot \frac{1}{2} + X(z) \cdot z^{-1} \cdot \frac{1}{2} \\
&=& X(z) \cdot (0.5 + 0.5 \cdot z^{-1}) \\
H(z) &=& 0.5 + 0.5 \cdot z^{-1}}`}/></div>
          </List>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>High Level Block Diagrams</h4>
      <div>Just hope that it's clearly marked</div>
      <img src={example01}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>High Level Block Diagrams</h4>
      <img src={example02}/>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

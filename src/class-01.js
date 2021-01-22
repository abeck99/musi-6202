import React, { Component } from 'react';
import Section from 'lib/component/Section';

import Presentation from 'lib/template/Presentation';

import Counter from './example/component/Counter';
import SineWave from './example/component/SineWave';
import Table from './example/component/Table';
import Schedule from './example/component/Schedule';
import MyPieChart from './example/component/MyPieChart';

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment';

import dx7Image from './content/imgs/class-01/DX7.png';
import lexiconImage from './content/imgs/class-01/LexiconL224.png';
import daeImage from './content/imgs/class-01/SonyDAE300.png';
import midiImage from './content/imgs/class-01/Midi.png';
import tascamImage from './content/imgs/class-01/TascamDA88.png';
import cdImage from './content/imgs/class-01/cd.jpg';
import freqDomainImage from './content/imgs/class-01/FreqDomain.png';

const jsName = document.getElementById('reveal').attributes.jsName.value;
const isPdf = jsName.endsWith("-pdf")


const slides = [
    () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 1: Introduction</div>
        </div>
        <br/>
        <div className="center">Andrew Beck</div>
      </Section>
    ), [
      () => (
        <Section>
        <h3 className="center">Digital Technology - Production</h3>
        <br/>

        <h4 className="right">Sound Synthesis</h4>
        <Table leftSize='70'>
        <Schedule sizes={[85, 15]}
                  tableClass="smallest"
                  firstRowClass="heading"
                  evenRowClass="evenRow"
                  oddRowClass="oddRow"
                  items={[
                    ["Product", "Year"],
                    ["NED Synclavier Synthesizer/Sampler", "1979"],
                    ["Fairlight CMI Synthesizer/Sampler", "1979"],
                    ["Linn LM-1 Drumcomputer/Sampler", "1980"],
                    ["E-MU Emulator I Sampling Keyboard", "1981"],
                    ["Yamaha DX-7 Syntheziser", "1983"],
                  ]}/>
        <img src={dx7Image}/>
          </Table>
        <Fragment>
        <h4 className="left">Sound Processing / Effects</h4>
        <Table leftSize='30'>
        <img src={lexiconImage}/>
        <Schedule sizes={[85, 15]}
                  tableClass="smallest"
                  firstRowClass="heading"
                  evenRowClass="evenRow"
                  oddRowClass="oddRow"
                  items={[
                    ["Product", "Year"],
                    ["Lexicon Delta-T 101 Digital Delay", "1971"],
                    ["EMT 250 Digital Reverberation", "1976"],
                    ["Lexicon L224 Digital Reverberation", "1978"],
                  ]}/>
          </Table>
          </Fragment>
          </Section>
      ), () => (
        <Section>
        <h3 className="center">Digital Technology - Production</h3>
        <br/>
        <h4 className="right">Sound Editing</h4>
        <Table leftSize='70'>
        <Schedule sizes={[85, 15]}
                  tableClass="smallest"
                  firstRowClass="heading"
                  evenRowClass="evenRow"
                  oddRowClass="oddRow"
                  items={[
                    ["Product", "Year"],
                    ["Sony DAE-1100 Digital Audio Editor", "1971"],
                    ["Sony DAE-3000 Digital Audio Editor", "1976"],
                    ["Sonic Solutions Harddisk Editing", "1978"],
                  ]}/>
        <img src={daeImage}/>
          </Table>
          <Fragment>
        <h4 className="left">Other</h4>
        <Table leftSize='30'>
        <img src={midiImage}/>
        <Schedule sizes={[85, 15]}
                  tableClass="smallest"
                  firstRowClass="heading"
                  evenRowClass="evenRow"
                  oddRowClass="oddRow"
                  items={[
                    ["Product", "Year"],
                    ["MIDI Standard", "1983"],
                  ]}/>
          </Table>
          </Fragment>
      </Section>
      ),], () => (
        <Section>
        <h3 className="center">Digital Storage & Consumer</h3>
        <br/>

        <Table leftSize='70'>
        <Schedule sizes={[85, 15]}
                  tableClass="smallest"
                  firstRowClass="heading"
                  evenRowClass="evenRow"
                  oddRowClass="oddRow"
                  items={[
                    ["Professional", "Year"],
                    ["PCM-1600 (U-matic)", "1978"],
                    ["PCM-1 (Betamax)", "1978"],
                    ["Digital Multitrack (3M, Sony)", "1978"],
                    ["Alesis ADAT", "1991"],
                    ["Tascam DA-88", "1993"],
                  ]}/>
        <img src={tascamImage}/>
          </Table>
          <br/>
        <Fragment>
        <Table leftSize='30'>
        <img src={cdImage}/>
        <Schedule sizes={[85, 15]}
                  tableClass="smallest"
                  firstRowClass="heading"
                  evenRowClass="evenRow"
                  oddRowClass="oddRow"
                  items={[
                    ["Consumer", "Year"],
                    ["Compact Disk", "1982/83"],
                    ["Digital Audio Tape (DAT)", "1987"],
                    ["MiniDisc", "1991"],
                    ["Digital Compact Cassette", "1992"],
                    ["DVD-Video", "1997"],
                    ["DVD-Audio", "1999"],
                    ["SACD", "1999"],
                  ]}/>
          </Table>
          </Fragment>
          </Section>
      ),() => (
          <Section>
          <h3>Driving Forces for Digital Adoption</h3>
          <br/>
          <Table leftSize="30" bordered={true} tableClass="small" fragmented={true}>
          <div className="center"><b>Storage</b></div>
          <ul><li>Lossless Copying and Archiving of Digital Content</li></ul>
          <div className="center"><b>Editing & Processing</b></div>
          <ul><li>Splicing of Recordings</li><li>Fast Convolution</li><li>Granular Processing/Time-stretching/Pitch-shifting</li></ul>
          <div className="center"><b>Technical Characteristics</b></div>
          <ul><li>SNR, Distortion, Transfer Functions, ...</li></ul>
          </Table>
          <Fragment><div className="bordered framed">
          <ul className="small"><li><b>Dropping prices</b> for digital hardware and software</li></ul>
          </div></Fragment>
          
          </Section>
      ),() => (
          <Section>
          <h3>Current Trends</h3>
          <Table leftSize="30" bordered={true} tableClass="small" fragmented={true}>
          <div className="center"><b>Resolution & Data Rates</b></div>
          <ul><li>Lower data rates for compression formats</li></ul>
          <div className="center"><b>Spatialization & Environment</b></div>
          <ul><li>Formats: Multichannel, WFS, Object-based</li><li>Environmental Modelling</li><li>Sophisticated HRTF</li></ul>
          <div className="center"><b>Production Environments</b></div>
          <ul><li>Online Collaboration</li><li>Machine Musicianship</li></ul>
          </Table>
          <Fragment><div className="small">
          <ul><li>Content-based recommendation / Listening</li><li>Signal- & User-adaptive audio production</li>
          <li>Computer-aided editing, composition & performance</li><li>Interactive & Creative audio consumer software</li>
          <li>Deep AI production</li></ul>
          </div></Fragment>
          
          </Section>
      ),() => (
          <Section>
          <h3>Class Content</h3>
          <div className="row">
          <div className="col-50">
          <div className="bordered framed">
          <div className="centered">Properties of Signals</div>
          <SineWave dataId="sinewave"/></div>
          </div>
          <div className="col-50">
          <Fragment><div className="bordered framed">
          <div>Digitizing Signals</div>
          <SineWave dataId="sinewave" quant="4"/>
          </div></Fragment>
          </div>
          </div>
          <div className="row">
          <div className="col-50">
          <Fragment><div className="bordered framed">
          <div>Transforming Signals</div>
          <div><img style={{height: '150px'}} src={freqDomainImage}/></div>
          </div></Fragment>
          </div>
          <div className="col-50">
          <Fragment><div className="bordered framed">
          <div>Processing Signals</div>
          <SineWave dataId="sinewave" quant="4" offsets={[0, 20]}/>
          </div></Fragment>
          </div>
          </div>
          <Fragment><div className="bordered framed">
          <div>Encoding Signals</div>
          </div></Fragment>
          </Section>

      ),
  ]

Presentation(slides, module.id)

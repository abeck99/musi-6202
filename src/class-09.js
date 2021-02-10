import React, { Component } from 'react'
import Section from 'lib/component/Section'
import ReactAudioPlayer from 'react-audio-player';

import Presentation from 'lib/template/Presentation'

import Counter from './example/component/Counter'
import SineWave from './example/component/SineWave'
import Table from './example/component/Table'
import List from './example/component/List'
import Schedule from './example/component/Schedule'
import MyPieChart from './example/component/MyPieChart'
import Plot from './example/component/Plot'
import Animate from './example/component/Animate'

import spectrumSampling1 from './class-08/img/spectrum_sampling_1.png'
import spectrumSampling2 from './class-08/img/spectrum_sampling_2.png'

import image00 from './class-09/img/image00.png'
import image01 from './class-09/img/image01.png'
import image02 from './class-09/img/image02.png'
import image03 from './class-09/img/image03.png'

import samplingAmbi1 from './class-09/img/samplingAmbi-1.png'
import samplingAmbi2 from './class-09/img/samplingAmbi-2.png'
import samplingAmbi3 from './class-09/img/samplingAmbi-3.png'
import samplingAmbi4 from './class-09/img/samplingAmbi-4.png'
import samplingAmbi5 from './class-09/img/samplingAmbi-5.png'
import samplingAmbi6 from './class-09/img/samplingAmbi-6.png'
import samplingAmbi7 from './class-09/img/samplingAmbi-7.png'

import sineAliasing1 from './class-09/img/sinealiasing_1.png'
import sineAliasing2 from './class-09/img/sinealiasing_2.png'
import sineAliasing3 from './class-09/img/sinealiasing_3.png'

import sineAliasing1Snd from './class-09/snd/sinealiasing_1.mp3'
import sineAliasing2Snd from './class-09/snd/sinealiasing_2.mp3'
import sineAliasing3Snd from './class-09/snd/sinealiasing_3.mp3'

import bb1 from './class-09/snd/bigband.mp3'
import bb2 from './class-09/snd/bigbandds8.mp3'
import bb3 from './class-09/snd/bigbandds8_proper.mp3'

import as2 from './class-09/snd/alto-saxds8.mp3'
import as3 from './class-09/snd/alto-saxds8_proper.mp3'

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
        <div className="right">Part 9: Discretization, Part 1 - Sampling</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
        Digital signals can only be represented with a limited number of values
        <List fragment="all">
          <div><p>Time discretization:</p><b>Sampling</b></div>
          <div><p>Amplitude discretization:</p><b>Quantization</b></div>
        </List>
      <aside className="notes">
      <p>In this lecture we'll just talk about sampling</p>
      </aside>
      </Section>
  ),
  () => (
    <Section>
      <h3>Sampling</h3>
      <MathComponent tex={String.raw`T_S = \frac{1}{f_S}`}/>
      <img src={image00} style={{width:"50%"}}/>
      <Fragment>
        <div className="left small">
          Typical Sample Rates
          <List>
            <div>8-16kHz: Speech (phone)</div>
            <div>44.1-48kHz: Consumer audio/music</div>
            <div>Higher: Production audio</div>
          </List>
        </div>
      </Fragment>
      <aside className="notes">
      <p>Sampling rate related to sampling period</p>
      <p>Equidistant points</p>
      <p>All we need to know to play it back, is how far apart in seconds each sample is</p>
      <p>Speech bandwidth low compared to music</p>
      <p>Pro audio can be 192khz</p>
      </aside>
      </Section>
  ),
  () => (
    <Section>
      <h3>Sampling Ambiguity</h3>
      <Animate images={[samplingAmbi1, samplingAmbi2, samplingAmbi3, samplingAmbi4, samplingAmbi5, samplingAmbi6, samplingAmbi7]}
               animSpeed={2}/>
      <aside className="notes">
      <p>Just looking at the sample points, you think this must be a sine at this frequency</p>
      <p>You could be wrong though</p>
      <p>We cannot know what the input frequency is with sampling</p>
      </aside>
      </Section>
  ),
  () => (
    <Section>
      <MathComponent tex={String.raw`f_0 = [1, 5, 7 \mathrm{kHz}]`}/>
      <MathComponent tex={String.raw`f_S = 6 \mathrm{kHz}`}/>
      <img src={image01} style={{width: "80%"}}/>
      <aside className="notes">
      </aside>
      </Section>
  ),
  () => (
    <Section>
      <h3>Sampling Ambiguity: Wagon Wheel Effect</h3>
      <div className="row">
        <div className="col-70">
          <img src={image02}/>
        </div>
        <div className="col-30">
            <List fragment="all">
              <div><MathComponent tex={String.raw`f_{wheel} < \frac{f_s}{2}`} display={false}/> <i>Speeding up</i></div>
              <div><MathComponent tex={String.raw`\frac{f_s}{2} < f_{wheel} < f_s`} display={false}/> <i>Slowing down</i></div>
              <div><MathComponent tex={String.raw`f_{wheel} = f_s`} display={false}/> <i>Standing still</i></div>
              <div><MathComponent tex={String.raw`f_{wheel}`} display={false}/> far from <MathComponent tex={String.raw`f_s`} display={false}/> <i>No effect</i></div>
            </List>
        </div>
      </div>
      <aside className="notes">
      </aside>
      </Section>
  ),
  () => (
    <Section>
      <a href="http://youtu.be/uENITui5_jU">http://youtu.be/uENITui5_jU</a>
      <aside className="notes">
      </aside>
      </Section>
  ),
  () => (
    <Section>
      All this ambiguity is simply the intuitive understanding of aliasing.
      <div className="row">
        <div className="col-50">
          <MathComponent tex={String.raw`x(t) \mapsto X(\mathrm{j}\omega)`}/>
          <img src={spectrumSampling1}/>
        </div>
        <div className="col-50">
          <MathComponent tex={String.raw`x(t) \cdot \delta_T \mapsto X(\mathrm{j}\omega) \ast \delta_{\omega_T}`}/>
          <img src={spectrumSampling2}/>
        </div>
      </div>
      <aside className="notes">
      <p>To use the 6khz example, when you have a single 1khz tone, it will peak at 5, 7, 11, 13, etc</p>
      <p>No way to determine original pitch</p>
      <p>If we have a good filter, we could remove stuff from outside the desired bandwidth</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Sampling Theorem</h3>
      <br/>
      <div className="framed bordered">
        A sampled audio signal can be reconstructed <b>without loss of information</b> if the sample rate <MathComponent tex={String.raw`f_S`} display={false}/> is higher than twice the bandwidth <MathComponent tex={String.raw`f_{\mathrm{max}}`} display={false}/> of the signal.

        <br/>
        <MathComponent tex={String.raw`f_S > 2 \cdot f_{\mathrm{max}}`}/>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image03}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Aliasing Examples: Sine sweep 100-10k @ 24, 12, 6k</h3>
      <br/><br/>
      <div className="row">
        <div className="col-33">
          <img src={sineAliasing1} style={{width: "100%"}}/>
          <ReactAudioPlayer src={sineAliasing1Snd} controls/>
        </div>
        <div className="col-33">
          <Fragment>
            <img src={sineAliasing2} style={{width: "100%"}}/>
            <ReactAudioPlayer src={sineAliasing2Snd} controls/>
          </Fragment>
        </div>
        <div className="col-33">
          <Fragment>
            <img src={sineAliasing3} style={{width: "100%"}}/>
            <ReactAudioPlayer src={sineAliasing3Snd} controls/>
          </Fragment>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Aliasing Examples: Music</h3>
      <div className="small">
        <b>Big Band</b>
        <List>
          <div>Original (48 kHz): <ReactAudioPlayer src={bb1} controls/></div>
          <div>Samples discarded (6 kHz): <ReactAudioPlayer src={bb2} controls/></div>
          <div>Downsampled w/ Anti-aliasing filter (6 kHz): <ReactAudioPlayer src={bb3} controls/></div>
        </List>
        <br/>
        <b>Sax</b>
        <List>
          <div>Original (48 kHz): <i>Sorry, don't have it :(</i></div>
          <div>Samples discarded (6 kHz): <ReactAudioPlayer src={as2} controls/></div>
          <div>Downsampled w/ Anti-aliasing filter (6 kHz): <ReactAudioPlayer src={as3} controls/></div>
        </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Summary</h3>
      <div className="left">
        <p>Continuous Input Signal</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fas fa-long-arrow-alt-down"/></p>
        <ol>
          <li><p><b>Anti-Aliasing Filter</b></p> Filtered continuous input signal</li>
          <li><p><b>Sampling</b></p> Sampled input signal</li>
          <li><b>Reconstruction Filter</b></li>
        </ol>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fas fa-long-arrow-alt-down"/></p>
        <p>Continuous Output Signal</p>
      </div>
      <aside className="notes">
      <p>Reconstruction Filter is another filter to cut off periodic repetitions before final output signal</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Summary</h3>
      <div className="left">Sampling Theorem</div>
      <i>A Sampled audio signal can be reconstructed without loss of information if the sample rate <MathComponent tex={String.raw`f_S`} display={false}/> is higher than twice the bandwidth <MathComponent tex={String.raw`f_{\mathrm{max}}`} display={false}/> of the signal</i>
      <div className="small">
        <List>
          <div>Perfect reconstruction!</div>
          <div>Ensure accordance through filtering, otherwise aliasing (mirror frequencies)</div>
        </List>
      </div>

      <br/>
      <Fragment>
      Band of interest does not have to be base band (<MathComponent tex={String.raw`0 ... \frac{f_S}{2}`} display={false}/>), but any band (<MathComponent tex={String.raw`k \cdot \frac{f_S}{2} ... (k + 1) \cdot \frac{f_S}{2}`} display={false}/> as long as the <b>bandwidth</b> is not wider, and unwanted frequencies are filtered out.
      </Fragment>
      <aside className="notes">
      <p>Band of interest, just set anti-aliasing and reconstruction filters to focus on band of interest</p>
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

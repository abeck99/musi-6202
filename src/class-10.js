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

import QuantPlot from './class-10/component/QuantPlot.js'
import QuantPlot2 from './class-10/component/QuantPlot2.js'
import QuantPlot3 from './class-10/component/QuantPlot3.js'

import image00 from './class-10/img/image00.png'
import image01 from './class-10/img/image01.png'
import image02 from './class-10/img/image02.png'
import image03 from './class-10/img/image03.png'
import image04 from './class-10/img/image04.png'
import image05 from './class-10/img/image05.png'
import image06 from './class-10/img/image06.png'
import image07 from './class-10/img/image07.png'
import image08 from './class-10/img/image08.png'


import xq_sine16 from './class-10/audio/sine_quant_16bit.mp3'
import xq_sine12 from './class-10/audio/sine_quant_12bit.mp3'
import xq_sine8 from './class-10/audio/sine_quant_8bit.mp3'
import xq_sine6 from './class-10/audio/sine_quant_6bit.mp3'
import xq_sine4 from './class-10/audio/sine_quant_4bit.mp3'
import xq_sine2 from './class-10/audio/sine_quant_2bit.mp3'

import q_sine16 from './class-10/audio/sine_quant_16bit_Q.mp3'
import q_sine12 from './class-10/audio/sine_quant_12bit_Q.mp3'
import q_sine8 from './class-10/audio/sine_quant_8bit_Q.mp3'
import q_sine6 from './class-10/audio/sine_quant_6bit_Q.mp3'
import q_sine4 from './class-10/audio/sine_quant_4bit_Q.mp3'
import q_sine2 from './class-10/audio/sine_quant_2bit_Q.mp3'

import xq_speech16 from './class-10/audio/sqam_49_female_16bit.mp3'
import xq_speech12 from './class-10/audio/sqam_49_female_12bit.mp3'
import xq_speech8 from './class-10/audio/sqam_49_female_8bit.mp3'
import xq_speech6 from './class-10/audio/sqam_49_female_6bit.mp3'
import xq_speech4 from './class-10/audio/sqam_49_female_4bit.mp3'
import xq_speech2 from './class-10/audio/sqam_49_female_2bit.mp3'

import q_speech16 from './class-10/audio/sqam_49_female_16bit_Q.mp3'
import q_speech12 from './class-10/audio/sqam_49_female_12bit_Q.mp3'
import q_speech8 from './class-10/audio/sqam_49_female_8bit_Q.mp3'
import q_speech6 from './class-10/audio/sqam_49_female_6bit_Q.mp3'
import q_speech4 from './class-10/audio/sqam_49_female_4bit_Q.mp3'
import q_speech2 from './class-10/audio/sqam_49_female_2bit_Q.mp3'

import xq_music16 from './class-10/audio/bigband_16bit.mp3'
import xq_music12 from './class-10/audio/bigband_12bit.mp3'
import xq_music8 from './class-10/audio/bigband_8bit.mp3'
import xq_music6 from './class-10/audio/bigband_6bit.mp3'
import xq_music4 from './class-10/audio/bigband_4bit.mp3'
import xq_music2 from './class-10/audio/bigband_2bit.mp3'

import q_music16 from './class-10/audio/bigband_16bit_Q.mp3'
import q_music12 from './class-10/audio/bigband_12bit_Q.mp3'
import q_music8 from './class-10/audio/bigband_8bit_Q.mp3'
import q_music6 from './class-10/audio/bigband_6bit_Q.mp3'
import q_music4 from './class-10/audio/bigband_4bit_Q.mp3'
import q_music2 from './class-10/audio/bigband_2bit_Q.mp3'


import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
        <div className="right">Part 9: Discretization, Part 2 - Quantization</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      <p>Working in digital domain, moving from continuous to discrete</p>
      <p>Last time talked about sampling, what effects that has</p>
      <p>Today talking about quantization</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <p><b>Quantizer</b>:</p>
      <div className="left">Continuous <MathComponent tex={String.raw`\mapsto`} display={false}/> Discrete (pre-defined set of allowed values)</div>
      <Fragment>
      <List>
      <div>Quantization is <b>non-linear</b></div>
      <div>Quanitzation is <b>irreversible</b></div>
      </List>
      </Fragment>
      <Fragment>
      <img src={image00}/>
      <div className="row">
      <div className="col-10"></div>
      <div className="col-40">Mid-Rise</div>
      <div className="col-50">Mid-Tread</div>
      </div>
      </Fragment>
      <aside className="notes">
      <p>Unlike sampling, quantization is irreversible</p>
      <p>We have two fundamental types of quantization</p>
      <p>First "skips" 0, gives an even distribution</p>
      <p>Mid-tread will give slightly uneven distribution of amplitudes</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <QuantPlot width={900} height={400}/>
      <List>
      <div><b>Number of quantization steps:</b> <MathComponent tex={String.raw`\mathcal{M} = 16`} display={false}/></div>
      <div><b>Word Length (bits):</b> <MathComponent tex={String.raw`w = \log_2(\mathcal{M}) = 4\mathrm{bit}`} display={false}/></div>
      </List>
      <aside className="notes">
      <p>This is mid-tread, uneven distribution</p>
      <p>16 steps - 4 bit word, this is 4-bit quantizer leads to 16 steps</p>
      <p>Converting from steps to word size is simply log_2</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h3>Quanitzation: Word Length & Number of Steps</h3>
      <div className="row heading normal">
      <div className="col-30"></div><div className="col-20"><MathComponent tex={String.raw`w`} display={false}/></div>
      <div className="col-20"><MathComponent tex={String.raw`\mathcal{M} = 2^w`} display={false}/></div><div className="col-30"></div>
      </div>
      <Schedule sizes={[30, 20, 20, 30]}
                  tableClass="normal center"
                  evenRowClass="evenRow"
    oddRowClass="oddRow"
    items={[
      ["","1","2",""],
      ["","2","4",""],
      ["","4","16",""],
      ["","8","256",""],
      ["","12","4096",""],
      ["","16","65536",""],
      ["","20","1048576",""],
      ["","24","16777216",""],
    ]}/>
      <aside className="notes">
      <p>This is pretty trivial information</p>
      <p>Worth looking at how this scales up</p>
      <p>8-bit is typically the minimum</p>
      <p>16-bit is "CD quality", why when you zoom into wave form you typically don't see the quantization steps</p>
      <p>24-bit typically for production</p>
      <p>We'll revisit this bit depths and usage later</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h3>Quantization Error: Definition</h3>
      <img src={image01}/>
      <MathComponent tex={String.raw`q(i) = x_{\mathrm{Q}}(i) - x(i)`}/>
      <aside className="notes">
      <p>By quantizing, we introduce an error</p>
      <p>In this class, we'll label it "q", but there is no standard</p>
      <p>Simple to compute the error, subtract the value from the quantized</p>
      <p>n or i in this slide are all the same</p>
      <p>What is the maximum amplitude of the quantization error</p>
      <p>Half the step size</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h2>What is the maximum amplitude of the quantization error?</h2>
      <aside className="notes">
      <p>Half the step size</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h3>Maximum Amplitude of Quantization Error</h3>
      <div className="row">
      <div className="col-35">
      <img src={image02}/>
      </div>
      <div className="col-65">
      <QuantPlot2 width={600} height={300}/>
      </div>
      </div>
      <MathComponent tex={String.raw`|q(i)| \leq \frac{\Delta}{2}`}/>
      <aside className="notes">
      <p>It's not ALWAYS spiky like this, this is a special case of an input sinusodial</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h2>What is the PDF of the quantization error?</h2>
      <aside className="notes">
      <p>Will be symmetric</p>
      <p>Most of error is pretty uniformly distributed</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h3>PDF of Quantization Error</h3>
      <div className="left">Assuming <MathComponent tex={String.raw`\Delta \ll max(|x(i)|)`} display={false}/></div>
      <br/>
      <img src={image03} style={{width: "40%"}}/>
      <aside className="notes">
      <p>One way to think about it - we have the input signal PDF</p>
      <p>If we add up all the error inside the input PDF</p>
      <p>What is the maximum of this uniform PDF?</p>
      <p>1 / over delta</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>PDF of Quantization Error</h3>
      <div className="left">Assuming <MathComponent tex={String.raw`\Delta \ll max(|x(i)|)`} display={false}/></div>
      <br/>
      <img src={image04} style={{width: "60%"}}/>
      <aside className="notes">
      <p>Let's look at this a little closer</p>
      <p>What happens when the noise level is high</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <div className="normal">
      <div className="left">It can be shown that the PDF of the quanitzation error depends (without derivation)</div>
      <List overrides={{2: "fa-long-arrow-alt-right"}}>
      <div>on the <b>variance of the input</b> signal in relation to the step size</div>
      <div>on the <b>pdf of the input</b> signal</div>
      <div>will be <b>uniform for large values of</b> <MathComponent tex={String.raw`\frac{\sigma_X}{\Delta}`} display={false}/></div>
      </List>
      </div>
      <img src={image05} style={{width:"85%"}}/>
      
      <aside className="notes">
      <p>Depending on the input signal, the uniform distribution outlook breaks down</p>
      <p>The power of quantization error levels out</p>
      <p>Once the variance is higher than the step size, it levels out</p>
      <p>Moving forward, we assume that the step size is much smaller than the variance</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h2>How to computer the power <MathComponent tex={String.raw`W_\mathrm{Q}`} display={false}/> of Quantization Error?</h2>
      <aside className="notes">
      <p>Think back about PDFs, values we expect</p>
      <p>Mean, variance, etc</p>
      <p>What's the difference between variance and power?</p>
      <p>How do I compute variance?</p>
      <p>Sum of values minus expected value</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h5>Computing power <MathComponent tex={String.raw`W_\mathrm{Q}`} display={false}/> of Quantization Error</h5>
      <div className="row">
      <div className="col-20 normal">
      From PDF:
    </div>
      <div className="col-80 small">
      <div style={{position: "relative", left: "0px"}}>
      <MathComponent tex={String.raw`W_\mathrm{Q} = \int\limits_{-\frac{\Delta}{2}}^{\frac{\Delta}{2}}{q^2\cdot \underbrace{p_\mathrm{Q}(q)}_{\frac{1}{\Delta}}}\, dq`}/>
      </div>
      <Fragment>
      <div style={{position: "relative", left: "4px"}}>
      <MathComponent tex={String.raw`= \frac{1}{\Delta}\int\limits_{-\frac{\Delta}{2}}^{\frac{\Delta}{2}} q^2\, dq`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left: "6px"}}>
      <MathComponent tex={String.raw`= \frac{1}{\Delta} \left[\frac{1}{3}q^3\right]_{-\frac{\Delta}{2}}^{\frac{\Delta}{2}}`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left: "40px"}}>
      <MathComponent tex={String.raw`= \frac{1}{3\Delta}\left(\frac{\Delta^3}{8} + \frac{\Delta^3}{8}\right)`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left: "-45px"}}>
      <MathComponent tex={String.raw`= \frac{\Delta^2}{12}`}/>
      </div>
      </Fragment>
      </div>
      </div>
      <aside className="notes">
      <p>1/Delta * integral</p>
      <p>Quantization ONLY depends on step size</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h6>Quantization Error of Full-Scale Sinusoidal</h6>
      <QuantPlot3 width={900} height={500}/>
      <div className="row">
      <div className="col-50 center">Time</div>
      <div className="col-50 center">Frequency</div>
      </div>
      <aside className="notes">
      <p>Obviously quantization error becomes smaller with higher bit size</p>
      <p>We want to avoid this correlation</p>
      <p>Harmonic noise, think of sine becoming a square</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Audio Examples</h4>
      <div className="small">
      <div className="row">
      <div className="col-10"><MathComponent tex={String.raw`w`} display={false}/></div>
      <div className="col-15"><MathComponent tex={String.raw`x_{\mathrm{Q}, \mathrm{sine}}(i)`} display={false}/></div>
      <div className="col-15"><MathComponent tex={String.raw`q_{\mathrm{sine}}(i)`} display={false}/></div>
      <div className="col-15"><MathComponent tex={String.raw`x_{\mathrm{Q}, \mathrm{speech}}(i)`} display={false}/></div>
      <div className="col-15"><MathComponent tex={String.raw`q_{\mathrm{speech}}(i)`} display={false}/></div>
      <div className="col-15"><MathComponent tex={String.raw`x_{\mathrm{Q}, \mathrm{music}}(i)`} display={false}/></div>
      <div className="col-15"><MathComponent tex={String.raw`q_{\mathrm{music}}(i)`} display={false}/></div>
      </div>

      <br/>

      <div className="row">
      <div className="col-10">16</div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_sine16} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_sine16} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_speech16} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_speech16} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_music16} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_music16} controls/></div>
      </div>

      <div className="row">
      <div className="col-10">12</div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_sine12} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_sine12} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_speech12} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_speech12} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_music12} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_music12} controls/></div>
      </div>

      <div className="row">
      <div className="col-10">8</div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_sine8} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_sine8} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_speech8} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_speech8} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_music8} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_music8} controls/></div>
      </div>

    
      <div className="row">
      <div className="col-10">6</div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_sine6} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_sine6} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_speech6} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_speech6} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_music6} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_music6} controls/></div>
      </div>

      <div className="row">
      <div className="col-10">4</div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_sine4} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_sine4} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_speech4} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_speech4} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_music4} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_music4} controls/></div>
      </div>

      <div className="row">
      <div className="col-10">2</div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_sine2} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_sine2} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_speech2} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_speech2} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={xq_music2} controls/></div>
      <div className="col-15"><ReactAudioPlayer style={{width:"125px"}} src={q_music2} controls/></div>
      </div>
    
      </div>
    
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <h5>Quality Assessment of a Quantizer: Signal-to-Noise Ratio (SNR)</h5>
    <div className="normal">
    <List fragment={true}>
    <div>Power of the signal in relation to power of the (quantization) noise.
    <MathComponent tex={String.raw`SNR' = \frac{\text{signal energy}}{\text{noise energy}} = \frac{W_{\mathrm{S}}}{W_{\mathrm{Q}}}`}/>
    </div>
    <div>Often in decibel
    <MathComponent tex={String.raw`SNR = 10\cdot\log_{10}\left(\frac{W_{\mathrm{S}}}{W_{\mathrm{Q}}}\right)\; [\mathrm{dB}]`}/>
    </div>
    <div>SNR grows by:
    <div className="small"><List><div>Reducing the noise power</div><div>Increasing the signal power</div></List></div>
    </div>
    </List>
    </div>
      <aside className="notes">
      <p>SNR is a very established way to describe noise related to signal</p>
      <p>Decibels is not just the ratio, but the log</p>
      <p>Why?</p>
      <p>Not exactly how we perceive sound, but very good approximitation</p>
      <p>Perception is relative, similar to frequency, a lot of sensory input works this way</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <h4>Derive the SNR of quantized full-scale sinusoidal</h4>
    <div className="normal">
      <MathComponent tex={String.raw`SNR = 10 \cdot \log_{10}\left(\frac{W_\mathrm{S}}{W_\mathrm{Q}}\right)\; [\mathrm{dB}]`}/>
    </div>
    <div className="smaller">
    Use <MathComponent tex={String.raw`\sin^2(t) = \frac{1-\cos(2t)}{2}`} display={false}/>
    </div>
    <div className="small">
    <Fragment>
    <div style={{position: "relative", left: "0px"}}>
    <MathComponent tex={String.raw`W_\mathrm{S} = \frac{A^2}{2}\; \stackrel{\rightarrow}{\text{full-scale}} W_\mathrm{S} =\frac{(\Delta\cdot 2^{w-1})^2}{2}`}/>
    </div>
    <div style={{position: "relative", left: "-180px"}}>
    <MathComponent tex={String.raw`W_\mathrm{Q} = \frac{\Delta^2}{12}`}/>
    </div>
    </Fragment>
    <Fragment>
    <div style={{position: "relative", left: "-160px"}}>
    <MathComponent tex={String.raw`\frac{W_\mathrm{S}}{W_\mathrm{Q}} = \frac{3}{2}\cdot 2^{2w}`}/>
    </div>
    </Fragment>
    <Fragment>
    <div style={{position: "relative", left: "10px"}}>
    <MathComponent tex={String.raw`SNR = w\cdot 20\log_{10}\left(2\right) + 10\cdot\log_{10}\left(\frac{3}{2}\right)\; [\mathrm{dB}] `}/>
    </div>
    </Fragment>
    </div>
      <aside className="notes">
      <p>Full scale meaning going from -1 to 1</p>
      <p>Again, word length is the dependant part - SNR depends only on it</p>
      <p>Relationship in dB domain is linear</p>
      <p>If we increase w by 1, it goes up by about 6dB</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <h4>Derive the SNR of full-scale square wave</h4>
    <div className="normal">
      <MathComponent tex={String.raw`SNR = 10 \cdot \log_{10}\left(\frac{W_\mathrm{S}}{W_\mathrm{Q}}\right)\; [\mathrm{dB}]`}/>
    </div>
    <div className="small">
    <Fragment>
    <div style={{position: "relative", left: "0px"}}>
    <MathComponent tex={String.raw`W_\mathrm{S} = {A^2}\; \stackrel{\rightarrow}{\text{full-scale}} W_\mathrm{S} ={(\Delta\cdot 2^{w-1})^2}`}/>
    </div>
    <div style={{position: "relative", left: "-170px"}}>
    <MathComponent tex={String.raw`W_\mathrm{Q} = \frac{\Delta^2}{12}`}/>
    </div>
    </Fragment>
    <Fragment>
    <div style={{position: "relative", left: "-160px"}}>
    <MathComponent tex={String.raw`\frac{W_\mathrm{S}}{W_\mathrm{Q}} = {3}\cdot 2^{2w}`}/>
    </div>
    </Fragment>
    <Fragment>
    <div style={{position: "relative", left: "10px"}}>
    <MathComponent tex={String.raw`SNR = w\cdot 20\log_{10}\left(2\right) + 10\cdot\log_{10}\left(3\right)\; [\mathrm{dB}] `}/>
    </div>
    </Fragment>
    </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <div className="framed bordered">
    <h4>Signal-to-Noise Ratio</h4>
    <MathComponent tex={String.raw`SNR = 6.02\cdot w + c_{\mathrm{S}}\quad [\mathrm{dB}]`}/>
    <div className="normal">
    <List><div>Every addtional bit adds ~6 dB SNR</div><div>Constant <MathComponent tex={String.raw`C_\mathrm{S}`} display={false}/> depends on signal (scaling and PDF shape)</div></List>
    </div>
    </div>
    <br/>

    <Fragment>
    <div className="small">
    SNR for different input signal examples:
    <List>
    <div>Square wave (full scale): <MathComponent tex={String.raw`C_\mathrm{S} = 4.77 \mathrm{dB}`} display={false}/></div>
    <div>Sinusoidal wave (full scale): <MathComponent tex={String.raw`C_\mathrm{S} = 1.76 \mathrm{dB}`} display={false}/></div>
    <div>Rectangular PDF (full scale): <MathComponent tex={String.raw`C_\mathrm{S} = 0 \mathrm{dB}`} display={false}/></div>
    <div>Gaussian PDF (full scale <MathComponent tex={String.raw`= 4\sigma_g`} display={false}/>): <MathComponent tex={String.raw`C_\mathrm{S} = -7.27 \mathrm{dB}`} display={false}/></div>
    </List>
    </div>
    </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Quantization: Word Length and SNR</h4>
      <br/>
      <img src={image06}/>
      <aside className="notes">
             <p>Human dynamic range is about up to 120dB</p>
             <p>Non-linear quantization happens in floating-point</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <h4>SNR and Auditory Sensation Area</h4>
    <b>How many bits do we need?</b>
    <br/>
    <img src={image07}/>
      <aside className="notes">
      <p>Usually not lower than 34dB in the real world</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <div className="center"><b>How many bits do we need?</b></div>
    <img src={image07} style={{width: "40%"}}/>
    <List>
    <div>To cover the whole range of hearing: 20-24 bit</div>
    <div>Practically, a lower range is sufficientas the dynamic range of recordings has to be much lower</div>
    <div>In production with many processing and possible requantization steps, high resolution (if possible floating point) is recommended</div>
    </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <h4>SNR and Signal Scaling</h4>
    <img src={image08}/>
    <div className="left">Full Scale:</div>
    <List>
    <div>Absolute maximum before clipping</div>
    <div>Usually 1 (in floating point systems)</div>
    <div>Marks 0 dbFS</div>
    </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <div className="normal">
      <List fragment={true}>
        <div>Quantization is <b>non-linear</b> & <b>irreversible</b>
          <div className="small"><List><div>Information is lost</div><div>Error is introduced</div></List></div>
        </div>
        <div>Quantization <b>error</b>
          <div className="small"><List>
             <div>Power is determined by number of bits (word length)</div>
             <div>Is approxiamately white noise (float spectrum and uncorrelated to signal) when the signal power is much higher than the quantization step size</div>
             <div>Special severe case: clipping</div>
          </List></div>
        </div>
        <div><b>SNR</b> is used to assess quantizer quality
          <div className="small"><List>
             <div>Depends on both signal power and quant error power (ratio)</div>
             <div>Each additional bit gains 6 dB SNR</div>
             <div>Different signals with identical maximum amplitude yield different SNRs</div>
          </List></div>
        </div>
        <div><b>Typical word lengths</b> include
          <div className="small"><List>
             <div>8 bit: Phone</div>
             <div>16 bit: Consumer audio</div>
             <div>24 bit and higher: Production audio</div>
          </List></div>
        </div>
      </List>

    </div>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

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

import numberFormatsImg from './class-10/img/image06.png'

import image00 from './class-12/img/image00.png'
import image01 from './class-12/img/image01.png'
import image02 from './class-12/img/image02.png'
import image03 from './class-12/img/image03.png'
import image04 from './class-12/img/image04.png'

import sinePureSnd from './class-12/snd/sine.mp3'
import sineClipSnd from './class-12/snd/sine_clipped.mp3'
import sineWrapSnd from './class-12/snd/sine_wrapped.mp3'

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
        <div className="right">Part 12: Digital Number Formats</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h3>Word length and SNR</h3>
      <br/>
      <img src={numberFormatsImg}/>
      <br/>
      <b>How do we represent this in bits?</b>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Number Formats: Value Range</h4>
      <br/>
      <List>
      <div><b>Unnormalized</b>: <MathComponent tex={String.raw`-2^{w-1} ... 2^{w-1} - 1`} display={false}/>
      <div className="normal"><List>
      <div>Integer representation</div>
      <div>Non-symmetric step count for positive and negative values</div>
      <div>Used for transmission, etc.</div></List></div></div>

      <div><b>Normalized</b>: <MathComponent tex={String.raw`-1 ... 1`} display={false}/>
      <div className="normal"><List>
      <div>Used for floating point representations</div>
      <div>Word length independent</div>
      <div>Used for processing</div></List></div></div>

      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Number Representation</h4>
      <br/>
      <img src={image00} style={{width: "50%"}}/>
      <br/>
      <div className="normal">
      <List>
      <div>Least Significant Bit (LSB): <MathComponent tex={String.raw`b_0`} display={false}/> (usually on the right)</div>
      <div>Most Significant Bit (MSB): <MathComponent tex={String.raw`b_{w-1}`} display={false}/> (usually on the left)</div>
      </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <div className="small">
      <div className="row heading">
      <div className="col-20"><b>Format</b></div>
      <div className="col-50"><b>Amplitude</b></div>
      <div className="col-30"><b>Range (normalized)</b></div>
      </div>

      <div className="row evenRow">
      <div className="col-20">2-Complement</div>
      <div className="col-50"><MathComponent tex={String.raw`x_Q = -b_{w-1} + \sum\limits_{i=0}^{w-2}b_{i}2^{-(w-i-1)}`} display={false}/></div>
      <div className="col-30"><MathComponent tex={String.raw`-1\leq x_Q \leq 1-2^{-(w-1)}`} display={false}/></div>
      </div>
      
      <div className="row oddRow">
      <div className="col-20">Unsigned</div>
      <div className="col-50"><MathComponent tex={String.raw`x_Q = \sum\limits_{i=0}^{w-1}b_i2^{-(w-1)}`} display={false}/></div>
      <div className="col-30"><MathComponent tex={String.raw`0\leq x_Q \leq 1-2^{-w}`} display={false}/></div>
      </div>

      <br/>

      <div className="row">
      <div className="col-50">
      <List><div><MathComponent tex={String.raw`w`} display={false}/>: word length</div>
      <div><MathComponent tex={String.raw`b_i`} display={false}/>: <i>i</i>th bit</div>
      </List>
      </div>
      <div className="col-50">
      <img src={image00}/>
      </div>
      </div>

      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Clipping & Wrap-Around</h4>
      <br/>
      <div className="row">
      <div className="col-70">
      <img src={image01}/>
      </div>
      <div className="col-30">
      <ReactAudioPlayer src={sinePureSnd} controls/>
      </div>
      </div>
      <div className="row">
      <div className="col-70">
      <img src={image02}/>
      </div>
      <div className="col-30">
      <ReactAudioPlayer src={sineClipSnd} controls/>
      </div>
      </div>
      <div className="row">
      <div className="col-70">
      <img src={image03}/>
      </div>
      <div className="col-30">
      <ReactAudioPlayer src={sineWrapSnd} controls/>
      </div>
      </div>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Fixed Point and Floating Point: Number Formats and their Most Frequent Uses</h4>
      <br/><br/>
      <List fragment="all">
      <div><b>Unsigned Format</b>: Small word lengths (4...8 bit)</div>
      <div><b>2's Complement'</b>: File formats with higher word lengths (16...24 bit), some DSPs</div>
      <div><b>Floating Point</b>: Internal representation for processing</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Floating Point</h4>
      <div className="small">
      <MathComponent tex={String.raw`x_Q = M_G \cdot 2^{E_G}`}/>
      <List><div><MathComponent tex={String.raw`M_G`} display={false}/>: Normalized Mantissa <MathComponent tex={String.raw`0.5 \leq M_G < 1`} display={false}/></div>
      <div><MathComponent tex={String.raw`E_G`} display={false}/>: Exponent</div>
      </List>
      </div>

      <div className="normal"><b>32 Bit IEEE 754 Floating Format</b></div>
      <div className="small">

      <div className="row heading">
      <div className="col-5"></div>
      <div className="col-25"><b>Bit 31: Sign</b></div>
      <div className="col-35"><b>Bits 30-23: Exponent</b></div>
      <div className="col-30"><b>Bits 22-0: Mantissa</b></div>
      <div className="col-5"></div>
      </div>
      <div className="row evenRow">
      <div className="col-5"></div>
      <div className="col-25"><MathComponent tex={String.raw`s`} display={false}/></div>
      <div className="col-35"><MathComponent tex={String.raw`e_{7} ... e_{0}`} display={false}/></div>
      <div className="col-30"><MathComponent tex={String.raw`m_{22} ... m_{0}`} display={false}/></div>
      <div className="col-5"></div>
      </div>

      <Fragment>
      <div className="bigger left"><i>Exceptions</i></div>

      <div className="row heading">
      <div className="col-5"></div>
      <div className="col-30"><b>Type</b></div>
      <div className="col-20"><b><MathComponent tex={String.raw`E_G`} display={false}/></b></div>
      <div className="col-10"><b><MathComponent tex={String.raw`M_G`} display={false}/></b></div>
      <div className="col-30"><b>Value</b></div>
      <div className="col-5"></div>
      </div>
      <div className="row evenRow">
      <div className="col-5"></div>
      <div className="col-30">Normal</div>
      <div className="col-20"><MathComponent tex={String.raw`1 \leq E_G \leq 254`} display={false}/></div>
      <div className="col-10">Any</div>
      <div className="col-30"><MathComponent tex={String.raw`(-1)^s(0.m)2^{E_G-127}`} display={false}/></div>
      <div className="col-5"></div>
      </div>
      <div className="row oddRow">
      <div className="col-5"></div>
      <div className="col-30">NaN (Not a Number)</div>
      <div className="col-20"><MathComponent tex={String.raw`255`} display={false}/></div>
      <div className="col-10"><MathComponent tex={String.raw`\neq 0`} display={false}/></div>
      <div className="col-30">Undefined</div>
      <div className="col-5"></div>
      </div>
      <div className="row evenRow">
      <div className="col-5"></div>
      <div className="col-30">Infinity</div>
      <div className="col-20"><MathComponent tex={String.raw`255`} display={false}/></div>
      <div className="col-10"><MathComponent tex={String.raw`= 0`} display={false}/></div>
      <div className="col-30"><MathComponent tex={String.raw`\infty`} display={false}/></div>
      <div className="col-5"></div>
      </div>
      <div className="row oddRow">
      <div className="col-5"></div>
      <div className="col-30">Zero</div>
      <div className="col-20"><MathComponent tex={String.raw`0`} display={false}/></div>
      <div className="col-10"><MathComponent tex={String.raw`0`} display={false}/></div>
      <div className="col-30"><MathComponent tex={String.raw`0`} display={false}/></div>
      <div className="col-5"></div>
      </div>
      </Fragment>
    

      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <div className="row">
      <div className="col-50">
      <img src={image04} style={{width:"80%"}}/>
      </div>
      <div className="col-50">
      <List overrides={{1:"none",3:"none",4:"none",6:"none"}}>
      <div><b>High Exponent</b>:</div>
      <div>Large quantization error energy</div>
      <div><b>Low Exponent</b>:</div>
      <div>Small quantization error energy</div>
      <div></div>
      <div><b>Linear quantization</b>:</div>
      <div>Within one exponent</div>
      </List>
      </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h3>Summary</h3>
      <br/>
      <List>
      <div>Most common number representations
      <div className="normal"><List><div>2-Complement for high quality audio storage</div>
      <div>Floating point for high quality audio processing (non-linear quantization)</div></List></div>
      </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

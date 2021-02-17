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

import image00 from './class-11/img/image00.png'
import image01 from './class-11/img/image01.png'
import image02 from './class-11/img/image02.png'

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
        <div className="right">Part 11: Non-Linear Quantization</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Review: Linear Quantization SNR</h4>
      <MathComponent tex={String.raw`SNR = 6.02 \cdot w + c_S [\mathrm{dB}]`}/>
      <div className="normal"><MathComponent tex={String.raw`c_S`} display={false}/> depends on signal's PDF (and scaling)'</div>

      <div className="normal">
      <div className="row heading">
      <div className="col-20"></div>
      <div className="col-30"><b>PDF</b></div>
      <div className="col-30"><b>SNR</b></div>
      <div className="col-20"></div>
      </div>

      <div className="row evenRow">
      <div className="col-20"></div>
      <div className="col-30">Square Wave</div>
      <div className="col-30"><MathComponent tex={String.raw`c_S = 4.8`} display={false}/></div>
      <div className="col-20"></div>
      </div>

      <div className="row oddRow">
      <div className="col-20"></div>
      <div className="col-30">Sine Wave</div>
      <div className="col-30"><MathComponent tex={String.raw`c_S = 1.8`} display={false}/></div>
      <div className="col-20"></div>
      </div>
      
      <div className="row evenRow">
      <div className="col-20"></div>
      <div className="col-30">Rectangle</div>
      <div className="col-30"><MathComponent tex={String.raw`c_S = 0`} display={false}/></div>
      <div className="col-20"></div>
      </div>

      <div className="row oddRow">
      <div className="col-20"></div>
      <div className="col-30">Triangle</div>
      <div className="col-30"><MathComponent tex={String.raw`c_S \approx -3`} display={false}/></div>
      <div className="col-20"></div>
      </div>

      <div className="row evenRow">
      <div className="col-20"></div>
      <div className="col-30">Gaussian</div>
      <div className="col-30"><MathComponent tex={String.raw`c_S \approx -7`} display={false}/></div>
      <div className="col-20"></div>
      </div>

      <div className="row oddRow">
      <div className="col-20"></div>
      <div className="col-30">LaPlace</div>
      <div className="col-30"><MathComponent tex={String.raw`c_S \approx -9`} display={false}/></div>
      <div className="col-20"></div>
      </div>

      <div className="row evenRow">
      <div className="col-20"></div>
      <div className="col-30">Speech</div>
      <div className="col-30"><MathComponent tex={String.raw`c_S \approx -10 ... -15`} display={false}/></div>
      <div className="col-20"></div>
      </div>
      </div>

      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>How can we quantize frequent signal values at higher resolution?</h4>
      <Fragment>
      <div className="small">
      <p><b>Approach 1</b></p>
      <ol><li>Flatten PDF (companding)</li>
      <li>Linear quantization</li>
      <li>Extract signal (expanding)</li></ol>
      <br/>
      </div>
      <div className="center"><img src={image00} style={{width:"60%"}}/></div>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>How can we quantize frequent signal values at higher resolution?</h4>
      <div className="small">
      <p><b>Approach 1</b></p>
      <ol><li>Flatten PDF (companding)</li>
      <li>Linear quantization</li>
      <li>Extract signal (expanding)</li></ol>
      <br/>
      <p><b>Approach 2</b></p>
      <ol><li>Adapt quantization step size to PDF</li></ol>
      <br/>
      <Fragment><div className="center">Both approaches are equivalent in their result</div></Fragment>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>A-Law Quantization (ITU-T G.711)</h4>
      <div className="normal">
      <MathComponent tex={String.raw`F(x)	= sign(x)\left\lbrace
					\begin{array}{ll} 
			          \frac{A|x|}{1+\log(A)}, & |x| \leq \frac{1}{A}\\ 
			          \frac{1+\log(A|x|)}{1+\log(A)}, & \frac{1}{A} \leq |x| \leq 1\\ 
          			\end{array} 
          			\right.`}/>
      <MathComponent tex={String.raw`F^{-1}(y)	= sign(y)\left\lbrace
					\begin{array}{ll} 
			          \frac{|y|(1+\log(A))}{A}, & |y| \leq \frac{1}{1+\log(A)}\\ 
			          \frac{\exp\big(|y|(1+\log(A))-1\big)}{A}, & \frac{1}{1+\log(A)} \leq |y| \leq 1\\ 
          			\end{array} 
          			\right.`}/>

      <div className="left">with <MathComponent tex={String.raw`A = 87.7`} display={false}/></div>
      </div>

      <br/>
      <Fragment>
      <div className="normal">
      <List><div>Linear and high resolution for small amplitudes</div>
      <div>Log and increasingly low resolution for high amplitudes</div></List>
      </div>
      </Fragment>

      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>A-Law Quantization: Visualization</h4>
      <img src={image01}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>A-Law Quantization: SNR</h4>
      <img src={image02}/>
      <List><div><b>Range I</b>: SNR is linear regardless of input level</div>
      <div><b>Range II</b>: SNR increases with input level</div></List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>μ-Law Quantization (ITU-T G.711)</h4>
      <div className="normal">
      <MathComponent tex={String.raw`F(x)	= sign(x)\frac{\log(1+\mu|x|)}{\log(1+\mu)}`}/>
      <MathComponent tex={String.raw`F^{-1}(y)	= sign(y)\frac{1}{\mu}\left((1+\mu)^{|y|}-1\right)`}/>
      <br/>
      <Fragment>
      <div className="big">
      Compared to A-Law:
      <List><div>Higher dynamic range</div>
      <div>Higher error at small amplitudes</div></List>
      </div>
      </Fragment>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Summary</h4>
      <List>
      <div><b>Advantages</b> of non-linear quantization
      <div className="normal"><List overrides={{2:"fa-long-arrow-alt-right"}}><div>Takes advantage of non-uniform distriubtion of input</div>
      <div>In line with non-linear loudness perception of the ear</div>
      <div>Similar perceptual quality as higher resolution linear quantization</div></List></div></div>
      </List>
      <br/>
      <List>
      <div><b>Disadvantages</b>
      <div className="normal"><List overrides={{1:"fa-long-arrow-alt-right"}}><div>Processing not easily implemented in non-linear amplitude space</div>
      <div>Only used for transmission</div></List></div></div>

      </List>
    
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

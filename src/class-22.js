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

import image00 from './class-22/img/image00.png'
import image01 from './class-22/img/image01.png'
import image02 from './class-22/img/image02.png'
import image03 from './class-22/img/image03.png'
import image04 from './class-22/img/image04.png'
import image05 from './class-22/img/image05.png'
import image06 from './class-22/img/image06.png'
import image07 from './class-22/img/image07.png'
import image08 from './class-22/img/image08.png'
import image09 from './class-22/img/image09.png'
import image10 from './class-22/img/image10.png'
import image11 from './class-22/img/image11.png'
import image12 from './class-22/img/image12.png'
import image13 from './class-22/img/image13.png'
import image14 from './class-22/img/image14.jpg'
import image15 from './class-22/img/image15.png'
import graph00 from './class-22/img/graph00.png'
import graph01 from './class-22/img/graph01.png'
import graph02 from './class-22/img/graph02.png'
import graph03 from './class-22/img/graph03.png'
import graph04 from './class-22/img/graph04.png'
import graph05 from './class-22/img/graph05.png'
import graph06 from './class-22/img/graph06.png'
import graph07 from './class-22/img/graph07.png'

import svdynamics_1 from './class-22/snd/svdynamicsresponsecurve_1.mp3'
import svdynamics_2 from './class-22/snd/svdynamicsresponsecurve_2.mp3'
import svdynamics_3 from './class-22/snd/svdynamicsresponsecurve_3.mp3'
import svdynamics_4 from './class-22/snd/svdynamicsresponsecurve_4.mp3'
import sv_gate from './class-22/snd/sv_Gate.mp3'
import sv_compressor from './class-22/snd/sv_Compressor.mp3'
import sv_expander from './class-22/snd/sv_Expander.mp3'
import sv_limiter from './class-22/snd/sv_Limiter.mp3'

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
          <List fragment={true}>
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
        <img src={graph00}/>
        <Fragment>
          <div>Computation of <MathComponent tex={String.raw`g(i)`} display={false}/> usually depends on</div>
          <ol>
            <li>Input signal <i>level</i></li>
            <li>Properties & characteristics of the dynamics processor</li>
            <li>Time-based control mechanism</li>
          </ol>
        </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Level Detection</h4>
      <div className="normal">
        <List fragment={true}>
          <div>Typical measures
            <div className="small">
              <List fragment={true}>
                <div><div><b>Peak:</b></div> <div>Physical measure of maximum amplitude</div></div>
                <div><div><b>RMS:</b></div> <div>Physical measure of power level</div></div>
                <div><div><b>Loudness Model:</b></div> <div>Models of loudness perception (dBA, Zwicker, BS.1770)</div></div>
              </List>
            </div>
          </div>
          <div><b>Level Computation</b>
            <div className="small">
              <MathComponent tex={String.raw`v_\mathrm{dB}(i) = 20\cdot\log_{10}\left(\frac{v(i)}{v_0}\right)`}/>
              <List>
                <div><div><MathComponent tex={String.raw`v_0`} display={false}/>: Reference constant (0 dB point)</div>
                <div>Digital: <MathComponent tex={String.raw`v_0 = 1 \Rightarrow \mathrm{dBFS}`} display={false}/></div></div>
                <div>Scaling factor: <MathComponent tex={String.raw`1 \mathrm{dB} \approx \mathrm{JNDL}`} display={false}/></div>
              </List>
            </div>
          </div>
        </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Perceptual Loudness</h4>
      <div className="normal">
        <div>Equal sized steps on the decibel scale not perceived as equal-sized loudness steps</div>
        <br/>
        <div className="row">
          <div className="col-50">
            <Fragment>
              <div>Perceptual loudness depends on</div>
              <List fragment={true}>
                <div>Frequency</div>
                <div>Cochlear Resolution</div>
                <div>Masking Effects</div>
              </List>
            </Fragment>
          </div>
          <div className="col-50">
            <Fragment>
              <img src={image15}/>
            </Fragment>
          </div>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Level Detection: Root Mean Square</h4>
      <MathComponent tex={String.raw`v_{\mathrm{RMS}}(n) = \sqrt{\frac{1}{\mathcal{K}}\sum\limits_{i=i_{\mathrm{s}}(n)}^{i_{\mathrm{e}}(n)}{x(i)^2}}`}/>
      <img src={graph07}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>RMS: Sample-by-Sample Processing</h4>
      <List fragment={true}>
        <div>Reduce computational complexity
          <MathComponent tex={String.raw`\eqalign{v^2_{\mathrm{RMS}}(n) &=& \frac{x(i_{\mathrm{e}}(n))^2 - x(i_{\mathrm{s}}(n-1))^2}{\mathcal{K}} + v^2_{\mathrm{RMS}}(n-1) \\
						v_{\mathrm{RMS}}(n)	&=& \sqrt{v^2_{\mathrm{RMS}}(n)}}`}/>
        </div>
        <div>Single Pole approximation (no buffering)
          <MathComponent tex={String.raw`\eqalign{v_\mathrm{tmp}(i)	&=& \alpha\cdot v_\mathrm{tmp}(i-1) + (1-\alpha)\cdot x(i)^2\\
						v^*_{\mathrm{RMS}}(i)		&=& \sqrt{v_\mathrm{tmp}(i)}}`}/>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Level Detection: Weighted RMS</h4>
      <img src={graph01} display={{width:"50%"}}/>
      <Fragment>
        <div className="small">
          <List><div>A, B, C weighting</div><div>RLB (BS.1770)</div><div>...</div></List>
        </div>
        <div className="center"><img src={graph06} display={{widht:"35%"}}/></div>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Peak Detection: PPM (Peak Program Meter)</h4>
      <img src={graph02}/>
      <Fragment>
        <div><b>Attack State</b> (where <MathComponent tex={String.raw`|x(i)| > v_{\mathrm{PPM}}(i-1)\Rightarrow\lambda = 0`} display={false}/>)</div>
      </Fragment>
      <Fragment>
        <MathComponent tex={String.raw`\eqalign{v_{\mathrm{PPM}}(i) &=& \alpha_\mathrm{AT}\cdot\big(|x(i)| - v_{\mathrm{PPM}}(i-1)\big) + v_{\mathrm{PPM}}(i-1)\nonumber\\
								&=& \alpha_\mathrm{AT}\cdot |x(i)| + (1-\alpha_\mathrm{AT})\cdot v_{\mathrm{PPM}}(i-1)}`}/>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>PPM Visualization</h4>
      <img src={graph03}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Response Curve: Limiter</h4>
      <img src={image00}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image01}/>
      <div>Param <i>LT</i> = -9 dB <ReactAudioPlayer src={svdynamics_1} controls/></div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Response Curve: Compressor</h4>
      <img src={image02}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image03}/>
      <div>Param <i>CT</i> = -9 dB <ReactAudioPlayer src={svdynamics_2} controls/></div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Response Curve: Expander</h4>
      <img src={image04}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image05}/>
      <div>Param <i>ET</i> = -6 dB <ReactAudioPlayer src={svdynamics_3} controls/></div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Response Curve: Noise Gate</h4>
      <img src={image06}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image06}/>
      <div>Param <i>NT</i> = -12 dB: <ReactAudioPlayer src={svdynamics_4} controls/></div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Compressor: Mathematical Description</h4>
      <div className="normal">
        <div>Logarithmic description, nonlinear part</div>
        <List fragment={true}>
          <div><b>Output</b>: <MathComponent tex={String.raw`Y = g(X) + X \mathrm{[dB]}`} display={false}/></div>
          <div><b>Ratio</b>: <MathComponent tex={String.raw`R = \frac{\Delta L_i}{\Delta L_o}`} display={false}/></div>
          <div><b>Slope</b>: <MathComponent tex={String.raw`CS = 1 - \frac{1}{R}`} display={false}/></div>
          <div><b>Linear Equation</b>: <MathComponent tex={String.raw`Y = \frac{1}{R}(X - CT) + CT`} display={false}/></div>
          <div><b>Gain</b> (<MathComponent tex={String.raw`g = Y - X`} display={false}/>):
            <MathComponent tex={String.raw`\eqalign{g &=& \frac{1}{R}(X-CT) + CT - X\\
				  &=& \left(1-\frac{1}{R}\right)\cdot (CT-X)\\
                  &=& CS\cdot(CT-X)}`}/>
          </div>
        </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Mathematical Description: Limiter vs Compressor</h4>
      <div className="normal">
        <div>Logarithmic description, nonlinear part</div>
        <List fragment={true} fullWidth={true}>
          <div><b>Limiter</b>
            <div className="center small"><MathComponent tex={String.raw`\eqalign{R &=& \infty\\
Y &=& LT\\
g &=& LT-X}`}/></div>
          </div>
          <div><b>Compressor</b>
            <div className="center small"><MathComponent tex={String.raw`\eqalign{R &>& 1\\
Y &=& \frac{1}{R}(X - CT) + CT\\
g &=& \left(1 - \frac{1}{R} \right) \cdot (CT - X)}`}/>
          </div></div>
        </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Mathematical Description: Expander vs Gate</h4>
      <div className="normal">
        <div>Logarithmic description, nonlinear part</div>
        <List fragment={true} fullWidth={true}>
          <div><b>Expander</b>
            <div className="center small"><MathComponent tex={String.raw`\eqalign{R &<& 1\\
Y &=& \frac{1}{R}(X - ET) + ET\\
g &=& \left( 1 - \frac{1}{R} \right) \cdot (ET - X)}`}/></div>
          </div>
          <div><b>Gate</b>
            <div className="center small"><MathComponent tex={String.raw`\eqalign{R &=& 0\\
Y &=& -\infty\\
g &=& -\infty}`}/></div>
          </div>
        </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Smoothing: Attack and Release</h4>
      <img src={graph04} display={{width: "70%"}}/>
      <List>
        <div><MathComponent tex={String.raw`\alpha_{AT}`} display={false}/>: Attack constant</div>
        <div><MathComponent tex={String.raw`\alpha_{RT}`} display={false}/>: Release constant</div>
      </List>
      <Fragment>
        <MathComponent tex={String.raw`\eqalign{g(n) &=& \alpha\cdot(f(n)-g(n-1)) + g(n-1)\nonumber\\
			&=& \alpha f(n) + (1-\alpha)\cdot g(n-1)}`}/>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image09}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Gain Visualization: Compressor + Expander</h4>
      <img src={image11} style={{width:"60%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Audio Examples</h4>
      <List>
        <div>Gate: <ReactAudioPlayer src={sv_gate} controls/></div>
        <div>Expander: <ReactAudioPlayer src={sv_expander} controls/></div>
        <div>Compressor: <ReactAudioPlayer src={sv_compressor} controls/></div>
        <div>Limiter: <ReactAudioPlayer src={sv_limiter} controls/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Variants, I</h4>
      <div className="normal">
      <List fragment={true}>
        <div><b>Attack & release constant selection</b>
          <List><div>Depending on "abruptness" of change</div></List>
        </div>
        <div><b>Hold Time</b>
          <List><div>Before release, hold gain constant (avoid pumping with low frequency signals)</div></List>
        </div>
        <div><b>Oversampling</b>
          <List><div>High time resolution for peak detection</div></List>
          <div className="center"><img src={image12} style={{width:"60%"}}/></div>
        </div>
      </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Variants, II</h4>
      <div className="normal">
      <List fragment={true}>
        <div><b>Stereo Link</b>
          <List><div>Consider both channels (avoid level-dependent changes of stereo image)
                  <List fragment="all">
                    <div>One master channel (left or right)</div>
                    <div>Mean of both channels</div>
                    <div>Channel with higher level (max)</div>
                  </List>
                </div></List>
        </div>
        <div><b>Soft Knee</b>
          <div className="row">
            <div className="col-70">
              <List fragment={true}>
                <div>Smooth crossover from linear area to compressed area</div>
                <div>Potentially notcieable with very short attack times, high compression ratios</div>
              </List>
            </div>
            <div className="col-30">
              <img src={image13}/>
            </div>
          </div>
        </div>
      </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Variants, III</h4>
      <div className="normal">
      <List fragment={true}>
        <div><b>Side Chain</b>
          <List><div>Choose different input signal for level control ("ducking")</div></List>
        </div>
        <div><b>Look-ahead</b>
          <List><div>Introduce higher delay in signal path
                  <List>
                    <div>Shift gain modification in time</div>
                    <div>Combine "future" measurement with current</div>
                  </List>
                </div>
          </List>
        </div>
        <div><b>Multi-Band Compression</b>
          <List fragment={true}>
            <div>Apply one compressor to each frequency band</div>
            <div>Advantages:
              <List>
                <div>Avoid pumping: varying level in one band (e.g. bass drum) does not influence gain of other bands</div>
                <div>Maximize power, overall loudness</div>
              </List>
            </div>
          </List>
        </div>
      </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Parameter Ranges</h4>
      <List>
        <div><b>Threshold</b>: -120 ... 0 dB</div>
        <div><b>Ratio</b>: 0.05 ... 20 (Limiter: <MathComponent tex={String.raw`\infty`} display={false}/></div>
        <div><b>Attack</b>: 0 ... 10 ms</div>
        <div><b>Release</b>: 20 ... 300 ms</div>
        <div><b>Hold</b>: 0 ... 10 ms</div>
        <div><b>Stereo-Link</b>: On / Off</div>
        <div><b>Oversampling</b>: 1 ... 8</div>
        <div><b>Look-Ahead</b>: 0 ... 500 ms</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Dynamic Range Target</h4>
      <div className="center"><img src={image14}/></div>
      <div><a href="http://dr.loudness-war.info/">Dynamic Range DB</a></div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Summary</h4>
      <div>Dynamics processing systems are:</div>
      <List fragment={true}>
        <div><div><b>Time Variant</b>:</div><div>Gain changes over time</div></div>
        <div><div><b>Signal adaptive</b>:</div><div>Gain depends on (input) signal</div></div>
        <div><div>Sometimes <b>non-linear</b>:</div><div>At very short attack times (limiting)</div></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

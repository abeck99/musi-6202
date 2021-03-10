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

import image00 from './class-16/img/image00.png'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 16: Real-time and Blocking</div>
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
        <div>Many audio processing systems are real-time systems</div>
        <div>This includes
          <List>
            <div>Most audio plugins,</div>
            <div>Studio Hardware effects, etc</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Real-Time System (Wikipedia)</h4>
      <div className="normal">
      <div className="framed bordered">
        In a real-time digital signal processing (DSP) process, the analyzed (input) and generated (output) samples can be processed (or generated) continuously in the time it takes to input and output the same set of samples independent of the processing delay
      </div>
      <List fragment="all">
        <div>"processing delay and resources must be bounded even if the processing continues for an unlimited time"</div>
        <div>"mean processing time per sample is no greater than the sampling period, which is the reciprocal of the sampling rate"</div>
        <div>"perform all computations continuously at a fast enough rate that the output (...) keeps up with changes in the input signal"</div>
      </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Properties</h4>
      <List>
        <div><b>Performance</b>
          <div className="normal">
            <List>
              <div>Processing time for one block ≤ block length</div>
              <div>Real-time computing does not necessarily mean high performance computing!</div>
            </List>
          </div>
        </div>
        <div><b>Causality</b>
          <div className="normal">
            <List>
              <div>System output/state depends only on current and prior values</div>
              <div><i>No</i> knowledge of future samples</div>
            </List>
          </div>
        </div>
        <div><b>Latency</b>
          <div className="normal">
            <List>
              <div>Delay of a system between the stimulus and the response to this stimulus</div>
              <div><i>Algorithmic delay</i> (FFT-Processing, Look-Ahead, ...)</div>
              <div><i>Interface delay</i> (Block Length, ADC, DAC)</div>
            </List>
          </div>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Block based Processing</h4>
      <div>Processing of <i>blocks of samples</i> vs. individual samples</div>
      <img src={image00} style={{width: "55%"}}/>
      <div><b>Reasons</b></div>
      <List>
        <div>Block based algorithms (FFT, ...)</div>
        <div>Audio hardware characteristics</div>
        <div>Efficiency (SIMD, memory allocation)</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Block Sizes</h4>
      <List>
        <div>Typical block sizes can range from 1...thousands of samples</div>
        <div>Often powers of 2</div>
        <div>In many DAWs and some drivers the <b>block size varies</b></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Implications of Real-Time Systems on Effects</h4>
      <b>Can pitch shifting theoretically be implemented as real-time system?</b>
      <Fragment>
        <b>Can time stretching theoretically be implemented as real-time system?</b>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>In-Place Processing</h4>
      <div>Samples of the input block are replaced with output block</div>
      <div className="row">
        <div className="col-45">
          <div className="heading">
            Pro
          </div>
          <List>
            <div>Resource friendly, memory allocation for output buffer</div>
          </List>
        </div>
        <div className="col-10"></div>
        <div className="col-45">
          <div className="heading">
            Con
          </div>
          <List>
            <div>Original input data connot be used anymore</div>
          </List>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Blocking</h4>
      <div className="normal">
      <List fragment={true}>
        <div><b>Time-Stamps</b>
          <div className="small">
            <List>
              <div>Blocking can be considered similar to down-sampling</div>
              <div><i>What time stamps to assign to each block?</i>
                <div className="small">
                  <List>
                    <div>Beginning of each block</div>
                    <div>Center of each block</div>
                  </List>
                </div>
              </div>
            </List>
          </div>
        </div>

        <div><b>Initialization</b>
          <div className="small">
            <List>
              <div>Real-time systems are designed to work for infinite input stream</div>
              <div><i>How to initialize internal buffers?</i>
                <div className="small">
                  <List>
                    <div>Usually zeros, but other initializations may make sense in specific scenarios</div>
                  </List>
                </div>
              </div>
            </List>
          </div>
        </div>

        <div><b>Performance</b> issues due to blocking
          <div className="small">
            <List>
              <div>Plugin gets stream of samples split into small blocks (e.g., 32 samples)</div>
              <div>Internally, STFT with large hopsize (e.g., 2048 samples) is used</div>
              <div><i>What is the potential performance problem here?</i>
                <div className="small">
                  <List>
                    <div>Each hop requires data from 64 input blocks</div>
                    <div>No processing can be done for 63 blocks</div>
                    <div>Processing of huge FFT has tro be done during the 64th block (32 samples)</div>
                  </List>
                </div>
              </div>
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
        <h4>Maintaining Constant Time Processing</h4>
        <List>
          <div>Calling functions with inconsistent execution time
            <List>
              <div>Particularly <i>malloc</i> and <i>free</i></div>
              <div>Using locks to communicate across threads</div>
            </List>
          </div>
        </List>
          
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Summary</h4>
      <div>Real-Time systems have the following properties</div>
      <List>
        <div>Hard <b>performance</b> requirements
          <List>
            <div>Processing of input block has to be faster than time span of this block <b>for all blocks, not only on average</b></div>
          </List>
        </div>
        <div><b>Causality</b>
          <List>
            <div>Future samples cannot be taken into account (or only by increasing the latency: Look-ahead)</div>
          </List>
        </div>
        <div><b>Latency</b>
          <List>
            <div>Time between input and system response, usually intended to be minimal</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

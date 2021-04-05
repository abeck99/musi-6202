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

import PhasorAnim from './class-06/component/PhasorAnim';

import image00 from './class-23/img/image00.png'
import image01 from './class-23/img/image01.png'
import image02 from './class-23/img/image02.png'
import image03 from './class-23/img/image03.png'
import image04 from './class-23/img/image04.png'
import image05 from './class-23/img/image05.png'
import image06 from './class-23/img/image06.png'
import image07 from './class-23/img/image07.png'
import image08 from './class-23/img/image08.png'
import image09 from './class-23/img/image09.png'
import image10 from './class-23/img/image10.png'
import image11 from './class-23/img/image11.png'
import image12 from './class-23/img/image12.png'
import image13 from './class-23/img/image13.png'
import image14 from './class-23/img/image14.png'
import image15 from './class-23/img/image15.png'
import grainGraph00 from './class-23/img/grainGraph-01.png'
import grainGraph01 from './class-23/img/grainGraph-02.png'

import a41_m from './class-23/snd/41_m.mp3'
import a41Proout from './class-23/snd/41Proout.mp3'
import a41pvout from './class-23/snd/41pvout.mp3'
import abigband from './class-23/snd/bigband.mp3'
import abigbandPVoc from './class-23/snd/bigbandPVoc.mp3'
import acastanets from './class-23/snd/castanets.mp3'
import acastanetsPVoc from './class-23/snd/castanetsPVoc.mp3'
import acathy from './class-23/snd/cathy.mp3'
import acathyEffout from './class-23/snd/cathyEffout.mp3'
import acathyOLAout from './class-23/snd/cathyOLAout.mp3'
import acathyOLApitch from './class-23/snd/cathyOLApitch.mp3'
import acathyOLApitchf from './class-23/snd/cathyOLApitchf.mp3'
import acathyProout from './class-23/snd/cathyProout.mp3'
import acathyPropitch from './class-23/snd/cathyPropitch.mp3'
import acathyPropitchf from './class-23/snd/cathyPropitchf.mp3'
import acathypvpitch from './class-23/snd/cathypvpitch.mp3'
import acathyResample from './class-23/snd/cathyResample.mp3'
import acathySOLpitch from './class-23/snd/cathySOLpitch.mp3'
import acathySOLpitchf from './class-23/snd/cathySOLpitchf.mp3'
import acathySOLout from './class-23/snd/cathySOLout.mp3'
import acathypvout from './class-23/snd/cathypvout.mp3'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 23: Time-stretching and Pitch-shifting</div>
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
        <div><div><b>Time Stretching</b></div>
          <div>Change playback speed/tempo without changing pitch</div>
        </div>
        <div><div><b>Pitch Shifting</b></div>
          <div>Change pitch without changing tempo / playback speed</div>
        </div>
        <div><div><b>Terms</b></div>
          <List>
            <div>Time / pitch scaling</div>
            <div>Time expansion / compression</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Applications</h4>
      <List fragment={true}>
        <div><b>Beat Matching:</b>: Align tempo of two or more audio files (mashup)</div>
        <div><b>Key lock</b>: "Align" pitch of two or more audio files (mashup)</div>
        <div><b>Pitch / time correction</b>: Edit intonation, frequency deviation, vibrato, glissando</div>
        <div>Video <b>frame rate conversion</b></div>
        <div><b>Sample player / libraries</b></div>
        <div><b>Sound design</b></div>
        <div><b>Educational software</b>: Pitch and timing visualization</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Stretch and Pitch Factors</h4>
      <div className="row">
        <div className="col-50">
          <MathComponent tex={String.raw`s= \frac{t_{output}}{t_{input}}`}/>
        </div>
        <div className="col-50">
		      <MathComponent tex={String.raw`p = \frac{f_{output}}{f_{input}}`}/>
        </div>
      </div>
      <Fragment>
        <div><b>Examples:</b></div>
        <List fragment={true}>
          <div><i>Half speed</i>: <MathComponent tex={String.raw`s = 2`} display={false}/></div>
          <div><i>Half pitch</i>: <MathComponent tex={String.raw`p = \frac{1}{2}`} display={false}/></div>
          <div><i>Semitone up / down</i>: <MathComponent tex={String.raw`p_u = 2^{\frac{1}{12}} = 1.059\quad p_d = 2^{-\frac{1}{12}} = 0.9439`}/></div>
          <div><i>100 BPM</i> <i className="fas fa-long-arrow-alt-right"/> <i>75 BPM</i>: <MathComponent tex={String.raw`s = \frac{4}{3}`} display={false}/></div>
        </List>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Resampling</h4>
      <List fragment={true}>
        <div><b>Traditional</b>: resampling
          <List fragment={true}>
            <div>Change inter-sample 'distance' by interpolation</div>
            <div>Keep playback sample rate constant</div>
            <div>Audio example
              <List>
                <div>Original: <ReactAudioPlayer src={acathy} controls/></div>
                <div>Resample: <ReactAudioPlayer src={acathyResample} controls/></div>
              </List>
            </div>
          </List>
        </div>
        <div>Tempo changes results in pitch change (and vice versa)
          <MathComponent tex={String.raw`s = \frac{1}{p}`}/>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Stretching: Effect on Frequency Domain</h4>
      <img src={image00}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>OLA: Introduction</h4>
      <div>Overlap and add approaches for:</div>
      <List>
        <div>Granular synthesis</div>
        <div>Time /frequency synthesis and processing</div>
        <div>Time-stretching and pitch-shifting</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Time Stretching</h4>
      <div><b>Overlap and add</b></div>
      <ol>
        <li><Fragment><b>Split input</b> signal into overlapping blocks</Fragment></li>
        <li><Fragment><b>Duplicate or discard blocks</b> depending on stretch factor</Fragment></li>
      </ol>
      <div className="row">
        <div className="col-60">
          <img src={image14}/>
        </div>
        <div className="col-40">
          <Fragment>
            <List>
              <div>Original: <ReactAudioPlayer src={acathy} controls/></div>
              <div><MathComponent tex={String.raw`s = \frac{4}{3}`} display={false}/>: <ReactAudioPlayer src={acathyOLAout} controls/></div>
            </List>
          </Fragment>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Windowed Grains</h4>
      <img src={grainGraph00}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Outputing Grains</h4>
      <img src={grainGraph01}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Parameters</h4>
      <List>
        <div>Grain Size</div>
        <div>Hop Size</div>
        <div>Time Scale</div>
        <div>Pitch Scale</div>
        <div>Time Variance</div>
        <div>Pitch Variance</div>
        <div>Interpolation Method</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Pitch Synchronous Overlap and Add</h4>
      <List>
        <div>Use the OLA principle, but</div>
        <div><b>Adapt block length</b> to fundamental period length</div>
      </List>
      <img src={image01}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>PSOLA: Example</h4>
      <div className="row">
        <div className="col-50">
          <img src={image02}/>
        </div>
        <div className="col-50">
          <List>
            <div>Original: <ReactAudioPlayer src={acathy} controls/></div>
            <div><MathComponent tex={String.raw`s = \frac{4}{3}`} display={false}/>: <ReactAudioPlayer src={acathySOLout} controls/></div>
          </List>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>PSOLA: Transient Copying</h4>
      <img src={image03}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>PSOLA: Summary</h4>
        <List fragment={true}>
          <div><b>Processing Steps</b>
            <ol>
              <li>Detect <i>fundamental frequency</i> / period length</li>
              <li>Set <i>pitch marks</i></li>
              <li>Intelligently <i>select blocks</i> to be repeated / discarded</li>
            </ol>
          </div>
          <div><b>Advantages</b>
            <List>
              <div><i>High granularity</i> - Modify audio on period length resolution</div>
              <div><i>High quality</i></div>
            </List>
          </div>
        </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>PSOLA: Summary</h4>
        <List fragment={true}>
          <div><b>Problems</b>
            <List>
              <div>Quality depends on <i>pitch tracking</i> reliability</div>
              <div>Quality and timbre depends on <i>pitch mark positioning</i></div>
              <div>Works only for <i>monophonic</i> input signals
                <List>
                  <div>Polyphonic and noisy segments</div>
                  <div>Reverberation and overlapping tones</div>
                </List>
              </div>
              <div><i>Noise, plosives</i> require special consideration</div>
              <div><i>Copying</i> artifacts (double transients, timing deviations)</div>
            </List>
          </div>
          <div><b>Typical Applications</b>
            <List>
              <div><b>Standard approach for vocal editing tools</b></div>
            </List>
          </div>
        </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Phase Vocoder: Frequency Domain OLA</h4>
      <ol>
        <li><b>Split input</b> signal into overlapping blocks</li>
        <li>Compute <b>magnitude and phase spectrum</b> of each block</li>
        <li><b>Change overlap ratio</b> between blocks depending on stretch factor</li>
        <li>Keep the magnitude, <b>adapt the phase per bin</b> to the blocks new time stamp</li>
      </ol>
      <img src={image15}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Phase Vocoder: Audio Example</h4>
      <List>
        <div>Original: <ReactAudioPlayer src={acathy} controls/></div>
        <div>Resample: <ReactAudioPlayer src={acathypvout} controls/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Frequency Reassignment: Relation of Phase and Frequency</h4>
        <PhasorAnim partials={[
          {amp: 1, freq: 1, color: "rgb(66, 44, 255)"},
        ]} width="480" height="220"/>
      <div>Phasor Representation:</div>
      <List>
        <div>Sine value is defined by magnitude and phase</div>
        <div>Decreasing the amplitude -> shorter vector</div>
        <div>Increasing the frequency -> Increasing speed</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <div>Frequency and phase change closely related</div>
      <List fragment={true}>
        <div>Time for full rotation is period length <i>T</i> with
          <MathComponent tex={String.raw`f = \frac{1}{T}`}/>
        </div>
        <div>Time for fractional rotation <MathComponent tex={String.raw`\Delta\Phi`} display={false}/> is corresponding fraction of period length
          <MathComponent tex={String.raw`f = \frac{\Delta\Phi}{\Delta t}`}/>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <div>Frequency and phase change closely related</div>
      <List fragment={true}>
        <div>In other words:
          <MathComponent tex={String.raw`\eqalign{\Phi(t) &=& \omega\cdot t\\
                            \Rightarrow \frac{d\Phi(t)}{dt} &=& \omega = 2\pi f}`}/>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Frequency Reassignment: Principles</h4>
      <div>Frequency domain</div>
      <List fragment={true}>
        <div>Instead of using the bin frequency
          <MathComponent tex={String.raw`f(k) = k*\frac{f_\mathrm{S}}{\mathcal{K}}`}/>
        </div>
        <div>We use the phase of each bin <MathComponent tex={String.raw`\Phi(k,n)`} display={false}/></div>
        <div>To compute the frequency from the phase difference of neighboring blocks
          <MathComponent tex={String.raw`\omega_{\mathrm{I}}(k,n)	\propto \Phi(k,n)-\Phi(k,n-1)`}/>
        </div>
        <div><MathComponent tex={String.raw`\omega_{\mathrm{I}}(k,n)`} display={false}/> is called <b>instantaneous frequency</b> per block per bin</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Frequency Reassignment: Scaling Factor</h4>
      <List fragment={true}>
        <div>Instantaneous frequency calculation has to take into account
          <List>
            <div>Hop Size: <MathComponent tex={String.raw`\mathcal{H}`} display={false}/></div>
            <div>Sample Rate: <MathComponent tex={String.raw`f_s`} display={false}/></div>
          </List>
          <MathComponent tex={String.raw`\omega_{\mathrm{I}}(k,n) = \frac{\Delta\Phi_{\mathrm{u}}(k,n)}{\mathcal{H}}\cdot f_{\mathrm{S}}`}/>
        </div>
        <div>Problem: Phase ambiguity
          <MathComponent tex={String.raw`\Phi(k,n) = \Phi(k,n) + j\cdot 2\pi`}/>
        </div>
        <div><i>Phase unwrapping</i></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Phase Unwrapping</h4>
      <List>
        <div>Compute unwrapped phase <MathComponent tex={String.raw`\Phi_{\mathrm{u}}(k,n)`} display={false}/>
          <List>
            <div>Estimate unwrapped bin phase
              <MathComponent tex={String.raw`\hat{\Phi}(k,n) = \Phi(k,n-1) + \underbrace{2\pi k\cdot\frac{\mathcal{H}}{\mathcal{K}}}_{=\omega_k\cdot\frac{\mathcal{H}}{f_\mathrm{s}}}`}/>              
            </div>
            <div>Unwrap phase by shifting current phase to estimates range
              <MathComponent tex={String.raw`\Phi_{\mathrm{u}}(k,n) = \hat{\Phi}(k,n) + \mathrm{princarg}\left[ \Phi(k,n) - \hat{\Phi}(k,n) \right]`}/>              
            </div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Phase Unwrapping</h4>
      <List>
        <div>Compute unwrapped phase difference
    <MathComponent tex={String.raw`\eqalign{\Delta\Phi_{\mathrm{u}}(k,n)	&=& \Phi_{\mathrm{u}}(k,n) - \Phi(k,n-1)\nonumber\\
                                                &=& \hat{\Phi}(k,n) + \mathrm{princarg}\left[ \Phi(k,n) - \hat{\Phi}(k,n) \right] - \Phi(k,n-1)\nonumber \\
                                                &=& \frac{2\pi k}{\mathcal{K}}\mathcal{H} + \mathrm{princarg}\left[ \Phi(k,n) - \Phi(k,n-1) - \frac{2\pi k}{\mathcal{K}}\mathcal{H} \right]\nonumber}`}/>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Frequency Reassignment: Problems</h4>
      <List fragment={true}>
        <div><b>Overlapping spectral components</b>
          <List fragment={true}>
            <div>Sinusoidal components often overlap (Spectral leakage, several instruments playing the same pitch, ...)</div>
            <div>Incorrect phase estimates</div>
            <div>Spectrum should be as sparse as possible, increase STFT length</div>
          </List>
        </div>
        <div><b>Inaccurate phase unwrapping</b></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Phase Vocoder Window Compensation</h4>
      <img src={image05}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Phase Vocoder - Properties & Artifacts</h4>
      <List fragment={true}>
        <div><b>Advantages</b>
          <List>
            <div>Allows <i>polyphonic input</i> (assumption: no overlapping harmonics)</div>
            <div>Absolute <i>timing stability</i> (i.e., sample resolution)</div>
          </List>
        </div>
        <div><b>Disadvantages</b>
          <List>
            <div><i>Low granularity</i> - FFT block size</div>
            <div>Artifacts: Phasing, Transient smearing / doubling</div>
          </List>
        </div>
      </List>
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

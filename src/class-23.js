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
        <div>Phase Vocoded: <ReactAudioPlayer src={acathypvout} controls/></div>
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
        </div>
      </List>
      <div className="normal">
        <MathComponent tex={String.raw`\eqalign{\Delta\Phi_{\mathrm{u}}(k,n)	&=& \Phi_{\mathrm{u}}(k,n) - \Phi(k,n-1)\nonumber\\
                                                &=& \hat{\Phi}(k,n) + \mathrm{princarg}\left[ \Phi(k,n) - \hat{\Phi}(k,n) \right] - \Phi(k,n-1)\nonumber \\
                                                &=& \frac{2\pi k}{\mathcal{K}}\mathcal{H} + \mathrm{princarg}\left[ \Phi(k,n) - \Phi(k,n-1) - \frac{2\pi k}{\mathcal{K}}\mathcal{H} \right]\nonumber}`}/>
      </div>
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
      <h4>Phase Vocoder Artifacts: Spectral Leakage</h4>
      <img src={image06} style={{width:"55%"}}/>
      <img src={image07} style={{width:"55%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Phase Vocoder Phasing</h4>
      <img src={image08}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Use <i>Frequency Reassignment</i> for grouping and phase sync</h4>
      <List>
        <div>Original: <ReactAudioPlayer src={acathy} controls/></div>
        <div>Phase Vocoder: <ReactAudioPlayer src={acathypvout} controls/></div>
        <div>PV w/ grouped phase: <ReactAudioPlayer src={acathyEffout} controls/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Phase Vocoder Artifacts - Unsynced Harmonics</h4>
      <img src={image09} style={{width:"55%"}}/>
      <img src={image10} style={{width:"55%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Use <i>Harmonic Analysis</i> for Grouping and Phase Sync</h4>
      <List>
        <div>Original: <ReactAudioPlayer src={acathy} controls/></div>
        <div>Phase Vocoder: <ReactAudioPlayer src={acathypvout} controls/></div>
        <div>PV w/ synced phase: <ReactAudioPlayer src={acathyEffout} controls/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Phase Vocoder Artifacts: Interchannel Phasing</h4>
      <div>Phase estimation between channels slightly off due to</div>
      <List>
        <div>Numerical inaccuracies (cumulative!)</div>
        <div>Overlapping frequency components</div>
      </List>
      <Fragment>
        <div>Change in spatial image</div>
        <List>
          <div>Original: <ReactAudioPlayer src={abigband} controls/></div>
          <div>Phase Vocoder: <ReactAudioPlayer src={abigbandPVoc} controls/></div>          
        </List>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Phase Vocoder Artifacts: Transient Smearing</h4>
      <img src={image11} style={{width:"80%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Transient Smearing Example</h4>
      <List>
          <div>Original: <ReactAudioPlayer src={acastanets} controls/></div>
          <div>Phase Vocoder: <ReactAudioPlayer src={acastanetsPVoc} controls/></div>        
      </List>
      <Fragment>
        <div>Detect transients and <i>reset phase</i> per bin</div>
        <List>
          <div>Original: <ReactAudioPlayer src={a41_m} controls/></div>
          <div>Phase Vocoder: <ReactAudioPlayer src={a41pvout} controls/></div>        
          <div>PV w/ Phase Reset: <ReactAudioPlayer src={a41Proout} controls/></div>        
        </List>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Time Stretching: Inherent Problems</h4>
      <List fragment={true}>
        <div>Stretching the audio data can lead to <b>"non-natural"</b> results</div>
        <div><b>Examples</b>
          <List fragment={true}>
            <div>Tempo dependent <i>timing variations</i></div>
            <div>Other performance related aspects may get inappropriate lengths and speed: <i>vibrato, tremolo, glissando</i></div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Pitch Shifting</h4>
      <List fragment={true}>
        <div><div><b>Definition</b></div>
          <div>Change pitch without changing tempo</div>
        </div>
        <div><div><b>Method</b></div>
          <div>Combine stretching and <i>sample rate conversion</i> (interpolation)</div>
          <ol><li>Change length with stretching</li><li>Resample to compensate for length difference</li></ol>
        </div>
        <div><b>Implementation</b>: Differentiate "external" and "internal" parameters
          <List>
            <div><i>External</i>: stretch <MathComponent tex={String.raw`s_e`} display={false}/> and pitch <MathComponent tex={String.raw`p_e`} display={false}/></div>
            <div><i>External</i>: stretch <MathComponent tex={String.raw`s_i`} display={false}/> and resample <MathComponent tex={String.raw`r_i`} display={false}/></div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Pitch Shifting: Example</h4>
      <div>Pitch shift factor <MathComponent tex={String.raw`p = \frac{4}{3}`} display={false}/></div>
      <List>
        <div><i>Time stretch</i> (increase length / decrease tempo) <MathComponent tex={String.raw`s = \frac{4}{3}`} display={false}/></div>
        <div><i>Resample</i> (decrease length / increase pitch) <MathComponent tex={String.raw`s = \frac{3}{4}`} display={false}/></div>
        <div>OLA: <ReactAudioPlayer src={acathyOLApitch} controls/></div>
        <div>Phase Vocoder: <ReactAudioPlayer src={acathypvpitch} controls/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Pitch Shifting: Standard Approach Examples</h4>
      <List fragment={true}>
        <div>
          <div>External: <MathComponent tex={String.raw`s_e = 1 ...  p_e = 2`} display={false}/></div>
          <div>Internal: <MathComponent tex={String.raw`s_i = 2 ...  r_i = \frac{1}{2}`} display={false}/></div>
        </div>
        <div>
          <div>External: <MathComponent tex={String.raw`s_e = 1  ... p_e = \frac{4}{3}`} display={false}/></div>
          <div>Internal: <MathComponent tex={String.raw`s_i = \frac{4}{3} ...  r_i = \frac{3}{4}`} display={false}/></div>
        </div>
        <div>
          <div>External: <MathComponent tex={String.raw`s_e = \frac{1}{2} ...  p_e = 2`} display={false}/></div>
          <div>Internal: <MathComponent tex={String.raw`s_i = 1 ...  r_i = \frac{1}{2}`} display={false}/></div>
        </div>
        <div>
          <div>External: <MathComponent tex={String.raw`s_e = 2 ...  p_e = 2`} display={false}/></div>
          <div>Internal: <MathComponent tex={String.raw`s_i = 4 ...  r_i = \frac{1}{2}`} display={false}/></div>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Pitch Shifting: Frequency Domain Approach</h4>
      <List fragment={true}>
        <div>STFT</div>
        <div>Magnitude and phase</div>
        <div>Magnitude and instantaneous frequency</div>
        <div>Resample both magnitude and frequency spectrum according to pitch factor</div>
        <div>Magnitude and phase</div>
        <div>Complex spectrum</div>
        <div>IFFT and OLA</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Format Preservation: Time Domain</h4>
      <List fragment={true}>
        <div><b>Idea</b>
          <List>
            <div>Signal is pulse train filtered by transfer function
              <List>
                <div>Pulse train determines fundamental frequency</div>
                <div>Transfer function determines formant shape / timbre characteristics</div>
              </List>
            </div>
          </List>
        </div>
        <Fragment>
          <div className="row">
            <div className="col-60">
              <b>Approach</b>
              <List fragment={true}>
                <div>Change grain / pulse distance</div>
                <div>Grain "content" not modified</div>
                <div>-> Freq domain not modified</div>
                <div><b>"Same" spectrum, different pitch</b></div>
              </List>
            </div>
            <div className="col-40">
              <img src={image12}/>
            </div>
          </div>
        </Fragment>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Formant Preservation: Frequency Domain</h4>
      <List fragment={true}>
        <div><b>Idea</b>
          <List>
            <div>Preserve spectral envelope</div>
          </List>
        </div>
        <div className="row">
          <div className="col-60">
            <div><b>Approach</b>
              <List fragment={true}>
                <div>Measure spectral envelope</div>
                <div>Apply inverse envelope (whitening)</div>
                <div>Pitch shift</div>
                <div>Apply spectral envelope</div>
              </List>
            </div>
          </div>
          <div className="col-40">
            <img src={image13}/>
          </div>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Spectral Envelope Estimate</h4>
      <List fragment>
        <div><b>Approaches</b>
          <List>
            <div>LPC coefficients</div>
            <div>Spectral maxima</div>
          </List>
        </div>
        <div><b>Potential issues</b>
          <List>
            <div><div><i>Polyphonic input</i> audio</div>
              <div>'Superposition' of envelopes</div>
            </div>
            <div><i>Very high / low pitch factors</i>: High frequency boost / cut</div>
            <div><i>Estimate resolution</i>
              <List>
                <div>Too coarse -> Loss of timbre characteristics</div>
                <div>Too fine -> Impress pitch characteristics (harmonic pattern) on spectrum</div>
              </List>
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
      <h4>Pitch Shifting: Audio Examples</h4>
      <MultiTable sizes={[25, 25, 25, 25]}>
        <div/>
        <div>OLA</div>
        <div>PSOLA</div>
        <div>PVOC</div>
        <div>Original</div>
        <div><ReactAudioPlayer src={acathy} style={{width: "125px"}} controls/></div>
        <div><ReactAudioPlayer src={acathy} style={{width: "125px"}} controls/></div>
        <div><ReactAudioPlayer src={acathy} style={{width: "125px"}} controls/></div>
        <div>Resample</div>
        <div><ReactAudioPlayer src={acathyOLApitch} style={{width: "125px"}} controls/></div>
        <div><ReactAudioPlayer src={acathySOLpitch} style={{width: "125px"}} controls/></div>
        <div><ReactAudioPlayer src={acathyPropitch} style={{width: "125px"}} controls/></div>
        <div>Formant</div>
        <div><ReactAudioPlayer src={acathyOLApitchf} style={{width: "125px"}} controls/></div>
        <div><ReactAudioPlayer src={acathySOLpitchf} style={{width: "125px"}} controls/></div>
        <div><ReactAudioPlayer src={acathyPropitchf} style={{width: "125px"}} controls/></div>
      </MultiTable>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Summary</h4>
      <List fragment={true}>
        <div>Pitch stretching and pitch shifting are largely equivalent algorithms
          <List>
            <div>Sample artifacts</div>
            <div>Same workload</div>
          </List>
        </div>
        <div>Monophonic time-stretching with PSOLA-based approaches
          <List>
            <div>Easier to solve</div>
            <div>Has bad artifacts if pitch tracker is off</div>
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
      <List fragment={true}>
        <div>Polyphonic time-stretching with PV-based approaches
          <List>
            <div>Complicated due to tradeoffs (e.g., frequency vs time resolution</div>
          </List>
        </div>
        <div>General challenges:
          <List>
            <div>Noisy and transient signals</div>
            <div>Resulting timbre changes</div>
            <div>Perceived naturalness of result</div>
            <div>Time resolution / accuracy due to blocked processing</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

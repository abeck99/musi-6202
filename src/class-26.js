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

import image00 from './class-26/img/image00.png'
import image01 from './class-26/img/image01.png'
import image02 from './class-26/img/image02.png'
import image03 from './class-26/img/image03.png'
import image04 from './class-26/img/image04.png'
import image05 from './class-26/img/image05.png'
import image06 from './class-26/img/image06.png'
import image07 from './class-26/img/image07.png'
import image08 from './class-26/img/image08.png'
import image09 from './class-26/img/image09.png'
import image10 from './class-26/img/image10.png'
import image11 from './class-26/img/image11.png'
import image12 from './class-26/img/image12.png'
import image13 from './class-26/img/image13.png'
import image14 from './class-26/img/image14.png'
import image15 from './class-26/img/image15.png'
import image16 from './class-26/img/image16.png'

import harp_org from './class-26/snd/mp3Original.mp3'
import harp_256 from './class-26/snd/mp3_256.mp3'
import harp_128 from './class-26/snd/mp3_128.mp3'
import harp_96 from './class-26/snd/mp3_96.mp3'
import harp_64 from './class-26/snd/mp3_64.mp3'
import harp_32 from './class-26/snd/mp3_32.mp3'

import perc_org from './class-26/snd/Mp3_Perc_original.mp3'
import perc_256 from './class-26/snd/Mp3_Perc_256.mp3'
import perc_128 from './class-26/snd/Mp3_Perc_128.mp3'
import perc_96 from './class-26/snd/Mp3_Perc_96.mp3'
import perc_64 from './class-26/snd/Mp3_Perc_64.mp3'
import perc_32 from './class-26/snd/Mp3_Perc_32.mp3'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
        <div className="right">Part 26: Perceptual Coding</div>
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
      <List fragment={true}>
        <div><b>Goal</b>:
          <List><div>Encode signal in a way that the decoded signal is <b>perceptually</b> as close to the original signal as possible</div></List>
        </div>
        <div><b>Common Codecs</b>:
          <List>
            <div>MPEG-1/2 Layer 2</div>
            <div>MPEG-1/2 Layer 3</div>
            <div>MPEG-2/4 AAC</div>
            <div>AC-3/4</div>
            <div>Ogg Vorbis</div>
            <div>(DTS Cine/Home)</div>
            <div>(ATRAC)</div>
          </List>
        </div>
      </List>
      <aside className="notes">
        <p>Layer 2 used to be used in broadcasting, not much any more, just second "version" of this codec</p>
        <p>Layer 3 is most common</p>
        <p>AAC - Used in iTunes/apple products - hardware acceleration on iPhones/etc</p>
        <p>AC-3/4 used in cinema, developed by Dolby, standardized</p>
        <p>Ogg Vorbis, open source, sample accurate (not so for mp3)</p>
        <p>DTS still used in imax maybe, not highly used - DTS Home used for DVD, not used much anymore</p>
        <p>Sony Digital, Minidisc, not used any more</p>
        <p>Format is hidden, MP4 is container, codec might be different</p>
        <p>Have to look at headers to see the actual codec</p>
        <p>What does a perceptual codec DO?</p>
        <p>Decreases bits at frequencies people don't normally hear</p>
        <p>Understand what the human can hear and can't hear, drop stuff that humans can't hear</p>
        <p>Just reducing the bandwidth is lowering sample rate</p>
        <p>Looking at critical bands, what we are more sensitive to</p>
        <p>Masking is primary way that perceptual codecs reduce sound - a loud sound near a quieter sound will mask</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Overview</h4>
      <img src={image00}/>
      <aside className="notes">
        <p>Psychoacoustic model - analyzes the signal</p>
        <p>Main purpose - figure out which signals are masked and which are not</p>
        <p>Bit allocation - How many bits do we allocate to specific signals</p>
        <p>If something is masked, we can use a lower word length, and cover it up with quantization noise</p>
        <p>If a component is clearly perceivable, we can use higher word length and use less quantization</p>
        <p>Finally Entropy coding</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Overview</h4>
      <img src={image01}/>
      <aside className="notes">
        <p>Starting with psyacoustic model - the most important part in this strategy</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Psycho-Acoustic Model: Overview</h4>
      <div className="small">
        <List fragment={true}>
          <div><b>Objective</b>:
            <List>
              <div>Identify components perceptible and imperceptible by humans</div>
            </List>
          </div>
          <div><b>Approach</b>:
            <List>
              <div>Build model of human sound perception (<i>analysis only!</i>)</div>
            </List>
          </div>
          <div><b>Processing Steps</b>:
            <List fragment={true} ordered={true}>
              <li>1. Transform to <b>frequency domain</b></li>
              <li>2. Map to <b>perceptual frequency scale</b></li>
              <li>3. Group into bands</li>
              <li>4. Compute (perceptual) <b>masking threshold</b></li>
              <li>5. Compute <b>Signal-to-Mask Ratio</b> (SMR)</li>
              <li>6. Compute additional analysis results</li>
            </List>
          </div>
          <div><b>Recommendation only!</b> No standardization of implementation</div>
        </List>
      </div>
      <aside className="notes">
        <p>Model can be sophisticated or simple</p>
        <p>This is ONLY about analysis</p>
        <p>Almost always in the frequency domain (80-90% of the time)</p>
        <p>Frequency domain is a sparse representation, a sum of sinusodials in time domain is complex</p>
        <p>Perceptual frequency scale, some kind of logirthmic representation</p>
        <p>Group into critical bands - the "auditory filter", the band of frequencies that a second tone will mask</p>
        <p>Compute how much signal is masked or not - SMR is basically 1-to-1 mapping how many bits you need to quantize the component</p>
        <p>The psychoacoustic model is NOT in the standard for mpeg, just the way it's decoded is standard</p>
        <p>In early days, wildly different results between encoders of MP3 - today converged on quality</p>
        <p></p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Psycho-Acoustic Model 1-3: Frequency Transform</h4>
      <ol>
        <li>Frequency transformation (AAC: FFT)</li>
        <li>Frequency Warping (AAC: Bark Scale)</li>
        <li>Group power in bands (AAC <MathComponent tex={String.raw`\frac{1}{3}`} display={false}/> Bark resolution)</li>
      </ol>
      <img src={image02} style={{width:"60%"}}/>
      <aside className="notes">
        <p>AAC has the most simple transforms so we look at that</p>
        <p>Simply FFT to transform to frequency domain</p>
        <p>Transforms based on experimentation on how people hear</p>
        <p>Once in log format, banding just linear resolution</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Psycho-Acoustic Model 4: Masking Threshold</h4>
      <div className="normal">
        <List>
          <div><div>Humans are not able to perceive every possible detail in an audio signal</div>
            <List>
              <div>Frequency resolution (see above)</div>
              <div><div>Sensitivity for specific frequency regions</div>
                <div className="center"><img src={image03}/></div>
              </div>
            </List>
          </div>
        </List>
      </div>
      <aside className="notes">
        <p>Building the masking model</p>
        <p>Looking at threshold of hearing - we can't just remove, since people can boost volume/etc</p>
        <p>We can still apply to maximum, probably</p>
        <p>Charts showing masking, and amounts</p>
        <p>Let user adjust amplitude of second frequency, "threshold of hearing" for mask</p>
        <p>Dips occur during beating</p>
        <p>Second chart - noise mask, sinusodial maskee</p>
        <p>Difference between noise mask and sinusodial mask</p>
        <p>Masking effects change over time</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Psycho-Acoustic Model 4: Masking Threshold</h4>
      <div className="small">
        <List>
          <div><div>Humans are not able to perceive every possible detail in an audio signal</div>
            <List>
              <div>Frequency resolution (see above)</div>
              <div>Sensitivity for specific frequency regions</div>
              <div><div>Components masked by other components</div>
                <div className="center"><img src={image04} style={{width:"75%"}}/></div>
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
      <h4>Psycho-Acoustic Model 4: Masking Threshold</h4>
      <div className="normal">
        <List>
          <div><div>Humans are not able to perceive every possible detail in an audio signal</div>
            <List>
              <div>Frequency resolution (see above)</div>
              <div>Sensitivity for specific frequency regions</div>
              <div>Components masked by other components</div>
              <div><div>Masking threshold depends on</div>
                <List fragment={true}>
                  <div><i>Frequency</i> of masker</div>
                  <div><i>Noisiness</i> of masker</div>
                  <div><i>Level</i> of masker</div>
                  <div><i>Duration</i> of masker</div>
                </List>
              </div>
            </List>
          </div>
        </List>
      </div>
      <aside className="notes">
        <p>Duration matters less than other things</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Psycho-Acoustic Model 4: Masking Threshold</h4>
      <div>AAC computation of masking threshold (recommendation)</div>
      <div className="normal">
        <List fragment={true}>
          <div>Take hearing threshold as minimum masking threshold</div>
          <div><div>Convolve band spectrum with spreading function</div>
            <div className="center"><img src={image05} style={{width:"70%"}}/></div>
          </div>
          <div>Compute tonality (with phase deviation) and apply to masking threshold (from original spectrum)</div>
        </List>
      </div>
      <aside className="notes">
        <p>The mpeg layer 2 function is more difficult - non-linear, not a simple convolution</p>
        <p>Level dependent - these might not actually be true due to the user being able to change his own values</p>
        <p>Could lead to user turning down volume and hearing more quantization noise</p>
        <p>Determining if the tone is noise or sinusoidal and adjust based on that</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Psycho-Acoustic Model: Visualization</h4>
      <img src={image06} style={{width:"70%"}}/>
      <aside className="notes">
        <p>On the left side - frequency domain, bark representation, Signal to Mask Ratio</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Psycho-Acoustic Model: Additionally extracted information</h4>
      <div>Control of:</div>
      <List>
        <div><b>Window length switching</b></div>
        <div><b>Bit reservoir</b></div>
        <div><b>Joint stereo parameters</b></div>
      </List>
      <aside className="notes">
        <p>Output of psycho acoustic model is this SMR across critical bands</p>
        <p>Window length - based on transient</p>
        <p>Bit reservoir related to bit allocation</p>
        <p>Stereo - how do mid to side relate?</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image07}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Bit Allocation</h4>
      <div className="small">
        <div><b>Bit Allocation</b></div>
        <List fragment={true}>
          <div><div>How many bits are <b>required</b> (SMR)?</div>
            <div>Exact output rate is unknown (entropy coding)</div>
          </div>
          <div>How many bits are <b>available</b> per block?</div>
          <div>Are there bits available in the <b>bit reservor</b> (~6000<i>bits</i>, bit rate dependent)
            <List>
              <div>Actual rate must never exceed channel capacity</div>
              <div>Some frames might need more bits to properly encode</div>
              <div>Allow deviation from constant bitrate</div>
              <div>Has to be allocated from previous frames</div>
              <div><div>Causes additional decoder delay</div>
                <div className="center"><img src={image08} style={{width:"40%"}}/></div>
              </div>
            </List>
          </div>
          <div>Intelligently distribute available bits over bands</div>
        </List>
      </div>
      <aside className="notes">
        <p>As discussed, SMR (in dB) gives linear representation of what our bit representation</p>
        <p>Constant bitrate affects how many bits are available</p>
        <p>Shift SMR based on constant bitrate</p>
        <p>Entropy coding might affect it, a lot of guesswork involved</p>
        <p>Do we adjust based on psychoacoustic model? Less high frequencies, etc - hand made rules</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Quantization & Entropy Coding</h4>
      <List fragment={true}>
        <div><b>Quantization</b>
          <List>
            <div>Re-quantize the spectrum per band</div>
            <div>Each band has different <i>scaling factor</i> and <i>word length</i></div>
            <div>Non-uniform quantization</div>
          </List>
        </div>
        <div><b>Entropy Coding</b>
          <List>
            <div>Apply lossless coding (multiple dictionaries)</div>
            <div>Submit the gained bits to bit allocation (re-iterate?)</div>
          </List>
        </div>
      </List>
      <aside className="notes">
        <p>Quantization per-band (common across all these codecs - ~100 bands say)</p>
        <p>Scaling so you get full quantization band</p>
        <p>Entropy Coding - uses various existing dictionaries</p>
        <p>Reiterating is very slow, very hard to do with real-time</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Artifacts: Transient Smearing and Pre-Echo</h4>
      <img src={image09}/>
      <aside className="notes">
        <p>Difficult to handle transients, constant bitrate can cause artifacts easily</p>
        <p>Model is simplified and inheritently flawed, models based on average listener</p>
        <p>Quantization noise is spread out over the entire processing block</p>
        <p>Every encoder might be different</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image10}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Tweaks: Block Switching</h4>
      <div className="center"><img src={image11} style={{width: "70%"}}/></div>
      <List>
        <div>AAC: transients are encoded by 8 short frames (256) instead of 1 long frame (2048)</div>
        <div>Introduces additional encoding delay because of different start window shape</div>
      </List>
      <aside className="notes">
        <p>Psychoacoustic model can also detect transients</p>
        <p>Needs to adjust windows based on neighboring overlaps</p>
        <p>Doesn't PREVENT transient smearing, but reduces the amount of time that effects the output signal</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Tweaks: Other tools (MPEG-4 AAC, 1st generation)</h4>
      <List fragment={true}>
        <div><b>Joint Stereo Coding</b>:
          <List>
            <div><div>MS (Mid/Side stereo)</div>
              <div>Exploit inter-channel <i>redundancy</i> by mid/side encoding</div>
            </div>
            <div><div>IS (Intensity Stereo)</div>
              <div>Remove <i>irrelevancy</i> of stereo information: replace stereo by one signal with directional information</div>
              <div>Works for high frequencies (per band)</div>
              <div>May result in spatial distortions</div>
            </div>
          </List>
        </div>
      </List>
      <aside className="notes">
        <p>Encoders might parameterize these choices</p>
        <p>IS - last technique, high frequencies aren't easily located so could just be sent mono</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Tweaks: Other tools (MPEG-4 AAC, 1st generation)</h4>
      <List fragment={true}>
        <div><b>Prediction</b>
          <List>
            <div><div>FDP (Frequency Domain Prediction)</div>
              <div>Backward adaptive per band</div>
              <div>Increases decoder complexity</div>
            </div>
            <div><div>LTP (Long term prediction)</div>
              <div>Time domain predictor, forward adaptive, one coefficient, large lag</div>
            </div>
          </List>
        </div>
      </List>
      <aside className="notes">
        <p>Linear prediction applies to many different techniques</p>
        <p>Long term prediction - time domain predictor, looking over 200-500ms</p>
        <p>- Looks for repitions in the time domain, run predictor, transmit the prediction error</p>
        <p>- Psychoacostic model may not apply to the prediction error</p>
        <p>FDP - assumption is that neighboring bins share similar frequency content</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Tweaks: Other tools (MPEG-4 AAC, 1st generation)</h4>
      <List fragment={true}>
        <div><b>TNS</b> (Temporal Noise Shaping)
          <List>
            <div>Transient artifacts remain problematic</div>
            <div>D*PCM in the frequency domain -> time-domain envelope of the error shaped after signal envelope</div>
            <div>Shift quantization error power to high amplitude regions</div>
          </List>
          <div className="center"><img src={image12}/></div>
        </div>
      </List>
      <aside className="notes">
        <p>Frequency domain prediction - predicting the coefficients from the reconstructed signal</p>
        <p>By doing that, noise is shifted under the high amplitudes</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Tweaks: Other tools (MPEG-4 AAC, 2nd generation)</h4>
      <List fragment={true}>
        <div><b>PNS</b> (Perceptual Noise Subsitution)
          <List>
            <div>Transmit noise level and inter-channel correlation instead of encoding noise subbands</div>
          </List>
        </div>
        <div><b>PS</b> (Parametric Stereo)
          <List>
            <div>Extends the IS concept:</div>
            <div>Encode <i>one</i> channel and transmit control info to generate the other channel</div>
          </List>
        </div>
      </List>
      <aside className="notes">
        <p>"Next generation" perceptual codecs</p>
        <p>Reverb as (poor) example of Parametric Stereo</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Artifacts</h4>
      <List fragment={true}>
        <div><div><b>Transient Smearing</b></div>
          <div>Transients are smoothed out</div>
        </div>
        <div><div><b>Musical Noise</b> (ringing)</div>
          <div>Switch high frequency bands on and off</div>
        </div>
        <div><div><b>Stereo Imaging</b></div>
          <div>Changing localization and spatial impression</div>
        </div>
        <div><div><b>Roughness</b></div>
          <div>Time-variant granular quantization noise</div>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Audio Examples (MP3)</h4>
      <MultiTable sizes={[50, 50]}>
        <div><b>Harpsichord</b></div>
        <div><b>Percussion</b></div>
        <div>Original <ReactAudioPlayer src={harp_org} controls/></div>
        <div>Original <ReactAudioPlayer src={perc_org} controls/></div>
        <div>256 kpbs <ReactAudioPlayer src={harp_256} controls/></div>
        <div>256 kpbs <ReactAudioPlayer src={perc_256} controls/></div>
        <div>128 kpbs <ReactAudioPlayer src={harp_128} controls/></div>
        <div>128 kpbs <ReactAudioPlayer src={perc_128} controls/></div>
        <div>96 kpbs <ReactAudioPlayer src={harp_96} controls/></div>
        <div>96 kpbs <ReactAudioPlayer src={perc_96} controls/></div>
        <div>64 kpbs <ReactAudioPlayer src={harp_64} controls/></div>
        <div>64 kpbs <ReactAudioPlayer src={perc_64} controls/></div>
        <div>32 kpbs <ReactAudioPlayer src={harp_32} controls/></div>
        <div>32 kpbs <ReactAudioPlayer src={perc_32} controls/></div>
      </MultiTable>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Bitrate Models</h4>
      <List>
        <div><b>Constant Bit Rate</b> (CBR):
          <List>
            <div>Bit rate constant over time</div>
            <div>Quality changes over time</div>
          </List>
        </div>
        <div><b>Variable Bit Rate</b> (VBR):
          <List>
            <div>Bit rate changes over time</div>
            <div>Quality constant over time (Depends on psychoacoustic model)</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Algorithms & Properties</h4>
      <div className="normal">
      <MultiTable sizes={[30, 30, 20, 20]}>
        <div><b>Name</b></div>
        <div><b>Sampling Rates</b></div>
        <div><b>Channels</b></div>
        <div><b>Bit Rates</b></div>
        <div>MPEG2 Layer 2</div><div>16-48k</div><div>5.1</div><div>8-160</div>
        <div>MPEG2 Layer 3</div><div>8-96k</div><div>5.1</div><div>8-320</div>
        <div>MPEG4 Layer AAC</div><div>16-48k</div><div>16</div><div>8-320</div>
        <div>ATRAC1</div><div>44.1k</div><div>2</div><div>146</div>
        <div>ATRAC3</div><div>44.1k</div><div>2</div><div>66,33</div>
        <div>SDDS</div><div>44.1k</div><div>7.1</div><div>146</div>
        <div>AC-3</div><div>32-48k</div><div>5.1</div><div>32-640</div>
        <div>E-AC-3</div><div>32-48k</div><div>13.1</div><div>32-6144</div>
        <div>DTS (Cine)</div><div>44.1k</div><div>5.1 / 6.1</div><div>192</div>
        <div>DTS (Home)</div><div>32-96k</div><div>8</div><div>8-512</div>
      </MultiTable>
    </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Quality Evaluation</h4>
      <List fragment={true}>
        <div>Quality depends on:
          <List fragment={true}>
            <div>Bit Rate</div>
            <div>General coding algorithm</div>
            <div>Encoder implementation</div>
            <div>Encoder options</div>
            <div>Input signal & its properties</div>
            <div>Listener</div>
          </List>
        </div>
        <div>Objective, technical measures for quality evaluation fail</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <div>Blind listening tests with hidden reference</div>
      <div><img src={image15}/></div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example Results</h4>
      <img src={image16}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Requirements</h4>
      <List>
        <div>Quality (see above)</div>
        <div>Latency (not important for file encoding, but for real-time transmission and real-time systems)</div>
        <div>Complexity (encoder vs decoder)</div>
        <div>Achievable bit rates</div>
        <div>Efficiency (sound quality to bit rate)</div>
        <div>Availability & licensing</div>
        <div>Editability, scrolling capabilities</div>
        <div>Error resilience</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Summary</h4>
      <List>
        <div>Perceptual codecs take advantage of properties of human hearing and combine this with principles of redundancy coding</div>
        <div>(MPEG) encoders are only specified by their output stream ⇒ different encoders have different quality</div>
        <div>Bitrate/quality tradeoff cannot be completely overcome, however, synthesis-based approaches are more and more successful at low bitrates</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

import React, { Component } from 'react'
import Section from 'lib/component/Section'
import ReactAudioPlayer from 'react-audio-player'
import { Graphviz } from 'graphviz-react'

import Presentation from 'lib/template/Presentation'

import Counter from './example/component/Counter'
import SineWave from './example/component/SineWave'
import Table from './example/component/Table'
import MultiTable from './example/component/MultiTable'
import List from './example/component/List'
import Schedule from './example/component/Schedule'
import MyPieChart from './example/component/MyPieChart'
import Plot from './example/component/Plot'
import Animate from './example/component/Animate'

import image00 from './class-13/img/image00.png'
import image01 from './class-13/img/image01.png'
import quantErrorImg from './class-10/img/image02.png'
import image02 from './class-13/img/image02.png'
import image03 from './class-13/img/image03.png'
import image04 from './class-13/img/image04.png'
import image05 from './class-13/img/image05.png'
import image06 from './class-13/img/image06.png'
import image07 from './class-13/img/image07.png'
import image08 from './class-13/img/image08.png'
import image09 from './class-13/img/image09.png'
import image10 from './class-13/img/image10.png'
import image11 from './class-13/img/image11.png'
import image12 from './class-13/img/image12.png'
import image13 from './class-13/img/image13.png'

import sine8Trunc from './class-13/snd/sine_quant_8bit.mp3'
import sine8Rect from './class-13/snd/sine_quant_8bitrect.mp3'
import sine8Tri from './class-13/snd/sine_quant_8bittri.mp3'
import sine4Trunc from './class-13/snd/sine_quant_4bit.mp3'
import sine4Rect from './class-13/snd/sine_quant_4bitrect.mp3'
import sine4Tri from './class-13/snd/sine_quant_4bittri.mp3'
import sine2Trunc from './class-13/snd/sine_quant_2bit.mp3'
import sine2Rect from './class-13/snd/sine_quant_2bitrect.mp3'
import sine2Tri from './class-13/snd/sine_quant_2bittri.mp3'

import speech8Trunc from './class-13/snd/sqam_49_female_8bit.mp3'
import speech8Rect from './class-13/snd/sqam_49_female_8bitrect.mp3'
import speech8Tri from './class-13/snd/sqam_49_female_8bittri.mp3'
import speech4Trunc from './class-13/snd/sqam_49_female_4bit.mp3'
import speech4Rect from './class-13/snd/sqam_49_female_4bitrect.mp3'
import speech4Tri from './class-13/snd/sqam_49_female_4bittri.mp3'
import speech2Trunc from './class-13/snd/sqam_49_female_2bit.mp3'
import speech2Rect from './class-13/snd/sqam_49_female_2bitrect.mp3'
import speech2Tri from './class-13/snd/sqam_49_female_2bittri.mp3'

import music8Trunc from './class-13/snd/bigband_8bit.mp3'
import music8Rect from './class-13/snd/bigband_8bitrect.mp3'
import music8Tri from './class-13/snd/bigband_8bittri.mp3'
import music4Trunc from './class-13/snd/bigband_4bit.mp3'
import music4Rect from './class-13/snd/bigband_4bitrect.mp3'
import music4Tri from './class-13/snd/bigband_4bittri.mp3'
import music2Trunc from './class-13/snd/bigband_2bit.mp3'
import music2Rect from './class-13/snd/bigband_2bitrect.mp3'
import music2Tri from './class-13/snd/bigband_2bittri.mp3'

import waveShapingExample00 from './class-13/snd/00_Master_16_bit.mp3'
import waveShapingExample01 from './class-13/snd/01_Truncate_8_bit.mp3'
import waveShapingExample02 from './class-13/snd/02_Standard_Dither_8_bit.mp3'
import waveShapingExample03 from './class-13/snd/03_Most_Widely_Known_8_bit.mp3'
import waveShapingExample04 from './class-13/snd/04_Most_Powerful_8_bit.mp3'

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 13: Improving (Re-)Quantization Quality</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h3>Introduction</h3>
      <div className="bigger">Quantization error properties are fixed, so there is no way of improving the quality</div>
      <br/><br/>
      <Fragment>
      <div><b>Or is there????</b></div>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>"Cheating" for Better Quality</h3>
      <br/>
      <div className="big">
      Improving perceptual quality of errors due to:
      <List>
      <div>Quantization
      <div className="small"><List><div>Oversampling</div><div>Noise Shaping</div></List></div>
      </div>
      <div>Re-Quantization / Word Length Reduction
      <div className="small"><List><div>Dither</div><div>Noise Shaping</div></List></div>
      </div>
      </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Oversampling</h4>
      <List fragment={true}>
        <div>Recording at higher sample rates and downsampling</div>
        <div>Allows use of less steep anti-aliasing filters</div>
        <div>Also improves quantization error</div>
      </List>
      <br/>
      <Fragment>
        <div>Quantization error properties</div>
        <List>
          <div><i>White</i> noise (ie <b>flat spectrum</b>)</div>
          <div>Noise power <i>sample rate independent</i></div>
        </List>
      </Fragment>
      <Fragment>
        <MathComponent tex={String.raw`|Q(\mathrm{j}\omega)|^2 \sim \frac{\Delta^2}{12\cdot \omega_\mathrm{S}}`}/>
      </Fragment>
      <aside className="notes">
        <p>Used in all DACs these days</p>
        <p>Less steep anti-aliasing filters needed</p>
        <p>Biggest gains are in quantization</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Oversampling Process</h4>
      <br/>
      <img src={image00} style={{width: "45%"}}/>
      <aside className="notes">
      <p>L is multiplier - oversampling amount</p>
      <p>How does this process reduce the quantization noise?</p>
      <p>Energy is integral across entire spectrum</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Quantization Noise Spectrum for Oversampling Amount</h4>
      <br/>
      <img src={image01}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>SNR Gain from Oversampling</h4>
      <MathComponent tex={String.raw`\eqalign{|Q(\mathrm{j}\omega)|^2 &=& \frac{\Delta^2}{12\cdot \omega^\ast_S} \\
			&=& \frac{\Delta^2}{12\cdot L\cdot \omega_S}\\
			W^\ast_\mathrm{Q,LP} &=& \frac{\Delta^2}{12\cdot L}\\
      \Rightarrow&&\\
			SNR^\ast &=& 6.02\cdot w + 10\log_{10} (L) + c_S}`}/>

      <aside className="notes">
        <p>Basically dividing energy by L</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Oversampling Summary</h4>
      <br/>
      <div className="framed bordered">
        <MathComponent tex={String.raw`SNR = 6.02\cdot w + c_S + 10\log_{10} (L)`}/>
        <br/>
        Every doubling of <MathComponent tex={String.raw`f_S`} display={false}/> <b>adds ~3dB SNR</b>
      </div>
      <aside className="notes">
        <p>1-bit ADC convertors - this WORKS! Needs massively high L</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Dither</h4>
      <br/>
      <div className="row">
        <div className="col-50">
          <div className="small">
            <List fragment={true}>
              <div>Previous assumption: <b>Quantization error is white noise</b> (ie, rect)
                <div className=""><List><div><b>No correlation</b> between signal and quantization error</div></List>
                </div>
              </div>
              <div><b>Not true for:</b>
                <div className=""><List><div>Low signal level</div><div>Low signal frequency</div></List>
                </div>
              </div>
            </List>
          </div>
        </div>
        <div className="col-50">
          <Fragment>
            <img src={quantErrorImg}/>
          </Fragment>
        </div>
      </div>
      <Fragment>
        <div><b>Solution</b>: Add noise before quantization (dither)</div>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image02} style={{width:"45%"}}/>
      <aside className="notes">
      <p>Sinusodial plus noise</p>
      <p>It is not masking - the noise floor is LOWER than the peaks</p>
      <p>Noise Floor is raised, but white noise is more avoidable</p>
      <p>Periodicity is information, uniform noise is not</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Dither Process</h4>
      <br/>
      <img src={image03}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Dither Simple Example</h4>
      Input signal: DC at <MathComponent tex={String.raw`1.3 \cdot \Delta`} display={false}/>
      <br/>
      <List fragment={true}>
        <div>Without dither:
          <List fragment={true}><div>Output value: <MathComponent tex={String.raw`\Delta`} display={false}/></div>
            <div><i>Quantization error constant</i>: <MathComponent tex={String.raw`0.3 \cdot \Delta`} display={false}/></div>
          </List>
        </div>
        <div>With dither:
          <List fragment={true}><div>Output range: <MathComponent tex={String.raw`-\Delta / 2 ... \Delta / 2`} display={false}/></div>
            <div>Signal is most frequently quantized to <MathComponent tex={String.raw`\Delta`} display={false}/>
              (<i>p</i> = 0.7), but sometimes to <MathComponent tex={String.raw`2 \cdot \Delta`} display={false}/>
              (<i>p</i> = 0.3)
            </div>
            <div><i>Average</i> output value: <MathComponent tex={String.raw`1.3 \cdot \Delta`} display={false}/></div>
            <div><i>Quantization error varying</i> between <MathComponent tex={String.raw`0.3 \cdot \Delta`} display={false}/> and <MathComponent tex={String.raw`0.7 \cdot \Delta`} display={false}/></div>
          </List>
        </div>
      </List>
      <aside className="notes">
      <p>With dither, we can approximate each value correctly</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Dither Properties</h4>
      <img src={image03} style={{width:"80%"}}/>
      <List fragment={true}>
      <div>Dither: <MathComponent tex={String.raw`2^s`} display={false}/> possible numbers</div>
      <div>In case of <i>uniform</i> distribution:
      <MathComponent tex={String.raw`p_d(d_n) = \left\lbrace \begin{array}{ll} 2^{-s} & -2^{s-1} \leq n \leq 2^{s-1}-1 \cr 0 & \text{else} \end{array}\right.`}/>
      </div>
      <div>Output (positive <i>X</i>)
      <MathComponent tex={String.raw`x_Q(X + d_n) = \Delta\left\lfloor \frac{X + d_n}{\Delta} + 0.5 \right\rfloor`}/>
      </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <h5>Dither with Rectangular PDF, <MathComponent tex={String.raw`-\frac{\Delta}{2} ... \frac{\Delta}{2}`} display={false}/>, Not Quantized</h5>
    <div className="smaller">
    <MathComponent tex={String.raw`\begin{eqnarray}
               x = 0 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}} =0,\\ 
            \sigma_R(x) &= \Delta\sqrt{(-0)^2\cdot 1.0} &= 0.0\Delta\\
               x = 0.1 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}} = 0.1\Delta ,\\ 
            \sigma_R(x) &= \Delta\sqrt{(-0.1)^2\cdot0.9 + (0.9)^2\cdot0.1} &= 0.3\Delta \\ 
                x  = 0.3 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}}= 0.3\Delta ,\\ 
            \sigma_R(x) &= \Delta\sqrt{(-0.3)^2\cdot0.7 + (0.7)^2\cdot0.3} &= 0.46\Delta \\ 
               x  = 0.5 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}}= 0.5\Delta ,\\ 
            \sigma_R(x) &= \Delta\sqrt{(-0.5)^2\cdot0.5 + (0.5)^2\cdot0.5} &= 0.5\Delta \\ 
               x  = 0.7 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}}= 0.7\Delta ,\\ 
            \sigma_R(x) &= \Delta\sqrt{(-0.7)^2\cdot0.3 + (0.3)^2\cdot0.7} &= 0.46\Delta \\ 
               x  = 0.9 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}}= 0.9\Delta ,\\ 
            \sigma_R(x) &= \Delta\sqrt{(-0.9)^2\cdot0.1 + (0.1)^2\cdot0.9} &= 0.3\Delta \\ 
               x = 1 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}} =0,\\ 
            \sigma_R(x) = 0&&
        \end{eqnarray}`}/>
        </div>
      <aside className="notes">
      <p>Looking at what is the energy of the error is</p>
      <p>Input size of zero, rectangular noise</p>
      <p>Quantized output is zero, variance is zero, no error at all</p>
      <p>Increasing input value to 0.1</p>
      <p>On average, our output is still 0.1 (as shown before)</p>
      <p>But we still make errors</p>
      <p>90% of the time we make a -0.1 error, 10% of the time we make 0.9 error</p>
      <p>Leads to standard deviation error of 0.3*Delta</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <h5>Dither with Triangular PDF, <MathComponent tex={String.raw`-\Delta ... \Delta`} display={false}/>, Not Quantized</h5>
    <div className="smaller">
    <MathComponent tex={String.raw`\begin{eqnarray}
               x = 0 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}} =0,\\ 
            \sigma_R(x) = 0.5\Delta&&\\ 
               x = 0.1 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}} = 0.1\Delta ,\\ 
            \sigma_R(x) = 0.5\Delta&&\\ 
               x = 0.3 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}} = 0.3\Delta ,\\ 
            \sigma_R(x) = 0.5\Delta&&\\ 
               x = 0.5 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}} = 0.5\Delta ,\\ 
            \sigma_R(x) = 0.5\Delta&&\\ 
               x = 0.7 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}} = 0.7\Delta ,\\ 
            \sigma_R(x) = 0.5\Delta&&\\ 
               x = 0.9 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}} = 0.9\Delta ,\\ 
            \sigma_R(x) = 0.5\Delta&&\\ 
               x = 1 \cdot \Delta &&\rightarrow \bar{x_\mathrm{Q}} =0,\\
            \sigma_R(x) = 0.5\Delta&&
        \end{eqnarray}`}/>
    </div>
      <aside className="notes">
      <p>This looks different with triangular PDF</p>
      <p>Not deriving it, but you can think of this intiutively</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h5>Linearization and Noise Modulation</h5>
      <img src={image04}/>
      <aside className="notes">
      <p>Triangular noise is best</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h5>Linearization and Noise Modulation</h5>
      <img src={image05} style={{width:"80%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <h5>Noise Properties</h5>
    <img src={image06}/>
    <MathComponent tex={String.raw`\begin{eqnarray}
			d_\mathrm{RECT}(n) &=& d(n)\\
			d_\mathrm{TRI}(n) &=& d_\mathrm{RECT,1}(n)+d_\mathrm{RECT,2}(n)\\
      d_\mathrm{HP}(n) &=& d(n)-d(n-1)
		\end{eqnarray}`}/>
      <aside className="notes">
      <p>Triangular distribution by adding rectangulars - think rolling two dice</p>
      <p>High pass noise - similar to triangular but only adds higher frequencies (better for perception)</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <h5>Noise Properties</h5>
    <img src={image07} style={{width: "55%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <h4>How Does the SNR Change by Adding Dither?</h4>
    <div>Noise power of <MathComponent tex={String.raw`d_\mathrm{RECT}`} display={false}/> & <MathComponent tex={String.raw`d_\mathrm{TRI}`} display={false}/></div>
    <MathComponent tex={String.raw`            \begin{eqnarray}
                W_\mathrm{RECT} &=& \frac{\Delta^2}{12}\\
                W_\mathrm{TRI} &=& \frac{\Delta^2}{6}
            \end{eqnarray}`}/>
    <div>SNR of dithered full scale signal</div>
    <MathComponent tex={String.raw`		\begin{eqnarray}
			SNR_\mathrm{RECT} 	&= SNR_{normal} - 3.01 &[dB] \\
			SNR_\mathrm{TRI} 	&= SNR_{normal} - 4.77 &[dB] 
		\end{eqnarray}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <div className="row heading">
    <div className="col-40"></div>
    <div className="col-20">Sine</div>
    <div className="col-20">Speech</div>
    <div className="col-20">Music</div>
    </div>
    <div className="row evenRow">
    <div className="col-20">8-Bit</div>
    <div className="col-20">Trunc</div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={sine8Trunc} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={speech8Trunc} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={music8Trunc} controls/></div>
    </div>
    <div className="row evenRow">
    <div className="col-20"></div>
    <div className="col-20">Rect</div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={sine8Rect} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={speech8Rect} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={music8Rect} controls/></div>
    </div>
    <div className="row evenRow">
    <div className="col-20"></div>
    <div className="col-20">Tri</div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={sine8Tri} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={speech8Tri} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={music8Tri} controls/></div>
    </div>
    

    <div className="row oddRow">
    <div className="col-20">4-Bit</div>
    <div className="col-20">Trunc</div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={sine4Trunc} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={speech4Trunc} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={music4Trunc} controls/></div>
    </div>
    <div className="row oddRow">
    <div className="col-20"></div>
    <div className="col-20">Rect</div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={sine4Rect} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={speech4Rect} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={music4Rect} controls/></div>
    </div>
    <div className="row oddRow">
    <div className="col-20"></div>
    <div className="col-20">Tri</div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={sine4Tri} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={speech4Tri} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={music4Tri} controls/></div>
    </div>

    <div className="row evenRow">
    <div className="col-20">2-Bit</div>
    <div className="col-20">Trunc</div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={sine2Trunc} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={speech2Trunc} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={music2Trunc} controls/></div>
    </div>
    <div className="row evenRow">
    <div className="col-20"></div>
    <div className="col-20">Rect</div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={sine2Rect} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={speech2Rect} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={music2Rect} controls/></div>
    </div>
    <div className="row evenRow">
    <div className="col-20"></div>
    <div className="col-20">Tri</div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={sine2Tri} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={speech2Tri} controls/></div>
    <div className="col-20"><ReactAudioPlayer style={{width:"125px"}} src={music2Tri} controls/></div>
    </div>

<aside className="notes">
<p>Decreases SNR, but actually increases noise</p>
<p>Idea is DECORRELATING the error</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h5>Z-Transform (Quick and Dirty)</h5>
      <MultiTable sizes={[25, 20, 10, 20, 25]}>
        <div/><div><b>Z</b></div><div/><div><b>Time</b></div><div/>
        <div/><div><MathComponent tex={String.raw`X(z)`} display={false}/></div><div><MathComponent tex={String.raw`\leftrightarrow`} display={false}/></div><div><MathComponent tex={String.raw`x(n)`} display={false}/></div><div/>
        <div/><div><MathComponent tex={String.raw`X(z) \cdot z^{-k}`} display={false}/></div><div><MathComponent tex={String.raw`\leftrightarrow`} display={false}/></div><div><MathComponent tex={String.raw`x(n - k)`} display={false}/></div><div/>
      </MultiTable>
      <br/>
      <Fragment>
        <b>Transfer Function:</b>
        <MathComponent tex={String.raw`H(z) = \frac{out}{in} = \frac{Y(z)}{X(z)}`}/>
      </Fragment>
      <Fragment>
        <b>Spectrum:</b>
        <MathComponent tex={String.raw`H(\mathrm{j}\Omega) = H(z\big|_{z=e^{\mathrm{j}\Omega}})`}/>
      </Fragment>
      <aside className="notes">
        <p>For dither, we looked at high passed filtered noise, which gives "perceptual SNR"</p>
        <p>Noise shaping takes this idea and applies it to quantization error: can we filter the quantization errors?</p>
        <p>To talk about noise shaping, must introduce Z Transform, but a fuller understanding is for a future class</p>
        <p>Z properties, similar to fourier transform</p>
        <p>Fourier transform is special case of Z transform</p>
        <p>Don't have to understand this yet</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Noise Shaping</h4>
      <div className="left"><b>Idea</b></div>
      <div>Filter quantization error, shape its frequency response</div>
      <br/>
      <Fragment>
        <List>
          <div>Move power to high frequencies</div>
          <div>Less recognizable in lower frequencies</div>
        </List>
      </Fragment>
      <aside className="notes">
        <p>Move power to higher frequencies</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>First Order Noise Shaping</h4>
      <img src={image08}/>
      <Fragment>
        <MathComponent tex={String.raw`\eqalign{y(i) &=& [x(i)-q(i-1)]_Q \nonumber\\
	     		&=& x(i)-q(i-1)+q(i)}`}/>
      </Fragment>
      <aside className="notes">
        <p>Top is normal quantization</p>
        <p>Subtracting input from quantized output - it's the quantization error</p>
        <p>z^-1 means delayed by one sample (see previous slide)</p>
        <p>Subtract delayed quant error from input before quantizing</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <div className="normal">
      <div style={{position: "relative", left: "0px"}}>
        <MathComponent tex={String.raw`y(i) = x(i)-q(i-1)+q(i)`}/>
      </div>
      <Fragment>
      <div style={{position: "relative", left: "25px"}}>
        <MathComponent tex={String.raw`\eqalign{Y(z) &=& X(z) - z^{-1}\cdot Q(z) + Q(z) \\
          &=& X(z) + \underbrace{(1-z^{-1})}_{H_\mathrm{Q}(z)}\cdot Q(z)}`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left: "-130px"}}>
        <MathComponent tex={String.raw`\eqalign{\Rightarrow && \\
          H_\mathrm{Q}(z) &=& 1-z^{-1}}`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left: "-133px"}}>
        <MathComponent tex={String.raw`|H_\mathrm{Q}(\mathrm{j}\Omega)| = |1-e^{-\mathrm{j}\Omega}|`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left: "-21px"}}>
        <MathComponent tex={String.raw`= 2 \cdot \left|\sin\left(\frac{\Omega}{2}\right)\right|`}/>
      </div>
      </Fragment>
    </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Second Order Noise Shaping</h4>
      <img src={image09}/>
      <Fragment>
        <MathComponent tex={String.raw`\eqalign{y(i) &=& [x(i)-2\cdot q(i-1) + q(i-2)]_Q \nonumber\\
          &=& x(i)-2\cdot q(i-1)+q(i-2)+q(i)}`}/>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
    <div className="normal">
      <div style={{position: "relative", left: "0px"}}>
        <MathComponent tex={String.raw`y(i) = x(i)-2\cdot q(i-1)+q(i-2)+q(i)\nonumber`}/>
      </div>
      <Fragment>
      <div style={{position: "relative", left: "40px"}}>
        <MathComponent tex={String.raw`\eqalign{Y(z) &=& X(z) - 2\cdot z^{-1}\cdot Q(z) + z^{-2}\cdot Q(z) + Q(z)\nonumber\\
          &=& X(z) + {(1-z^{-1})^2}\cdot Q(z)}`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left: "-210px"}}>
        <MathComponent tex={String.raw`\eqalign{\Rightarrow&&\nonumber\\
          H_\mathrm{Q}(z) &=& (1-z^{-1})^2}`}/>
      </div>
      </Fragment>
      <Fragment>
      <div className="left">Without derivation: <i>n</i>th order noise shaping</div>
      <div style={{position: "relative", left: "0px"}}>
        <MathComponent tex={String.raw`\eqalign{Y(z) &=& X(z) + (1-z^{-1})^n\cdot Q(z)\\
          \Rightarrow&&\nonumber\\
          H_\mathrm{Q}(z) &=& (1-z^{-1})^n}`}/>
      </div>
      </Fragment>
    </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Higher Order Noise Shaping</h4>
      <img src={image10} style={{width: "60%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Arbitrary Noise Shaping Transfer Functions</h4>
      <img src={image11} style={{width: "60%"}}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Dither & Noise Shaping</h4>
      <img src={image12}/>
      <aside className="notes">
        
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Dither & Noise Shaping: System A</h4>
      <br/>
      <MathComponent tex={String.raw`\eqalign{y(i) &=& [x(i) + d(n) -q(i-1)]_Q \nonumber\\
				&=& x(i)+d(n)-q(i-1)+q(i)}`}/>
      <br/>
      <Fragment>
        <MathComponent tex={String.raw`\eqalign{Y(z) &=& X(z) - z^{-1}\cdot Q(z) + Q(z) + D(z)\nonumber\\
          &=& X(z) + (1-z^{-1})\cdot Q(z) + D(z)}`}/>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Dither & Noise Shaping: System B</h4>
      <br/>
      <MathComponent tex={String.raw`\eqalign{y(i) &=& [x(i) + d(n) - q(i-1) - d(n-1)]_Q \nonumber\\
				&=& x(i)-q(i-1)+q(i)-d(n-1)+d(n)}`}/>
      <br/>
      <Fragment>
        <MathComponent tex={String.raw`\eqalign{Y(z) &=& X(z) - z^{-1}\cdot Q(z) + Q(z) - z^{-1}\cdot D(z) + D(z)\nonumber\\
          &=& X(z) + (1-z^{-1})\cdot (Q(z) + D(z))}`}/>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Noise Shaping Audio Example</h4>
      <List>
        <div>16 Bit: <ReactAudioPlayer src={waveShapingExample00} controls/></div>
        <div>8 Bit: <ReactAudioPlayer src={waveShapingExample01} controls/></div>
        <div>8 Bit Dither: <ReactAudioPlayer src={waveShapingExample02} controls/></div>
        <div>8 Bit Standard Noise Shaping: <ReactAudioPlayer src={waveShapingExample03} controls/></div>
        <div>8 Bit Powerful Noise Shaping: <ReactAudioPlayer src={waveShapingExample04} controls/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Noise Shaping Spectrograms</h4>
      <img src={image13}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Summary</h4>
      <div className="normal">
        <List fragment={true}>
          <div><b>Oversampling</b>
            <div className="small">
              <List>
                <div>Reduces quantization error power in the audible band</div>
                <div><i>Process</i>: oversampling <MathComponent tex={String.raw`\rightarrow`} display={false}/> filtering <MathComponent tex={String.raw`\rightarrow`} display={false}/> downsampling</div>
              </List>
            </div>
          </div>
          <div><b>Dither</b>
            <div className="small">
              <List>
                <div>Reduces correlation of error and signal for low amplitude signals</div>
                <div>Increases the power of the quantization error slightly</div>
                <div><i>Process</i>: Add triangular shaped low-level noise before word-length reduction</div>
              </List>
            </div>
          </div>
          <div><b>Noise Shaping</b>
            <div className="small">
              <List>
                <div>Reduces the audibility of the quantization error by shifting it to high frequencies</div>
                <div>Works best at high sample rates</div>
                <div><i>Process</i>: Feedback the quantization error</div>
              </List>
            </div>
          </div>
        </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

import React, { Component } from 'react'
import Section from 'lib/component/Section'

import Presentation from 'lib/template/Presentation'

import Counter from './example/component/Counter'
import SineWave from './example/component/SineWave'
import Table from './example/component/Table'
import List from './example/component/List'
import Schedule from './example/component/Schedule'
import MyPieChart from './example/component/MyPieChart'
import Plot from './example/component/Plot'
import Animate from './example/component/Animate'

import win1 from './class-08/img/windowing_1.png'
import win2 from './class-08/img/windowing_2.png'
import win3 from './class-08/img/windowing_3.png'
import win4 from './class-08/img/windowing_4.png'
import win5 from './class-08/img/windowing_5.png'

import spectro from './class-08/img/spectro.jpg'

import WinFreqPlot from './class-08/component/WinFreqPlot'

import winRect from './class-08/data/winRect.csv'
import dbRect from './class-08/data/dbRect.csv'

import winTriangle from './class-08/data/winTriangle.csv'
import dbTriangle from './class-08/data/dbTriangle.csv'

import winVonHann from './class-08/data/winVonHann.csv'
import dbVonHann from './class-08/data/dbVonHann.csv'

import winHamming from './class-08/data/winHamming.csv'
import dbHamming from './class-08/data/dbHamming.csv'

import winCosine from './class-08/data/winCosine.csv'
import dbCosine from './class-08/data/dbCosine.csv'

import winBlackmanHarris from './class-08/data/winBlackmanHarris.csv'
import dbBlackmanHarris from './class-08/data/dbBlackmanHarris.csv'

import specSampling1 from './class-08/img/spectrum_sampling_1.png'
import specSampling2 from './class-08/img/spectrum_sampling_2.png'


import a1 from './class-08/img/spec-aliasing/aliasing_1.png'
import a2 from './class-08/img/spec-aliasing/aliasing_2.png'
import a3 from './class-08/img/spec-aliasing/aliasing_3.png'
import a4 from './class-08/img/spec-aliasing/aliasing_4.png'
import a5 from './class-08/img/spec-aliasing/aliasing_5.png'
import a6 from './class-08/img/spec-aliasing/aliasing_6.png'
import a7 from './class-08/img/spec-aliasing/aliasing_7.png'
import a8 from './class-08/img/spec-aliasing/aliasing_8.png'
import a9 from './class-08/img/spec-aliasing/aliasing_9.png'
import a10 from './class-08/img/spec-aliasing/aliasing_10.png'
import a11 from './class-08/img/spec-aliasing/aliasing_11.png'
import a12 from './class-08/img/spec-aliasing/aliasing_12.png'
import a13 from './class-08/img/spec-aliasing/aliasing_13.png'
import a14 from './class-08/img/spec-aliasing/aliasing_14.png'
import a15 from './class-08/img/spec-aliasing/aliasing_15.png'
import a16 from './class-08/img/spec-aliasing/aliasing_16.png'
import a17 from './class-08/img/spec-aliasing/aliasing_17.png'
import a18 from './class-08/img/spec-aliasing/aliasing_18.png'
import a19 from './class-08/img/spec-aliasing/aliasing_19.png'
import a20 from './class-08/img/spec-aliasing/aliasing_20.png'
import a21 from './class-08/img/spec-aliasing/aliasing_21.png'
import a22 from './class-08/img/spec-aliasing/aliasing_22.png'
import a23 from './class-08/img/spec-aliasing/aliasing_23.png'
import a24 from './class-08/img/spec-aliasing/aliasing_24.png'
import a25 from './class-08/img/spec-aliasing/aliasing_25.png'
import a26 from './class-08/img/spec-aliasing/aliasing_26.png'
import a27 from './class-08/img/spec-aliasing/aliasing_27.png'
import a28 from './class-08/img/spec-aliasing/aliasing_28.png'
import a29 from './class-08/img/spec-aliasing/aliasing_29.png'
import a30 from './class-08/img/spec-aliasing/aliasing_30.png'
import a31 from './class-08/img/spec-aliasing/aliasing_31.png'
import a32 from './class-08/img/spec-aliasing/aliasing_32.png'
import a33 from './class-08/img/spec-aliasing/aliasing_33.png'
import a34 from './class-08/img/spec-aliasing/aliasing_34.png'
import a35 from './class-08/img/spec-aliasing/aliasing_35.png'
import a36 from './class-08/img/spec-aliasing/aliasing_36.png'
import a37 from './class-08/img/spec-aliasing/aliasing_37.png'
import a38 from './class-08/img/spec-aliasing/aliasing_38.png'
import a39 from './class-08/img/spec-aliasing/aliasing_39.png'
import a40 from './class-08/img/spec-aliasing/aliasing_40.png'
import a41 from './class-08/img/spec-aliasing/aliasing_41.png'
import a42 from './class-08/img/spec-aliasing/aliasing_42.png'
import a43 from './class-08/img/spec-aliasing/aliasing_43.png'
import a44 from './class-08/img/spec-aliasing/aliasing_44.png'
import a45 from './class-08/img/spec-aliasing/aliasing_45.png'
import a46 from './class-08/img/spec-aliasing/aliasing_46.png'
import a47 from './class-08/img/spec-aliasing/aliasing_47.png'
import a48 from './class-08/img/spec-aliasing/aliasing_48.png'
import a49 from './class-08/img/spec-aliasing/aliasing_49.png'
import a50 from './class-08/img/spec-aliasing/aliasing_50.png'
import a51 from './class-08/img/spec-aliasing/aliasing_51.png'
import a52 from './class-08/img/spec-aliasing/aliasing_52.png'
import a53 from './class-08/img/spec-aliasing/aliasing_53.png'
import a54 from './class-08/img/spec-aliasing/aliasing_54.png'
import a55 from './class-08/img/spec-aliasing/aliasing_55.png'
import a56 from './class-08/img/spec-aliasing/aliasing_56.png'
import a57 from './class-08/img/spec-aliasing/aliasing_57.png'
import a58 from './class-08/img/spec-aliasing/aliasing_58.png'
import a59 from './class-08/img/spec-aliasing/aliasing_59.png'
import a60 from './class-08/img/spec-aliasing/aliasing_60.png'
import a61 from './class-08/img/spec-aliasing/aliasing_61.png'
import a62 from './class-08/img/spec-aliasing/aliasing_62.png'
import a63 from './class-08/img/spec-aliasing/aliasing_63.png'
import a64 from './class-08/img/spec-aliasing/aliasing_64.png'
import a65 from './class-08/img/spec-aliasing/aliasing_65.png'
import a66 from './class-08/img/spec-aliasing/aliasing_66.png'
import a67 from './class-08/img/spec-aliasing/aliasing_67.png'
import a68 from './class-08/img/spec-aliasing/aliasing_68.png'
import a69 from './class-08/img/spec-aliasing/aliasing_69.png'
import a70 from './class-08/img/spec-aliasing/aliasing_70.png'
import a71 from './class-08/img/spec-aliasing/aliasing_71.png'
import a72 from './class-08/img/spec-aliasing/aliasing_72.png'
import a73 from './class-08/img/spec-aliasing/aliasing_73.png'
import a74 from './class-08/img/spec-aliasing/aliasing_74.png'
import a75 from './class-08/img/spec-aliasing/aliasing_75.png'
import a76 from './class-08/img/spec-aliasing/aliasing_76.png'
import a77 from './class-08/img/spec-aliasing/aliasing_77.png'
import a78 from './class-08/img/spec-aliasing/aliasing_78.png'
import a79 from './class-08/img/spec-aliasing/aliasing_79.png'
import a80 from './class-08/img/spec-aliasing/aliasing_80.png'
import a81 from './class-08/img/spec-aliasing/aliasing_81.png'
import a82 from './class-08/img/spec-aliasing/aliasing_82.png'
import a83 from './class-08/img/spec-aliasing/aliasing_83.png'
import a84 from './class-08/img/spec-aliasing/aliasing_84.png'
import a85 from './class-08/img/spec-aliasing/aliasing_85.png'
import a86 from './class-08/img/spec-aliasing/aliasing_86.png'
import a87 from './class-08/img/spec-aliasing/aliasing_87.png'
import a88 from './class-08/img/spec-aliasing/aliasing_88.png'
import a89 from './class-08/img/spec-aliasing/aliasing_89.png'
import a90 from './class-08/img/spec-aliasing/aliasing_90.png'
import a91 from './class-08/img/spec-aliasing/aliasing_91.png'
import a92 from './class-08/img/spec-aliasing/aliasing_92.png'
import a93 from './class-08/img/spec-aliasing/aliasing_93.png'
import a94 from './class-08/img/spec-aliasing/aliasing_94.png'
import a95 from './class-08/img/spec-aliasing/aliasing_95.png'
import a96 from './class-08/img/spec-aliasing/aliasing_96.png'
import a97 from './class-08/img/spec-aliasing/aliasing_97.png'
import a98 from './class-08/img/spec-aliasing/aliasing_98.png'
import a99 from './class-08/img/spec-aliasing/aliasing_99.png'
import a100 from './class-08/img/spec-aliasing/aliasing_100.png'
import a101 from './class-08/img/spec-aliasing/aliasing_101.png'


import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
        <div className="right">Part 8: Fourier Transform, Part 2</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
        <div>Examples: FT of:
          <ol>
            <li>Delta Function</li>
            <li>Constant</li>
            <li>Cosine</li>
            <li>Rectangular Window</li>
            <li>Delta Pulse</li>
          </ol>
        </div>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Short Time Fourier Transform (STFT)</h3>
      <p><i>Compute Fourier transform only over a segment</i></p>
      <br/>
      <List fragment="all">
        <div><b>Signal Properties</b>: Choose quasi-periodic segment</div>
        <div><b>Perception</b>: Ear analyzes short segments of signal</div>
        <div><b>Hardware</b>: Fourier Transform is inefficient and memory consuming for very long input segments</div>
      </List>
      <br/>
      <Fragment><div className="normal">Multiply a <b>window</b> with the signal</div></Fragment>
      <aside className="notes">
        <div>Examples: FT of:
          <ol>
            <li>Delta Function</li>
            <li>Constant</li>
            <li>Cosine</li>
            <li>Rectangular Window</li>
            <li>Delta Pulse</li>
          </ol>
        </div>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Animation of Process</h3>
      <Animate images={[win1, win2, win3, win4, win5]}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Alternate Representation of STFT</h3>
      <img src={spectro}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Windowing Effects in the Frequency Domain</h3>
      <br/>
      <i>Multiplication in time domain is convolution in the frequency domain</i>

      <MathComponent tex={String.raw`x_\mathrm{W}(t) = x(t)\cdot w(t) \rightarrow X_\mathrm{W}(\mathrm{j}\omega) = X(\mathrm{j}\omega) \ast W(\mathrm{j}\omega)`}/>

      This causes <b>spectral leakage</b>
      <aside className="notes">
        <p>Just as convolution in time domain is multiplication in the frequency domain, the reverse is true</p>
        <p>Due to the symmetry between FT and IFT</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <div className="heading smaller">Rectangular</div>
      <WinFreqPlot width={900} height={200} winData={winRect} dbData={dbRect}/>
      <div className="heading smaller">Triangle</div>
      <WinFreqPlot width={900} height={200} winData={winTriangle} dbData={dbTriangle}/>
      <div className="heading smaller">Cosine</div>
      <WinFreqPlot width={900} height={200} winData={winCosine} dbData={dbCosine}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <div className="heading smaller">Hamming</div>
      <WinFreqPlot width={900} height={200} winData={winHamming} dbData={dbHamming}/>
      <div className="heading smaller">Von Hann</div>
      <WinFreqPlot width={900} height={200} winData={winVonHann} dbData={dbVonHann}/>
      <div className="heading smaller">Blackman-Harris</div>
      <WinFreqPlot width={900} height={200} winData={winBlackmanHarris} dbData={dbBlackmanHarris}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Properties of Spectral Leakage</h3>
      <List fragment={true}>
        <div><b>Main Lobe Width</b>: How much does the main lobe "smear" a peak?</div>
        <div><b>Side Lobe Height</b>: How domainant is the (highest) side lobe?</div>
        <div><b>Side Lobe Attenuation/Fall-off</b>: How much do distant side lobes influence results?</div>
        <div><b>Process and Scalloping Loss (DFT)</b>: How accurate is the amplitude (best and worst case)</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Rectangular Window</h3>
      <MathComponent tex={String.raw`w_{\mathrm{R}}(t) = \left\lbrace \begin{array}{ll} 1, & -\frac{1}{2} \leq t \leq \frac{1}{2} \cr  0, & \text{otherwise} \end{array}\right.`}/>
      <WinFreqPlot width={900} height={400} winData={winRect} dbData={dbRect}/>
      <aside className="notes">
        <p>Main Lobe Width</p>
        <p>Side Lobe Height</p>
        <p>Side Lobe Attenuation</p>
        <p>Scalloping Loss</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Triangle Window</h3>
      <MathComponent tex={String.raw`w_{\mathrm{T}}(t) = \left\lbrace \begin{array}{ll} 1 + (2 t), & -\frac{1}{2} \leq t \lt 0 \cr  2 t, & 0 \leq t \leq \frac{1}{2} \cr 0, & \text{otherwise} \end{array}\right.`}/>
      <WinFreqPlot width={900} height={400} winData={winTriangle} dbData={dbTriangle}/>
      <aside className="notes">
        <p>Main Lobe Width</p>
        <p>Side Lobe Height</p>
        <p>Side Lobe Attenuation</p>
        <p>Scalloping Loss</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Cosine Window</h3>
      <MathComponent tex={String.raw`w_{\mathrm{C}}(t) = w_{\mathrm{R}}(t) \cdot \cos(\pi t)`}/>
      <WinFreqPlot width={900} height={400} winData={winCosine} dbData={dbCosine}/>
      <aside className="notes">
        <p>Main Lobe Width</p>
        <p>Side Lobe Height</p>
        <p>Side Lobe Attenuation</p>
        <p>Scalloping Loss</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Von-Hann Window</h3>
      <MathComponent tex={String.raw`w_{\mathrm{H}}(t) = w_{\mathrm{R}}(t) \cdot \frac{1}{2}(1 + \cos(2 \pi t))`}/>
      <WinFreqPlot width={900} height={400} winData={winVonHann} dbData={dbVonHann}/>
      <aside className="notes">
        <p>Main Lobe Width</p>
        <p>Side Lobe Height</p>
        <p>Side Lobe Attenuation</p>
        <p>Scalloping Loss</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Hamming Window</h3>
      <MathComponent tex={String.raw`w_{\mathrm{Hm}}(t) = w_{\mathrm{R}}(t) \cdot (\frac{25}{46} + \frac{21}{46} \cos(2 \pi t))`}/>
      <WinFreqPlot width={900} height={400} winData={winHamming} dbData={dbHamming}/>
      <aside className="notes">
        <p>Main Lobe Width</p>
        <p>Side Lobe Height</p>
        <p>Side Lobe Attenuation</p>
        <p>Scalloping Loss</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Blackman-Harris Window</h3>
      <MathComponent tex={String.raw`w_{\mathrm{BH}}(t) = w_{\mathrm{R}}(t) \cdot \sum\limits_{m=0}^{3}{b_m\cos\left(2 \pi mt\right)}`}/>
      <div className="small">with <MathComponent tex={String.raw`b_0 = 0.35875`} display={false}/>, <MathComponent tex={String.raw`b_1 = 0.48829`} display={false}/>, <MathComponent tex={String.raw`b_2 = 0.14128`} display={false}/>, <MathComponent tex={String.raw`b_3 = 0.01168`} display={false}/></div>
      <WinFreqPlot width={900} height={400} winData={winBlackmanHarris} dbData={dbBlackmanHarris}/>
      <aside className="notes">
        <p>Main Lobe Width</p>
        <p>Side Lobe Height</p>
        <p>Side Lobe Attenuation</p>
        <p>Scalloping Loss</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Sampled Time Signals</h3>
      <div style={{}}>
        <MathComponent tex={String.raw`\mathfrak{F}[x(i)] = \mathfrak{F}[x(t)\cdot \delta_\mathrm{T}(t)]`}/>
      </div>
      <Fragment>
        <div style={{position: "relative", left: "94px"}}>
          <MathComponent tex={String.raw`=  \mathfrak{F}[x(t)]\ast \mathfrak{F}[\delta_\mathrm{T}(t)]`}/>
        </div>
      </Fragment>
      <Fragment>
        <div style={{position: "relative", left: "84px"}}>
          <MathComponent tex={String.raw`=  X(\mathrm{j}\omega)\ast \Delta_\mathrm{T}(\mathrm{j}\omega)`}/>
        </div>
      </Fragment>
      <Fragment>
        <div className="row">
          <div className="col-50">
            Transformed signal is
            <List>
              <div>still <b>continuous</b></div>
              <div><b>periodic</b></div>
            </List>
          </div>
          <div className="col-50">
            <Animate images={[specSampling1, specSampling2]}/>
          </div>
        </div>
      </Fragment>
      <aside className="notes">
        <p>Model of sampling - multiply continuous signal by pulse train</p>
        <p>Multiply in time domain, convolution in frequency domain</p>
        <p>What do you get when convolving with a pulse train? Spectrum will be periodic</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Spectral Aliasing in Sampled Signals</h3>
      <br/>
      <Animate images={[a1, a2, a3, a4, a5, a6, a7, a8, a9,
                        a10, a11, a12, a13, a14, a15, a16, a17, a18, a19,
                        a20, a21, a22, a23, a24, a25, a26, a27, a28, a29,
                        a30, a31, a32, a33, a34, a35, a36, a37, a38, a39,
                        a40, a41, a42, a43, a44, a45, a46, a47, a48, a49,
                        a50, a51, a52, a53, a54, a55, a56, a57, a58, a59,
                        a60, a61, a62, a63, a64, a65, a66, a67, a68, a69,
                        a70, a71, a72, a73, a74, a75, a76, a77, a78, a79,
                        a80, a81, a82, a83, a84, a85, a86, a87, a88, a89,
                        a90, a91, a92, a93, a94, a95, a96, a97, a98, a99,
                        a100, a101
                       ]} animSpeed={0.1}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Discrete Fourier Transform (DFT)</h3>

      <br/>
      <div className="left">Digital domain requires working with discrete frequency values</div>

      <MathComponent tex={String.raw`X(k) = \sum\limits_{i=0}^{\mathcal{K}-1}{x(i)\mathrm{e}^{-\mathrm{j}ki\frac{2\pi}{\mathcal{K}}}}`}/>

      <Fragment>
        2 Interpretations:
        <List>
          <div>Sampled continuous Fourier transform</div>
          <div>Continuous Fourier transform of periodically extended time domain segment</div>
        </List>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>DFT Frequency Resolution</h3>
      <div className="left">Depends on:</div>
      <List>
        <div>Block length <MathComponent tex={String.raw`\mathcal{K}`} display={false}/></div>
        <div>Sample rate <MathComponent tex={String.raw`\omega_T`} display={false}/> (spectrum is periodic with <MathComponent tex={String.raw`\omega_T`} display={false}/>)</div>
      </List>

      <Fragment>
        <MathComponent tex={String.raw`\Delta \omega = \frac{\omega_T}{\mathcal{K}}`}/>
      </Fragment>

      <List fragment="all">
        <div>Increasing DFT length increases frequency resolution, decreasing time resolution</div>
        <div>Zero-padding can increase resolution without decreasing time resolution</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>DFT vs FFT</h3>
      <p>FFT is an algorithm to efficiently calculate the DFT</p>
      <p>Result is <b>identical</b></p>
      <br/>
      <div className="normal">
        <List>
          <div>DFT: <MathComponent tex={String.raw`\mathcal{K}^2`} display={false}/> complex multiplications</div>
          <div>FFT: <MathComponent tex={String.raw`\frac{\mathcal{K}}{2}\log_2(\mathcal{K})`} display={false}/> complex multiplications</div>
        </List>
      </div>
      <br/>
      <div style={{width: "75%"}}>
        <Schedule sizes={[25, 25, 25, 25]}
                  tableClass="smaller"
                  firstRowClass="heading"
                  evenRowClass="evenRow"
                  oddRowClass="oddRow"
                  items={[
                    ["K", "DFT Calcs", "FFT Calcs", "Efficiency"],
                    ["256", "2^16", "1024", "64 : 1"],
                    ["512", "2^18", "2034", "114 : 1"],
                    ["1024", "2^20", "5120", "205 : 1"],
                    ["2048", "2^22", "11264", "372 : 1"],
                    ["4096", "2^24", "24576", "683 : 1"],
                  ]}/>
      </div>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Summary</h3>
      <div className="normal">
        <ol>
          <li>Fourier Series can describe any periodic function <i>(discrete "spectrum")</i></li>
          <li>Continuous FT transforms any continuous function <i>(continuous spectrum)</i></li>
          <li>STFT transforms a segment of the signal <i>(convolution with window spectrum)</i></li>
          <li>FT of sampled signals <i>(periodic)</i></li>
          <li>DFT <i>(sampled FT of periodic continuation)</i></li>
        </ol>
        <br/>
        <Fragment>
          <List>
            <div><b>Where spectrum is periodic, time signal is discrete</b></div>
            <div><b>Where spectrum is discrete, time signal is periodic</b></div>
          </List>
        </Fragment>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

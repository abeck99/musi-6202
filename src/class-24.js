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

import image00 from './class-24/img/image00.png'
import image01 from './class-24/img/image01.png'
import image02 from './class-24/img/image02.png'
import image03 from './class-24/img/image03.png'
import image04 from './class-24/img/image04.png'
import image05 from './class-24/img/image05.png'
import image06 from './class-24/img/image06.png'
import image07 from './class-24/img/image07.png'
import image08 from './class-24/img/image08.png'
import image09 from './class-24/img/image09.png'
import image10 from './class-24/img/image10.png'
import image11 from './class-24/img/image11.png'
import image12 from './class-24/img/image12.png'
import image13 from './class-24/img/image13.png'

import jamo_snippet from './class-24/snd/jamo_snippet.mp3'
import jamo_snippet_pred from './class-24/snd/jamo_snippet_Pred.mp3'
import jamo_snippet_error from './class-24/snd/jamo_snippet_PredError.mp3'
import jamo_snippet_s from './class-24/snd/jamo_snippet_S.mp3'
import jamo_snippet_m from './class-24/snd/jamo_snippet_M.mp3'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 24: Source Coding</div>
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
        <div>Typical audio <b>bit rates</b>
          <MathComponent tex={String.raw`\eqalign{16]\mathrm{bit}\cdot44100]\mathrm{sps}\cdot2]\mathrm{chan} &=& 1411.2]\mathrm{kbps}\nonumber\\
					24]\mathrm{bit}\cdot192000]\mathrm{sps}\cdot5]\mathrm{chan} &=& 23040]\mathrm{kbps}\nonumber}`}/>
        </div>
        <div><b>Reasons</b> for bit rate reduction
          <List><div>Economical reasons: Cheaper transmission/storage</div><div>Technical reasons: Restricted storage / transmission bandwidth</div></List>
        </div>
        <div><b>Applications</b> for source coding
          <List><div>Internet: streaming, distribution, p2p, VoIP, ...</div><div>Media: DVD-V/A, ...</div><div>Portable Devices: MP3-Player, cell phones, Mini-Disc, ...</div><div>Broadcasting: (Digital) Radio, TV, ...</div><div>Cinema: DD, DTS, SDDS</div></List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Reducing Bitrate</h4>
      <List fragment={true}>
        <div><div><b>Lossless</b>:</div>
          <div>Remove <i>redundant</i> information (unnecessary to reconstruct the signal)
            <List><div>Entropy coding</div><div>(Linear predictive coding)</div></List>
          </div>
        </div>
        <div><div><b>Lossy</b>:</div>
          <div>Remove <i>irrelevant</i> information (not "missed" by the recipient)
          <List><div>Waveform coding</div><div>Perceptual coding</div></List>
          </div>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <img src={image00}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Information Theory: Definitions</h4>
      <div><i>Note</i>: Words to be transmitted referred to as <i>symbols</i></div>
      <Fragment>
        <div className="framed bordered">
          <div>Information Content</div>
          <div className="center">The less frequent a symbol, the higher its <i>information content, self-information, surprisal</i></div>
          <MathComponent tex={String.raw`I_n = \log_2\left(\frac{1}{p_n} \right)`}/>
        </div>
      </Fragment>
      <br/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Information Theory: Definitions</h4>
      <div className="framed bordered">
        <div>Entropy</div>
        <div className="center">The <i>Expected Value</i> of the information content; the <i>theoretic minimum of bits</i> required for transmission</div>
        <MathComponent tex={String.raw`H = \sum\limits_{n=0}^{N-1}{p_n\cdot I_n}`}/>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Information Content & Entropy Examples</h4>
      <div><b>Dice</b>: <MathComponent tex={String.raw`p_n = \frac{1}{6}`} display={false}/></div>
      <MathComponent tex={String.raw`\eqalign{I_n &=& \mathrm{log}_2 \left(\frac{1}{p_n}\right) = 2.58 \mathrm{bit}\\
				H &=& 2.58 \mathrm{bit}}`}/>
      <Fragment>
        <div><b>Imperfect dice</b>: <MathComponent tex={String.raw`p_0 = \frac{1}{2},\; p_{1\ldots 5} = \frac{1}{10}`} display={false}/></div>
      </Fragment>
      <Fragment>
        <MathComponent tex={String.raw`\eqalign{I_1 &=&  \log_2\left(2\right)  &=& 1 \mathrm{bit} \\
				I_{2\ldots 6} &=& \log_2\left(10\right)  &=& 3.32 \mathrm{bit} \\
				H &=& \frac{1}{2}\cdot 1 + \frac{5}{10}\cdot 3.32 &=& 2.16 \mathrm{bit}}`}/>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Entropy Coding</h4>
      <div className="smaller"><b>Idea: Use shorter words for frequent symbols</b></div>
      <div className="small">
      <List fragment="all">
        <div>3 possible signals
    <div className="smaller">
          <MultiTable sizes= {[33,33,33]}>
            <div><b>Symbol</b></div>
            <div><b>Probability</b></div>
            <div><b>Word</b></div>
            <div>A</div>
            <div><i>p</i> = 0.5</div>
            <div>0</div>
            <div>B</div>
            <div><i>p</i> = 0.25</div>
            <div>10</div>
            <div>C</div>
            <div><i>p</i> = 0.25</div>
            <div>11</div>
    </MultiTable>
    </div>
        </div>
        <div>Entropy
          <MathComponent tex={String.raw`H = \sum\limits_{n=0}^{N-1}{p_n\log_2\left(\frac{1}{p_n} \right)} = 1.5`}/>
        </div>
        <div>Transmit the following group of symbols: ABCA -> 010110</div>
        <div>Required bits:
          <MathComponent tex={String.raw`\frac{transmitted \; bits}{transmitted\; symbols} = \frac{6}{4} = 1.5`}/>
        </div>
    </List>
    </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Entropy Coding</h4>
      <div className="small">
      <List fragment={true}>
        <div>3 possible signals
    <div className="smaller">
          <MultiTable sizes= {[33,33,33]}>
            <div><b>Symbol</b></div>
            <div><b>Probability</b></div>
            <div><b>Word</b></div>
            <div>A</div>
            <div><i>p</i> = 0.7</div>
            <div>0</div>
            <div>B</div>
            <div><i>p</i> = 0.2</div>
            <div>10</div>
            <div>C</div>
            <div><i>p</i> = 0.1</div>
            <div>11</div>
    </MultiTable>

    </div>
        </div>
        <div>Entropy
          <MathComponent tex={String.raw`H = \sum\limits_{n=0}^{N-1}{p_n\log_2\left(\frac{1}{p_n} \right)} = 1.11`}/>
        </div>
        <div>Transmit the following group of symbols: ABCA -> 010110</div>
        <div>Required bits:
          <MathComponent tex={String.raw`\frac{transmitted \; bits}{transmitted\; symbols} = \frac{6}{4} = 1.5`}/>
        </div>
    </List>
    </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Huffman Coding</h4>
      <div>Steps</div>
      <List fragment={true}>
        <div>Sort symbols according to frequency</div>
        <div>Combine two lowest symbols into new entry (sum)</div>
        <div>Add new entry to list</div>
        <div>Repeat until only one element left</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Huffman Coding: Example</h4>
      <img src={image01}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Huffman Coding: Example</h4>
      <img src={image02}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Huffman Coding: Example</h4>
      <img src={image03}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Huffman Coding: Example</h4>
      <img src={image04}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Huffman Coding: Example</h4>
      <img src={image05}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Huffman Coding: Example</h4>
      <img src={image07}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Huffman Coding: Example</h4>
      <img src={image06}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Huffman Coding: Example</h4>
      <div className="row">
        <div className="col-60">
          <MultiTable sizes={[33,33,33]}>
            <div>Frequency</div>
            <div>Symbol</div>
            <div>Code</div>
            <div>5</div><div>1</div><div>1010</div>
            <div>7</div><div>2</div><div>1011</div>
            <div>10</div><div>3</div><div>100</div>
            <div>15</div><div>4</div><div>110</div>
            <div>20</div><div>5</div><div>1111</div>
            <div>45</div><div>6</div><div>0</div>
          </MultiTable>
        </div>
        <div className="col-40">
          <img src={image06}/>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Huffman Coding for audio signals</h4>
      <List>
        <div>Symbols: <MathComponent tex={String.raw`2^w`} display={false}/></div>
        <div>PDF indicates probability per symbol</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Arithmetic Coding</h4>
      <List fragment={true}/>
      <div>Huffman coding is only optimal if <MathComponent tex={`p_n = 1 / 2^{k}`} display={false}/></div>
      <div>Alternative: <b>Arithmetic Coding</b>
        <List>
          <div>Allows other probability distributions</div>
          <div>Encodes the whole sequence in one fractional number <MathComponent tex={String.raw`0.0 \leq f < 1.0`} display={false}/></div>
        </List>
      </div>
      <div><b>Steps</b>
        <List fragment={true}>
          <div>Assume initial interval of [0, 1)</div>
          <div>Assign interval segments to all symbols, e.g. A = [0,0.7), B = [0.7=0.9), C = [0.9, 1.0)</div>
          <div>Select interval based on current symbol</div>
          <div>Go to step 2 or terminate</div>
        </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Arithmetic Coding: Decoding Example</h4>
      <div>Sequence ABCA, <MathComponent tex={String.raw`p_A = 0.6`} display={false}/>, <MathComponent tex={String.raw`p_B = 0.2`} display={false}/>, <MathComponent tex={String.raw`p_C = 0.1`} display={false}/>, <MathComponent tex={String.raw`p_T = 0.1`} display={false}/></div>
      <div>A = [0, 0.6), B = [0.6, 0.8), C = [0.8, 0.9), T = [0.9, 1)</div>
      <div><b>Decoding</b> 0.463</div>
      <List fragment="all">
        <div><div>0.463 inside segment 1 (-> A)</div>
          <div className="small">Set interval [0, 0.6) -> Bounds: 0, 0.36, 0.48, 0.54, 0.6</div>
        </div>
        <div><div>0.463 inside segment 2 (-> B)</div>
          <div className="small">Set interval [0.36, 0.48) -> Bounds: 0.36, 0.432, 0.456, 0.486, 0.48</div>
        </div>
        <div><div>0.463 inside segment 3 (-> C)</div>
          <div className="small">Set interval [0.456, 0.468) -> Bounds: 0.456, 0.4632, 0.4656, 0.4668, 0.468</div>
        </div>
        <div><div>0.463 inside segment 1 (-> A)</div>
          <div className="small">Set interval [0.456, 0.4632) -> Bounds: 0.456, 0.46032, 0.46176, 0.46248, 0.4632</div>
        </div>
        <div><div>0.463 inside segment 4 (-> Terminate)</div></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Arithmetic Coding: Encoding Example</h4>
      <div>Sequence ABCA, <MathComponent tex={String.raw`p_A = 0.6`} display={false}/>, <MathComponent tex={String.raw`p_B = 0.2`} display={false}/>, <MathComponent tex={String.raw`p_C = 0.1`} display={false}/>, <MathComponent tex={String.raw`p_T = 0.1`} display={false}/></div>
      <div>A = [0, 0.6), B = [0.6, 0.8), C = [0.8, 0.9), T = [0.9, 1)</div>
      <div><b>Encoding</b> 0.463</div>
      <List fragment="all">
        <div>Select segment 1, set interval to [0, 0.6)</div>
        <div>Select segment 2, set interval to [0.36, 0.48)</div>
        <div>Select segment 3, set interval to [0.456, 0.468)</div>
        <div>Select segment 1, set interval to [0.456, 0.4632)</div>
        <div>Select segment 4, set interval to [0.46248, 0.4632)</div>
        <div>Choose value from last segment (e.g., 0.463) and transmit</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Fundamentals: Linear Prediction</h4>
      <div>Idea: Use preceding samples to estimate/predict future samples</div>
      <List>
        <div>Estimate the signal x
          <MathComponent tex={String.raw`\hat{x}(i) = \sum\limits_{j=1}^{\mathcal{O}}{b_j\cdot x(i-j)}`}/>
        </div>
        <div>Prediction quality is measure by <b>power of prediction error</b>
          <MathComponent tex={String.raw`\eqalign{e_{\mathrm{P}}(i)	&=& x(i)-\hat{x}(i)\\
							&=& x(i) - \sum\limits_{j=1}^{\mathcal{O}}{b_j\cdot x(i-j)}}`}/>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Fundamentals: Linear Prediction - First Order Prediction</h4>
      <List fragment={true}>
        <div><b>Prediction</b>: <MathComponent tex={String.raw`\hat{x}(i) = b_1\cdot x(i-1)`} display={false}/></div>
        <div><b>Prediction error</b>: <MathComponent tex={String.raw`\eqalign{\sigma_e^2 &=& \mathcal{E}\left\lbrace (x(i)-b_1x(i-1))^2\right\rbrace\\
                    &=& \sigma_x^2 + b_1^2 \sigma_x^2 -2b_1 \rho_{xx}(1)\\
                    &=& \left(1 + b_1^2 - 2b_1\rho_{xx}(1)\right) \sigma_x^2}`}/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Fundamentals: Linear Prediction - First Order Prediction</h4>
      <List fragment={true}>
        <div><b>Optimum coefficient</b>: <MathComponent tex={String.raw`\frac{\partial\sigma_e^2}{\partial b_1} = 0`} display={false}/> <MathComponent tex={String.raw`\eqalign{2b_1\sigma_x^2 - 2\rho_{xx}(1)\sigma_x^2 &=& 0\\
                    b_1 &=& \rho_{xx}(1)}`}/></div>
        <div><b>Minimum prediction error power</b>: <MathComponent tex={String.raw`\eqalign{\sigma_e^2 &=& \left(1 + b_1^2 - 2b_1\rho_{xx}(1)\right) \sigma_x^2\\
                    &=& \left(1 + \rho_{xx}(1)^2 - 2\rho_{xx}(1)\rho_{xx}(1)\right) \sigma_x^2\\
                    &=& (1-\rho_{xx}(1))\sigma_x^2}`}/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <MathComponent tex={String.raw`\sigma_e^2 = (1-\rho_{xx}(1))\sigma_x^2`}/>
      <List fragment={true}>
        <div>Observations
          <List><div>Power of prediction error always smaller or equal the power of the signal</div>
            <div>Question: When is it equal to the signal?</div>
          </List>
        </div>
        <div>Special case: <MathComponent tex={String.raw`b_1 = 1`} display={false}/>
    <MathComponent tex={String.raw`\eqalign{\hat{x}(i) &=& x(i-1)\\
                    e_\mathrm{P} &=& x(i) - x(i-1)\\
                    \sigma_e^2 &=& (1 + b_1^2 -2b_1\rho_{xx}(1))\sigma_x^2\\
                    &=& 2(1-\rho_{xx}(1))\sigma_x^2}`}/>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Linear Prediction - Coefficients</h4>
      <div className="small">
        <List fragment={true}>
          <div>Prediction gain depends on
            <List><div>Predictor coefficients <MathComponent tex={String.raw`b_j`} display={false}/>
            </div><div>Signal</div></List>
          </div>
          <div>Optimal coefficients can be derived by finding minimum of prediction error
            <MathComponent tex={String.raw`\frac{\partial \sigma_e^2}{\partial b_j} = 0`}/>
          </div>
        </List>
        <Fragment>
          <div style={{position:"relative", top:"-50px"}}>
            <MathComponent tex={String.raw`r_{xx}(\eta) = \sum\limits_{j=1}^{\mathcal{O}}{b_{j,\mathrm{opt}}\cdot r_{xx}(\eta-j)} ,\;\;\;\;\; 1 \leq\eta\leq\mathcal{O}`}/>
            <MathComponent tex={String.raw`\eqalign{\vec{r}_{xx} &=& \matrix{R}_{xx}\cdot \vec{b}_\mathrm{opt}\\
                \vec{b}_\mathrm{opt} &=& \matrix{R}_{xx}^{-1}\cdot \vec{r}_{xx}}`}/>
          </div>
        </Fragment>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Linear Prediction - Summary</h4>
      <List fragment={true}>
        <div><b>Predictor Length</b>
          <List><div>Rule of thumb: the longer the predictor, the better the prediction</div>
            <div>Can range from 10 coefficients to hunders</div></List>
        </div>
        <div><b>Predictor coefficient updates</b>
          <List><div>Better signal adaptation if coefficients are updated block-by block</div>
          </List>
        </div>
        <div><b>Input Signals</b>
          <List><div>White noise / random processes cannot be predicted</div>
            <div>Periodic signals may theoretically be perfectly predicted</div></List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
        <h4>Linear Prediction Examples</h4>
        <div className="row">
          <div className="col-70">
            <img src={image08}/>
          </div>
          <div className="col-30">
            <ReactAudioPlayer src={jamo_snippet} controls/>
          </div>
        </div>
        <div className="row">
          <div className="col-70">
            <img src={image09}/>
          </div>
          <div className="col-30">
            <ReactAudioPlayer src={jamo_snippet_pred} controls/>
          </div>
        </div>
        <div className="row">
          <div className="col-70">
            <img src={image10}/>
          </div>
          <div className="col-30">
            <ReactAudioPlayer src={jamo_snippet_error} controls/>
          </div>
        </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
        <h4>Linear Prediction Examples</h4>
        <div className="row">
          <div className="col-70">
            <img src={image11}/>
          </div>
          <div className="col-30">
            <ReactAudioPlayer src={jamo_snippet} controls/>
          </div>
        </div>
        <div className="row">
          <div className="col-70">
            <img src={image12}/>
          </div>
          <div className="col-30">
            <ReactAudioPlayer src={jamo_snippet_s} controls/>
          </div>
        </div>
        <div className="row">
          <div className="col-70">
            <img src={image13}/>
          </div>
          <div className="col-30">
            <ReactAudioPlayer src={jamo_snippet_m} controls/>
          </div>
        </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Summary</h4>
      <List>
        <div>Bitrate can be reduced by removing redundancy and/or irrelevance</div>
        <div>Removing redundancy:
          <List>
            <div>Entropy Coding: Transmit frequent symbols with shorter codes</div>
            <div>Linear Prediction: Transmit diff signal plus predictor coefficients</div>
          </List>
        </div>
        <div>Removing irrelevance:
          <List>
            <div>Reduce quantization wordlength / lower sample rate</div>
            <div>More techniques discussed in future classes</div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

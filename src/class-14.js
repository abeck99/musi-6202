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

import image00 from './class-14/img/image00.jpg'
import image01 from './class-14/img/image01.jpg'
import image02 from './class-14/img/image02.png'
import image03 from './class-14/img/image03.png'
import image04 from './class-14/img/image04.png'
import image05 from './class-14/img/image05.png'
import image06 from './class-14/img/image06.png'
import image07 from './class-14/img/image07.png'
import image08 from './class-14/img/image08.png'
import image09 from './class-14/img/image09.png'
import image10 from './class-14/img/image10.png'
import image11 from './class-14/img/image11.png'
import image12 from './class-14/img/image12.png'
import image13 from './class-14/img/image13.png'
import image14 from './class-14/img/image14.png'
import image15 from './class-14/img/image15.png'
import image16 from './class-14/img/image16.png'
import image17 from './class-14/img/image17.png'
import image18 from './class-14/img/image18.png'
import image19 from './class-14/img/image19.png'
import image20 from './class-14/img/image20.png'
import image21 from './class-14/img/image21.png'
import image22 from './class-14/img/image22.png'
import image23 from './class-14/img/image23.png'
import image24 from './class-14/img/image24.png'
import image25 from './class-14/img/image25.png'
import image26 from './class-14/img/image26.png'
import image27 from './class-14/img/image27.png'
import image28 from './class-14/img/image28.png'

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
      <div className="right">Part 14: Digital Filters I</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      <p>Pretty condensed, not covering a lot of filter design</p>
      <p>First part from user perspective, different parameters, meanings, definition</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <div className="framed bordered normal">
        <div className="heading left">Filter - Broad Description</div>
        System that amplifies or attenuates certain components/aspects of a signal
    </div>
      <br/>
      <Fragment>
      <div className="framed bordered normal">
        <div className="heading left">Filter - Narrow</div>
        Linear time-invariant system for changing the magnitude and phase of specific frequency regions
    </div>
      </Fragment>
      <br/>
      <Fragment>
      <div className="small">
      <List>
      <div>Example for other type of filters:<List><div>Adaptive and time-variant (e.g., denoising)</div></List></div>
      <div>Examples for "real-world" filters:<List><div>Reverberation</div><div>Absorption</div><div>Echo</div></List></div>
      </List>
      </div>
      </Fragment>
      <aside className="notes">
      <p>Pretty narrow definition - not strictly true, denoising for example</p>
      <p>Filters happen in the real world - how sound propogates in physical symptoms</p>
      <p>Major class of filters - simply convolution</p>
      <p>FIR vs IIR</p>
      <p>Weve looked at one IIR - in noise shaping</p>
      <p>IIR is more difficult to describe than FIR</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <div className="small">
      <MultiTable firstRowClass="evenRow" sizes={[10, 60, 20, 10]} fragment={true}>
      <div/>
      <div><b>Audio Equalization</b><List><div>Parametric EQs</div><div>Graphic EQs</div></List></div>
      <div><img src={image00}/></div>
      <div/>
      <div/>
        <div><b>Removal</b> of Unwanted Components<List><div>Remove DC, rumble</div><div>Remove hum</div><div>Remove hiss</div></List></div>
      <div><img src={image01}/></div>
      <div/>
      <div/>
        <div><b>Pre-emphasis / De-emphasis</b><List><div>Vinyl</div><div>Old Dolby noise reduction systems</div></List></div>
      <div><img src={image02}/></div>
      <div/>
      <div/>
        <div><b>Weighting</b> Function<List><div>dBA, dBC, ...</div></List></div>
      <div><img src={image03}/></div>
      <div/>
      <div/>
        <div>(Parameter) <b>Smoothing</b><List><div>Smooth sudden changes</div></List></div>
      <div><img src={image04}/></div>
      <div/>
      </MultiTable>

      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Reminder: System Theory</h4>
      <div className="normal">
      <List fragment={true}>
      <div>Output of a system (filter) <i>y</i> computed by <b>convolution</b> of input <i>x</i> and impulse response <i>h</i>
      <MathComponent tex={String.raw`y(t) = x(t) \ast h(t)`}/></div>
      <div>This is equivalent to a frequency domain multiplication
      <MathComponent tex={String.raw`\eqalign{Y(\mathrm{j}\omega) &=& X(\mathrm{j}\omega) \cdot H(\mathrm{j}\omega) \\
        H(\mathrm{j}\omega) &=& \frac{Y(\mathrm{j}\omega)}{X(\mathrm{j}\omega)}}`}/></div>
      <div><b>Transfer function</b> <MathComponent tex={String.raw`H(\mathrm{j}\omega)`} display={false}/> is complex, often represented as:
      <div className="small"><List><div><b>Magnitude</b> <MathComponent tex={String.raw`|H(\mathrm{j}\omega)|`} display={false}/></div><div><b>Phase</b> <MathComponent tex={String.raw`\Phi_H(\mathrm{j}\omega)`} display={false}/></div></List></div></div>
      </List>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Common Transfer Function Shapes</h4>
      
      <div className="normal">
      <MultiTable firstRowClass="evenRow" sizes={[10, 40, 39, 1]} fragment={true}>
      <div/>
      <div>Low/high pass filters</div>
      <div><img src={image05}/></div>
      <div/>
      <div/>
        <div>Band pass/band stop filters</div>
      <div><img src={image06}/></div>
      <div/>
      <div/>
        <div>Low/high shelving filters</div>
      <div><img src={image07}/></div>
      <div/>
      </MultiTable>
      </div>

      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Common Transfer Function Shapes</h4>
      
      <div className="normal">
      <MultiTable firstRowClass="evenRow" sizes={[10, 40, 39, 1]} fragment={true}>
      <div/>
        <div>Peak filters</div>
      <div><img src={image08}/></div>
      <div/>
      <div/>
        <div>Resonanace/notch filters</div>
      <div><img src={image09}/></div>
      <div/>
      </MultiTable>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Common Transfer Function Shapes</h4>
      <img src={image10}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Filter Banks</h4>
      <img src={image11} style={{width:"80%"}}/>
        <aside className="notes">
          <p>Graphic equalizers are pretty broad band</p>
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Filter Banks</h4>
      <img src={image12}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Filter Parameters - Lowpass/Highpass</h4>
      <div className="row">
      <div className="col-50 normal">
      <List>
      <div><b>Cut-off</b> frequency <MathComponent tex={String.raw`f_c`} display={false}/>
      <div className="normal"><List><div>Frequency marking the transition of pass to stop band</div><div>-3dB of pass band level</div></List></div></div>
      <div><b>Slope</b>/steepness
      <div className="normal"><List><div>Measured in dB/octave or dB/decade</div><div>Typically directly related to filter order</div></List></div></div>
      <div>Sometimes: <b>resonance</b>
      <div className="normal"><List><div>Level increase in narrow band around cut-off frequency</div></List></div></div>
      </List>
      </div>
      <div className="col-50">
      <img src={image13}/>
      </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Filter Parameters - Bandpass/Bandstop</h4>
      <div className="row">
      <div className="col-50 normal">
      <List>
      <div><b>Center</b> frequency <MathComponent tex={String.raw`f_c`} display={false}/>
      <div className="normal"><List><div>Frequency marking the center of the pass or stop band</div></List></div></div>
      <div><b>Bandwidth</b> <MathComponent tex={String.raw`\Delta B`} display={false}/>
      <div className="normal"><List><div>Width of the pass band</div><div>at -3dB of max pass band level</div></List></div></div>
      <div>Possibly: <b>slope</b>
      <div className="normal"><List><div>Typically directly related to filter order</div></List></div></div>
      </List>
      </div>
      <div className="col-50">
      <img src={image14}/>
      </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Filter Parameters - Peak</h4>
      <div className="row">
      <div className="col-50 normal">
      <List>
      <div><b>Center</b> frequency <MathComponent tex={String.raw`f_c`} display={false}/>
      <div className="normal"><List><div>Frequency marking the center of the peak</div></List></div></div>
      <div><b>Q factor</b> or <b>bandwidth</b> <MathComponent tex={String.raw`\Delta B`} display={false}/>
      <div className="normal"><List><div>Width of the bell</div><div>at -3dB of max gain
        <MathComponent tex={String.raw`Q = \frac{f_c}{\Delta B}`}/>
      </div></List></div></div>
      <div><b>Gain</b>
      <div className="normal"><List><div>Amplification / attenuation in dB</div></List></div></div>
      </List>
      </div>
      <div className="col-50">
      <img src={image15}/>
      </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Filter Parameters - Overview</h4>
      <br/><br/>
      <div className="small">
      <MultiTable sizes={[20, 16, 16, 16, 16, 16]}>
      <div><i>Parameter</i></div><div><b>Lowpass</b></div><div><b>Low Shelving</b></div><div><b>Band Pass</b></div><div><b>Peak</b></div><div><b>Resonance</b></div>
      <div><i>Frequency</i></div><div>Cut-off</div><div>Cut-off</div><div>Center</div><div>Center</div><div>Center</div>
      <div><i>Bandwidth/Q</i></div><div>Res. gain</div><div>--</div><div><MathComponent tex={String.raw`\Delta B`} display={false}/></div><div><i>Q</i></div><div>--</div>
      <div><i>Gain</i></div><div>--</div><div>Yes</div><div>--</div><div>Yes</div><div>--</div>
      </MultiTable>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Digital Filter Description</h4>
      <br/>
      A filter is defined by its
      <List fragment={true}>
      <div><b>Complex transfer function</b> <MathComponent tex={String.raw`H(\mathrm{j}\omega)`} display={false}/></div>
      <div>Or ... its <b>Impulse response</b> <MathComponent tex={String.raw`h(t)`} display={false}/></div>
      <div>Or ... its <b>List of pole and zero positions in the Z-Plane</b>
      <MathComponent tex={String.raw`H(\mathrm{j}\omega) = \mathfrak{F}\{h(t)\}`}/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Example Filter 1</h4>
      <img src={image16}/>
      <Fragment>
      <MathComponent tex={String.raw`y(i) = 0.5 \cdot x(i) + 0.5 \cdot x(i - 1)`}/>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Example Filter 1: Transfer Function</h4>
      <div className="normal">
      <div style={{position: "relative", left: "0px"}}>
      <MathComponent tex={String.raw`\eqalign{y(i) &=& 0.5\cdot x(i) + 0.5\cdot x(i-1)\\
	        		H(z) &=& 0.5  + 0.5\cdot z^{-1}}`}/>
      </div>
      <div style={{position: "relative", left: "-90px"}}>
      <MathComponent tex={String.raw`H(\mathrm{j}\omega) = 0.5  + 0.5\cdot e^{-\mathrm{j}\omega}`}/>
      </div>
      <div style={{position: "relative", left: "-18px"}}>
      <MathComponent tex={String.raw`|H(\mathrm{j}\omega)| = 0.5 \cdot \left| e^{-\mathrm{j}\frac{\omega}{2}} \cdot \left( e^{\mathrm{j}\frac{\omega}{2}} + e^{-\mathrm{j}\frac{\omega}{2}}\right)\right|`}/>
      </div>
      <div style={{position: "relative", left: "60px"}}>
      <MathComponent tex={String.raw`= 0.5 \cdot \underbrace{\left| e^{-\mathrm{j}\frac{\omega}{2}}\right|}_{1} \cdot  \underbrace{\left|\left( e^{\mathrm{j}\frac{\omega}{2}} + e^{-\mathrm{j}\frac{\omega}{2}}\right)\right|}_{\left| 2\cos\left(\frac{\omega}{2}\right) \right|}`}/>
      </div>
      <div style={{position: "relative", left: "-70px"}}>
      <MathComponent tex={String.raw`= \left| \cos\left(\frac{\omega}{2}\right) \right|`}/>
      </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Example Filter 1: Visualization</h4>
      <img src={image17}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Example Filter 2</h4>
      <img src={image18}/>
      <MathComponent tex={String.raw`\eqalign{y(i) &=& 0.5\cdot x(i) - 0.5\cdot x(i-1)\\
    		H(z) &=& 0.5  - 0.5\cdot z^{-1}\\
    		|H(\mathrm{j}\omega)| &=& \left| \sin\left(\frac{\omega}{2}\right) \right|}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Example Filter 2: Visualization</h4>
      <img src={image19}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
      <Section>
      <h4>Example Filter 3</h4>
      <img src={image20}/>
      <MathComponent tex={String.raw`\eqalign{y(i) &=& 0.5\cdot x(i) - 0.5\cdot x(i-N)\\
    		H(z) &=& 0.5  - 0.5\cdot z^{-N}\\
    		|H(\mathrm{j}\omega)| &=& 0.5\cdot\left| e^{-\mathrm{j}\frac{N\omega}{2}} \cdot \left(e^{\mathrm{j}\frac{N\omega}{2}} - e^{-\mathrm{j}\frac{N\omega}{2}} \right) \right|\\
    		 &=& \left| \sin\left(\frac{N\omega}{2}\right) \right|}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example Filter 3: Visualization</h4>
      <img src={image21}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example Filter 4</h4>
      <div className="row">
        <div className="col-50">
          <img src={image22}/>
        </div>
        <div className="col-50">
          <Fragment>
            <MathComponent tex={String.raw`y(i) = \frac{1}{\mathcal{J}}\sum_{j=0}^{\mathcal{J}-1} x(i-j)`}/>
          </Fragment>
        </div>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example Filter 4: Transfer Function/Visualization</h4>
      <img src={image23} style={{width:"70%"}}/>
      <MathComponent tex={String.raw`H(\mathrm{j}\omega) = e^{-\mathrm{j}\mathcal{J}\frac{\omega}{2}}\frac{\sin\left(\mathcal{J}\cdot\frac{\omega}{2} \right)}{\mathcal{J}\cdot\sin\left(\frac{\omega}{2} \right)}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example Filter 4: Recursive Implementation</h4>
      <MathComponent tex={String.raw`\eqalign{			y(i) &=& \sum\limits_{j=0}^{\mathcal{J}-1}{\frac{1}{\mathcal{J}}\cdot x(i-j)}\nonumber\\
			&=& \frac{1}{\mathcal{J}}\cdot \big(x(i) - x(i-\mathcal{J})\big) + \underbrace{\sum\limits_{j=1}^{\mathcal{J}}{\frac{1}{\mathcal{J}}\cdot x(i-j)}}_{y(i-1)}\nonumber\\
			&=& \frac{1}{\mathcal{J}}\cdot \big(x(i) - x(i-\mathcal{J})\big) + y(i-1)}`}/>
      <Fragment>
        <div>Not applicable with windowed coefficients!</div>
      </Fragment>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example Filter 5</h4>
      <img src={image24} style={{width:"70%"}}/>
      <Fragment>
        <MathComponent tex={String.raw`\eqalign{y(i) &=& (1-\alpha)\cdot x(i) + \alpha\cdot y(i-1)\\
        			&=& x(i) + \alpha \cdot (y(i-1) - x(i))}`}/>
      </Fragment>
      <aside className="notes">
        <p>If alpha is 0, then just input, if 1 then just the output</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example Filter 5: Transfer Function</h4>
      <MathComponent tex={String.raw`\eqalign{y(i) &=& (1-\alpha)\cdot x(i) + \alpha\cdot y(i-1)\\
        		H(z) &=& \frac{1-\alpha}{1-\alpha z^{-1}}}`}/>
      <Fragment>
      <div style={{position: "relative", left:"-155px"}}>
        <MathComponent tex={String.raw`H(\mathrm{j}\omega) = \frac{1-\alpha}{1-\alpha e^{-\mathrm{j}\omega}}`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left:"-155px"}}>
        <MathComponent tex={String.raw`|H(\mathrm{j}\omega)| = \left|\frac{1-\alpha}{1-\alpha e^{-\mathrm{j}\omega}}\right|`}/>
      </div>
      </Fragment>
      <Fragment>
      <div style={{position: "relative", left:"20px"}}>
        <MathComponent tex={String.raw`= \frac{1-\alpha}{\sqrt{\left(1 + \alpha^2 - 2\alpha\cos(\omega)\right)}}`}/>
      </div>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example Filter 5: Visualization</h4>
      <img src={image25}/>
      <aside className="notes">
        <p>Much smaller number of operations, but steep!</p>
        <p>Equilivant to RC analog filter</p>
        <p>FIR can have linear phase response, impossible with IIR</p>
        <p>No FIR filters in analogue, only IIR</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example Filter 6</h4>
      <img src={image26}/>
      <MathComponent tex={String.raw`y(i) = b_0 \cdot x(i) - a_N \cdot y(i - N)`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example Filter 6: Transfer Function/Visualization</h4>
      <img src={image27}/>
      <MathComponent tex={String.raw`H(\mathrm{j}\omega) = \frac{b_0}{1-a_N\cdot e^{-\mathrm{j}\omega N}}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Biquad: Structure</h4>
      <img src={image28}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Biquad: Structure</h4>
      <img src={image28} style={{width:"45%"}}/>
      <MathComponent tex={String.raw`\eqalign{\text{diff eq}: y(i) 	&=& \sum_{k=0}^{K_1}{b_k\cdot x(i-k)} + \sum_{k=1}^{K_2}{-a_k\cdot y(i-k)} \nonumber\\
			\text{trans. fct}: H(z) 	&=& \frac{Y(z)}{X(z)} =  \frac{\sum_{k=0}^{K_1}{b_k\cdot z^{-k}}}{1 + \sum_{k=1}^{K_2}{a_k\cdot z^{-k}}}}`}/>
      <aside className="notes">
        <p>Becomes more complex to find unstable filters, due to interactions in coefficents</p>
        <p>No k=0 in feedback component</p>
        <p>EVERY filter is defined in difference equations (-a is by definition, be careful when copying)</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Summary</h4>
      <List fragment={true}>
        <div>Filter (equalization) can be used for various tasks
          <div className="normal"><List><div>Changing the sound quality of a signal</div>
                                    <div>Hiding unwanted frequency components</div>
                                    <div>Smoothing</div>
                                    <div>Processing for measurement and transmission</div>
                                  </List></div>
        </div>
        <div>Most common audio filter types are:
          <div className="normal"><List><div>Low/high pass</div>
                                    <div>Peak</div>
                                    <div>Shelving</div>
                                  </List></div>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ), () => (
    <Section>
      <h4>Summary</h4>
      <List fragment={true}>
        <div>Filter parameters include:
          <div className="normal"><List><div>Frequency (mid, cutoff)</div>
                                    <div>Bandwidth or Q</div>
                                    <div>Gain</div>
                                  </List></div>
        </div>
        <div>Filter Orders:
          <div className="normal"><List><div>Typical orders are 1st, 2nd, maybe 4th</div>
                                    <div>Higher order give more flexibility wrt transfer function</div>
                                    <div>Higher orders are difficult to design and control</div>
                                  </List></div>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

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

import image00 from './class-07/img/image00.jpg'

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment'

const jsName = document.getElementById('reveal').attributes.jsName.value
const isPdf = jsName.endsWith("-pdf")

const slides = [
  () => (
    <Section className="title-slide">
      <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
        <div className="massive left title-heading">Digital Signal Processing for Music</div>
        <div className="right">Part 7: Fourier Transform, Part 1</div>
      </div>
      <br/>
      <div className="center">Andrew Beck</div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Fourier Transform: Overview</h3>
      <List>
        <div>Fourier series to Fourier Transform</div>
        <div>Properties of the Fourier Transform</div>
        <div>Windowed Fourier Transform (STFT)</div>
        <div>Transform of sampled time signals</div>
        <div>Discrete Fourier Transform</div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Fourier Transform: Introduction</h3>
      <img src={image00} style={{width:"75%"}}/>
      <List icon="none">
        <div>Fourier series is a brilliant insight, but:
          <List fragment="all" overrides={{2: "fa-arrow-right"}}>
            <div>Works only for periodic signals</div>
            <div>Difficult to use for real-world analysis as it requires knowledge of fundamental frequency</div>
            <div><b>Fourier Transform</b></div>
          </List>
        </div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Fourier series, revisited</h4>
      <div className="normal">
        <MathComponent tex={String.raw`c_k = \frac{1}{T_0}\int\limits_{-\frac{T_0}{2}}^{\frac{T_0}{2}} x(t) \mathrm{e}^{-\mathrm{j}\omega_0kt}\, dt`}/>
      </div>
      <div className="normal">
        <List fragment={true}>
          <div>Fourier series coefficient can be interpreted as <b>correlation coefficient</b> between signal and sinusoidals of different frequencies</div>
          <div>Only frequencies <MathComponent tex={String.raw`k\omega_0`} display={false}/> are used (<MathComponent tex={String.raw`\omega_0`} display={false}/> <i>has to be known</i>)</div>
          <div>Fourier series produces a <b>'line spectrum'</b></div>
        </List>
        <br/>
      </div>
    </Section>
  ), () => (
    <Section>
      <h4>Fourier series, revisited</h4>
      <div className="normal">
        <MathComponent tex={String.raw`c_k = \frac{1}{T_0}\int\limits_{-\frac{T_0}{2}}^{\frac{T_0}{2}} x(t) \mathrm{e}^{-\mathrm{j}\omega_0kt}\, dt`}/>
      </div>
      
      <List fragment={true}>
        <div>Distance betwen frequency components decreases as <MathComponent tex={String.raw`T_0`} display={false}/> increases</div>
        <div>Aperiodic functions could be analyzed by increasing <MathComponent tex={String.raw`T_0 \to \infty`} display={false}/></div>
      </List>
      <aside className="notes">
      </aside>
      </Section>
  ),
  () => (
    <Section>
      <h4>Fourier series, revisited</h4>
      <div className="row">
        <div className="col-50">
          <MathComponent tex={String.raw`c_k = \frac{1}{T_0}\int\limits_{-\frac{T_0}{2}}^{\frac{T_0}{2}} x(t) \mathrm{e}^{-\mathrm{j}\omega_0kt}\, dt`}/>
        </div>
        <div className="col-50">
          <List icon="fa-arrow-right" align="center">
            <MathComponent tex={String.raw`T_0 \rightarrow \infty`} display={false}/>
            <MathComponent tex={String.raw`k\omega_0 \rightarrow \omega`} display={false}/>
            <MathComponent tex={String.raw`\frac{1}{T_0} \rightarrow 0`} display={false}/>
          </List>
        </div>
      </div>
      <br/>
      <div className="left">To avoid zero result, multiply with <MathComponent tex={String.raw`T_0`} display={false}/></div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h3>Definition of Fourier Transform (Continuous)</h3>
      <MathComponent tex={String.raw`X(\mathrm{j}\omega) = \mathfrak{F}[x(t)] = \int\limits_{-\infty}^{\infty} {x(t) \mathrm{e}^{-\mathrm{j}\omega t}\, dt}`}/>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <div className="row">
        <div className="col-50">
          <h3>Example 1: Rect Window</h3>
          <MathComponent tex={String.raw`w_{\mathrm{R}}(t) = \left\lbrace \begin{array}{ll} 1, & -\frac{1}{2} \leq t \leq \frac{1}{2} \cr  0, & \text{otherwise} \end{array}\right.`}/>
        </div>
        <div className="col-50 normal">
          <MathComponent tex={String.raw`W_{\mathrm{R}}(t) = \int\limits_{-\infty}^{\infty} {w_{\mathrm{R}}(t)\mathrm{e}^{-\mathrm{j}\omega t}\,dt}`}/>
          <Fragment>
            <div style={{position: "relative", left: "7px"}}>
              <MathComponent tex={String.raw`= \int\limits_{-\frac{1}{2}}^{\frac{1}{2}} {\mathrm{e}^{-\mathrm{j}\omega t}\,dt}`}/>
            </div>
          </Fragment>
          <Fragment>
            <div style={{position: "relative", left: "59px"}}>
              <MathComponent tex={String.raw`= \frac{1}{-\mathrm{j}\omega} \underbrace{\left(\mathrm{e}^{-\mathrm{j}\frac{\omega}{2}}-\mathrm{e}^{\mathrm{j}\frac{\omega}{2}}\right)}_{= -2\mathrm{j}\sin\left(\frac{\omega}{2}\right)}`}/>
            </div>
          </Fragment>
          <Fragment>
            <div style={{position: "relative", left: "86px"}}>
              <MathComponent tex={String.raw`= \frac{\sin\left(\frac{\omega}{2}\right)}{\frac{\omega}{2}} = \mathrm{sinc}\left(\frac{\omega}{2}\right)`}/>
            </div>
          </Fragment>
        </div>
      </div>
      <aside className="notes">
        <p>How will this change for different lengths of W_R?</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Example 2: Dirac (Impulse)</h4>
      <div className="row normal">
        <div className="col-50">
          <MathComponent tex={String.raw`\delta(t) = \left\lbrace \begin{array}{ll} 1, & t = 0 \cr  0, & t \neq 0 \end{array}\right.`}/>
        </div>
        <div className="col-50">
          <Fragment>
            <MathComponent tex={String.raw`\int\limits_{-\infty}^{\infty} \delta(t)\, dt = 1`}/>
          </Fragment>
        </div>
      </div>
      <div style={{position: "relative", top: "-50px"}}>
        <Fragment>
          <MathComponent tex={String.raw`\Delta(\mathrm{j}\omega) = \int\limits_{-\infty}^\infty \delta(t)e^{-\mathrm{j}\omega t}dt = e^{-\mathrm{j}\omega \cdot 0} = 1`}/>
        </Fragment>
        <Fragment>
          Shifted Dirac <MathComponent tex={String.raw`\delta(t - \tau_0)`} display={false}/>
        </Fragment>
        <Fragment>
          <MathComponent tex={String.raw`\Delta(\mathrm{j}\omega) = \int\limits_{-\infty}^\infty \delta(t - \tau_0)e^{-\mathrm{j}\omega t}dt = e^{-\mathrm{j}\omega\tau_0}`}/>
        </Fragment>
      </div>
      <aside className="notes">
        <p>Comb filters with shifted dirac</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <div className="row">
        <div className="col-40">
          <h3>Properties of Fourier Transform</h3>
        </div>
        <div className="col-60">
          <h4><i>Property 1</i>: Invertibility</h4>
          <div className="heading">
            <MathComponent tex={String.raw`\eqalign{x(t) &=& \mathfrak{F}^{-1}[X(\mathrm{j}\omega)] \cr &=& \frac{1}{2\pi}\int\limits_{-\infty}^{\infty} X(\mathrm{j}\omega) \mathrm{e}^{\mathrm{j}\omega t}\, d\omega}`}/>
          </div>
        </div>
      </div>
      <div style={{position: "relative", top: "-30px"}}>
      <Fragment>
        <div className="small"><p>Reminder: Signal reconstruction with Fourier series coefficients</p></div>
        <div className="normal"><MathComponent tex={String.raw`x(t) = \sum\limits_{k=-\infty}^{\infty} c_k e^{\mathrm{j}\omega_0kt}`}/></div>
      </Fragment>
      <div style={{position: "relative", top: "-40px"}}>
        <Fragment>
          <List>
            <div><b>Comments:</b>
              <div className="normal">
                <List>
                  <div><i>Invertibility</i>: No information is lost during this process!</div>
                  <div>FT and IFT are very similar, largely equivalent</div>
                </List>
              </div>
            </div>
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
      <h4><i>Property 2</i>: Superposition</h4>
      <div className="heading">
        <MathComponent tex={String.raw`\eqalign{y(t) &=& c_1\cdot x_1(t) + c_2\cdot x_2(t)\nonumber\\
			\mapsto Y(\mathrm{j}\omega) &=& c_1\cdot X_1(\mathrm{j}\omega) + c_2\cdot X_2(\mathrm{j}\omega)\nonumber}`}/>
      </div>
      <div className="normal">
        <Fragment>
          <div style={{position: "relative", left: "0px"}}>
            <MathComponent tex={String.raw`Y(\mathrm{j}\omega) = \int\limits_{-\infty}^{\infty} {\big(c_1\cdot x_1(t) + c_2\cdot x_2(t)\big)\cdot \mathrm{e}^{-\mathrm{j}\omega t}\, dt}`}/>
          </div>
        </Fragment>
        <Fragment>
          <div style={{position: "relative", left: "104px"}}>
            <MathComponent tex={String.raw`= c_1\cdot \int\limits_{-\infty}^{\infty} {x_1(t)  \mathrm{e}^{-\mathrm{j}\omega t}\, dt} + c_2\cdot \int\limits_{-\infty}^{\infty} {x_2(t) \mathrm{e}^{-\mathrm{j}\omega t}\, dt}`}/>
          </div>
        </Fragment>
        <Fragment>
          <div style={{position: "relative", left: "-40px"}}>
            <MathComponent tex={String.raw`= c_1\cdot X_1(\mathrm{j}\omega) + c_2\cdot X_2(\mathrm{j}\omega) `}/>
          </div>
        </Fragment>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4><i>Property 3</i>: Convolution and Multiplication</h4>
      <div className="normal heading">
        <MathComponent tex={String.raw`\eqalign{y(t) &=& \int_{-\infty}^{\infty} {h(\tau) \cdot x(t-\tau)\, d\tau} \cr
\mapsto Y(\mathrm{j}\omega) &=& H(\mathrm{j}\omega)\cdot X(\mathrm{j}\omega)}`}/>
      </div>
      <div className="normal">
        <div style={{position: "relative", left: "-27px"}}>
          <MathComponent tex={String.raw`Y(\mathrm{j}\omega) = \int_{-\infty}^{\infty} {y(t) \mathrm{e}^{-\mathrm{j}\omega t}\, dt}`}/>
        </div>
        <Fragment>
          <div style={{position: "relative", left: "190px"}}>
            <MathComponent tex={String.raw`= \int_{-\infty}^{\infty} {\left(\int_{-\infty}^{\infty} {h(\tau) \cdot x(t-\tau)\, d\tau}\right) \mathrm{e}^{-\mathrm{j}\omega t}\, dt}`}/>
          </div>
        </Fragment>
        <Fragment>
          <div style={{position: "relative", left: "153px"}}>
            <MathComponent tex={String.raw`= \int_{-\infty}^{\infty} {h(\tau) \int_{-\infty}^{\infty} {x(t-\tau)} \mathrm{e}^{-\mathrm{j}\omega t}\, dt\, d\tau}`}/>
          </div>
        </Fragment>
      </div>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <div className="row">
        <div className="col-50">
          <div className="smaller heading">
            <MathComponent tex={String.raw`\eqalign{y(t) &=& \int_{-\infty}^{\infty} {h(\tau) \cdot x(t-\tau)\, d\tau} \cr
\mapsto Y(\mathrm{j}\omega) &=& H(\mathrm{j}\omega)\cdot X(\mathrm{j}\omega)}`}/>
          </div>
        </div>
        <div className="col-50">
          <div className="smaller">
            <div style={{position: "relative", left: "-70px"}}>
              <MathComponent tex={String.raw`Y(\mathrm{j}\omega) = \int_{-\infty}^{\infty} {y(t) \mathrm{e}^{-\mathrm{j}\omega t}\, dt}`}/>
            </div>
            <div style={{position: "relative", left: "80px"}}>
              <MathComponent tex={String.raw`= \int_{-\infty}^{\infty} {\left(\int_{-\infty}^{\infty} {h(\tau) \cdot x(t-\tau)\, d\tau}\right) \mathrm{e}^{-\mathrm{j}\omega t}\, dt}`}/>
            </div>
            <div style={{position: "relative", left: "55px"}}>
              <MathComponent tex={String.raw`= \int_{-\infty}^{\infty} {h(\tau) \int_{-\infty}^{\infty} {x(t-\tau)} \mathrm{e}^{-\mathrm{j}\omega t}\, dt\, d\tau}`}/>
            </div>
          </div>
        </div>
      </div>
      <div className="normal">
        <div style={{position: "relative", left: "0px"}}>
          <MathComponent tex={String.raw`= \int_{-\infty}^{\infty} {h(\tau)  \mathrm{e}^{-\mathrm{j}\omega \tau} \underbrace{\int_{-\infty}^{\infty} {x(t-\tau)} \mathrm{e}^{-\mathrm{j}\omega (t-\tau)}\, d(t-\tau)}_{X(\mathrm{j}\omega)}\, d\tau}`}/>
        </div>
        <Fragment>
          <div style={{position: "relative", left: "-170px"}}>
            <MathComponent tex={String.raw`= \int_{-\infty}^{\infty} {h(\tau) \mathrm{e}^{-\mathrm{j}\omega \tau}\, d\tau} \cdot X(\mathrm{j}\omega)`}/>
          </div>
        </Fragment>
        <Fragment>
          <div style={{position: "relative", left: "-255px"}}>
            <MathComponent tex={String.raw`= H(\mathrm{j}\omega) \cdot X(\mathrm{j}\omega)`}/>
          </div>
        </Fragment>
      </div>
      <aside className="notes">
        <p>This is really key stuff, hinted about earlier when talking about windowing effects</p>
        <p>This is a good place to talk about shifted dirac function, and comb filters</p>
        <p>Also a good place to talk about sinc function, showing frequency response effect with rectangular window</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4><i>Property 4</i>: Parseval`s Theorem</h4>
      <div className="heading"><MathComponent tex={String.raw`\int_{-\infty}^{\infty}{x^2(t)\, dt} = \frac{1}{2\pi}\int_{-\infty}^{\infty} {\left|X(\mathrm{j}\omega)\right|^2\, d\omega}`}/></div>
      <div className="normal">
        <Fragment>
          <MathComponent tex={String.raw`\int_{-\infty}^{\infty}{h(\tau)\cdot x(t-\tau)\, d\tau} = \frac{1}{2\pi}\int_{-\infty}^{\infty} {H(\mathrm{j}\omega)\cdot X(\mathrm{j}\omega) \mathrm{e}^{\mathrm{j}\omega t} d\omega}`}/>
        </Fragment>
        <Fragment>
          <div className="center">
            <MathComponent tex={String.raw`H(\mathrm{j}\omega) \longrightarrow X^\ast (\mathrm{j}\omega) / h(\tau)\longrightarrow x(-\tau)`} display={false}/>,&nbsp;&nbsp;<MathComponent tex={String.raw`t = 0`} display={false}/>
          </div>
        </Fragment>
        <Fragment>
          <MathComponent tex={String.raw`\int_{-\infty}^{\infty}{x(-\tau)\cdot x(-\tau)\, d\tau} = \frac{1}{2\pi}\int_{-\infty}^{\infty} {X^\ast (\mathrm{j}\omega)\cdot X(\mathrm{j}\omega) \, d\omega}`}/>
        </Fragment>
        <Fragment>
          <MathComponent tex={String.raw`\int_{-\infty}^{\infty}{x^2(t)\, dt} = \frac{1}{2\pi}\int_{-\infty}^{\infty} {\left|X(\mathrm{j}\omega)\right|^2\, d\omega}`}/>
        </Fragment>
      </div>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4><i>Property 5</i>: Time & Frequency Shift</h4>
      <div className="heading normal">
        <MathComponent tex={String.raw`y(t) = x(t-t_0)\rightarrow Y(\mathrm{j}\omega) = X(\mathrm{j}\omega)\mathrm{e}^{-\mathrm{j}\omega t_0}`}/>
      </div>
      <div className="normal">
        <Fragment>
          <MathComponent tex={String.raw`\eqalign{\int\limits_{-\infty}^{\infty} {x(t-t_0) \mathrm{e}^{-\mathrm{j}\omega t}\, dt} &=& \int\limits_{-\infty}^{\infty} {x(\tau) \mathrm{e}^{-\mathrm{j}\omega (\tau + t_0)}\, d\tau}\nonumber\\
					&=& \mathrm{e}^{-\mathrm{j}\omega t_0}\int\limits_{-\infty}^{\infty} {x(\tau) \mathrm{e}^{-\mathrm{j}\omega \tau}\, d\tau}\nonumber\\
					&=& \mathrm{e}^{-\mathrm{j}\omega t_0} \cdot X(\mathrm{j}\omega) }`}/>
        </Fragment>
      </div>

      <div className="normal">
        <Fragment>
          <MathComponent tex={String.raw`\frac{1}{2\pi}\int\limits_{-\infty}^{\infty} X(\mathrm{j}(\omega-\omega_0)) \mathrm{e}^{\mathrm{j}\omega t}\, d\omega = \mathrm{e}^{\mathrm{j}\omega_0 t}\cdot x(t)`}/>
        </Fragment>
      </div>
      
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4><i>Property 6</i>: Symmetry 1/2</h4>
      <div className="heading"><MathComponent tex={String.raw`\eqalign{|X(\mathrm{j}\omega)| &=& |X(-\mathrm{j}\omega)|\\
			\Phi_\mathrm{X}(\omega) &=& -\Phi_\mathrm{X}(-\omega)}`}/></div>
      <Fragment>
        <div className="small"><p>Time signal sum of even and odd component <MathComponent tex={String.raw`x_e(t)`} display={false}/>,&nbsp;&nbsp;<MathComponent tex={String.raw`x_o(t)`} display={false}/></p></div>
        <div className="small"><MathComponent tex={String.raw`x(t) = \underbrace{\frac{1}{2}(x(t) + x(-t))}_{x_e(t)} + \underbrace{\frac{1}{2}(x(t) - x(-t))}_{x_o(t)}`}/></div>
      </Fragment>
      <Fragment>
        <div className="small"><MathComponent tex={String.raw`X_e(\mathrm{j}\omega) = \int\limits_{-\infty}^{\infty}{x_e(t)\cos(\omega t)\,dt} - \mathrm{j} \underbrace{\int\limits_{-\infty}^{\infty}{x_e(t)\sin(\omega t)\,dt}}_{= 0}`}/></div>
      </Fragment>
      <Fragment>
        <div className="small left" style={{position: "relative", top: "-40px"}}>
          <div><MathComponent tex={String.raw`X_e(\mathrm{j}\omega)`} display={false}/> is real</div>
          <div><MathComponent tex={String.raw`X_e(\mathrm{j}\omega) = X_e(-\mathrm{j}\omega)`} display={false}/> (substitute <MathComponent tex={String.raw`x(t)`} display={false}/> with <MathComponent tex={String.raw`x(-t)`} display={false}/>)</div>
        </div>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4><i>Property 6</i>: Symmetry 2/2</h4>
      <div className="heading"><MathComponent tex={String.raw`\eqalign{|X(\mathrm{j}\omega)| &=& |X(-\mathrm{j}\omega)|\\
			\Phi_\mathrm{X}(\omega) &=& -\Phi_\mathrm{X}(-\omega)}`}/></div>
      <div className="small"><p>Time signal sum of even and odd component <MathComponent tex={String.raw`x_e(t)`} display={false}/>,&nbsp;&nbsp;<MathComponent tex={String.raw`x_o(t)`} display={false}/></p></div>
      <div className="small"><MathComponent tex={String.raw`x(t) = \underbrace{\frac{1}{2}(x(t) + x(-t))}_{x_e(t)} + \underbrace{\frac{1}{2}(x(t) - x(-t))}_{x_o(t)}`}/></div>
      <Fragment>
        <div className="small"><MathComponent tex={String.raw`X_o(\mathrm{j}\omega) = \underbrace{\int\limits_{-\infty}^{\infty}{x_o(t)\cos(\omega t)\,dt}}_{=0} - \mathrm{j} \int\limits_{-\infty}^{\infty}{x_o(t)\sin(\omega t)\,dt}`}/></div>
      </Fragment>
      <Fragment>
        <div className="small left" style={{position: "relative", top: "-40px"}}>
          <div><MathComponent tex={String.raw`X_o(\mathrm{j}\omega)`} display={false}/> is imaginary</div>
          <div><MathComponent tex={String.raw`X_o(\mathrm{j}\omega) = X_o(-\mathrm{j}\omega)`} display={false}/> (substitute <MathComponent tex={String.raw`x(t)`} display={false}/> with <MathComponent tex={String.raw`-x(-t)`} display={false}/>)</div>
        </div>
      </Fragment>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <div className="row">
      <div className="col-40">
      <h4><i>Property 7</i>: Time & Frequency Scaling</h4>
      <br/>
      <div className="heading">
        <MathComponent tex={String.raw`\eqalign{y(t) &=& x(c\cdot t) \cr \mapsto Y(\mathrm{j}\omega) &=& \frac{1}{|c|}X\left(\mathrm{j}\frac{\omega}{c}\right)}`}/>
      </div>
      </div>
      <div className="col-60">
      <div className="normal">
      <Fragment>
        <div style={{position: "relative", left: "0px"}}>
          <MathComponent tex={String.raw`Y(\mathrm{j}\omega) = \int\limits_{-\infty}^{\infty} {x(c\cdot t) \mathrm{e}^{-\mathrm{j}\omega t}\, dt}`}/>
        </div>
        </Fragment>
        <Fragment>
        <div style={{position: "relative", left: "48px"}}>
          <MathComponent tex={String.raw`= \int\limits_{-\infty}^{\infty} {x(\tau) \mathrm{e}^{-\mathrm{j}\omega \frac{\tau}{c}}\, d\frac{\tau}{c}}`}/>
        </div>
        </Fragment>
        <Fragment>
        <div style={{position: "relative", left: "60px"}}>
          <MathComponent tex={String.raw`= \frac{1}{c}\int\limits_{-\infty}^{\infty} {x(\tau) \mathrm{e}^{-\mathrm{j} \frac{\omega}{c} \tau}\, d\tau}`}/>
        </div>
        </Fragment>
        <Fragment>
        <div style={{position: "relative", left: "-10px"}}>
          <MathComponent tex={String.raw`= \frac{1}{c} X\left(\mathrm{j}\frac{\omega}{c}\right)`}/>
        </div>
        </Fragment>
      </div>
      </div>
      </div>
      
      <aside className="notes">
      <p>Deriving for positive c</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Verifying Fourier Transform Implementation</h4>
      <List fragment="all">
        <div><i>Property 1</i>: <b>Invertibility</b>: Running IFT returns the EXACT original signal
        <MathComponent tex={String.raw`x(t) = \mathfrak{F}^{-1}[X(\mathrm{j}\omega)]`}/></div>
        <div><i>Property 2</i>: <b>Superposition</b>: Scaled addition in time domain maps to linear scale in magnitudes in frequency domain
          <MathComponent tex={String.raw`\eqalign{y(t) &=& c_1\cdot x_1(t) + c_2\cdot x_2(t)\nonumber\\
			\mapsto Y(\mathrm{j}\omega) &=& c_1\cdot X_1(\mathrm{j}\omega) + c_2\cdot X_2(\mathrm{j}\omega)\nonumber}`}/></div>
      </List>
      <aside className="notes">
        <p>You already have enough information to build the DFT</p>
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Verifying Fourier Transform Implementation</h4>
      <List fragment="all">
        <div><i>Property 4</i>: <b>Parseval`s Theorem</b>: Energy conservation between time domain and frequency domain
        <MathComponent tex={String.raw`\int_{-\infty}^{\infty}{x^2(t)\, dt} = \frac{1}{2\pi}\int_{-\infty}^{\infty} {\left|X(\mathrm{j}\omega)\right|^2\, d\omega}`}/></div>
        <div><i>Property 6</i>: <b>Symmetry</b>: Frequency domain is symmetric across zero frequency (and for DFT across windowSize)
          <MathComponent tex={String.raw`\eqalign{|X(\mathrm{j}\omega)| &=& |X(-\mathrm{j}\omega)|\\
			\Phi_\mathrm{X}(\omega) &=& -\Phi_\mathrm{X}(-\omega)}`}/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  ),
  () => (
    <Section>
      <h4>Key Properties for Future Topics</h4>
      <List fragment="all">
        <div><i>Property 3</i>: <b>Convolution and Multiplication</b>: Convolution in the time domain is multiplication in the frequency domain
        <MathComponent tex={String.raw`\eqalign{y(t) &=& \int_{-\infty}^{\infty} {h(\tau) \cdot x(t-\tau)\, d\tau} \cr
\mapsto Y(\mathrm{j}\omega) &=& H(\mathrm{j}\omega)\cdot X(\mathrm{j}\omega)}`}/></div>
        <div><i>Property 5</i>: <b>Time & Frequency Shift</b>: Time shift in time domain is phase shift in frequency domain
          <MathComponent tex={String.raw`y(t) = x(t-t_0)\rightarrow Y(\mathrm{j}\omega) = X(\mathrm{j}\omega)\mathrm{e}^{-\mathrm{j}\omega t_0}`}/></div>
      </List>
      <aside className="notes">
      </aside>
    </Section>
  )
]

Presentation(slides, module.id)

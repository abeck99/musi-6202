import React, { Component } from 'react';
import Section from 'lib/component/Section';

import Presentation from 'lib/template/Presentation';

import Counter from './example/component/Counter';
import SineWave from './example/component/SineWave';
import Table from './example/component/Table';
import List from './example/component/List';
import Schedule from './example/component/Schedule';
import MyPieChart from './example/component/MyPieChart';
import Plot from './example/component/Plot';

import PhasorAnim from './class-06/component/PhasorAnim';
import InteractivePhasor from './class-06/component/InteractivePhasor';

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment';



const jsName = document.getElementById('reveal').attributes.jsName.value;
const isPdf = jsName.endsWith("-pdf")

const slides = [
    () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 6: Fourier Series</div>
        </div>
        <br/>
        <div className="center">Andrew Beck</div>
         <aside className="notes">
         </aside>
         <aside className="notes">
         </aside>
      </Section>
    ), () => (
        <Section>
        <h2>Overview</h2>
        <ol>
        <li><p><b>Fourier Series</b></p>Periodic signals as sum of sinusoidals</li>
        <li><p><b>Fourier Transform</b></p>Frequency content of any signal
        <div className="small">
        <List>
        <div>Fourier series to transform</div>
        <div>Properties</div>
        <div>Windowed Fourier transform</div>
        </List>
        </div></li>
        </ol>
        <aside className="notes">

        <p>This is where we'll start connecting the dots between different concepts'</p>
        <p>Fourier Series: Periodic</p>
        <p>Introduced a lot of these concepts already</p>

        <p>Fourier Transform: Any signal</p>
        <p>Kind of generaliziation - even noise</p>
        <p>We're going to make Fourier series from a simple concept into something that looks needlessly complex'</p>
        <p>This will make sense when we move to the fourier transform, because it will make things simple</p>
        </aside>
        </Section>
    ), () => (
        <Section>
        <h3>Fourier Series: Introduction</h3>
        <List fragment={true}>
        <div>Periodic signals are <b>superposition of sinusoidals</b></div>
        <div><b>Properties</b>
        <div className="row">
        <div className="col-45">
        <div className="small">
        <List>
        <div>Amplitude</div>
        <div>Frequency as integer multiple of fundamental of <MathComponent tex={String.raw`f_0`} display={false}/></div>
        <div>Phase</div>
        </List>
        </div>
        </div>
        <div className="col-55">
        <MathComponent tex={String.raw`x(t) = \sum\limits_{k=0}^{\infty} a_k \sin(k\omega_0 t + \Phi_k)`}/>
        </div>
        </div>
        </div>
        <div><b>Observations</b>
        <div className="small">
        <List>
        <div>Time domain is continuous (<MathComponent tex={String.raw`t`} display={false}/>)</div>
        <div>Frequency domain is discrete (<MathComponent tex={String.raw`\sum`} display={false}/>)</div>
        </List>
        </div>
        </div>
        </List>
        <aside className="notes">
        <p>omega 0 is fundamental</p>
        <p>As long as x is periodic, we can model it</p>
        <p>Might be infinite sum</p>
        <p>Everything between discrete frequencies is 0, distance between each freq is constant</p>
        </aside>
        </Section>
    ), () => (
        <Section>
        <div style={{position: "relative", top: "-80px"}}>
        <h3>Complex Representation</h3>
        <MathComponent tex={String.raw`x(t) = \sum\limits_{k=0}^{\infty} a_k \sin(k\omega_0 t + \Phi_k)`}/>
        <Fragment index={0}>
        <div className="normal"><p>Trigonometric identity <MathComponent tex={String.raw`\sin(a + b) = \sin(a)\cos(b) + \cos(a)\sin(b)`} display={false}/></p></div>
        </Fragment>
        <Fragment index={0} effect="step-fade-in-then-out"><MathComponent tex={String.raw`x(t) = \sum\limits_{k=0}^{\infty} {a_k \sin(\Phi_k)}\cdot\cos(k\omega_0 t) + {a_k \cos(\Phi_k)}\cdot\sin(k\omega_0 t)`}/></Fragment>
        <Fragment index={1} effect="step-fade-in-then-out">
        <MathComponent tex={String.raw`x(t) = \sum\limits_{k=0}^{\infty} \underbrace{a_k \sin(\Phi_k)}_{A_k}\cdot\cos(k\omega_0 t) + \underbrace{a_k \cos(\Phi_k)}_{B_k}\cdot\sin(k\omega_0 t)`}/>
        </Fragment>
        </div>
        <aside className="notes">
        <p>Looking at trigonometric identity, decomposing it</p>
        <p>Phi is a constant, the phase offset, we can make those into constants</p>
        </aside>
        </Section>
    ), () => (
        <Section>
        <div style={{position: "relative", top: "-160px"}}>
        <div className="row">
        <div className="col-50">
        <MathComponent tex={String.raw`\eqalign{e^{\mathrm{j}\omega t} &=& \cos(\omega t) + \mathrm{j}\sin(\omega t)\nonumber\\
                \mathrm{j} &=& \sqrt{-1}}`}/>
        </div>
        <div className="col-50">
        <PhasorAnim partials={[
          {amp: 1, freq: 1, color: "rgb(66, 44, 255)"},
        ]} width="480" height="220"/>
        </div>
        </div>
        <p>Phasor representation in complex plane</p>
        <Fragment index={0} effect="step-fade-in-then-out">
        <MathComponent tex={String.raw`\eqalign{\cos(\omega t) &=& ?\\
                \sin(\omega t) &=& ?}`}/>
        </Fragment>
        <Fragment index={1} effect="step-fade-in-then-out">
        <MathComponent tex={String.raw`\eqalign{\cos(\omega t) &=& \frac{1}{2}\left(e^{\mathrm{j}\omega t} + e^{-\mathrm{j}\omega t}\right)\\
                \sin(\omega t) &=& \frac{1}{2\mathrm{j}}\left(e^{\mathrm{j}\omega t} - e^{-\mathrm{j}\omega t}\right)}`}/>
        </Fragment>
        </div>
        <aside className="notes">
        <p>Here comes a useful hack - were representing the cosine and sine with seperate weights as a single variable</p>
        <p>Anytime you see natural exponent with j, imagine it decomposed into cos + jsin</p>
        <p>You can also imagine as phasor in unit circle</p>
        <p>Dont get distracted by square root of 1, its simply a convinent mathematical way of representing the magnitude and phase of a sinusodial in one number</p>
        </aside>
        </Section>
    ), () => (
        <Section>
        <div className="row">
        <div className="col-50">
        <h4>Real to complex</h4>
        </div>
        <div className="col-50">
        <div className="smaller">
                <MathComponent tex={String.raw`\eqalign{\cos(\omega t) &=& \frac{1}{2}\left(e^{\mathrm{j}\omega t} + e^{-\mathrm{j}\omega t}\right)\\
                \sin(\omega t) &=& \frac{1}{2\mathrm{j}}\left(e^{\mathrm{j}\omega t} - e^{-\mathrm{j}\omega t}\right)}`}/>
        </div>
        </div>
        </div>
        <div className="small" style={{position: "relative", top: "-50px"}}>
        <MathComponent tex={String.raw`\eqalign{x(t) &=& \sum\limits_{k=0}^{\infty} A_k\cos(k\omega t) + B_k\sin(k\omega t)\nonumber\\
                &=& \sum\limits_{k=0}^{\infty} \frac{A_k}{2}\left(e^{\mathrm{j}\omega kt} + e^{-\mathrm{j}\omega kt}\right) - \mathrm{j}\frac{B_k}{2}\left(e^{\mathrm{j}\omega kt} - e^{-\mathrm{j}\omega kt}\right)\nonumber\\
                &=& \sum\limits_{k=0}^{\infty} \frac{1}{2}\left(A_k-\mathrm{j}B_k\right)e^{\mathrm{j}\omega kt} +  \frac{1}{2}\left(A_k+\mathrm{j}B_k\right)e^{-\mathrm{j}\omega kt}\nonumber\\
                &=& \sum\limits_{k=0}^{\infty} \underbrace{\frac{1}{2}\left(A_k-\mathrm{j}B_k\right)}_{c_k}e^{\mathrm{j}\omega kt} +  \frac{1}{2}\left(A_k+\mathrm{j}B_k\right)e^{-\mathrm{j}\omega kt}\nonumber}`}/>

      With <MathComponent tex={String.raw`c_{-k} := c^\ast_k \Rightarrow\;\; x(t) = \sum\limits_{k=-\infty}^{\infty} c_k e^{\mathrm{j}\omega_0kt}`} display={false}/>

        </div>
        <aside className="notes">
        <p>Define negative cks to be complex conjugate of k, this becomes our fourier series</p>
         </aside>
        </Section>
    ), () => (
        <Section>
        <div className="row">
        <div className="col-50">
        <h4>Coefficients</h4>
        </div>
        <div className="col-50 small">
        <MathComponent tex={String.raw`x(t) = \sum\limits_{k=-\infty}^{\infty} c_k e^{\mathrm{j}\omega_0kt}`}/>
        </div>
        </div>
        <div className="small" style={{position: "relative", top: "-40px"}}>
        <List>
        <div>Multiply both sides with <MathComponent tex={String.raw`e^{-\mathrm{j}\omega_0nt}`} display={false}/>
        <MathComponent tex={String.raw`x(t)\cdot e^{-\mathrm{j}\omega_0nt} = \sum\limits_{k=-\infty}^{\infty} c_k e^{\mathrm{j}\omega_0(k-n)t}`} display={true}/></div>
        <div>Integrate both sides <MathComponent tex={String.raw`\int\limits_0^{T_0}{x(t)\cdot e^{-\mathrm{j}\omega_0nt}}dt = \int\limits_0^{T_0}\sum\limits_{k=-\infty}^{\infty} c_k e^{\mathrm{j}\omega_0(k-n)t}dt`} display={true}/></div>
        <div>Flip sum and integral <MathComponent tex={String.raw`\int\limits_0^{T_0}{x(t)\cdot e^{-\mathrm{j}\omega_0nt}}dt = \sum\limits_{k=-\infty}^{\infty}c_k \int\limits_0^{T_0} e^{\mathrm{j}\omega_0(k-n)t}dt`} display={true}/></div>
        </List>
        </div>
        <aside className="notes">
        <p>We want to know what the cks are</p>
        <p>Derivation is relatively simple, but non-intuitive</p>
        <p>What is the integral here - its only not zero when k == n</p>
        
         </aside>
        </Section>
    ), () => (
        <Section>
        <div className="smaller light">
        <List>
        <div>Multiply both sides with <MathComponent tex={String.raw`e^{-\mathrm{j}\omega_0nt}$: $x(t)\cdot e^{-\mathrm{j}\omega_0nt} = \sum\limits_{k=-\infty}^{\infty} c_k e^{\mathrm{j}\omega_0(k-n)t}`} display={false}/></div>
        <div>Integrate both sides <MathComponent tex={String.raw`\int\limits_0^{T_0}{x(t)\cdot e^{-\mathrm{j}\omega_0nt}}dt = \int\limits_0^{T_0}\sum\limits_{k=-\infty}^{\infty} c_k e^{\mathrm{j}\omega_0(k-n)t}dt`} display={false}/></div>
        <div>Flip sum and integral <MathComponent tex={String.raw`\int\limits_0^{T_0}{x(t)\cdot e^{-\mathrm{j}\omega_0nt}}dt = \sum\limits_{k=-\infty}^{\infty}c_k \int\limits_0^{T_0} e^{\mathrm{j}\omega_0(k-n)t}dt`} display={false}/></div>
        </List>
        </div>
        <div className="normal" style={{position: "relative", top: "-30px"}}>
        <MathComponent tex={String.raw`\eqalign{                    
                    \int\limits_0^{T_0} e^{\mathrm{j}\omega_0(k-n)t}dt &= 0 &\;\;\;k\neq n\nonumber\\
                    \int\limits_0^{T_0} e^{\mathrm{j}\omega_0(k-n)t}dt &= T_0 &\;\;\;k= n\nonumber\\
                    \Rightarrow \int\limits_0^{T_0}{x(t)\cdot e^{-\mathrm{j}\omega_0nt}}dt &=& c_n T_0}`}/>
        </div>
        
         <aside className="notes">
         </aside>
        </Section>
    ), () => (
        <Section>
        <h4>Limited number of coefficients</h4>
        <p>Reconstruction of periodic signals with a limited number of sinusoidals</p>
        <div className="small"><MathComponent tex={String.raw`\hat{x}(t) = \sum\limits_{k=-\mathcal{K}}^{\mathcal{K}} c_k e^{\mathrm{j}\omega_0kt}`} display={true}/></div>
        <aside className="notes">
        <p>Why we did this derivation - this looks confusing, negative frequencies, and complex coefficients</p>
        <p>Need a basic understanding of derivation to understand where they come from</p>
        <p>This becomes very important when we move into the transform</p>
        <p>It is arbitrary, but makes things simpler in the next steps</p>
        <p>This is just the fourier series, not yet the transform, all it says is that periodics are a sum of sinusodials</p>
        </aside>
        </Section>
    ), () => (
        <Section>
        <div className="row">
        <div className="col-50 framed bordered">
        <div className="row">
        <div className="col-25 small">
        <MathComponent tex={String.raw`\frac{4sin\theta}{\pi}`}/>
        </div>
        <div className="col-75">
        <PhasorAnim partials={[
          {amp: 1, freq: 1, color: "rgb(66, 44, 255)"},
        ]} width="350" height="150"/>
        </div>
        </div>
        <div className="row">
        <div className="col-25 small">
        <MathComponent tex={String.raw`\frac{4sin3\theta}{3\pi}`}/>
        </div>
        <div className="col-75">
        <PhasorAnim partials={[
          {amp: 1, freq: 1, color: "rgb(66, 44, 255)"},
          {amp: 1/3, freq: 3, color: "rgb(66, 255, 44)"},
        ]} width="350" height="150"/>
        </div>
        </div>
        <div className="row">
        <div className="col-25 small">
        <MathComponent tex={String.raw`\frac{4sin5\theta}{5\pi}`}/>
        </div>
        <div className="col-75">
        <PhasorAnim partials={[
          {amp: 1, freq: 1, color: "rgb(66, 44, 255)"},
          {amp: 1/3, freq: 3, color: "rgb(66, 255, 44)"},
          {amp: 1/5, freq: 5, color: "rgb(255, 44, 66)"},
        ]} width="350" height="150"/>
        </div>
        </div>
        <div className="row">
        <div className="col-25 small">
        <MathComponent tex={String.raw`\frac{4sin7\theta}{7\pi}`}/>
        </div>
        <div className="col-75">
        <PhasorAnim partials={[
          {amp: 1, freq: 1, color: "rgb(66, 44, 255)"},
          {amp: 1/3, freq: 3, color: "rgb(66, 255, 44)"},
          {amp: 1/5, freq: 5, color: "rgb(255, 44, 66)"},
          {amp: 1/7, freq: 7, color: "rgb(255, 44, 255)"},
        ]} width="350" height="150"/>
        </div>
        </div>
        </div>
        <div className="col-50 framed bordered">
        <div className="row">
        <div className="col-25 small">
        <MathComponent tex={String.raw`\frac{2sin\theta}{\pi}`}/>
        </div>
        <div className="col-75">
        <PhasorAnim partials={[
          {amp: 1, freq: 1, color: "rgb(66, 44, 255)"},
        ]} width="350" height="150"/>
        </div>
        </div>
        <div className="row">
        <div className="col-25 small">
        <MathComponent tex={String.raw`\frac{2sin2\theta}{-2\pi}`}/>
        </div>
        <div className="col-75">
        <PhasorAnim partials={[
          {amp: 1, freq: 1, color: "rgb(66, 44, 255)"},
          {amp: -1/2, freq: 2, color: "rgb(66, 255, 44)"},
        ]} width="350" height="150"/>
        </div>
        </div>
        <div className="row">
        <div className="col-25 small">
        <MathComponent tex={String.raw`\frac{2sin3\theta}{3\pi}`}/>
        </div>
        <div className="col-75">
        <PhasorAnim partials={[
          {amp: 1, freq: 1, color: "rgb(66, 44, 255)"},
          {amp: -1/2, freq: 2, color: "rgb(66, 255, 44)"},
          {amp: 1/3, freq: 3, color: "rgb(255, 44, 66)"},
        ]} width="350" height="150"/>
        </div>
        </div>
        <div className="row">
        <div className="col-25 small">
        <MathComponent tex={String.raw`\frac{2sin4\theta}{-4\pi}`}/>
        </div>
        <div className="col-75">
        <PhasorAnim partials={[
          {amp: 1, freq: 1, color: "rgb(66, 44, 255)"},
          {amp: -1/2, freq: 2, color: "rgb(66, 255, 44)"},
          {amp: 1/3, freq: 3, color: "rgb(255, 44, 66)"},
          {amp: -1/4, freq: 4, color: "rgb(255, 44, 255)"},
        ]} width="350" height="150"/>
        </div>
        </div>
        </div>
        </div>
         <aside className="notes">
         </aside>
        </Section>
    ), () => (
        <Section>
        <InteractivePhasor width="900" height="600"/>
         <aside className="notes">
         </aside>
        </Section>
    ), () => (
        <Section>
        <h4>Summary</h4>
        <div className="row">
        <div className="col-50">
        <p><i>Any periodic signal</i> can be represented in <b>Fourier Series</b></p>
        </div>
        <div className="col-50" style={{height: "150px"}}>
        <MathComponent tex={String.raw`x(t) = \sum\limits_{k=-\infty}^{\infty} c_k \mathrm{e}^{\mathrm{j}\omega_0 kt}`}/>
        </div>
        </div>
        <h5>Key Components</h5>
        <List  fragment={true}>
        <div><MathComponent tex={String.raw`\omega_0 = 2\pi\cdot f_0`} display={false}/></div>
        <div><MathComponent tex={String.raw`\mathrm{e}^{\mathrm{j}\omega_0kt} = \cos(\omega_0kt) + \mathrm{j} \sin(\omega_0kt)`} display={false}/></div>
        <div>Fourier series coefficients <MathComponent tex={String.raw`c_k`} display={false}/>
        <MathComponent tex={String.raw`c_k = \frac{1}{T_0}\int\limits_{-\frac{T_0}{2}}^{\frac{T_0}{2}} x(t) \mathrm{e}^{-\mathrm{j}\omega_0kt}\, dt`}/></div>
        </List>
         <aside className="notes">
         </aside>
        </Section>
    ), () => (
        <Section>
        <h4>Summary</h4>
        <List fragment={true}>
        <div>Complex coefficients are a useful hack to represent both phase and amplitude in one value</div>
        <div>To derive the coefficients from a signal we need:
        <div className="normal"><List>
        <div>Fundamental frequency</div>
        <div>Functional description</div>
        </List></div></div>
        <div>"Frequency domain" of Fourier Series is discrete (integer multiples)</div>
        <div>"Time domain" can be continuous or discrete (discrete may be a pain to integrate, though)</div>
        </List>
         <aside className="notes">
         </aside>
        </Section>
    )
  ]

Presentation(slides, module.id)

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

import CorrelationAnimation from './class-04/component/CorrelationAnimation';
import CorrelationMatrix from './class-04/component/CorrelationMatrix';
import CorrelationMatrixPreview from './class-04/component/CorrelationMatrixPreview';

import image00 from './class-04/img/image00.jpg';

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment';



const jsName = document.getElementById('reveal').attributes.jsName.value;
const isPdf = jsName.endsWith("-pdf")

const slides = [
    () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 4: Signal Similarity - Correlation</div>
        </div>
        <br/>
        <div className="center">Andrew Beck</div>
         <aside className="notes">
          <p>Features from probability are a bit abstract, so let's look at some features that give us more info</p>
         </aside>
      </Section>
    ), () => (
        <Section>
        <h2>Correlation Function</h2>
        <br/>
        <List icon="fa-angle-double-right">
        <div>Indicates (linear) dependencies between two signals</div>
        <div>Shifts the signals to find the dependency for each shift in time</div>
        </List>
          <aside className="notes">
         </aside>
        </Section>
    ), () => (
        <Section>
        <h4>Correlation Function</h4>
        Compute similarity between two <b>stationary</b> signals <MathComponent tex={String.raw`x`} display={false}/>, <MathComponent tex={String.raw`y`} display={false}/>
        <MathComponent tex={String.raw`r_\mathrm{xy}(\tau)=\mathcal{E}\lbrace x(t)y(t+\tau)\rbrace`}/>
        
        <Fragment><div className="row">
        <div className="col-30">
        <List icon="fa-angle-double-right"><div>Continuous:</div></List>
        </div>
        <div className="col-70">
        <MathComponent tex={String.raw`r_\mathrm{xy}(\tau) = \int\limits_{-\infty}^{\infty}{x(t)\cdot y(t+\tau)dt}`}/>
        </div>
        </div></Fragment>

        <Fragment><div className="row">
        <div className="col-30">
        <List icon="fa-angle-double-right"><div>Discrete:</div></List>
        </div>
        <div className="col-70">
        <MathComponent tex={String.raw`r_\mathrm{xy}(\eta) = \sum\limits_{i=-\infty}^{\infty}{x(i)\cdot y(i+\eta)}`}/>
        </div>
        </div></Fragment>
      
          <aside className="notes">
          <p>How we do it is very simple</p>
          <p>Might be easier to look at discrete one first</p>
          <p>We compute the sum of all is</p>
          <p>Eta is the new time index</p>
          <p>Eta is shifting y to compare to x</p>
          <p>What does the correlation function tell us?</p>
          <p>The closer these functions are to each other, the higher the correlation</p>
          <p>If they are orthonogal, it is zero, if very different, a low number</p>
          <p>Based on eta, it could shift between being correlated or not</p>
         </aside>
        </Section>
    ), () => (
        <Section>
        <div className="smaller"><MathComponent tex={String.raw`r_\mathrm{xy}(\tau) = \int\limits_{-\infty}^{\infty}{x(t)\cdot y(t+\tau)dt}`}/></div>
        <CorrelationAnimation/>
          <aside className="notes">
          <p>What you see here is the correlation being calculated for two different functions at a changing eta</p>
          <p>eta just shifts the signals</p>
          <p>Multiply and integrate</p>
          <p>Colored area is the output</p>
          <p>Lots of zeroes until they overlap</p>
          <p>Why do we want to find the similarity? What examples</p>
         </aside>
        </Section>
    ), () => (
        <Section>
        <h2>Use Cases</h2>
        <List icon="fa-angle-double-right">
        <div>Find (linear!) similarity between two signals (e.g., clean and noisy)</div>
        <div>Find time shift between two similar signals</div>
        </List><br/>
        <Fragment>
        <h4>Example: <b>Radar</b></h4>
        <List icon="fa-angle-double-right">
        <div>Correlate sent signal with received signal</div>
        <div>Pick maximum location and convert to distance of object</div>
        </List>
        </Fragment>
        <aside className="notes">
          <p>Finding signal in a noisey environment</p>
          <p>Finding fundamental frequency by auto correlation - length of time that something repeats - An old way but still used</p>
          <p>Radar determines the delay by phase shift</p>
          <p>Sonar is similar with pings</p>
         </aside>
        </Section>
    ), () => (
        <Section>
        <h3>Correlation Coefficient</h3>
        <MathComponent tex={String.raw`r_\mathrm{xy}(\tau) = \frac{\mathcal{E}\lbrace(X-\mu_X)(Y-\mu_Y)\rbrace}{\sigma_X\sigma_Y}`}/>
        Special case: <b>Pearson Correlation Coefficient</b> <MathComponent tex={String.raw`r_\mathrm{xy}(0)`} display={false}/> after normalization.
        <Fragment>
        <h4>Possible reasons for normalization</h4>
        </Fragment>
        <Fragment>
        <List icon="fa-angle-double-right">
        <div>Ensuring that function will always be between -1 and 1</div>
        <div>Shifting and scaling one signal will not change the coefficient</div>
        </List>
        </Fragment>
         <aside className="notes">
           <p>If I take a signal and have no time shift and correlate with itself - it outputs the energy</p>
           <p>Depending on the scale of signals you use, you can have dramatically different output numbers</p>
           <p>But you may want to look at similarity but you don't want to include information about power</p>
           <p>Signma is standard deviation - related to power</p>
           <p>By dividing by standard deviation will always bound the correlation to -1 to 1</p>
           <p>Sometimes you might want to take into account scale, but most of the time you do want to normalize</p>
           <p>At shift zero, that's the normalized correlation, called Pearson Correlation Cofficient - just a single value</p>
         </aside>
        </Section>
    ), () => (
        <Section>
        <h4>Problems with correlation as summary statistic</h4>
        <div className="row small">
        <div className="col-30">
        <p>Anscombes quartet</p>
        </div>
        <div className="col-70">
        <List icon="fa-angle-double-right">
        <div>Identical Mean: 7.5</div>
        <div>Identical Variance: 4.2</div>
        <div>Identical <b>Pearson correlation coefficient</b>: 0.816</div>
        </List>
        </div>
        </div>
        <img src={image00} style={{width:"70%"}}/>
         <aside className="notes">
         <p>Most of the time this is useful, but you can break it</p>
         <p>Pretty high pearson correlation</p>
         <p>Just because you have high correlation, doesn't MEAN they are similar</p>
         </aside>
        </Section>
    ), () => (
        <Section>
        <CorrelationMatrixPreview/>
          <aside className="notes">
          <p>Rect vs Rect - Triangle</p>
          <p>Sine vs Sine - Cosine</p>
          <p>Noise vs Noise - Peak at 0eta - 0 elsewhere</p>
          <p>Noise with anything will be zero</p>
         </aside>
        </Section>
    ), () => (
        <Section>
        <CorrelationMatrix/>
          <aside className="notes">
          <p>Note windowed sine - an infinite sine signal correlated with sine will form cosine</p>
          <p>Using a windowed sine will add triangle window</p>
         </aside>
        </Section>
    ), () => (
        <Section>
        <div className="smaller"><MathComponent tex={String.raw`r_\mathrm{xy}(\tau) = \int\limits_{-\infty}^{\infty}{x(t)\cdot y(t+\tau)dt}`}/></div>
        <CorrelationAnimation/>
         <aside className="notes">
         <p>Returning to this, we can note that the functions are symmetrical, so we get a symmetrical correlation</p>
         </aside> 
        </Section>
    ), () => (
        <Section>
        <h3>Autocorrelation Function</h3>
        <MathComponent tex={String.raw`r_\mathrm{xx}(\tau)=\mathcal{E}\lbrace x(t)x(t+\tau)\rbrace`}/>
        <Fragment index={1}><h4>Autocorrelation function properties</h4>
        <List icon="fa-angle-double-right" overrides={{2: "none"}}>
        <div><b>Power:</b> &nbsp;<MathComponent tex={String.raw`r_{xx}(0) = 	\mathcal{E}\lbrace X^2\rbrace`} display={false}/></div>
        <div><b>Symmetry:</b> &nbsp;<MathComponent tex={String.raw`r_{xx}(\tau)=r_{xx}(-\tau)`} display={false}/></div>
        <div>(substitute <MathComponent tex={String.raw`t=t'+\tau`} display={false}/>)</div>
        </List>
        </Fragment>
        <Fragment index={2}>
        <List icon="fa-angle-double-right" overrides={{}}>
        <div><b>Global Max:</b> &nbsp;<MathComponent tex={String.raw`r_{xx}(\tau)\leq r_{xx}(0)`} display={false}/></div>
        </List>
        </Fragment>
        <Fragment index={4}>
        <List icon="fa-angle-double-right" overrides={{1:"none"}}>
        <div><b>Periodicity:</b></div>
        <div>The ACF of a periodic signal is periodic (period length of input signal)</div>
        </List>
        </Fragment>
          <aside className="notes">
          <p>Autocorrelation is just correlation with itself</p>
          <p>At shift of 0 is simply the power</p>
          <p>Another important property - It's symetric with itself around 0</p>
          <p>It cannot be larger than at 0 shift</p>
          <p>Pure periodics can reach that level, but not go higher</p>
         </aside>
        </Section>
    ), () => (
        <Section>
        <h3>Summary</h3>
        <List icon="fa-angle-double-right" overrides={{}}>
        <div>Correlation Function is useful tool to</div>
        </List>
        <div className="center">
        <p><b>Determine the similarity</b> between two signals (CCF)</p>
        <p><b>Identify a shift/latency</b> between two similar signals (CCF)</p>
        <p><b>Identify periodicity</b> vs. noisiness in a signal (ACF)</p>
        </div>
        <Fragment>
        <List icon="fa-angle-double-right" overrides={{}}>
        <div>Continues to be standard approach for all applications related to the above tasks</div>
        </List>
        </Fragment>
        <Fragment>
        <List icon="fa-angle-double-right" overrides={{}}>
        <div>Note: CCF or ACF do not display time information (lost in integration)</div>
        </List>
        </Fragment>
        <aside className="notes">
          <p>Not reversible - you can't get back to the other signals</p>
          <p>You lose time information, lose phase information, but gain new information</p>
        </aside>
        </Section>
    )
  ]

Presentation(slides, module.id)

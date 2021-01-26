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

import GaussianPlot from './class-03/component/GaussianPlot';
import ExponentialPlot from './class-03/component/ExponentialPlot';
import LaplacePlot from './class-03/component/LaplacePlot';
import RealWorldPlot from './class-03/component/RealWorldPlot';
import RealWorldPlot2 from './class-03/component/RealWorldPlot2';
import SquareWavePDF from './class-03/component/SquareWavePDF';
import SineWavePDF from './class-03/component/SineWavePDF';
import UniformNoisePDF from './class-03/component/UniformNoisePDF.js';
import GaussianNoisePDF from './class-03/component/GaussianNoisePDF';
import DCPDF from './class-03/component/DCPDF';

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment';


const jsName = document.getElementById('reveal').attributes.jsName.value;
const isPdf = jsName.endsWith("-pdf")

const slides = [
    () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 3: Signal Descriptions</div>
        </div>
        <br/>
        <div className="center">Andrew Beck</div>
        <aside className="notes">
          <p>We have to describe random signals statistically</p>
          <p>Even though each random series might be different, each still sounds the same</p>
         </aside>
      </Section>
    ), () => (
        <Section>
        <h3>Describing Random Signals</h3>
        <br/>
        <div className="left">
        <List icon="fa-angle-double-right" overrides={{1:"none"}}>
        <div>Ergodic signals do not have a functional description</div>
        <div>Other ways of describing these signals have to be found</div>
        </List>
        <br/><br/>
        <List icon="fa-angle-double-right" overrides={{1:"none"}}>
        <div>Ergodic signal characteristics are not time variant</div>
        <div>We are looking for <b>time-independent descriptions</b></div>
        </List>
        <br/><br/>
        <List icon="fa-angle-double-right" overrides={{1:"none"}}>
        <div>These descriptions might also be convenient to use for some deterministic signals</div>
        </List>
        </div>
          <aside className="notes">
          <p>Time-independent, IE not a function with a parameter of time - instead with "mean" values</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <h3>Probability and Occurence</h3>
        <p><MathComponent tex={String.raw`N`} display={false}/>: number of overall observations</p>
        <p><MathComponent tex={String.raw`N(x_i)`} display={false}/>: number of occurences of symbol <MathComponent tex={String.raw`x_i`} display={false}/></p>
        <br/>
        <Table leftSize="60">
        <List icon="fa-angle-double-right" overrides={{1:"none"}}>
        <div>Relative number of occurrences:</div>
        </List>
        <MathComponent tex={String.raw`\hat{p}_i = \frac{N(x_i)}{N}`} display={false}/>
        <List icon="fa-angle-double-right" overrides={{1:"none"}}>
        <div>Probability:</div>
        </List>
        <MathComponent tex={String.raw`p_i = \lim\limits_{N\rightarrow\infty} \frac{N(x_i)}{N}`} display={false}/>
        </Table>

        <div className="center" style={{width: "500px"}}>
        <Table leftSize="60" bordered={true}>
        <div className="heading">Properties</div>
        <div className="left">
          <p><MathComponent tex={String.raw`\sum\limits_i p_i = 1`} display={false}/></p>
        <p><MathComponent tex={String.raw`0 \leq p_i \leq 1`} display={false}/></p>
        </div>
        </Table>
        </div>
          <aside className="notes">
          <p>First we must dive into probability</p>
          <p>to put it in audio terms - N represents the length/# of samples</p>
          <p>xi would amplitude</p>
          <p>We simply count how many times it occurs</p>
          <p>If we do it for a long time, say, an hour, how much did each amplitude, we get an estimate of probability</p>
          <p>We don't know the ACTUAL probability until we can observe infinite number</p>
          <p>Probability is bounded</p>
          <p>This is abstract, let's look at specific example</p>
         </aside>
      </Section>
    ), () => (
        <Section>
        <h3> Probability Distribution Example</h3>
        <div className="row">
        <div className="col-24 right"><b>Value</b></div>
        <div className="col-8 center"><b><i className="fas fa-dice-one"/></b></div>
        <div className="col-8 center"><b><i className="fas fa-dice-two"/></b></div>
        <div className="col-8 center"><b><i className="fas fa-dice-three"/></b></div>
        <div className="col-8 center"><b><i className="fas fa-dice-four"/></b></div>
        <div className="col-8 center"><b><i className="fas fa-dice-five"/></b></div>
        <div className="col-8 center"><b><i className="fas fa-dice-six"/></b></div>
        <div className="col-24"></div>
        </div>
        <div className="row">
        <div className="col-24 right"><b>p(x)</b></div>
        <div className="col-8 center"><b><MathComponent tex={String.raw`\frac{1}{6}`} display={false}/></b></div>
        <div className="col-8 center"><b><MathComponent tex={String.raw`\frac{1}{6}`} display={false}/></b></div>
        <div className="col-8 center"><b><MathComponent tex={String.raw`\frac{1}{6}`} display={false}/></b></div>
        <div className="col-8 center"><b><MathComponent tex={String.raw`\frac{1}{6}`} display={false}/></b></div>
        <div className="col-8 center"><b><MathComponent tex={String.raw`\frac{1}{6}`} display={false}/></b></div>
        <div className="col-8 center"><b><MathComponent tex={String.raw`\frac{1}{6}`} display={false}/></b></div>
        <div className="col-24"></div>
        </div>
          <aside className="notes">
          <p>Simple example</p>
          <p>Six surfaces - each is equally probable</p>
          <p>Surface is like amplitude value, each is 1/6</p>
          <p>We can say for the value of 1, probability is 1/6</p>
         </aside>
        </Section>
    ), () => (
      <Section>
        <h3>Probability Distribution for the roll of two dice</h3>
        <Fragment index="0">
        <div className="row">
        <div className="col-9 left">2</div>
        <div className="col-9 left">3</div>
        <div className="col-9 left">4</div>
        <div className="col-9 left">5</div>
        <div className="col-9 left">6</div>
        <div className="col-9 left">7</div>
        <div className="col-9 left">8</div>
        <div className="col-9 left">9</div>
        <div className="col-9 left">10</div>
        <div className="col-9 left">11</div>
        <div className="col-9 left">12</div>
        </div>
        </Fragment>
        <div className="row">
          <div className="col-9 center"><b><Fragment index="1"><MathComponent tex={String.raw`\frac{1}{36}`} display={false}/></Fragment></b></div>
          <div className="col-9 center"><b><Fragment index="2"><MathComponent tex={String.raw`\frac{1}{18}`} display={false}/></Fragment></b></div>
          <div className="col-9 center"><b><Fragment index="3"><MathComponent tex={String.raw`\frac{1}{12}`} display={false}/></Fragment></b></div>
          <div className="col-9 center"><b><Fragment index="4"><MathComponent tex={String.raw`\frac{1}{9}`} display={false}/></Fragment></b></div>
          <div className="col-9 center"><b><Fragment index="5"><MathComponent tex={String.raw`\frac{5}{36}`} display={false}/></Fragment></b></div>
          <div className="col-9 center"><b><Fragment index="6"><MathComponent tex={String.raw`\frac{1}{6}`} display={false}/></Fragment></b></div>
          <div className="col-9 center"><b><Fragment index="7"><MathComponent tex={String.raw`\frac{5}{36}`} display={false}/></Fragment></b></div>
          <div className="col-9 center"><b><Fragment index="8"><MathComponent tex={String.raw`\frac{1}{9}`} display={false}/></Fragment></b></div>
          <div className="col-9 center"><b><Fragment index="9"><MathComponent tex={String.raw`\frac{1}{12}`} display={false}/></Fragment></b></div>
          <div className="col-9 center"><b><Fragment index="10"><MathComponent tex={String.raw`\frac{1}{18}`} display={false}/></Fragment></b></div>
          <div className="col-9 center"><b><Fragment index="11"><MathComponent tex={String.raw`\frac{1}{36}`} display={false}/></Fragment></b></div>
        </div>
        <div className="row">
        <div className="col-9 center"><Fragment index="1"></Fragment></div>
        <div className="col-9 center"><Fragment index="2"></Fragment></div>
        <div className="col-9 center"><Fragment index="3"></Fragment></div>
        <div className="col-9 center"><Fragment index="4"></Fragment></div>
        <div className="col-9 center"><Fragment index="5"></Fragment></div>
        <div className="col-9 center"><Fragment index="6"><i className="fas fa-dice-six"/><i className="fas heading fa-dice-one"/></Fragment></div>
        <div className="col-9 center"><Fragment index="7"></Fragment></div>
        <div className="col-9 center"><Fragment index="8"></Fragment></div>
        <div className="col-9 center"><Fragment index="9"></Fragment></div>
        <div className="col-9 center"><Fragment index="10"></Fragment></div>
        <div className="col-9 center"><Fragment index="11"></Fragment></div>
        </div>
        <div className="row">
        <div className="col-9 center"><Fragment index="1"></Fragment></div>
        <div className="col-9 center"><Fragment index="2"></Fragment></div>
        <div className="col-9 center"><Fragment index="3"></Fragment></div>
        <div className="col-9 center"><Fragment index="4"></Fragment></div>
        <div className="col-9 center"><Fragment index="5"><i className="fas fa-dice-five"/><i className="fas heading fa-dice-one"/></Fragment></div>
        <div className="col-9 center"><Fragment index="6"><i className="fas fa-dice-five"/><i className="fas heading fa-dice-two"/></Fragment></div>
        <div className="col-9 center"><Fragment index="7"><i className="fas fa-dice-six"/><i className="fas heading fa-dice-two"/></Fragment></div>
        <div className="col-9 center"><Fragment index="8"></Fragment></div>
        <div className="col-9 center"><Fragment index="9"></Fragment></div>
        <div className="col-9 center"><Fragment index="10"></Fragment></div>
        <div className="col-9 center"><Fragment index="11"></Fragment></div>
        </div>
        <div className="row">
        <div className="col-9 center"><Fragment index="1"></Fragment></div>
        <div className="col-9 center"><Fragment index="2"></Fragment></div>
        <div className="col-9 center"><Fragment index="3"></Fragment></div>
        <div className="col-9 center"><Fragment index="4"><i className="fas fa-dice-four"/><i className="fas heading fa-dice-one"/></Fragment></div>
        <div className="col-9 center"><Fragment index="5"><i className="fas fa-dice-four"/><i className="fas heading fa-dice-two"/></Fragment></div>
        <div className="col-9 center"><Fragment index="6"><i className="fas fa-dice-four"/><i className="fas heading fa-dice-three"/></Fragment></div>
        <div className="col-9 center"><Fragment index="7"><i className="fas fa-dice-five"/><i className="fas heading fa-dice-three"/></Fragment></div>
        <div className="col-9 center"><Fragment index="8"><i className="fas fa-dice-six"/><i className="fas heading fa-dice-three"/></Fragment></div>
        <div className="col-9 center"><Fragment index="9"></Fragment></div>
        <div className="col-9 center"><Fragment index="10"></Fragment></div>
        <div className="col-9 center"><Fragment index="11"></Fragment></div>
        </div>
        <div className="row">
        <div className="col-9 center"><Fragment index="1"></Fragment></div>
        <div className="col-9 center"><Fragment index="2"></Fragment></div>
        <div className="col-9 center"><Fragment index="3"><i className="fas fa-dice-three"/><i className="fas heading fa-dice-one"/></Fragment></div>
        <div className="col-9 center"><Fragment index="4"><i className="fas fa-dice-three"/><i className="fas heading fa-dice-two"/></Fragment></div>
        <div className="col-9 center"><Fragment index="5"><i className="fas fa-dice-three"/><i className="fas heading fa-dice-three"/></Fragment></div>
        <div className="col-9 center"><Fragment index="6"><i className="fas fa-dice-three"/><i className="fas heading fa-dice-four"/></Fragment></div>
        <div className="col-9 center"><Fragment index="7"><i className="fas fa-dice-four"/><i className="fas heading fa-dice-four"/></Fragment></div>
        <div className="col-9 center"><Fragment index="8"><i className="fas fa-dice-five"/><i className="fas heading fa-dice-four"/></Fragment></div>
        <div className="col-9 center"><Fragment index="9"><i className="fas fa-dice-six"/><i className="fas heading fa-dice-four"/></Fragment></div>
        <div className="col-9 center"><Fragment index="10"></Fragment></div>
        <div className="col-9 center"><Fragment index="11"></Fragment></div>
        </div>
        <div className="row">
        <div className="col-9 center"><Fragment index="1"></Fragment></div>
        <div className="col-9 center"><Fragment index="2"><i className="fas fa-dice-two"/><i className="fas heading fa-dice-one"/></Fragment></div>
        <div className="col-9 center"><Fragment index="3"><i className="fas fa-dice-two"/><i className="fas heading fa-dice-two"/></Fragment></div>
        <div className="col-9 center"><Fragment index="4"><i className="fas fa-dice-two"/><i className="fas heading fa-dice-three"/></Fragment></div>
        <div className="col-9 center"><Fragment index="5"><i className="fas fa-dice-two"/><i className="fas heading fa-dice-four"/></Fragment></div>
        <div className="col-9 center"><Fragment index="6"><i className="fas fa-dice-two"/><i className="fas heading fa-dice-five"/></Fragment></div>
        <div className="col-9 center"><Fragment index="7"><i className="fas fa-dice-three"/><i className="fas heading fa-dice-five"/></Fragment></div>
        <div className="col-9 center"><Fragment index="8"><i className="fas fa-dice-four"/><i className="fas heading fa-dice-five"/></Fragment></div>
        <div className="col-9 center"><Fragment index="9"><i className="fas fa-dice-five"/><i className="fas heading fa-dice-five"/></Fragment></div>
        <div className="col-9 center"><Fragment index="10"><i className="fas fa-dice-six"/><i className="fas heading fa-dice-five"/></Fragment></div>
        <div className="col-9 center"><Fragment index="11"></Fragment></div>
        </div>
        <div className="row">
        <div className="col-9 center"><Fragment index="1"><i className="fas fa-dice-one"/><i className="fas heading fa-dice-one"/></Fragment></div>
        <div className="col-9 center"><Fragment index="2"><i className="fas fa-dice-one"/><i className="fas heading fa-dice-two"/></Fragment></div>
        <div className="col-9 center"><Fragment index="3"><i className="fas fa-dice-one"/><i className="fas heading fa-dice-three"/></Fragment></div>
        <div className="col-9 center"><Fragment index="4"><i className="fas fa-dice-one"/><i className="fas heading fa-dice-four"/></Fragment></div>
        <div className="col-9 center"><Fragment index="5"><i className="fas fa-dice-one"/><i className="fas heading fa-dice-five"/></Fragment></div>
        <div className="col-9 center"><Fragment index="6"><i className="fas fa-dice-one"/><i className="fas heading fa-dice-six"/></Fragment></div>
        <div className="col-9 center"><Fragment index="7"><i className="fas fa-dice-two"/><i className="fas heading fa-dice-six"/></Fragment></div>
        <div className="col-9 center"><Fragment index="8"><i className="fas fa-dice-three"/><i className="fas heading fa-dice-six"/></Fragment></div>
        <div className="col-9 center"><Fragment index="9"><i className="fas fa-dice-four"/><i className="fas heading fa-dice-six"/></Fragment></div>
        <div className="col-9 center"><Fragment index="10"><i className="fas fa-dice-five"/><i className="fas heading fa-dice-six"/></Fragment></div>
        <div className="col-9 center"><Fragment index="11"><i className="fas fa-dice-six"/><i className="fas heading fa-dice-six"/></Fragment></div>
        </div>
          <aside className="notes">
          <p>What happens if we have two dice?</p>
          <p>Firstly, think about the range of values</p>
          <p>For 2 - there is only one combination - 1 & 1, so probability is 1/6 * 1/6</p>
          <p>For 3, there are more combos, so on</p>
          <p>Final result - it linearly increases until 7, then linearly decreases</p>
          <p>This is called a "Probality density distribution"</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <h3>Continuous Probability Density Distribution</h3>
        <div className="row">
          <div className="col-50 right">
            <MathComponent tex={String.raw`i`} display={false}/> &nbsp;<i className="fas fa-long-arrow-alt-right"/>&nbsp; continuous &nbsp;<i className="fas fa-hand-point-right"/>&nbsp; <b>PDF</b>
            </div>
          <div className="col-50 left">
            <Fragment>
              <MathComponent tex={String.raw`\int\limits_{-\infty}^{\infty} p_X(x)dx = 1`}/>
              <MathComponent tex={String.raw`0 \leq p_X(x)`}/>
            </Fragment>
          </div>
        </div>
        <Fragment>
        <div className="row">
          <div className="col-50 right">
            Probability of <MathComponent tex={String.raw`x`} display={false}/> being a value smaller than or equal to <MathComponent tex={String.raw`x_c`} display={false}/>
          </div>
          <div className="col-50 left">
            <MathComponent tex={String.raw`\int\limits_{-\infty}^{x_c} p_X(x)dx`}/>
          </div>
        </div>
        </Fragment>
          <aside className="notes">
          <p>The dice is all discrete, but now we can look at it in the continuous domain</p>
          <p>The constraints change slightly when we go into continuous</p>
          <p>For audio, this is always about amplitude values</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <h3>Example PDF: Gaussian</h3>
        <MathComponent tex={String.raw`p_X(x)= \frac{1}{\sigma_X\sqrt{2\pi}}e^{-(\frac{x-\mu_X}{2\sigma_X})^2}`}/>
        <GaussianPlot/>
          <aside className="notes">
          <p>These are typical distributions</p>
          <p>Many natural sources have gaussian style</p>
          <p>For example, microphone is just picking up noise</p>
          <p>What does that mean? How do we interpret this</p>
          <p>Maximum is at zero - very small values are very likely to occur</p>
          <p>For example amplitude of 0.9 might have probability of less than 0.5%</p>
          <p>It is more likely to have small values, though from time to time, we may have extreme values</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <h3>Example PDF: Exponential</h3>
        <MathComponent tex={String.raw`p_X(x)=\cases{  \frac{1}{\sigma_X}e^{-\frac{x}{\sigma_X}} & if x > 0 \cr 0 & else }`}/>
        <ExponentialPlot/>
          <aside className="notes">
         </aside>
      </Section>
    ), () => (
      <Section>
        <h3>Example PDF: Laplace (2-sided exp)</h3>
        <MathComponent tex={String.raw`p_X(x)= \frac{1}{\sigma_X\sqrt{2}}e^{-\sqrt{2}\frac{\mid x-\mu_X\mid}{\sigma_X}}`}/>
        <LaplacePlot/>
          <aside className="notes">
         </aside>
      </Section>
    ), () => (
      <Section>
        <h3>Measured RDF - Orchestra</h3>
        <RealWorldPlot />
          <aside className="notes">
          <p>Dotted line is match of Laplace</p>
          <p>We can make the same assumptions for real world signals - high amplitudes less likely</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <h3>Measured RDF - Podcast Conversation</h3>
        <RealWorldPlot2 />
          <aside className="notes">
          <p>For speech, we may see more low amplitudes due to lots of silence in speaking</p>
          <p>Quantized slightly when making this charts</p>
          <p>From these observations, we could also dynamically change the quantized "bins"</p>
          <p>Lower values might have more fine grained quant steps, higher amplitudes more broad</p>
          <p>This was used for old telephone transmissions, to max quality and reduce bandwidth</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <h3>Distributions of Generated Signals</h3>
        <div className="row">
          <div className="col-50 center">
            Square Wave PDF
            <Fragment><SquareWavePDF /></Fragment>
          </div>
          <div className="col-50 center">
            Saw Wave PDF
            <Fragment><UniformNoisePDF /></Fragment>
          </div>
        </div>
        <div className="row">
          <div className="col-50 center">
          DC PDF
            <Fragment><DCPDF /></Fragment>
          </div>
          <div className="col-50 center">
            Uniform Noise PDF
            <Fragment><UniformNoisePDF /></Fragment>
          </div>
        </div>
        <div className="row">
          <div className="col-50 center">
            Gaussian Noise PDF
            <Fragment><GaussianNoisePDF /></Fragment>
          </div>
          <div className="col-50 center">
            Sine Wave PDF
            <Fragment><SineWavePDF /></Fragment>
          </div>
        </div>
          <aside className="notes">
          <p>You know how these signals look in the time domain, think about how the distribution looks in PDF</p>
          <p>A perfect square wave has NO other values</p>
          <p>Sawtooth - even distribution - all values covered evenly (probability should all equal 1)</p>
          <p>DC - like square wave</p>
          <p>Uniform is exactly how it sounds - ideally goes to infinity, but it's bounded in real world scenarios</p>
          <p>Gaussian is clipped, technically - though it doesn't come up in real-world, as values are very unlikely</p>
          <p>PDF of sinusodial is a little tricky - shape mirrors sin</p>
          <p>Goes to infinity - this isn't EXACTLY the same as probability - this is probability density, there is a difference</p>
          <p>Does not matter in this class, just pointing it out to avoid confusion</p>
          <p>Be aware there is a distinction, matters when math is involved</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <h4>Expected Value</h4>
        <p>Example: Average grade, five students, grades: 1, 2, 1, 3, 5</p>
        <MathComponent tex={String.raw`\hat{\mu}_X = \frac{1+2+1+3+5}{5} = 2.4`}/>
        <Fragment>
          <Schedule sizes={[20, 40, 40]}
                    tableClass="small"
                    firstRowClass="heading"
                    evenRowClass="evenRow"
                    oddRowClass="oddRow"
                    items={[
                      ["Grade", "# of Occurrences", "Relative Frequency"],
                      ["1", "2", "2/5"],
                      ["2", "1", "1/5"],
                      ["3", "1", "1/5"],
                      ["4", "0", "0/5"],
                      ["5", "1", "1/5"]]}/>
        </Fragment>
        <aside className="notes">
          <p>Now we have a way to describe noise</p>
          <p>But what can we extract from this info</p>
          <p>Mean value is very trivial</p>
          <p>But we can also derive something like a probibility density, though sample size is small, so calling it relative frequency</p>
        </aside>
      </Section>
    ), () => (
      <Section>
        <h4>Expected Value</h4>
        <MathComponent tex={String.raw`\mu = \frac{2}{5}\cdot 1 + \frac{1}{5}\cdot 2 + \frac{1}{5}\cdot 3 + \frac{0}{5}\cdot 4 + \frac{1}{5}\cdot 5  = 2.4`}/>
        <br/>
        <Fragment>
          <MathComponent tex={String.raw`\mu_X 	= \sum\limits_{\forall x} p(x)\cdot x`}/>
          <MathComponent tex={String.raw`\mu_X=\mathcal{E}\lbrace   X\rbrace  =\int\limits_{-\infty}^{+\infty}xp_X(x)dx`}/>
        </Fragment>
          <aside className="notes">
          <p>Now we can derive the mean from the probability density function</p>
          <p>That means we can get mean from both time domain and PDF</p>
          <p>This is way to get mean from PDF, discrete and continuous</p>
          <p>This is also referred to as the "expectation value"</p>
          <p>It's right in the middle of our expected values</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <h4>Expected Value</h4>
        <div className="row">
          <div className="col-40">
            Generalization:
          </div>
          <div className="col-60">
            <MathComponent tex={String.raw`\mathcal{E}\lbrace   f(X)\rbrace  = \sum\limits_i f(x)p(x)`}/>
          </div>
        </div>
        <Fragment>
          <p>Examples</p>
          <List icon="fa-angle-double-right">
            <div>Mean: <MathComponent tex={String.raw`f(x) = x`} display={false}/></div>
            <div>Quad. Mean: <MathComponent tex={String.raw`f(x) = x^2`} display={false}/></div>
          </List>
        </Fragment>
          <aside className="notes">
          <p>Generalize a little bit, instead of just an "x" we can have a function</p>
          <p>Common functions are mean, quad mean</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <div className="row">
          <div className="col-30 normal">
            <List icon="fa-angle-double-right">
              <div><MathComponent tex={String.raw`k`} display={false}/>th moment: </div>
            </List>
          </div>
          <div className="col-70 normal">
            <MathComponent tex={String.raw`\mathcal{E}\lbrace  X^k\rbrace  = \int\limits_{-\infty}^{+\infty}x^kp_X(x)dx`} display={true}/>
          </div>
        </div>
        <Fragment>
        <div className="row">
          <div className="col-30 normal">
            <List icon="fa-angle-double-right">
              <div><MathComponent tex={String.raw`k`} display={false}/>th central moment: </div>
            </List>
          </div>
          <div className="col-70 normal">
            <MathComponent tex={String.raw`\mathcal{E}\lbrace  (X-\mu_X)^k\rbrace  = \int\limits_{-\infty}^{+\infty}(x-\mu_X)^k p_X(x)dx`}/>
          </div>
        </div>
        </Fragment>

        <Fragment>
        <List icon="fa-angle-double-right">
          <div className="normal">Example: 2nd order central moment: <b>Variance</b></div>
        </List>
          <div className="normal"><MathComponent tex={String.raw`\sigma_X^2 = \mathcal{E}\lbrace  (X-\mu_X)^2\rbrace  = \int\limits_{-\infty}^{+\infty}(x-\mu_X)^2 p_X(x)dx`}/></div>
        </Fragment>
          <aside className="notes">
          <p>If we generalize it even more, with k==1, we have our normal mean value</p>
          <p>Then for k==2, we have the energy or power of the signal</p>
          <p>And if we subtract the mean value, we get what we call "central moment"</p>
          <p>Second order central moment is also called the variance</p>
          <p>What does the variance tell us?</p>
          <p>How much the signal varies</p>
          <p>DC has variance of zero</p>
          <p>For example gaussian vs uniform - which has more variance?</p>
          <p>Uniform has higher variance - the more lower you have the lower variance</p>
          <p>Setup might be abstract - expectation values & moments, but mean & variance are very useful for describing a sound</p>
          <p>Even higher order moments can be very useful - for example cubes and power of four for k</p>
          <p>Cubes is skewness (introduces sign back), and Kurtosis is how gaussian a signal</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <h2>Calculation of Moments</h2>
        <p><div className="center">(Central) moments (mean, power, variance, etc.) can be computed from:</div></p>
        <List icon="fa-angle-double-right">
          <div>The signal</div>
          <div>The signal's PDF</div>
        </List>
          <aside className="notes">
          <p>This is most important thing to take away</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <h4>Central Moments Summary</h4>
        <div className="row smaller heading">
          <div className="col-10 center">
            Order
          </div>
          <div className="col-10 center">
            Name
          </div>
          <div className="col-40 center">
            Time (Continuous)
          </div>
          <div className="col-40 center">
            PDF (Continuous)
          </div>
        </div>
        <div className="row smaller oddRow">
          <div className="col-10 center">
            <MathComponent tex={String.raw`1`} display={false}/>
          </div>
          <div className="col-10 center">
            <MathComponent tex={String.raw`\mu_X`} display={false}/>
          </div>
          <div className="col-40 center">
            <MathComponent tex={String.raw`\frac{1}{T}\int\limits_{-T/2}^{T/2} x(t)dt`} display={false}/>
          </div>
          <div className="col-40 center">
            <MathComponent tex={String.raw`\int\limits_{-\infty}^{\infty}{xp_X(x)dx}`} display={false}/>
          </div>
        </div>
        <div className="row smaller evenRow">
          <div className="col-10 center">
            <MathComponent tex={String.raw`2`} display={false}/>
          </div>
          <div className="col-10 center">
            <MathComponent tex={String.raw`\sigma_X^2`} display={false}/>
          </div>
          <div className="col-40 center">
            <MathComponent tex={String.raw`\frac{1}{T}\int\limits_{-T/2}^{T/2}(x(t)-\mu_X)^2dt`} display={false}/>
          </div>
          <div className="col-40 center">
            <MathComponent tex={String.raw`\int\limits_{-\infty}^{\infty}{xp_X(x)dx}`} display={false}/>
          </div>
        </div>
        <br/>
        <div className="row smaller heading">
          <div className="col-10 center">
            Order
          </div>
          <div className="col-10 center">
            Name
          </div>
          <div className="col-40 center">
            Time (Discrete)
          </div>
          <div className="col-40 center">
            PDF (Discrete)
          </div>
        </div>
        <div className="row smaller oddRow">
          <div className="col-10 center">
            <MathComponent tex={String.raw`1`} display={false}/>
          </div>
          <div className="col-10 center">
            <MathComponent tex={String.raw`\mu_X`} display={false}/>
          </div>
          <div className="col-40 center">
            <MathComponent tex={String.raw`\frac{1}{N}\sum\limits_{i=0}^{N} x(i)`} display={false}/>
          </div>
          <div className="col-40 center">
            <MathComponent tex={String.raw`\sum\limits_{\forall x} x p(x)`} display={false}/>
          </div>
        </div>
        <div className="row smaller evenRow">
          <div className="col-10 center">
            <MathComponent tex={String.raw`2`} display={false}/>
          </div>
          <div className="col-10 center">
            <MathComponent tex={String.raw`\sigma_X^2`} display={false}/>
          </div>
          <div className="col-40 center">
            <MathComponent tex={String.raw`\frac{1}{N}\sum\limits_{i=0}^{N} (x(i)-\mu_X)^2`} display={false}/>
          </div>
          <div className="col-40 center">
            <MathComponent tex={String.raw`\sum\limits_{\forall x} (x-\mu_X)^2p(x)`} display={false}/>
          </div>
        </div>
        <p>Standard deviation <MathComponent tex={String.raw`\sigma_X = \sqrt{\sigma_X^2}`} display={false}/></p>
          <aside className="notes">
          <p>Why are PDF features important?</p>
          <p>Always a reduction of information content - for example for saw vs uniform - not a complete description</p>
          <p>Standard deviation is comparible to amplitude</p>
         </aside>
      </Section>
    ), () => (
      <Section>
        <h3>Summary</h3>
        <div className="normal">
        <List icon="fa-angle-double-right">
        <div>PDF can tell us many important details about a signal</div>
        <div>Statistical measures can be used to describe signal properties</div>
        <div>Statistical measures can be derived from both the time domain signal and it's PDF</div>
        <div>Often-used measures are:</div>
        </List>
          <div className="center">
            <p>Mean and Median</p>
            <p>Variance and Standard Deviation</p>
            <p>Higher Order moments less frequently (Skewness, Kurtosis)</p>
            <p>Other PDF descriptions possible (quartile-distances, etc)</p>
          </div>
        </div>
        <aside className="notes">
          <p>When we do signal analysis, we want to work with extracted features</p>
          <p>We work with less information</p>
          <p>These give us basic signal properties</p>
         </aside>
      </Section>
    )
  ]

Presentation(slides, module.id)

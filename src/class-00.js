import React, { Component } from 'react';
import Section from 'lib/component/Section';

import Counter from './example/component/Counter';
import SineWave from './example/component/SineWave';
import Table from './example/component/Table';
import Schedule from './example/component/Schedule';
import MyPieChart from './example/component/MyPieChart';

import { MathComponent } from 'mathjax-react'
import Fragment from 'lib/component/Fragment';


export default function Class00() {
  return [
    () => (
      <Section className="title-slide">
        <div className="center framed bordered font-passionone col-80 border-3x bg-warning-alpha-08">
          <div className="massive left title-heading">Digital Signal Processing for Music</div>
          <div className="right">Part 0: Meta</div>
        </div>
        <br/>
        <div className="center">Andrew Beck</div>
      </Section>
    ), () => (
      <Section>
        <Table leftSize={25}>
          <div>
            <div className="heading">Contact Info</div>
            <div className="small">Andrew Beck</div>
          </div>
          <Table leftSize={25} bordered={true} tableClass="small">
            <div>Email:</div>
            <a href="mailto:andrew@elasticaud.io">mailto:andrew@elasticaud.io</a>
            <div>WWW</div>
            <div>
              <p>https://abeck.io/</p>
              <p>https://www.elasticaudio.com/</p>
            </div>
            <div>Office Hours</div>
                <div>
                  <b>By Appointment</b> @
                  <a href="https://calendly.com/binarybeck/office-hours">https://calendly.com/binarybeck/office-hours</a>
                  </div>
                </Table>
              </Table>
              <Fragment>
                <Table leftSize={25}>
                  <br/><br/>
                  <div className="heading">Class Info</div>
                  <div className="framed bordered">
                    <ul className="small">
                      <li>Completely asynchronous for maximum flexibility!</li>
                      <li>M 3:30-4:45pm virtual group office hours</li>
                      <li>W 3:30-4:45pm optional in-person in WV175</li>
                    </ul>
                  </div>
                </Table>
                <br/>
              </Fragment>
              <Fragment>
                <Table leftSize={25}>
                  <div className="normal heading">Resources</div>
                  <div className="small">Canvas is the main hub</div>
                </Table>
              </Fragment>
            </Section>
            ),
            `
## Class Goals
1. Ability to comprehend typical representations of digital systems such as block diagrams and difference equations,
2. understanding of typical transforms in DSP such as the Fourier transform or the Z-transform,
3. ability to use this understanding to design audio processing systems such as audio effects, and
4. ability to implement such design in a programming language such as Python.
            `,`
## Class Requirements
- Math
- Rudimentary programming skills, familiarity with Python
            `,() => (
            <Section>
              <Schedule sizes={[10, 35, 15, 25, 15]}
                        tableClass="smallest"
                        firstRowClass="heading"
                        evenRowClass="evenRow"
                        oddRowClass="oddRow"
                        items={[
                          ["Date", "Topics", "Exercise", "Assignment", "Notes"],
                          ["01/18", "Introduction, signals, periodicity, random processes, pdf, expectation values/moments, correlation", "Correlation", "Git Setup", "MLK Holiday"],
                          ["01/25", "Convolution, power spectral density", "FIR Filter", "Filter & Convolution", ""],
                          ["02/01", "Fourier series & Fourier transform", "DFT", "Fourier Analysis", ""],
                          ["02/08", "Sampling, quantization, SNR, number formats", "Quantization", "", ""],
                          ["02/15", "Oversampling, dither, noise-shaping, non-linear quantization", "", "Dither, ns", ""],
                          ["02/22", "Z-Tranform, digital audio filters, FIR/IIR, FFT filtering", "Biquad Filter", "Midterm I"],
                          ["03/01", "Sample Rate Conversion, Real-time systems", "Resampling", "", ""],
                          ["03/08", "Delay-based FX and reverb", "Virbrato", "Mod. FX", ""],
                          ["03/15", "Dynamics Processing", "PPM", "Limiter", ""],
                          ["03/22", "Time-Segment Processing (OLA)", "OLA", "", "No Class Wednesday"],
                          ["03/29", "Phase-Vocoder", "", "Phase-Vocoder", ""],
                          ["04/05", "Source Coding: LPC, ADPCM, Huffman, AAC", "", "", "Midterm II"],
                          ["04/12", "Design and Application", "", "", ""],
                          ["04/19", "Denoising", "", "", ""],
                          ["04/26", "Final Project Presentations", "", "", ""],
                        ]}/>
            </Section>
            ),() => (
            <Section>
              <h2>Recommended Reading</h2>
              <Table leftSize={30} tableClass="small">
                <div>Mathematical Context</div>
                <div><a href="https://library.gatech.edu/">Zölzer, Udo (2008) <i>Digital Audio Signal Processing</i>, Wiley</a></div>
                <br></br><br></br>
                <div>DSP Overview</div>
                <div><a href="https://dspguide.com/">Smith, Steven W. (1997)
                       <i>The Scientist and Engineer's Guide to Digital Signal Processing</i>, CA Tech. Pub
                         </a>
                         </div>
                                               <br></br><br></br>
                                               <div>Implementation</div>
                                               <div><a href="https://library.gatech.edu/">Pirkle, Will (2012) <i>Designing Audio Effect Plug-Ins in C++: With Digital Audio Signal Processing Theory</i>, Focal Press</a></div>
                                               <br/><br/>
                                               <div>Architecture & Creative Context</div>
                                               <div><a href="https://library.gatech.edu/">Roads, Curtis (1996) <i>The Computer Music Tutorial</i>, MIT Press</a></div>
                                               </Table>
                                               </Section>
                                               ),
                                               () => (
                                               <Section>
                                                 <h2>Assessment</h2>
                                                 <MyPieChart/>
                                               </Section>
                                               ),`
# Next Steps
1. Install Python3 --- _Dependencies: SciPy, NumPy and PyPlot_
2. Create a public git repo (on Github or your preferred host) --- __It is your responsibility to make sure we can access it before any deadlines__
3. Buckle up
`
  ]
}

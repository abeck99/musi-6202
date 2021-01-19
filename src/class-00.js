import React, { Component } from 'react';
import Section from 'lib/component/Section';

import Counter from './example/component/Counter';
import { MathComponent } from 'mathjax-react'

export default function Class00() {
  return [
    `
# Reveal.js + React.js
    `,
    `
## Hello There

reveal.js enables you to create beautiful interactive slide decks using HTML. hmmm This presentation will show you examples of what it can do.
    `,
    () => {return (
    <Section>
      <h2>your presentations are interactive</h2>
      <div>
        <Counter />
      </div>
    </Section>
    )},
    () => {return (
      <Section>
        <h2>Here's something!</h2>
      <MathComponent tex={String.raw`\int_0^1 x^2\ dx`} />
      </Section>
    )},
    String.raw`
## Test 2

$\texapply[class=success, index=2]{s}= \frac{\texclass[class=info]{\alpha_0}}{\texapply[class=success, index=2]{4}} + \sqrt{\texapply[class=bg-danger, index=1]{\frac{\sum(x_{i}-\bar{x})^2}{n-1}}} - 
     \int_{a}^{b} \texapply[class=bg-warning, index=1]{x^2} \texfragment[index=0]{dx}$
    `,`
## Take a Moment

Press *B* or *.* on your keyboard to pause the presentation. This is helpful when you're on stage and want to take distracting slides off the screen.
`
    ]
}

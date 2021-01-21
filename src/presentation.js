import React from 'react';
import ReactDOM from "react-dom";
import naturalSort from 'javascript-natural-sort';

import Deck from 'lib/component/Deck';
import buildFileTree, { mapTree } from 'lib/helper/fileTree';

import 'lib/css/main.scss';
import options from './options';

import marked from 'marked';

const allPresentationContexts = {
  'index': require('./index'),
  'class-00': require('./class-00'),
  'class-00-pdf': require('./class-00'),
  'class-01': require('./class-01'),
  'class-01-pdf': require('./class-01'),
  'class-02': require('./class-02'),
  'class-02-pdf': require('./class-02'),
}

function getSlides() {
  // regex info: matches js & md files two folders deep
  const jsName = document.getElementById('reveal').attributes.jsName.value;
  const context = allPresentationContexts[jsName];
  const isPdf = jsName.endsWith("-pdf")

  const slides = context.default(isPdf).reduce((filtered, inSlide) => {
    var slide = inSlide
    if (typeof(inSlide) == 'string') {
      slide = {__html: marked(inSlide)}
    } else if (typeof(inSlide == 'object') && inSlide.target != undefined) {
      if (inSlide.target == 'pdf' && !isPdf) {
        return filtered
      }
      slide = inSlide.slide
    }

    filtered.push(slide)
    return filtered
  }, [])

  return [context, slides];
}

function renderSlideDeck(slides) {
  ReactDOM.render(<Deck slides={slides} options={options}/>, document.getElementById('reveal'));
}

let [context, slides] = getSlides();

renderSlideDeck(slides);

if (module.hot) {
  module.hot.accept(context.id, function () {
    [context, slides] = getSlides();

    // render slide deck
    renderSlideDeck(slides);

    // refresh reveal.js
    const state = global.Reveal.getState();
    global.Reveal.sync();
    global.Reveal.setState(state);
  })
}

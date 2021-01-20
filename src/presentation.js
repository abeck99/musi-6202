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
  'class-01': require('./class-01'),
  'class-02': require('./class-02'),
}

function getSlides() {
  // regex info: matches js & md files two folders deep
  const jsName = document.getElementById('reveal').attributes.jsName.value;
  const context = allPresentationContexts[jsName];
  const slides = context.default().map(slide => {
    if (typeof(slide) == 'string') {
      return {__html: marked(slide)};
    }
    return slide;
  });

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

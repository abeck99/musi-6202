import React from 'react';
import ReactDOM from "react-dom";
import naturalSort from 'javascript-natural-sort';

import Deck from 'lib/component/Deck';
import buildFileTree, { mapTree } from 'lib/helper/fileTree';

import './style/presentation.scss';
import options from './options';

import marked from 'marked';

function getSlides() {
  // regex info: matches js & md files two folders deep
  const context = require("./class-00");
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

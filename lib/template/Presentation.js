import React from 'react'
import ReactDOM from "react-dom"
import naturalSort from 'javascript-natural-sort'

import Deck from 'lib/component/Deck'
import buildFileTree, { mapTree } from 'lib/helper/fileTree'

import 'lib/css/main.scss'
import options from '../../src/options'

import marked from 'marked'

function renderSlideDeck(slides) {
  ReactDOM.render(<Deck slides={slides} options={options}/>, document.getElementById('reveal'))
}

export default function Presentation(inSlides, moduleId) {
  const jsName = document.getElementById('reveal').attributes.jsName.value;
  const isPdf = jsName.endsWith("-pdf")
  
  const slides = inSlides.reduce((filtered, inSlide) => {
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

  renderSlideDeck(slides);

  if (module.hot) {
    module.hot.accept(moduleId, function () {
      [context, slides] = getSlides()
  
      // render slide deck
      renderSlideDeck(slides)
  
      // refresh reveal.js
      const state = global.Reveal.getState()
      global.Reveal.sync()
      global.Reveal.setState(state)
    })
  }
}

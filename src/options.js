// plugins
// Note: reveal.js plugins returns always file urls
import 'lib/helper/reveal-dependencies-config.js' // need config before importing plugins
import 'lib/helper/reveal-dependencies.js'
import 'lib/helper/reveal-config.js';

// if Font Awesome backend is css and local, then compile necessary .scss files
if (FA_CSS_LOCAL) {
	require('stylesPath/_font-awesome-imports.scss')
}

export default {
  controls: true,
  progress: true,
  history: true,
  center: true,
  transition: 'slide', // none/fade/slide/convex/concave/zoom
  slideNumber: 'h.v',
}

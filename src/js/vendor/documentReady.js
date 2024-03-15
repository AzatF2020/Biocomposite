import Swup from 'swup';
import SwupPreloadPlugin from '@swup/preload-plugin';
import smoothScrolling from "./smoothScroll"
import initSplitText from './initSplitText';

export default (fn, loaderFn) => {
  const swup = new Swup({
    containers: ['#swup'],
    plugins: [new SwupPreloadPlugin()]
  });

  function enableScriptsOnReady() {
    smoothScrolling()
    fn()
    loaderFn()
  }

  function updateScriptsHandler() {
    fn()
    window.scrollTo(0, 0)
  }

  if (document.readyState === 'complete') {
    enableScriptsOnReady()
  } else {
    document.addEventListener('DOMContentLoaded', enableScriptsOnReady);
  }


  swup.hooks.on('page:view', () => {
    initSplitText()
    initFirstAnimation()
    updateScriptsHandler()
  })
}    
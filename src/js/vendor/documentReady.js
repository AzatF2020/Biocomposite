import Swup from 'swup';
import SwupPreloadPlugin from '@swup/preload-plugin';
import smoothScrolling from "./smoothScroll"
import initSplitText from './initSplitText';
import validation from "./validation";

export default (fn, loaderFn) => {
  const swup = new Swup({
    containers: ['#swup'],
    plugins: [new SwupPreloadPlugin()]
  });

  function enableScriptsOnReady() {
    smoothScrolling()
    fn()
    loaderFn()
    validation()
  }

  function updateScriptsHandler() {
    fn()
    validation()
    initSplitText()
    window.scrollTo(0, 0)
  }

  if (document.readyState === 'complete') {
    enableScriptsOnReady()
  } else {
    document.addEventListener('DOMContentLoaded', enableScriptsOnReady);
  }

  swup.hooks.on('page:view', () => {
    updateScriptsHandler()
  })
}    
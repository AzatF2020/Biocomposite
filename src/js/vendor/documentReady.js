import Swup from 'swup';
import SwupPreloadPlugin from '@swup/preload-plugin';
import initFirstAnimation from '../modules/initFirstAnimation';
import smoothScrolling from "./smoothScroll"

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
    initFirstAnimation()
    updateScriptsHandler()
  })
}    
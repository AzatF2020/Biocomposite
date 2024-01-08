import 'swiper/css';
import "./vendor/lazyload"

import smoothScrolling from "./vendor/smoothScroll";
import connectMap from "./vendor/mapInit";
import initLoader from "./modules/loader";
import initDetailProductSlots from "./modules/getInfoDetailProduct";
import scrollingIncrease from "./modules/scrollingIncrease";
import initHorizontalScrollingSlider from "./modules/horizontalScrolling";
import occurrenceCardsDecision from "./modules/occurrenceCardsDecision";
import enableParallax from "./vendor/enableParallax";
import Slider from "./vendor/slider";

document.addEventListener("DOMContentLoaded", () => {
  window.biocompositeApi = {}

  smoothScrolling()
  connectMap()

  initLoader()
  initDetailProductSlots()
  scrollingIncrease()
  initHorizontalScrollingSlider()
  occurrenceCardsDecision()
  enableParallax()

  const sliderInstance = new Slider()
  sliderInstance.initializeSliders()
});
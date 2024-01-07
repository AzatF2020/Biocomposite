import 'swiper/css';
import "./vendor/lazyload"

import smoothScrolling from "./vendor/smoothScroll";
import connectMap from "./vendor/mapInit";
import initSlider from "./vendor/slider";
import initLoader from "./modules/loader";
import initDetailProductSlots from "./modules/getInfoDetailProduct";
import scrollingIncrease from "./modules/scrollingIncrease";
import initHorizontalScrollingSlider from "./modules/horizontalScrolling";
import occurrenceCardsDecision from "./modules/occurrenceCardsDecision";

document.addEventListener("DOMContentLoaded", () => {
  window.biocompositeApi = {}

  smoothScrolling()
  initSlider()
  connectMap()

  initLoader()
  initDetailProductSlots()
  scrollingIncrease()
  initHorizontalScrollingSlider()
  occurrenceCardsDecision()
});
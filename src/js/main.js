import 'swiper/css';
import "./vendor/lazyload"

import smoothScrolling from "./vendor/smoothScroll";
import enableParallax from "./vendor/enableParallax";
import Slider from "./vendor/slider";
import connectMap from "./vendor/mapInit";

import initLoader from "./modules/loader";
import initDetailProductSlots from "./modules/getInfoDetailProduct";
import scrollingIncrease from "./modules/scrollingIncrease";
import initHorizontalScrollingSlider from "./modules/horizontalScrolling";
import occurrenceCardsDecision from "./modules/occurrenceCardsDecision";
import toggleVideoBlock from "./modules/multiVideoBlock";
import disclosureMultiVideoBlocks from "./modules/multiVideoBlockMobile";
import scrollSliderMobile from "./modules/scrollSliderMobile";

document.addEventListener("DOMContentLoaded", () => {
  window.biocompositeApi = {};

  initLoader();
  initDetailProductSlots();
  scrollingIncrease();
  initHorizontalScrollingSlider();
  occurrenceCardsDecision();
  toggleVideoBlock();

  smoothScrolling();
  enableParallax();
  disclosureMultiVideoBlocks();
  scrollSliderMobile()

  connectMap();
  const sliderInstance = new Slider();
  sliderInstance.initializeSliders();
});
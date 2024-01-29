import $ from "jquery";

import 'swiper/css';
import "./vendor/lazyload";
import "./vendor/lazysized.unveilhooks";
import "./vendor/libs/hystmodal.min.css";
import "./vendor/libs/hystmodal.min.js";

import smoothScrolling from "./vendor/smoothScroll";
import enableParallax from "./vendor/enableParallax";
import Slider from "./vendor/slider";
import modals from "./vendor/modals";
import connectMap from "./vendor/mapInit";
import validation from "./vendor/validation";

import initLoader from "./modules/loader";
import initDetailProductSlots from "./modules/getInfoDetailProduct";
import scrollingIncrease from "./modules/scrollingIncrease";
import initHorizontalScrollingSlider from "./modules/horizontalScrolling";
import occurrenceCardsDecision from "./modules/occurrenceCardsDecision";
import toggleVideoBlock from "./modules/multiVideoBlock";
import disclosureMultiVideoBlocks from "./modules/multiVideoBlockMobile";
import scrollSliderMobile from "./modules/scrollSliderMobile";
import controlVideoScrolling from "./modules/controlVideoScrolling";

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
  controlVideoScrolling()

  connectMap();
  modals()
  validation()
  const sliderInstance = new Slider();
  sliderInstance.initializeSliders();
});

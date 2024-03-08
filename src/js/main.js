
import 'swiper/css';
import "./vendor/lazyload";
import "./vendor/lazysized.unveilhooks";
import "./vendor/libs/hystmodal.min.css";
import "./vendor/libs/hystmodal.min.js";

import smoothScrolling from "./vendor/smoothScroll";
import enableParallax from "./vendor/enableParallax";
import Slider from "./vendor/slider";
import modals from "./vendor/modals";
import validation from "./vendor/validation";
import initLoader from './modules/loader.js';

import initDetailProductSlots from "./modules/getInfoDetailProduct";
import scrollingIncrease from "./modules/scrollingIncrease";
import initHorizontalScrollingSlider from "./modules/horizontalScrolling";
import occurrenceCardsDecision from "./modules/occurrenceCardsDecision";
import toggleVideoBlock from "./modules/multiVideoBlock";
import disclosureMultiVideoBlocks from "./modules/multiVideoBlockMobile";
import scrollSliderMobile from "./modules/scrollSliderMobile";
import controlVideoScrolling from "./modules/controlVideoScrolling";
import documentReady from './vendor/documentReady.js';

const runScripts = () => {
  window.biocompositeApi = {};
  
  controlVideoScrolling()
  const sliderInstance = new Slider();
  sliderInstance.initializeSliders();

  initDetailProductSlots();
  scrollingIncrease();
  initHorizontalScrollingSlider();
  occurrenceCardsDecision();
  toggleVideoBlock();

  smoothScrolling();
  enableParallax();
  disclosureMultiVideoBlocks();
  scrollSliderMobile()

  modals()
  validation()
};

documentReady(runScripts, initLoader)




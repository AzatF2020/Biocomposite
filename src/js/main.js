
import 'swiper/css';
import "./vendor/libs/Lazyload/lazyload.js";
import "./vendor/libs/HystModal/hystmodal.min.css";
import "./vendor/libs/HystModal/hystmodal.min.js";

import documentReady from './vendor/documentReady.js';
import enableParallax from "./vendor/enableParallax";
import Slider from "./vendor/slider";
import modals from "./vendor/modals";
import validation from "./vendor/validation";

import initBurgerModalAnimation from './modules/burgerModalAnimation.js';
import initLoader from './modules/loader.js';
import initDetailProductSlots from "./modules/getInfoDetailProduct";
import scrollingIncrease from "./modules/scrollingIncrease";
import initHorizontalScrollingSlider from "./modules/horizontalScrolling";
import occurrenceCardsDecision from "./modules/occurrenceCardsDecision";
import toggleVideoBlock from "./modules/multiVideoBlock";
import disclosureMultiVideoBlocks from "./modules/multiVideoBlockMobile";
import scrollSliderMobile from "./modules/scrollSliderMobile";
import controlVideoScrolling from "./modules/controlVideoScrolling";
import setBubblesToClients from './modules/clientsBubbles.js';
import enableReveal from './modules/revealBlocks.js';
import scrollingToBlock from './modules/scrollAnchor.js';
import scrollingToBottom from './modules/scrollToBottom.js';
import connectMap from './vendor/mapInit.js';

const runScripts = () => {
  window.biocompositeApi = {
    modal: null,
    menu: {
      openMenu: null,
      closeMenu: null,
    }
  };

  modals()
  validation()
  const sliderInstance = new Slider();
  sliderInstance.initializeSliders();
  
  initBurgerModalAnimation()
  setBubblesToClients()
  controlVideoScrolling()
  initDetailProductSlots();
  scrollingIncrease();
  initHorizontalScrollingSlider();
  occurrenceCardsDecision();
  toggleVideoBlock();
  scrollingToBlock()
  scrollingToBottom()

  enableParallax();
  enableReveal()
  disclosureMultiVideoBlocks();
  scrollSliderMobile()
  connectMap()
};

documentReady(runScripts, initLoader)




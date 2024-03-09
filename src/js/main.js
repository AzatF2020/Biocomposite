
import 'swiper/css';
import "./vendor/lazyload";
import "./vendor/lazysized.unveilhooks";
import "./vendor/libs/hystmodal.min.css";
import "./vendor/libs/hystmodal.min.js";

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

  enableParallax();
  disclosureMultiVideoBlocks();
  scrollSliderMobile()
};

documentReady(runScripts, initLoader)




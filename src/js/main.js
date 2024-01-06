import 'swiper/css';
import "./vendor/lazyload"

import smoothScrolling from "./vendor/smoothScroll";
import connectMap from "./vendor/mapInit";
import initSlider from "./modules/slider";
import initLoader from "./modules/loader";
import initDetailProductSlots from "./modules/getInfoDetailProduct";
import scrollingIncrease from "./modules/scrollingIncrease";
import initHorizontalScrollingSlider from "./modules/horizontalScrolling";

document.addEventListener("DOMContentLoaded", () => {
  window.biocompositeApi = {}
  initLoader()
  
  smoothScrolling()
  initSlider()
  connectMap()
  
  initDetailProductSlots()
  scrollingIncrease()
  initHorizontalScrollingSlider()
});
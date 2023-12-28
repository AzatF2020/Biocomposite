import 'swiper/css';
import "./vendor/lazyload"

import smoothScrolling from "./vendor/smoothScroll";
import connectMap from "./modules/mapInit";
import initSlider from "./modules/slider";
import initLoader from "./modules/loader";
import initDetailProductSlots from "./modules/getInfoDetailProduct";
import scrollingIncrease from "./modules/scrollingIncrease";

document.addEventListener("DOMContentLoaded", () => {
  window.biocompositeApi = {}
  initLoader()
  
  smoothScrolling()
  initSlider()
  connectMap()
  
  initDetailProductSlots()
  scrollingIncrease()
});
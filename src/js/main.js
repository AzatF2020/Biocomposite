import 'swiper/css';
import "./vendor/lazyload"

import smoothScrolling from "./vendor/smoothScroll";
import connectMap from "./modules/mapInit";
import initSlider from "./modules/slider";
import initLoader from "./modules/loader";

document.addEventListener("DOMContentLoaded", () => {
  window.biocompositeApi = {}
  initLoader()
  
  smoothScrolling()
  initSlider()
  connectMap()
  
});
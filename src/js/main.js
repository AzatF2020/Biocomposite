import 'swiper/css';
import "./vendor/lazyload"
import smoothScrolling from "./vendor/smoothScroll";
import connectMap from "./modules/mapInit";
import initSlider from "./modules/slider";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling()
  
  initSlider()
  connectMap()
});

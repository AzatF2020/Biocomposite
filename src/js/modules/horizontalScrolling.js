import gsap from "gsap";
import Swiper from "swiper";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Parallax } from "swiper/modules"

Swiper.use([Parallax])
gsap.registerPlugin(ScrollTrigger)

export default function initHorizontalScrollingSlider() {
  const slidersTrigger = document.querySelectorAll(".js-scroll-slider-trigger")
  
  function initSlider(currentSlide) {
    return new Swiper(currentSlide, {
      spaceBetween: 200,
      parallax: true,
      speed: 1000,
      slidesPerView: 1,
      allowTouchMove: false,
    })
  }
  
  if(!slidersTrigger.length) return
  
  function initScrollingHorizontalSlide(sliderContainer, slides, currentSlider) {
    const tl = gsap.timeline({ })
    
    const sliderInstance = initSlider(currentSlider)
    const scrollSliderHeight = window.innerHeight * 1.5 * slides.length
    
    tl.to(slides, {
      ease: "none",
      zIndex: -1,
      scrollTrigger: {
        trigger: sliderContainer,
        start: "top 15% center",
        end: () => `+=${scrollSliderHeight} top`,
        scrub: 1,
        pin: true,
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const slidesCount = slides.length;
          const slideToSelect = Math.ceil(progress * slidesCount) - 1;
          
          sliderInstance?.slideTo(slideToSelect)
        }
      },
    })
  }
  
  slidersTrigger.forEach((sliderContainer) => {
    const currentSlider = sliderContainer.querySelector(".js-scroll-slider")
    const slides = sliderContainer.querySelectorAll(".js-slide")
    
    initScrollingHorizontalSlide(sliderContainer, slides, currentSlider)
  })
}
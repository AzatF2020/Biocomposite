import Swiper from "swiper";
import { Navigation, Parallax } from "swiper/modules"

Swiper.use([Navigation, Parallax])

export default function initSlider() {
  const sliders = document.querySelectorAll(".js-init-slider");
  
  const sliderBreakpointsOptions = (sliderPerView) => ({
    1200: {
      slidesPerView: sliderPerView,
    },
    769: {
      spaceBetween: 10,
    },
    320: {
      spaceBetween: 8,
    }
  })
  
  function swiperInit(slider, options) {
    
    new Swiper(slider, {
      parallax: true,
      speed: 800,
      breakpoints: sliderBreakpointsOptions(options?.slidesPerView),
      navigation: {
        prevEl: options?.prevButton,
        nextEl: options?.nextButton,
      }
    })
  }
  
  function prepareSwiperSettings(slider) {
    if(!slider) return
    
    const slidesPerView = slider?.dataset.perview || 3
    const limitSliders = slider?.dataset.navigationlimit || 3
    const totalSliders = slider?.querySelector(".swiper-wrapper")?.children.length
    const currentSliderNavigation =
      slider?.previousElementSibling.classList.contains("js-navigation")
        ? slider?.previousElementSibling
        : slider.querySelector(".js-navigation")
    
    const prevButton = currentSliderNavigation?.querySelector(".js-prev") || null
    const nextButton = currentSliderNavigation?.querySelector(".js-next") || null
    
    if(totalSliders <= limitSliders) {
      swiperInit(slider, { slidesPerView })
      currentSliderNavigation?.remove()
    } else {
      swiperInit(slider, { prevButton, nextButton, slidesPerView })
    }
  }
  
  sliders?.forEach((slider) => prepareSwiperSettings(slider))
}
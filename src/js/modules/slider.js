import Swiper from "swiper";
import 'swiper/css';
import { Navigation, Parallax } from "swiper/modules"

Swiper.use([Navigation, Parallax])

export default function initSlider() {
  const sliders = document.querySelectorAll(".js-slider");
  
  const sliderBreakpointsOptions = {
    1150: {
      slidesPerView: 3,
    },
    1149: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    769: {
      spaceBetween: 10,
      slidesPerView: "auto",
    },
    320: {
      spaceBetween: 8,
      slidesPerView: "auto",
    }
  }
  
  function swiperInit(slider, options) {
    new Swiper(slider, {
      parallax: true,
      speed: 1150,
      breakpoints: sliderBreakpointsOptions,
      navigation: {
        prevEl: options?.prevButton,
        nextEl: options?.nextButton,
      }
    })
  }
  
  function prepareSwiperSettings(slider) {
    if(!slider) return
    
    const totalSliders = slider?.querySelector(".swiper-wrapper")?.children.length
    const currentSliderNavigation =
      slider?.previousElementSibling.classList.contains("js-navigation")
        ? slider?.previousElementSibling
        : slider.querySelector(".js-navigation")
    
    const prevButton = currentSliderNavigation?.querySelector(".js-prev") || null
    const nextButton = currentSliderNavigation?.querySelector(".js-next") || null
    
    if(totalSliders <= 3) {
      swiperInit(slider, null)
      currentSliderNavigation?.remove()
    } else {
      swiperInit(slider, { prevButton, nextButton })
    }
  }
  
  sliders?.forEach((slider) => prepareSwiperSettings(slider))
}
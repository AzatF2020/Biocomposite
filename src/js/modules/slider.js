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
      slidesPerView: "auto",
      spaceBetween: 10,
    },
    320: {
      slidesPerView: "auto",
      spaceBetween: 8,
    }
  })
  
  function initMobileOptions(options) {
    if(window.matchMedia("(max-width: 768px)").matches) {
      return options
    }
  }
  
  function swiperInit(slider, options) {
    new Swiper(slider, {
      parallax: true,
      watchOverflow: true,
      loop: initMobileOptions(options)?.loopMobile,
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

    const loopMobile = Boolean(slider?.dataset.mobileloop)
    const slidesPerView = Number(slider?.dataset.perview) || 3
    
    const totalSliders = slider?.querySelector(".swiper-wrapper")?.children.length
    const currentSliderNavigation =
      slider?.previousElementSibling.classList.contains("js-navigation")
        ? slider?.previousElementSibling
        : slider.querySelector(".js-navigation")
    
    const prevButton = currentSliderNavigation?.querySelector(".js-prev") || null
    const nextButton = currentSliderNavigation?.querySelector(".js-next") || null
    
    if(totalSliders <= slidesPerView) {
      swiperInit(slider, { slidesPerView, loopMobile })
      currentSliderNavigation?.remove()
    } else {
      swiperInit(slider, { prevButton, nextButton, slidesPerView, loopMobile })
    }
  }
  
  sliders?.forEach((slider) => prepareSwiperSettings(slider))
}
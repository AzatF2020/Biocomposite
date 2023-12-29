import Swiper from "swiper";
import { Navigation, Parallax, EffectFade } from "swiper/modules"

Swiper.use([Navigation, Parallax, EffectFade])

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
      fadeEffect: options?.fadeEffect ? { crossFade: true } : null,
      watchOverflow: true,
      effect: options?.fadeEffect ? "fade" : null,
      loop: initMobileOptions(options)?.loopMobile,
      speed: options?.speed || 1000,
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
    const fadeEffect = Boolean(slider?.dataset.fadeeffect)
    const isMobileSlider = Boolean(slider?.dataset.sliderMobile)
    const slidesPerView = Number(slider?.dataset.perview) || 3
    const speed = Number(slider?.dataset.speed)
    
    const totalSliders = slider?.querySelector(".swiper-wrapper")?.children.length
    const currentSliderNavigation =
      slider?.previousElementSibling.classList.contains("js-navigation")
        ? slider?.previousElementSibling
        : slider.querySelector(".js-navigation")
    
    const prevButton = currentSliderNavigation?.querySelector(".js-prev") || null
    const nextButton = currentSliderNavigation?.querySelector(".js-next") || null
    
    if(isMobileSlider && window.matchMedia("(max-width: 768px)").matches) {
      if(totalSliders <= slidesPerView) {
        swiperInit(slider, {
          slidesPerView,
          loopMobile,
          fadeEffect,
          speed
        })
        currentSliderNavigation?.remove()
      } else {
        swiperInit(slider, {
          prevButton,
          nextButton,
          slidesPerView,
          loopMobile,
          fadeEffect,
          speed
        })
      }
      return
    }
    
    if(totalSliders <= slidesPerView) {
      swiperInit(slider, {
        slidesPerView,
        loopMobile,
        fadeEffect,
        speed
      })
      currentSliderNavigation?.remove()
    } else {
      swiperInit(slider, {
        prevButton,
        nextButton,
        slidesPerView,
        loopMobile,
        fadeEffect,
        speed
      })
    }
  }
  
  sliders?.forEach((slider) => prepareSwiperSettings(slider))
}
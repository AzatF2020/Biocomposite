import Swiper from "swiper";
import {Parallax, Controller} from "swiper/modules";

Swiper.use([Parallax, Controller])

export default function scrollSliderMobile() {
  const scrollSliderSections = document.querySelectorAll(".js-scroll-slider-trigger")

  if(!scrollSliderSections.length || window.matchMedia("(min-width: 1200px)").matches) return

  function initNavigationSwiper(navigationBarSlider) {
    return new Swiper(navigationBarSlider, {
      slidesPerView: "auto",
      slideToClickedSlide: true,
      spaceBetween: 10,
      parallax: true,
      speed: 1100,
    })
  }

  function initScrollSwiper(scrollSlider) {
    return new Swiper(scrollSlider, {
      slidesPerView: "auto",
      slideToClickedSlide: true,
      spaceBetween: 100,
      parallax: true,
      speed: 1100,
    })
  }

  function initSlider(navigationBarSlider, scrollSlider) {
    if(!navigationBarSlider || !scrollSlider) return

    const navigationInstance = initNavigationSwiper(navigationBarSlider)
    const scrollSwiperInstance = initScrollSwiper(scrollSlider)

    navigationInstance.on("slideChange", (value) => {
      console.log(value)
    })

    navigationInstance.controller.control = scrollSwiperInstance
    scrollSwiperInstance.controller.control = navigationInstance
  }

  scrollSliderSections?.forEach((section) => {
    const navigationBarSlider = section.querySelector(".js-navigation-bar")
    const scrollSlider = section.querySelector(".js-scroll-slider-mobile")

    initSlider(navigationBarSlider, scrollSlider)
  })
}
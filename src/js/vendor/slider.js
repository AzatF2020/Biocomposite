import Swiper from "swiper";
import gsap from "gsap";
import {Navigation, Parallax, EffectFade} from "swiper/modules"

Swiper.use([Navigation, Parallax, EffectFade])

class Slider {
  sliders;
  sliderBreakpointsOptions;

  constructor() {
    this.sliders = document.querySelectorAll(".js-init-slider");
    this.sliderBreakpointsOptions = (sliderPerView) => ({
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
  }

  #initTextAnimation(text, textWrapper, options) {
    const {slideIndex, activeIndex} = options

    textWrapper.forEach((item) => {
      item.style.overflow = 'hidden'
    })

    text.forEach((item, index) => {
      const tl = gsap.timeline({ease: "power3.out"})

      if (slideIndex === activeIndex) {
        tl
        .to(item, {
          yPercent: 0,
          delay: 1 * (index / 20),
          onComplete: () => {
            textWrapper.forEach((item) => {
              item.style.overflow = 'visible'
            })
          }
        })
      }
    })
  }

  #slideChangeConfig(swiperInstance, slider, options) {
    return () => {
      const currentSlider = swiperInstance
      const activeIndex = currentSlider.activeIndex || 0

      if (options?.enableTextAnimation) {
        const slides = slider.querySelectorAll(".swiper-slide")

        slides.forEach((slide, slideIndex) => {
          const textWrapper = slide.querySelectorAll('.text-wrapper')
          const text = slide.querySelectorAll(".text-wrapper *")
          gsap.set(text, { yPercent: 150 })

          this.#initTextAnimation(text, textWrapper, {slideIndex, activeIndex})
        })
      }
    }
  }

  #initMobileOptions(options) {
    if (window.matchMedia("(max-width: 768px)").matches) {
      return options
    }
  }

  #setVisibleTextWrapper(slider) {
    const slides = slider.querySelectorAll(".swiper-slide")

    slides.forEach((slide, slideIndex) => {
      const textWrapper = slide.querySelectorAll('.text-wrapper')
      textWrapper.forEach((item) => {
        item.style.overflow = 'visible'
      })
    })
  }

  #swiperInit(slider, options) {
    const {
      fadeEffect,
      speed,
      prevButton,
      nextButton,
      slidesPerView
    } = options

    const swiperInstance = new Swiper(slider, {
      parallax: true,
      fadeEffect: fadeEffect ? { crossFade: true } : null,
      watchOverflow: true,
      effect: fadeEffect ? "fade" : null,
      loop: this.#initMobileOptions(options)?.loopMobile,
      speed: speed || 1000,
      breakpoints: this.sliderBreakpointsOptions(slidesPerView),
      navigation: {
        prevEl: prevButton,
        nextEl: nextButton,
      },
    })

    this.#setVisibleTextWrapper(slider)
    swiperInstance.on('slideChange', this.#slideChangeConfig(swiperInstance, slider, options))
  }

  #prepareSwiperSettings(slider) {
    if (!slider) return

    const loopMobile = Boolean(slider?.dataset.mobileloop)
    const fadeEffect = Boolean(slider?.dataset.fadeEffect)
    const isMobileSlider = Boolean(slider?.dataset.sliderMobile)
    const slidesPerView = Number(slider?.dataset.perview) || 3
    const enableTextAnimation = Boolean(slider?.dataset.textAnimation)
    const speed = Number(slider?.dataset.speed)

    const totalSliders = slider?.querySelector(".swiper-wrapper")?.children.length
    const currentSliderNavigation =
      slider?.previousElementSibling?.classList.contains("js-navigation")
        ? slider?.previousElementSibling
        : slider.querySelector(".js-navigation")

    const prevButton = currentSliderNavigation?.querySelector(".js-prev") || null
    const nextButton = currentSliderNavigation?.querySelector(".js-next") || null

    if (isMobileSlider && window.matchMedia("(min-width: 768px)").matches) {
      return
    }
    if (totalSliders <= slidesPerView) {
      this.#swiperInit(slider, {
        slidesPerView,
        loopMobile,
        fadeEffect,
        speed,
        enableTextAnimation
      })
      currentSliderNavigation?.remove()
    } else {
      this.#swiperInit(slider, {
        prevButton,
        nextButton,
        slidesPerView,
        loopMobile,
        fadeEffect,
        speed,
        enableTextAnimation
      })
    }
  }

  initializeSliders() {
    return this.sliders.forEach((slider) => this.#prepareSwiperSettings(slider))
  }
}

export default Slider
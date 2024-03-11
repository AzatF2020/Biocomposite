import gsap from "gsap";
import Swiper from "swiper";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Parallax } from "swiper/modules"
import { delay } from "../vendor/constants";

Swiper.use([Parallax])
gsap.registerPlugin(ScrollTrigger)

export default function initHorizontalScrollingSlider() {
  const slidersTrigger = document.querySelectorAll(".js-scroll-slider-trigger")
  const slidersNavigation = document.querySelectorAll(".js-navigation-appearances")

  if(!slidersTrigger.length) return

  function initSlider(currentSlide) {
    return new Swiper(currentSlide, {
      spaceBetween: 700,
      parallax: true,
      speed: 1400,
      slidesPerView: 1,
      allowTouchMove: false,
    })
  }

  if (!slidersTrigger.length || window.matchMedia("(max-width: 1200px)").matches) return

  function setActiveCircleClass(circleBarElements, sliderInstance) {
    circleBarElements?.forEach((circle, circleIndex) => {
      if (!circle) return

      circle.classList.remove("scroll-slider__navigation-name--active")

      initAnimation(circle, {
        sliderIndex: sliderInstance?.activeIndex,
        circleIndex: circleIndex,
      })
    })

    function initAnimation(circle, options) {
      const {sliderIndex = 0, circleIndex = 0} = options

      if (sliderIndex === circleIndex) {
        circle.classList.add("scroll-slider__navigation-name--active")
      }
    }
  }

  function enableImagesClipPath(sliderImages, sliderInstance) {
    const sliderActiveIndex = sliderInstance?.activeIndex

    sliderImages.forEach((imageContainer, index) => {
      if (!imageContainer) return

      
      const images = [...imageContainer.querySelectorAll('img')]

      if (sliderActiveIndex === index) {
        images.forEach(async (image) => {
          await delay(150)
          image.classList.add("--active")
          image.style.clipPath = "inset(0 0 0 0)"
        })
      }
    })
  }

  function initScrollingHorizontalSlide(items) {
    const {
      sliderContainer,
      slides,
      currentSlider,
      circleBarElements,
      sliderImages
    } = items

    const tl = gsap.timeline({ease: "none"})

    const sliderInstance = initSlider(currentSlider)
    const scrollSliderHeight = window.innerHeight * 2.5 * slides.length

    tl.to(slides, {
      scrollTrigger: {
        trigger: sliderContainer,
        start: "top 15% center",
        end: () => `+=${scrollSliderHeight} top`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const slidesCount = slides.length;
          const slideToSelect = Math.ceil(progress * slidesCount) - 1;

          sliderInstance?.slideTo(slideToSelect)

          setActiveCircleClass(circleBarElements, sliderInstance)
          enableImagesClipPath(sliderImages, sliderInstance)
        }
      },
    })
  }

  slidersTrigger?.forEach((sliderContainer) => {
    const currentSlider = sliderContainer.querySelector(".js-scroll-slider")
    const slides = sliderContainer.querySelectorAll(".js-slide")
    const circleBarElements = sliderContainer.querySelectorAll(".scroll-slider__navigation-name")
    const sliderImages = sliderContainer.querySelectorAll(".js-scroll-slider-images")

    initScrollingHorizontalSlide({
      sliderContainer,
      slides,
      currentSlider,
      circleBarElements,
      sliderImages
    })
  })

  function initAppearancesBar(slides, navigation) {
    slides.forEach((slide, index) => {
      gsap.to(slide, 2.5, {
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        x: 0,
        delay: .5,
        scrollTrigger: {
          trigger: navigation,
        }
      })
    })
  }

  slidersNavigation?.forEach((navigation) => {
    const slides = [...navigation.children]
    gsap.set(slides, { opacity: 0, x: -20 })

    initAppearancesBar(slides, navigation)
  })
}
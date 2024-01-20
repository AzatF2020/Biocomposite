import gsap from "gsap";
import Swiper from "swiper";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Parallax} from "swiper/modules"

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

      const images = [...imageContainer.children]

      if (sliderActiveIndex === index) {
        images.forEach((image) => {

          setTimeout(() => {
            image.firstElementChild.classList.add("--active")
            image.firstElementChild.style.clipPath = "inset(0 0 0 0)"
          }, 150)
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
    const scrollSliderHeight = window.innerHeight * 1.5 * slides.length

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
}
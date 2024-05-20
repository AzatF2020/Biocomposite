import Swiper from "swiper";
import { delay } from "../vendor/constants";

export default function clickSlider() {
  const sliderClick = document.querySelectorAll('.js-init-slider-click');
  
  if(!sliderClick.length) return;

  function enableImagesClipPath(sliderImages) {
    sliderImages.forEach((imageContainer) => {
      if (!imageContainer) return;

      const images = [...imageContainer.querySelectorAll('img')]

      images.forEach(async (image) => {
        await delay(150)
        image.classList.add("--active")
        image.style.clipPath = "inset(0 0 0 0)"
      })
    })
  }

  sliderClick.forEach((slider, slideIndex) => {
    const swiperInstanceMain = new Swiper(slider, {});

    const navBar = document.querySelectorAll('.js-navigation-slider');
    if(!navBar.length) return;
    navBar.forEach((nav, navIndex) => {
      if (navIndex == 0) {
        nav.classList.add('click-slider__navigation-name--active');

        const activeSlide = document.querySelector('.js-slide[data-index="'+navIndex+'"]');
        const sliderImages = activeSlide.querySelectorAll(".js-click-slider-images");
        if (sliderImages.length > 0)
          enableImagesClipPath(sliderImages)
      }

      nav.addEventListener('click', (e) => {
        const navClick = e.target.closest('.js-navigation-slider');
        if(navClick === null) return;

        navBar.forEach((navInner, navIndexInner) => {
          navInner.classList.remove('click-slider__navigation-name--active');
        });
        navClick.classList.add('click-slider__navigation-name--active');

        const slideID = parseInt(navClick.attributes["data-index"].value);

        if (slideID >= 0) {
          swiperInstanceMain.slideTo(slideID);

          const activeSlide = document.querySelector('.js-slide[data-index="'+slideID+'"]');
          const sliderImages = activeSlide.querySelectorAll(".js-click-slider-images");
          if (sliderImages.length > 0)
            enableImagesClipPath(sliderImages)
        }
      });
    });
  });  
}
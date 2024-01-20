import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function enableParallax() {
  const parallaxContainers = document.querySelectorAll(".js-parallax");

  if (!parallaxContainers.length) return

  function initParallaxAnimation(wrapper) {
    const tl = gsap.timeline({ease: "none"})

    tl.to(wrapper, {
      duration: 1,
      y: () => wrapper.offsetHeight * 0.15,
      scrollTrigger: {
        trigger: wrapper,
        start: "top 0%",
        end: "bottom top",
        scrub: 1.25,
      }
    });
  }

  parallaxContainers?.forEach((wrapper) => {
    gsap.set(wrapper, {y: 0})

    initParallaxAnimation(wrapper)
  })
}
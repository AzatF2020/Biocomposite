import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function enableParallax() {
  const parallaxContainers = document.querySelectorAll(".js-parallax");

  if (!parallaxContainers.length) return

  function initParallaxAnimation(wrapper, parralaxStrong = 0.35) {
    const tl = gsap.timeline({ ease: "none" })

    tl.to(wrapper, {
      duration: 1,
      y: () => wrapper.offsetHeight * parralaxStrong,
      scrollTrigger: {
        trigger: wrapper,
        start: "top 0%",
        end: "bottom top",
        scrub: 1,
      }
    });
  }

  parallaxContainers?.forEach((wrapper) => {
    const parralaxStrong = Number(wrapper.dataset.parallaxStrong)
    gsap.set(wrapper, { y: 0 })

    initParallaxAnimation(wrapper, parralaxStrong)
  })
}
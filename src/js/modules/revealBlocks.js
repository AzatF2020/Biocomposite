import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function enableReveal() {
  const revealContainers = document.querySelectorAll(".js-reveal");

  if (!revealContainers.length) return

  function initRevealAnimation(wrapper) {
    ScrollTrigger.create({
      trigger: wrapper,
      start: "top+=30 bottom",
      end: "bottom top",
      onEnter: () => {
        wrapper.classList.add("revealed");
      },
    });
  }

  revealContainers?.forEach((wrapper) => {
    initRevealAnimation(wrapper)
  })
}
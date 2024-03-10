import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function setBubblesToClients() {
  const clientsBlocks = document.querySelectorAll('.js-clients');

  if(!clientsBlocks.length) return

  function initAnimation(bubbles, block) {
    bubbles.forEach((bubble, index) => {
      gsap.to(bubble, {
        opacity: 1,
        scale: 1,
        ease: "expo.out",
        duration: 2.5,
        delay: 0.3 * (index / 2),
        scrollTrigger: {
          trigger: block,
          start: 'top 35%',
        }
      })
    })
  }

  clientsBlocks.forEach((block) => {
    const bubbles = block.querySelectorAll(".js-bubble")
    gsap.set(bubbles, { scale: .5, opacity: 0 })
    initAnimation(bubbles, block)
  })
}
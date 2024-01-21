import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function occurrenceCardsDecision() {
  const cardsWrapper = document.querySelectorAll(".js-decision-cards-animation")

  if (!cardsWrapper.length || window.matchMedia("(max-width: 1024px)").matches) return

  function animateCardOccur(wrapper, direction) {
    if (!wrapper) return
    const cards = [...wrapper?.children]

    cards.forEach((card, index) => {
      setAnimationGsap(card, index, direction)
    })

    function setAnimationGsap(card, index, direction) {
      const directionMap = {
        "left": {
          xPercent: -10,
        },
        "bottom": {
          yPercent: 10,
        },
        "right": {
          xPercent: 10,
        },
        "top": {
          yPercent: -10,
        },
      }
      const tl = gsap.timeline({
        ease: "expo.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 50%"
        }
      })

      tl.from(card, {
        opacity: 0,
        ...directionMap[direction],
        duration: 1,
        delay: index / 2,
      })

      tl.to(card, {
        xPercent: 0,
        opacity: 1,
      })
    }
  }

  cardsWrapper.forEach((wrapper) => {
    const direction = wrapper.dataset?.direction || "left"
    animateCardOccur(wrapper, direction)
  })
}

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function occurrenceCardsDecision() {
  const cardsWrapper = document.querySelectorAll(".js-decision-cards-animation")

  if(!cardsWrapper.length) return

  function animateCardOccur(wrapper) {
    if(!wrapper) return
    const cards = [...wrapper?.children]

    cards.forEach((card, index) => {
      setAnimationGsap(card, index)
    })

    function setAnimationGsap(card, index) {
      const tl = gsap.timeline({
        ease: "expo.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 50%"
        }})

      tl.from(card, {
        opacity: 0,
        xPercent: -10,
        zIndex: -index,
        delay: index / 2,
      })

      tl.to(card, {
        xPercent: 0,
        opacity: 1,
      })
    }
  }

  cardsWrapper.forEach((wrapper) => {
    animateCardOccur(wrapper)
  })
}

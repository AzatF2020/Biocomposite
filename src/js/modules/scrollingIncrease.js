import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function scrollingIncrease() {
  const zoomBlocksScroll = document.querySelectorAll(".js-zoom-scroll")
  
  if(!zoomBlocksScroll.length) return
  
  gsap.set(zoomBlocksScroll, { y: 150, autoAlpha: 0 })
  
  function initAnimation(block, rectangleMask) {
    const tl = gsap.timeline({})
    
    tl.to(block, {
      y: 10,
      autoAlpha: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: block,
        scrub: 1,
        start: "top 60%",
        end: "top 30%",
        once: true,
      }
    })
    
    if(!rectangleMask) return
    
    tl.to(rectangleMask, {
      scale: 2,
      ease: "power3.out",
      onComplete: () => {
        gsap.set(rectangleMask, { autoAlpha: 0 })
      },
      scrollTrigger: {
        trigger: block,
        scrub: 2,
        start: "top 50%",
        end: "top 25%",
        once: true
      }
    })
  }
  
  zoomBlocksScroll?.forEach((block) => {
    const rectangleMask = block.querySelector(".js-mask-rectangle")
    
    if(rectangleMask) {
      gsap.set(rectangleMask, { scale: 1 })
    }
    initAnimation(block, rectangleMask)
  })
}


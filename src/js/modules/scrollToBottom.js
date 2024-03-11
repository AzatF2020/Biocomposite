import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin);

export default function scrollingToBottom() {
  const buttonScroll = document.querySelector('.js-scroll-bottom')

  if(!buttonScroll) return

  function scrollToBottom() {

    gsap.to(window, {
      duration: 2,
      ease: 'power3.out',
      scrollTo: {
        y: window.innerHeight,
        offsetY: 65
      }
    })
  }

  buttonScroll.addEventListener('click', () => {
    scrollToBottom()
  })
}
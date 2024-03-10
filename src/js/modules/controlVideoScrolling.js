import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function controlVideoScrolling() {
  const videoContainers = document.querySelectorAll('.js-scroll-video-container')

  if(!videoContainers.length) return

  videoContainers.forEach((container) => {
    const video = container.querySelector(".js-video-background");
    video.currentTime = 0;

    const tl = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: {
        trigger: container,
        scrub: true,
      }
    })

    tl.fromTo(video, {
      currentTime: 0
    }, {
      currentTime: () => {
        if(video.duration) {
          return video.duration
        }
        return 0
      }
    })
  })
}




import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function controlVideoScrolling() {
  const videoContainers = document.querySelectorAll('.js-scroll-video-container')

  if(!videoContainers.length) return

  videoContainers.forEach((container) => {
    const video = container.querySelector(".js-video-background");
    video.currentTime = 0;

    ScrollTrigger.create({
      trigger: container,
      scrub: true,
      onUpdate: (self) => {
        let scrollPos = self.progress;
        let videoDuration = video.duration;
        let videoCurrentTime = videoDuration * scrollPos;
        
        if(videoCurrentTime) {
          video.currentTime = videoCurrentTime;
        }
      }
    })
  })
}



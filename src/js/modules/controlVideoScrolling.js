import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

export default function controlVideoScrolling() {
  window.addEventListener("load", () => {
    const video = document.querySelector(".js-video-background");
    if(!video) return
    let src = video.currentSrc || video.src;

    function once(el, event, fn, opts) {
      var onceFn = function (e) {
        el.removeEventListener(event, onceFn);
        fn.apply(this, arguments);
      };
      el.addEventListener(event, onceFn, opts);
      return onceFn;
    }

    once(document.documentElement, "touchstart", function (e) {
      video.play();
      video.pause();
    });

    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
      defaults: { duration: 10 },
      scrollTrigger: {
        trigger: "",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    once(video, "loadedmetadata", () => {
      tl.fromTo(
        video,
        {
          currentTime: 0
        },
        {
          currentTime: video.duration || 1
        }
      );
    });

    setTimeout(function () {
      if (window["fetch"]) {
        fetch(src)
          .then((response) => response.blob())
          .then((response) => {
            var blobURL = URL.createObjectURL(response);

            var t = video.currentTime;
            once(document.documentElement, "touchstart", function (e) {
              video.play();
              video.pause();
            });

            video.setAttribute("src", blobURL);
            video.currentTime = t + 0.01;
          });
      }
    }, 100);
  })
}



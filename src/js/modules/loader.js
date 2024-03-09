import gsap from "gsap";
import initFirstAnimation from "./initFirstAnimation";

export default function initLoader() {
  const loader = document.querySelector(".js-loader")
  const header = document.querySelector(".header");

  if(!loader || !header) return

  window.scrollTo(0, 0)
  window.scroll.stopScroll()

  const percentages = loader.querySelector(".loader__percentages")
  const progressBar = loader.querySelector(".loader__progress")

  const counter = {
    value: 100,
  };

  const tl = gsap.timeline();

  return tl
    .from(counter, {
      duration: 1.5,
      ease: "none",
      value: 0,
      roundProps: "value",
      onUpdate: function () {
        const percentage = Math.ceil(counter.value / 10) * 10;
        percentages.textContent = `${percentage.toString()}%`;
      },
    })
    .to(progressBar,
      {
        width: `100%`,
        duration: 1.5,
        ease: "power3.inOut",
      },
      0
    )
    .to(loader, {
      autoAlpha: 0,
      duration: .25,
      onComplete: () => {
        initFirstAnimation()
        window.scroll.startScroll()
      }
    });
}
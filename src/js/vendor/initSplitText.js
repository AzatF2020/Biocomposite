import gsap from "gsap"
import { SplitText } from "./gsap/SplitText.js"

gsap.registerPlugin(SplitText)

export default function initSplitText() {
  const heading = document.querySelectorAll(".js-split-text")

  heading.forEach((element) => {
    gsap.to(element, {
      opacity: 1
    })

    const childLinesSplitTextInstance = new SplitText(element, {
      type: "lines",
      linesClass: "lineChild",
    });

    const parentLinesSplitTextInstance = new SplitText(element, {
      type: "lines",
      linesClass: "lineParent",
    });

    const childLines = childLinesSplitTextInstance.lines;
    const parentLines = parentLinesSplitTextInstance.lines;

    const tl = gsap.timeline({
      delay: 1,
    })

    gsap.set(parentLines, {
      overflow: "hidden",
    });

    tl.fromTo(
      childLines,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
        onComplete: () => {
          gsap.set(parentLines, {
            overflow: "visible",
          })
        }
      },
      ">-=0.5"
    );
  })
}
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function smoothScrolling() {
  const lenis = new Lenis();
  
  lenis.on("scroll", ScrollTrigger.update);
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 950);
  });
  
  gsap.ticker.lagSmoothing(0);
}
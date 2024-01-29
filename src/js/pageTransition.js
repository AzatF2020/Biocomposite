// import gsap from "gsap";
//
// function delay(n) {
//   n = n || 2000;
//   return new Promise((done) => {
//     setTimeout(() => {
//       done();
//     }, n);
//   });
// }
//
// function pageTransition() {
//   const tl = gsap.timeline({});
//   const transition = document.querySelector(".transition")
//
//   tl.to(transition, {
//     ease: "Expo.easeInOut",
//     top: '-100%',
//     duration: 0
//   })
//
//   tl.to(transition, {
//     duration: 1,
//     top: "0",
//     ease: "Expo.easeInOut",
//   })
//
//   tl.to(transition, {
//     duration: 1,
//     top: "100%",
//     ease: "Expo.easeInOut",
//   })
//   tl.set(transition, { top: "-100%", delay: 0, duration: 0 });
// }
//
// barba.init({
//   sync: true,
//   transitions: [
//     {
//       async beforeLeave() {
//         pageTransition()
//       },
//       async leave(data) {
//         const done = this.async()
//         await delay(1200)
//         done()
//       },
//       async after(data) {
//         document.addEventListener("redirect", (event) => {
//           const href = event.detail.href;
//           console.log(href, event)
//           if (href) {
//             barba.go(href);
//           }
//         });
//       }
//     }
//   ]
// })
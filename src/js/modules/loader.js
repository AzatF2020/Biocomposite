export default function initLoader() {
  // const loader = document.querySelector(".js-loader")
  //
  // if(!loader) return
  //
  // const percentages = loader.querySelector(".loader__percentages")
  // const progressBar = loader.querySelector(".loader__progress")
  //
  // let progress = 0
  // let interval = setInterval(cbInterval(), 250)
  //
  // function cbInterval() {
  //   return () => {
  //     if(progress <= 150) {
  //       progress += 1
  //       progressBar.style.setProperty("--bar-width", `${progress}%`)
  //       percentages.innerHTML = `${progress}%`
  //     } else {
  //       clearInterval(interval)
  //     }
  //   }
  // }
  //
  // window.addEventListener("load", () => {
  //   let newInterval = setInterval(() => cbInterval(), 35)
  //
  //   function cbInterval() {
  //       if(progress >= 98) {
  //         clearInterval(newInterval)
  //
  //         if(progress <= 100 || progress >= 100) {
  //           percentages.textContent = `${100}%`
  //         }
  //
  //         setTimeout(() => {
  //           loader.style.opacity = 0
  //
  //           setTimeout(() => {
  //             loader.remove()
  //             document.querySelector("html").classList.remove("no-scroll")
  //           }, 450)
  //         }, 1000)
  //       } else {
  //         progress += 2
  //         progressBar.style.setProperty("--bar-width", `${progress}%`)
  //         percentages.textContent = `${progress}%`
  //       }
  //     }
  // })
}
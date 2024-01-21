import initFirstAnimation from "./initFirstAnimation";

export default function initLoader() {
  const loader = document.querySelector(".js-loader")

  if(!loader) return

  const percentages = loader.querySelector(".loader__percentages")
  const progressBar = loader.querySelector(".loader__progress")

  let progress = 0
  let interval = setInterval(() => cbInterval(), 250)

  function cbInterval() {
      if(progress <= 30) {
        progress += 1
        progressBar.style.setProperty("--bar-width", `${progress}%`)
        percentages.innerHTML = `${progress}%`
      } else {
        clearInterval(interval)
      }
  }

  window.addEventListener("load", () => {
    let newInterval = setInterval(() => cbInterval(), 10)

    function cbInterval() {
      if(progress <= 70) {
        progress += 1
        progressBar.style.setProperty("--bar-width", `${progress}%`)
        percentages.innerHTML = `${progress}%`
      } else {
        clearInterval(newInterval)
        progress = 100
        progressBar.style.setProperty("--bar-width", `${100}%`)
        percentages.innerHTML = `${100}%`
        loader.classList.add("--is-disabled")

        setTimeout(() => {
          loader.remove()
          initFirstAnimation()
        }, 1500)
      }
    }
  })
}
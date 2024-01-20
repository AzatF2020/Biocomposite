import gsap from "gsap";

// #NOTE переписать на selectorAll;
export default function toggleVideoBlock() {
  const multiVideoSection = document.querySelector(".multi-video-block");

  if (!multiVideoSection || window.matchMedia("(max-width: 1024px)").matches) return

  const videoWrappers = [...multiVideoSection.querySelectorAll(".js-video-wrapper")]
  const mainVideo = videoWrappers[0].querySelector("video")
  const mainVideoSrc = mainVideo?.querySelector("source")
  const mainVideoTitle = videoWrappers[0].querySelector("h1")
  const videoWrappersCards = videoWrappers.slice(1)

  function swapVideosSrc(src, content) {
    const {mainVideoSrc, cardVideoSrc} = src
    const {cardTitle, mainVideoTitle} = content

    let mainVideoSrcForCard = mainVideoSrc.src
    mainVideoSrc.src = cardVideoSrc.src
    cardVideoSrc.src = mainVideoSrcForCard

    let mainVideoTitleContent = mainVideoTitle.textContent
    mainVideoTitle.textContent = cardTitle.textContent
    cardTitle.textContent = mainVideoTitleContent

    gsap.to(mainVideoTitle, {yPercent: 0})

    return {
      mainVideoSrcForCard,
      mainVideoTitleContent
    }
  }

  async function toggleAnimation(tags) {
    const {
      cardPlayButton,
      cardTitle,
      videoItem,
      mainVideoTitle,
      mainVideoSrc
    } = tags

    try {
      cardPlayButton.addEventListener("click", async () => {
        gsap.set(mainVideoTitle, {yPercent: 100})

        const cardVideo = videoItem.querySelector("video")
        const cardVideoSrc = cardVideo.querySelector("source")

        swapVideosSrc({mainVideoSrc, cardVideoSrc}, {cardTitle, mainVideoTitle})

        await cardVideo.load()
        await mainVideo.load()
        await mainVideo.play()
      })
    } catch (err) {
      console.error("error occur while toggle videos", err?.message)
    }
  }

  videoWrappersCards?.forEach(async (videoItem) => {
    const cardPlayButton = videoItem.querySelector("button")
    const cardTitle = videoItem.querySelector("h5")
    await toggleAnimation({
      cardPlayButton,
      cardTitle,
      videoItem,
      mainVideoTitle,
      mainVideoSrc,
    })
  })
}
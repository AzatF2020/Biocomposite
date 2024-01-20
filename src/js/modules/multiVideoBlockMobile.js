export default function disclosureMultiVideoBlocks() {
  const multiVideoSection = document.querySelectorAll(".multi-video-block");

  if (!multiVideoSection.length || window.matchMedia("(min-width: 1024px)").matches) return

  async function toggleAnimation(videoItem, videoBlocks) {
    const videoArrayBlocks = [...videoBlocks]

    try {
      const videoTag = videoItem?.querySelector("video")

      videoArrayBlocks.map(async (videoItem) => {
        const videoTag = videoItem.querySelector("video")

        await videoTag.load()
        await videoTag.pause()
      })

      await videoTag.load()
      await videoTag.play()

    } catch (err) {
      console.error("error occur while toggle videos: ", err?.message)
    }
  }

  function resizeBlock(videoItem, videoBlocks) {
    videoBlocks.forEach((item) => {
      item.classList.remove("--active")
    })
    videoItem.classList.add("--active")
  }

  multiVideoSection.forEach((videoSection) => {
    const videoBlocks = videoSection.querySelectorAll(".js-video-wrapper")

    videoBlocks?.forEach((videoItem, index) => {
      const videoPlayButton = videoItem?.querySelector("button")

      if (index === 0) videoItem.classList.add("--active")

      videoPlayButton.addEventListener("click", async () => {
        await toggleAnimation(videoItem, videoBlocks)

        resizeBlock(videoItem, videoBlocks)
      })
    })
  })
}
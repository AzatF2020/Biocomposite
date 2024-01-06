import gsap from "gsap";

export default async function enableMobileNotification() {
  const slots = document.querySelectorAll(".js-detail-slot")
  const slotButtons = document.querySelectorAll(".js-detail-button")
  const notificationBlock = document.querySelector(".js-notification")
  
  if(window.matchMedia("(min-width: 1200px)").matches || !notificationBlock) return
  
  const notificationTitle = notificationBlock.querySelector(".notification__title")
  const notificationText = notificationBlock.querySelector(".notification__text")
  const notificationIcon = notificationBlock.querySelector(".notification__icon")
  const notificationButtonClose = notificationBlock.querySelector(".notification__close-button")
  
  gsap.set(notificationBlock, { y: 150, opacity: 0 })
  
  function setAscentAnimation(notificationBlock) {
    gsap.to(notificationBlock, {
      y: 0,
      opacity: 1,
      delay: .5,
      ease: "power3.out",
    })
  }
  
  function closeNotification(notificationBlock) {
    slotButtons.forEach((button) => button.classList.remove("--active"))
    gsap.to(notificationBlock, {
      y: 150,
      opacity: 0,
      duration: .5,
    })
  }
  
  slots?.forEach((slot) => {
    const slotButton = slot.querySelector(".js-detail-button")
    const slotIconSrc = slotButton.querySelector("img").src
    const slotTitle = slot.querySelector(".detail-intro__slot-info-title")
    const slotText = slot.querySelector(".detail-intro__slot-info-text")
    
    slotButton.addEventListener("click", (event) => {
      const currentButton = event.currentTarget
      slotButtons.forEach((button) => button.classList.remove("--active"))
      
      currentButton.classList.add("--active")
      
      gsap.to(notificationBlock, {
        y: 150,
        opacity: 0,
        duration: .5,
        onComplete: () => {
          notificationTitle.textContent = slotTitle.textContent
          notificationText.textContent = slotText.textContent
          notificationIcon.src = slotIconSrc
        }
      })
      
      setAscentAnimation(notificationBlock)
    })
  })
  
  notificationButtonClose?.addEventListener("click", () =>
    closeNotification(notificationBlock))
}
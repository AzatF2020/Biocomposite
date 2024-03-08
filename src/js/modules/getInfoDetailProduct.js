import fetchingJson from "../helpers/fetchingJson";
import enableMobileNotification from "./enableMobileNotification";

export default async function initDetailProductSlots() {
  const detailProductContainer = document.querySelector(".js-detail-product")
  let jsonPath = detailProductContainer?.dataset.pathJson

  if (!jsonPath){
    jsonPath = window.location.pathname + 'slot/';
  }

  if (!detailProductContainer || !jsonPath) return

  const container = detailProductContainer.querySelector(".js-detail-container")
  const template = detailProductContainer.querySelector("template")
  
  if(!template) return 

  const data = await fetchingJson(jsonPath)

  const addClassBasedDirection = {
    "row": (tag) => null,
    "row-reverse": (tag) => tag?.classList.add("is-row-revert"),
    "column": (tag) => tag?.classList.add("is-column"),
    "column-reverse": (tag) => tag?.classList.add("is-column-revert"),
  }

  function addStyleBasedDirection(templateContainer, slotContainer, dataValues) {
    if (!templateContainer || !slotContainer) return

    if (window.matchMedia("(max-width: 1200px)").matches) {
      templateContainer.style.cssText = `
        top: ${dataValues?.mobilePosition?.top}%;
        left: ${dataValues?.mobilePosition?.left}%;
        display: ${dataValues?.options?.removeFromMobile ? `none` : `flex`}
      `
      slotContainer.style.cssText = `
        flex-direction: ${dataValues?.options?.directionMobile};
      `
    } else {
      templateContainer.style.cssText = `
        top: ${dataValues?.position?.top}%;
        left: ${dataValues?.position?.left}%
      `
      slotContainer.style.cssText = `
       flex-direction: ${dataValues?.options?.direction};
      `
    }
  }

  function createSlot(dataValues) {
    const templateContainer = template?.content
      .cloneNode(true)
      .querySelector(".js-detail-slot")
    const slotContainer = templateContainer?.querySelector(".detail-intro__slot-wrapper")

    if(!slotContainer) return

    const imageTag = templateContainer.querySelector("img")
    const slotInfo = templateContainer.querySelector(".detail-intro__slot-info")
    const slotText = templateContainer.querySelector(".detail-intro__slot-text")
    const slotInfoTitle = templateContainer.querySelector(".detail-intro__slot-info-title")
    const slotInfoText = templateContainer.querySelector(".detail-intro__slot-info-text")

    imageTag.src = dataValues?.iconSrc
    slotText.textContent = dataValues?.iconText
    slotInfoTitle.textContent = dataValues?.iconInfo?.title
    slotInfoText.textContent = dataValues?.iconInfo?.text

    addClassBasedDirection[dataValues?.options?.direction](slotInfo)
    addStyleBasedDirection(templateContainer, slotContainer, dataValues)

    return templateContainer
  }

  data?.forEach((slot) => {
    const renderedSlot = createSlot(slot)
    
    if(renderedSlot) {
      container.appendChild(renderedSlot)
    }
  })

  template.remove()

  await enableMobileNotification()
}
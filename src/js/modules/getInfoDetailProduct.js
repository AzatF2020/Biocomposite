import fetchingJson from "../helpers/fetchingJson";

export default async function initDetailProductSlots() {
  const detailProductContainer = document.querySelector(".js-detail-product")
  
  if(!detailProductContainer) return
  
  const jsonPath = detailProductContainer.dataset.pathJson
  const container = detailProductContainer.querySelector(".js-detail-container")
  const template = detailProductContainer.querySelector("template")
  const data = await fetchingJson(jsonPath)
  
  function createSlot(dataValues) {
    const templateContainer = template?.content
       .cloneNode(true)
       .querySelector(".js-detail-slot")
    const slotContainer = templateContainer.querySelector(".detail-intro__slot-wrapper")
    
    if(!templateContainer || !slotContainer) return
    
    if(window.matchMedia("(max-width: 1200px)").matches) {
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
    
    const imageTag = templateContainer.querySelector("img")
    const slotText = templateContainer.querySelector(".detail-intro__slot-text")
    const slotInfoTitle = templateContainer.querySelector(".detail-intro__slot-info-title")
    const slotInfoText = templateContainer.querySelector(".detail-intro__slot-info-text")
    
    imageTag.src = dataValues?.iconSrc
    slotText.textContent = dataValues?.iconText
    slotInfoTitle.textContent = dataValues?.iconInfo?.title
    slotInfoText.textContent = dataValues?.iconInfo?.text
    
    return templateContainer
  }
  
  data?.forEach((slot) => {
    const renderedSlot = createSlot(slot)
    container.appendChild(renderedSlot)
  })
  
  template.remove()
}
import gsap from "gsap";

export default function initBurgerModalAnimation() {
  const burgerModal = document.querySelector('.js-burger-modal');

  if(!burgerModal) return

  const burgerButton = document.querySelector('.js-burger-button');

  if(!burgerButton) return 

  const menuItems = burgerModal.querySelectorAll('.text-wrapper')
  let menuItemsElements = []
  let isOpened = false

  gsap.set(burgerModal, { yPercent: -95 })

  menuItems.forEach((item) => {
    menuItemsElements = menuItemsElements.concat([
      ...menuItemsElements, 
      ...item.children
    ])
  })

  gsap.set(menuItemsElements, { y: 50 })

  function openModal() {
    isOpened = true
    burgerButton.classList.add("--is-active")

    const tl = gsap.timeline({})
    tl
      .to(burgerModal, {
        yPercent: 0,
        ease: "power4.out",
        duration: 1,
        onStart: () => {
          burgerButton.disabled = true
          //window.scroll.stopScroll()
        }
      })
      .to(menuItemsElements, {
        y: 0,
        duration: .75,
        ease: 'power2.out',
        onComplete: () => {
          burgerButton.disabled = false
          menuItems.forEach((item) => {
            item.style.overflow = 'visible'
          })
        }
      }) 
  }

  function closeModal() {
    isOpened = false
    burgerButton.classList.remove("--is-active")

    const tl = gsap.timeline({})

    tl
      .to(menuItemsElements, {
        y: 50,
        duration: .75,
        onStart: () => {
          burgerButton.disabled = true
          menuItems.forEach((item) => {
            item.style.overflow = 'hidden'
          })
        }
      })
      .to(burgerModal, {
        yPercent: -95,
        duration: .75,
        ease: "power1.in",
        
        onComplete: () => {
          burgerButton.disabled = false
          window.scroll.startScroll()
        }
      })
  }
  
  burgerButton.addEventListener('click', (event) => {
    if(!isOpened) {
      openModal()
    } else {
      closeModal()
    }
  })

  window.biocompositeApi.menu.openMenu = () => {
    openModal()
  }
  window.biocompositeApi.menu.closeMenu = () => {
    closeModal()
  }

  window.addEventListener('click', (event) => {
    if(closeOutOfModalCondition(event)) {
      closeModal()
    }
  })

  const closeOutOfModalCondition = (event) => {
    return (!burgerModal.contains(event.target)) && (!document.querySelector('.header').contains(event.target))
  }
}
export default function modals() {
  const modalInstance = new HystModal({
    linkAttributeName: 'data-modal',
    closeOnEsc: true,
    waitTransitions: true,
    beforeOpen: () => {
      window.scroll.stopScroll()
    },
    afterClose: () => {
      window.scroll.startScroll()
    }
  });

  window.biocompositeApi.modal = modalInstance;
}
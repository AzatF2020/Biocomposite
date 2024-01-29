export default function modals() {
  const instance = new HystModal({
    linkAttributeName: 'data-modal',
    closeOnEsc: true,
  });

  window.modals = instance;
}
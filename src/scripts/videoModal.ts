// Simple modal handling without Plyr

window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('video-modal');
  const backdrop = modal?.querySelector('.cinematic-backdrop') as HTMLElement;
  const closeBtn = modal?.querySelector('.cinematic-close') as HTMLElement;
  const container = modal?.querySelector('.cinematic-container') as HTMLElement;
  const iframe = document.getElementById('youtube-player') as HTMLIFrameElement;
  const showcaseBtn = document.getElementById('showcase-btn');

  // Show modal when showcase button is clicked
  function openModal() {
    if (modal) modal.classList.add('active');
  }

  // Close modal logic
  function closeModal() {
    if (modal) modal.classList.remove('active');
    // Stop video by removing and re-adding the iframe src
    if (iframe) {
      const src = iframe.src;
      iframe.src = '';
      setTimeout(() => {
        iframe.src = src.replace('autoplay=1', 'autoplay=0');
      }, 100);
    }
  }

  // Showcase button click
  if (showcaseBtn) showcaseBtn.addEventListener('click', openModal);
  // Click X
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  // Click backdrop
  if (backdrop) backdrop.addEventListener('click', closeModal);
  // Click outside container
  if (modal && container) {
    modal.addEventListener('mousedown', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}); 
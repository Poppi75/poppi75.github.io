document.addEventListener('DOMContentLoaded', () => {
  const toolCards = document.querySelectorAll('.tool-card');

  toolCards.forEach((card) => {
    const rawLevel = card.getAttribute('data-level');
    const level = Math.max(0, Math.min(5, Number.parseInt(rawLevel ?? '0', 10) || 0));

    const dots = card.querySelectorAll('.skill-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-filled', index < level);
    });

    const toolName = card.querySelector('.tool-name')?.textContent?.trim() || 'Tool';
    card.setAttribute('aria-label', `${toolName} skill level ${level} out of 5`);
  });
});

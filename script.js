document.addEventListener('DOMContentLoaded', () => {
  const headerInner = document.getElementById('header-inner');
  const navToggle = document.getElementById('nav-toggle');

  navToggle.addEventListener('click', () => {
    headerInner.classList.toggle('header-inner--collapsed');
  });
});

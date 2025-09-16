const navbar = document.getElementById("navbar");

// Define colors
const colorA = { r: 17, g: 17, b: 17, a: 1 }; // rgba(17, 17, 17, 0.5)
const colorB = { r: 37, g: 37, b: 37, a: 1 };   // #292929 (fully opaque)

let current = { ...colorA };
let target = { ...colorA };

// adjust this to how far the user must scroll before color change
const scrollThreshold = 100; // pixels

function animate() {
  current.r += (target.r - current.r) * 0.1;
  current.g += (target.g - current.g) * 0.1;
  current.b += (target.b - current.b) * 0.1;
  current.a += (target.a - current.a) * 0.1;

  navbar.style.background = `rgba(${current.r}, ${current.g}, ${current.b}, ${current.a})`;

  requestAnimationFrame(animate);
}

window.addEventListener("scroll", () => {
  if (window.scrollY > scrollThreshold) {
    target = { ...colorB };
  } else {
    target = { ...colorA };
  }
});

animate();

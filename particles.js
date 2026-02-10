// Golden Glitter Particle System with Flowing Physics
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particle-canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'particle-canvas';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '999';
      document.body.appendChild(this.canvas);
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 300;
    this.spawnCounter = 0;
    this.highlights = [];

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles(x, y, count = 1) {
    const colors = ['#FFD500', '#FFF700', '#FFE600', '#FFEB3B'];
    
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= this.maxParticles) break;

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1;
      
      this.particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5, // Slight upward bias
        size: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.8,
        life: 1,
        decay: 0.008 + Math.random() * 0.005,
        time: 0,
        frequency: 0.05 + Math.random() * 0.03,
        amplitude: 1 + Math.random() * 0.5,
      });
    }
  }

  update() {
    // Continuous spawning from visible highlights
    this.spawnCounter++;
    if (this.spawnCounter % 4 === 0) {
      this.highlights.forEach((highlight) => {
        const rect = highlight.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const x = rect.left + Math.random() * rect.width;
          const y = rect.top + Math.random() * rect.height;
          this.createParticles(x, y, 1);
        }
      });
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Flowing motion with sine wave
      p.time += 0.05;
      const waveInfluence = Math.sin(p.time * p.frequency) * p.amplitude * 0.3;
      
      // Velocity updates with flowing effect
      p.vx += waveInfluence * 0.05;
      p.vx *= 0.96; // Subtle damping
      p.vy *= 0.97; // Less damping on Y for flowing effect

      // Downward gravity
      p.vy += 0.08;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Update life
      p.life -= p.decay;
      p.opacity = p.life * 0.9;

      // Remove dead particles
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw() {
    // Clear canvas with transparency
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      
      // Draw particle with glow
      const glow = 4 * p.opacity;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = glow;
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }

  setHighlights(highlights) {
    this.highlights = highlights;
  }
}

// Initialize particle system
const particleSystem = new ParticleSystem();

// Setup highlights
document.addEventListener('DOMContentLoaded', () => {
  const highlights = document.querySelectorAll('.highlight');
  particleSystem.setHighlights(highlights);

  // Optional: Extra particles on hover
  highlights.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Extra burst on hover
      for (let i = 0; i < 8; i++) {
        particleSystem.createParticles(centerX, centerY, 1);
      }
    });
  });
});

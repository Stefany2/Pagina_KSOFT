
  // Efecto de partículas interactivas
  document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('section');
    const colors = ['#4366E6', '#5A7AFF', '#3A56C7'];
    
    function createParticle(e) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.opacity = '0.7';
      
      section.appendChild(particle);
      
      let posX = e.clientX;
      let posY = e.clientY;
      let angle = Math.random() * Math.PI * 2;
      let velocity = Math.random() * 2 + 1;
      
      function animate() {
        posX += Math.cos(angle) * velocity;
        posY += Math.sin(angle) * velocity;
        
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        
        particle.style.opacity -= 0.01;
        
        if (parseFloat(particle.style.opacity) > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    // Crear partículas al mover el mouse
    section.addEventListener('mousemove', function(e) {
      if (Math.random() > 0.7) {
        createParticle(e);
      }
    });
    
    // Crear partículas aleatorias
    function createRandomParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 8 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = Math.random() * window.innerHeight + 'px';
      
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.opacity = '0.4';
      
      section.appendChild(particle);
      
      setTimeout(() => {
        particle.style.transition = 'opacity 2s ease';
        particle.style.opacity = '0';
        setTimeout(() => particle.remove(), 2000);
      }, Math.random() * 3000);
    }
    
    // Crear múltiples partículas de fondo
    for (let i = 0; i < 20; i++) {
      setTimeout(createRandomParticle, i * 300);
    }
    
    // Efecto hover mejorado para los items
    const items = document.querySelectorAll('.capacitacion-item');
    items.forEach(item => {
      item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.capacitacion-icon');
        icon.style.textShadow = `0 0 10px ${colors[0]}, 0 0 20px ${colors[1]}`;
      });
      
      item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.capacitacion-icon');
        icon.style.textShadow = 'none';
      });
    });
  });

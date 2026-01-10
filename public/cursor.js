/* Simple Professional Developer Cursor */
(() => {
  const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) {
    console.log('Cursor: Fine pointer not detected');
    return;
  }

  const DOT_COLOR = '#c5fcfc';
  const DOT_RADIUS = 6;
  const EASE = 0.16;

  // Wait for DOM to be ready
  const initCursor = () => {
    // Canvas for minimal tracking dot
    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-canvas';
    Object.assign(canvas.style, {
      position: 'fixed', 
      top: '0', 
      left: '0', 
      width: '100%', 
      height: '100%',
      pointerEvents: 'none', 
      zIndex: '99999',
      display: 'block'
    });
    
    if (document.documentElement.firstChild) {
      document.documentElement.insertBefore(canvas, document.documentElement.firstChild);
    } else {
      document.documentElement.appendChild(canvas);
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Cursor: Could not get 2D context');
      return;
    }

    // DPR scaling
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // State
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      dotX = mouseX;
      dotY = mouseY;
    });

    // Hide native cursor
    document.documentElement.style.cursor = 'none';
    document.body && (document.body.style.cursor = 'none');

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Smooth follow with lerp
      dotX += (mouseX - dotX) * EASE;
      dotY += (mouseY - dotY) * EASE;

      // Draw simple clean dot with glow effect
      ctx.fillStyle = DOT_COLOR;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(dotX, dotY, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      // Outer glow ring
      ctx.strokeStyle = DOT_COLOR;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.stroke();
      
      // Inner glow circle
      ctx.fillStyle = DOT_COLOR;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(dotX, dotY, DOT_RADIUS + 4, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(render);
    };

    render();
    console.log('Cursor: Initialized successfully');
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
  } else {
    initCursor();
  }
})();

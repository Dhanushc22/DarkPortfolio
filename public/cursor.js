/* Simple Professional Developer Cursor */
(() => {
  const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) return;

  const DOT_COLOR = '#ffffff';
  const DOT_RADIUS = 5;
  const EASE = 0.16;

  // Canvas for minimal tracking dot
  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-canvas';
  Object.assign(canvas.style, {
    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '9999'
  });
  document.documentElement.appendChild(canvas);
  const ctx = canvas.getContext('2d');

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

    // Draw simple clean dot
    ctx.fillStyle = DOT_COLOR;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(dotX, dotY, DOT_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    // Thin ring outline for polish
    ctx.strokeStyle = DOT_COLOR;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.4;
    ctx.stroke();

    requestAnimationFrame(render);
  };

  render();
})();

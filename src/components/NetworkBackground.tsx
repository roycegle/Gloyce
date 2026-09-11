'use client';
import { useEffect, useRef } from 'react';

const COLORS = [
  { r: 26,  g: 60,  b: 180 }, // navy blue (80%)
  { r: 184, g: 124, b: 16  }, // gold (20%)
];

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DOT_COUNT    = 55;
    const CONNECT_DIST = 170;

    type Dot = { x: number; y: number; z: number; vx: number; vy: number; r: number; color: typeof COLORS[number] };
    let W = 0, H = 0, dots: Dot[] = [];
    let rafId: number;

    function resize() {
      W = canvas!.width  = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    function makeDots() {
      dots = Array.from({ length: DOT_COUNT }, (_, i) => {
        const z     = Math.random();
        const speed = 0.08 + z * 0.30;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          z,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: 1.2 + z * 2.2,
          color: i % 5 === 0 ? COLORS[1] : COLORS[0],
        };
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < -30) d.x = W + 30;
        if (d.x > W + 30) d.x = -30;
        if (d.y < -30) d.y = H + 30;
        if (d.y > H + 30) d.y = -30;
      }

      // lines — depth-aware brightness
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const proximity   = 1 - dist / CONNECT_DIST;
            const depthFactor = (a.z + b.z) * 0.5;
            const alpha       = proximity * (0.12 + depthFactor * 0.32);
            const c           = depthFactor > 0.5 ? a.color : b.color;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${c.r},${c.g},${c.b},${alpha.toFixed(3)})`;
            ctx!.lineWidth   = 0.5 + depthFactor * 0.7;
            ctx!.stroke();
          }
        }
      }

      // dots — glowing with radial halo + shadow
      for (const d of dots) {
        const { x, y, r, z, color: c } = d;

        const glowRadius = r * (2.8 + z * 3.5);
        const grad = ctx!.createRadialGradient(x, y, 0, x, y, glowRadius);
        const glowAlpha = 0.04 + z * 0.12;
        grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${glowAlpha.toFixed(3)})`);
        grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
        ctx!.beginPath();
        ctx!.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();

        const coreAlpha = 0.30 + z * 0.55;
        ctx!.shadowColor = `rgba(${c.r},${c.g},${c.b},${(0.25 + z * 0.40).toFixed(2)})`;
        ctx!.shadowBlur  = 4 + z * 10;
        ctx!.beginPath();
        ctx!.arc(x, y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${c.r},${c.g},${c.b},${coreAlpha.toFixed(3)})`;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      rafId = requestAnimationFrame(draw);
    }

    function onResize() { resize(); makeDots(); }

    resize(); makeDots(); draw();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}

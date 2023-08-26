import React, { useEffect, useRef, useState } from 'react';

export default function RedSlime() {
  const [frames, setFrames] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  
    const spriteWidth = 24;
    const spriteHeight = 15;

  useEffect(() => {
    const canvas = canvasRef.current;

    const spritePosition = (row: number, col: number) => {
      return {
        x: col * spriteWidth,
        y: row * spriteHeight,
      };
    };

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    const spriteSheet1 = '/images/slime_red/idle/sp_slime_red_strip6.png';

    const image = new Image();
    image.src = spriteSheet1;
    image.crossOrigin = 'anonymous';

    if (!context) {
      return;
    }

    let row = 0;
    let col = 0;

    const animate = () => {
      if (col === 6) {
        col = 0;
        row += 1;
      }
      if (row === 1) {
        row = 0;
      }
      const pos = spritePosition(row, col);

      context.clearRect(0, 0, spriteWidth, spriteHeight);
      context.drawImage(
        image,
        pos.x,
        pos.y,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
      );
      col += 1;
    };

    image.onload = function () {
      const intervalId = setInterval(() => {
        animate();
      }, 180);

      return () => clearInterval(intervalId);
    };
  }, []);

  return (
      <canvas style={{height:`50px`}} ref={canvasRef} width={spriteWidth} height={spriteHeight}></canvas>
  );
}

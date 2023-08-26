import React, { useEffect, useRef } from 'react'

export default function RedSlime() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

useEffect(()=>{
    const canvas = canvasRef.current;

    if (!canvas){
        return;
    }

    const context = canvas.getContext('2d');

    const spriteSheet1 = '/images/slime_red/idle/sp_slime_red_strip6.png';

    const image = new Image();
    image.src = spriteSheet1;
    image.crossOrigin = 'anonymous'

    if (!context) {
        return;
    }

    image.onload = function () {
        context.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            canvas.width,
            canvas.height
        );
    };
}, [])













  return (
    <div>
        <canvas ref={canvasRef} width={'144px'} height={'15px'}></canvas>
        {/* <img src="/images/slime_red/idle/sp_slime_red_strip6.png" alt="" /> */}
    </div>
  )
}

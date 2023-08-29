import React, { useEffect, useRef, useState } from "react";

type Props = {
    handleBoltState: ()=>void
}

const spriteDimensions = {
  width: 15,
  height: 41,
  spd: 60,
};

export const Bolt = (props: Props) => {
    const [canvasSize, setCanvasSize] = useState({
      width: spriteDimensions.width,
      height: spriteDimensions.height + 5,
    });
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const intervalRef = useRef<number | null>(null);
  
    const drawX = (canvasSize.width - spriteDimensions.width) / 2;
    const drawY = canvasSize.height - spriteDimensions.height;
    const speed = spriteDimensions.spd;
  
    let spriteWidth = spriteDimensions.width;
    let spriteHeight = spriteDimensions.height;
    let spd = spriteDimensions.spd;
  
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
  
      const context = canvas.getContext("2d");
      const spriteSheet = new Image();
      spriteSheet.src = '/images/effects/sp_lightning_sm_strip13.png';
      spriteSheet.crossOrigin = "anonymous";
  
      spriteSheet.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
  
        if (!canvas || !context) {
          return;
        }
  
        let row = 0;
        let col = 0;
  
        const animate = () => {
          if (col === 13) {
            // col = 0;
            props.handleBoltState()
          } 
  
          const pos = spritePosition(row, col);
  
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(
            spriteSheet,
            pos.x,
            pos.y,
            spriteWidth,
            spriteHeight,
            drawX,
            drawY,
            spriteWidth,
            spriteHeight
          );
          col += 1;
        };
  
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
  
        intervalRef.current = setInterval(() => {
            if (col === 14){
              return;
            }
          animate();
        }, speed) as any;
        if (col === 14){
            return;
          }
        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
      };
    }, []);
  
    return (
      <>
        <canvas
        className="bolt-canvas"
          style={{ height: `${canvasSize.height * 6}px` }}
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        ></canvas>
      </>
    );
  }
  
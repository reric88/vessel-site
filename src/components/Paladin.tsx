import React, { useEffect, useRef, useState } from "react";



const spriteDimensions = {
  width: 21,
  height: 33,
  spd: 250,
};

export const Paladin = () => {
    const [canvasSize, setCanvasSize] = useState({
      width: spriteDimensions.width,
      height: spriteDimensions.height + 5,
    });
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const intervalRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [audioPlaying, setAudioPlaying] = useState(false)
  
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
      spriteSheet.src = '/images/npcs/sp_paladin_walk_down_strip4.png';
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
          if (col === 4) {
            col = 0;
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

const playAudio = () => {
    if (!audioRef.current){ 
        return
    }
    setAudioPlaying(prev=>!prev)
    if (audioPlaying){
        audioRef.current.pause()
        audioRef.current.currentTime = 0
    } else if (!audioPlaying){
        audioRef.current.play()
    }
}

    return (
      <div className="paladin-arrives">
        <canvas
          style={{ height: `${canvasSize.height * 6}px` }}
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onClick={playAudio}
        ></canvas>
          <audio ref={audioRef} loop>
        <source src="/sounds/Paladin.mp3" type="audio/mp3" />
         {/* <source src=""/sounds/Paladin.mp3".ogg" type="audio/ogg" /> */}
        {/* <source src=""/sounds/Paladin.mp3".wav" type="audio/wav" /> */}
        Your browser does not support the audio element.
      </audio>
      </div>
    );
  }
  
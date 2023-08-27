import React, { useEffect, useRef, useState } from "react";

type MoveState = "idle" | "walk";

const spriteDimensions = {
  width: 32,
  height: 32,
  spd: 400
};

export default function RedSlime() {
  const [moveState, setMoveState] = useState<MoveState>("idle");
  const [animationFrame, setAnimationFrame] = useState(0);
  const [canvasSize, setCanvasSize] = useState({
    width: spriteDimensions.width,
    height: spriteDimensions.height,
  });
const [glenGreg, setGlenGreg] = useState('glen')

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

    if (moveState === "idle") {
      spd = 99999999;
    } else if (moveState === "walk") {
      spd = 400;
    }

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
    spriteSheet.src = getSpriteSheetURL(moveState, glenGreg);
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
        if (moveState === "idle") {
            col = 0;         
        } else if (moveState === "walk") {
          if (col === 2) {
            col = 0
          }
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

        setAnimationFrame(col);
      };

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        animate();
      }, speed) as any;

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    };
  }, [moveState, glenGreg]);

  const getSpriteSheetURL = (state: string, name: string) => {
    switch (state) {
      case "idle":
        return `/images/npcs/sp_${name}_idle_down_32.png`;
      case "walk":
        return `/images/npcs/sp_${name}_32_strip2.png`;
      default:
        return "";
    }
  };

  const changeState = (v: string) => {
      if (v === "idle") {
        setMoveState("idle");
      } else if (v === "walk") {
        setMoveState("walk");
      }
  };

  const changeSprite = (v: string) => {
    setGlenGreg(v)
  }


  return (
    <>
      <div className="hair-bros-sprite">
        <canvas
          style={{ height: `${canvasSize.height * 4}px` }}
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        ></canvas>
      </div>
      <div className="vessel-buttons">
      <button onClick={() => changeState("walk")}>{glenGreg === 'greg' ? 'Spray' : 'Comb'}</button>
      <button onClick={() => changeState("idle")}>Idle</button>
      <select onChange={(v) => changeSprite(v.target.value)} name="glen-greg" id="glen-greg">
        <option value="glen">Glen?</option>
        <option value="greg">Greg?</option>
      </select>
      </div>

    </>
  );
}


import React, { useEffect, useRef, useState } from "react";

type MoveState = "idle" | "walk";
type Props = {
  isBoltDone: boolean
}

const spriteDimensions = {
  width: 12,
  height: 26,
  spd: 120,
};

export default function Vessel(props: Props) {
  const [moveState, setMoveState] = useState<MoveState>("idle");
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

setTimeout(()=>{
  setMoveState('walk')
}, 1000)

    if (moveState === "idle") {
      spd = 99999999;
    } else if (moveState === "walk") {
      spd = 100;
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
    spriteSheet.src = getSpriteSheetURL(moveState);
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
          if (col === 8) {
            col = 0;
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
  }, [moveState]);

  const getSpriteSheetURL = (state: string) => {
    switch (state) {
      case "idle":
        return `/images/player/idle_down/sp_player_idle_down.png`;
      case "walk":
        return `/images/player/walk/sp_player_walk_down_strip8.png`;
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

  return (
    <>
      <canvas
      className="vessel-canvas fade-in"
        style={{ height: `${canvasSize.height * 6}px` }}
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
      {/* <div className="vessel-buttons">
        <button onClick={() => changeState("walk")}>Walk</button>
        <button onClick={() => changeState("idle")}>Idle</button>
      </div> */}
    </>
  );
}

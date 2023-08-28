import React, { useEffect, useRef, useState } from "react";

type MoveState = "idle" | "enter" | "exit";

const spriteDimensions = {
  idle: { width: 22, height: 36, spd: 100 },
  enter: { width: 39, height: 68, spd: 100 },
  exit: { width: 21, height: 68, spd: 100 },
};

export const Wisp = () => {
  const [moveState, setMoveState] = useState<MoveState>("enter");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  let spriteWidth = spriteDimensions[moveState].width;
  let spriteHeight = spriteDimensions[moveState].height;
  const speed = spriteDimensions[moveState].spd;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (moveState === "idle") {
      spriteWidth = spriteDimensions.idle.width;
      spriteHeight = spriteDimensions.idle.height;
    } else if (moveState === "enter") {
      spriteWidth = spriteDimensions.enter.width;
      spriteHeight = spriteDimensions.enter.height;
    } else if (moveState === "exit") {
      spriteWidth = spriteDimensions.exit.width;
      spriteHeight = spriteDimensions.exit.height;
    }

    if (canvas) {
      const context = canvas.getContext("2d");
      const spriteSheet = new Image();
      spriteSheet.src = getSpriteSheetURL(moveState);
      spriteSheet.crossOrigin = "anonymous";

      spriteSheet.onload = () => {
        let row = 0;
        let col = 0;

        const animate = () => {
          if (moveState === "idle" && col === 8) {
            col = 0;
          } else if (moveState === "enter" && col === 40) {
            setMoveState("idle");
          } else if (moveState === "exit" && col === 14) {
            return;
          }

          const pos = spritePosition(row, col);
if (!context){
    return
}
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(
            spriteSheet,
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

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
          animate();
        }, speed) as any;
      };
    }
  }, [moveState]);

  const spritePosition = (row: number, col: number) => {
    return {
      x: col * spriteWidth,
      y: row * spriteHeight,
    };
  };

  const getSpriteSheetURL = (state: string) => {
    switch (state) {
      case "idle":
        return `/images/npcs/sp_wisp_strip8.png`;
      case "enter":
        return `/images/npcs/sp_wisp_enter_strip40.png`;
      case "exit":
        return `/images/npcs/sp_wisp_exit_strip14.png`;
      default:
        return "";
    }
  };

  const changeState = (v: string) => {
    if (v === "idle") {
      setMoveState("idle");
    } else if (v === "enter") {
      setMoveState("enter");
    } else if (v === "exit") {
      setMoveState("exit");
    }
  };

  return (
    <div className="wisp-sprite">
      <canvas
      style={{ height: `${spriteHeight * 5}px` }}
        ref={canvasRef}
        width={spriteWidth}
        height={spriteHeight}
      ></canvas>
    </div>
  );
};

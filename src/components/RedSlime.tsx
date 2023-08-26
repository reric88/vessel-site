import React, { useEffect, useRef, useState } from "react";

type MoveState = "idle" | "jump" | "ko";

const spriteDimensions = {
  idle: { width: 24, height: 15, spd: 100 },
  jump: { width: 26, height: 35, spd: 50 },
  ko: { width: 32, height: 21, spd: 50 },
};

export default function RedSlime() {
  const [moveState, setMoveState] = useState<MoveState>("jump");
  const [animationFrame, setAnimationFrame] = useState(0);
  const [canvasSize, setCanvasSize] = useState({
    width: spriteDimensions[moveState].width,
    height: spriteDimensions[moveState].height,
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  const drawX = (canvasSize.width - spriteDimensions[moveState].width) / 2;
  const drawY = canvasSize.height - spriteDimensions[moveState].height;
  const speed = spriteDimensions[moveState].spd;

  let spriteWidth = 24;
  let spriteHeight = 15;
  let spd = 40;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (moveState === "idle") {
      spriteHeight = 15;
      spriteWidth = 24;
      spd = 100;
    } else if (moveState === "jump") {
      spriteHeight = 35;
      spriteWidth = 26;
      spd = 50;
    } else if (moveState === "ko") {
      spriteHeight = 21;
      spriteWidth = 32;
      spd = 50;
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
          if (col === 6) {
            col = 0;
          }
        } else if (moveState === "jump") {
          if (col === 14) {
            setMoveState("idle");
          }
        } else if (moveState === "ko") {
          if (col === 18) {
            return;
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
  }, [moveState]);

  const getSpriteSheetURL = (state: string) => {
    switch (state) {
      case "idle":
        return "/images/slime_red/idle/sp_slime_red_strip6.png";
      case "ko":
        return "/images/slime_red/ko/sp_slime_red_ko_strip17.png";
      case "jump":
        return "/images/slime_red/jump/sp_slime_red_hop_strip15.png";
      default:
        return "";
    }
  };

  const changeState = (v: string) => {
    if (moveState !== "ko") {
      if (v === "idle") {
        setMoveState("idle");
      } else if (v === "jump") {
        setMoveState("jump");
      }
    }
    if (v === "ko") {
      setMoveState("ko");
    }
    if (v === 'respawn'){
        setMoveState('idle')
    }
  };

  return (
    <>
      <div className="red-slime-sprite">
        <canvas
          style={{ height: `${canvasSize.height}px` }}
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        ></canvas>
      </div>
      <button onClick={() => changeState("jump")}>Jump!</button>
      <button onClick={() => changeState("ko")}>Attack!</button>
      <button onClick={() => changeState("respawn")}>Respawn</button>

    </>
  );
}


import React, { useEffect, useRef, useState } from "react";

type MoveState = "idle" | "jump" | "ko";

const spriteDimensions = {
  idle: { width: 24, height: 15, spd: 100 },
  jump: { width: 26, height: 35, spd: 50 },
  ko: { width: 32, height: 22, spd: 50 },
};

export default function RedSlime() {
  const [moveState, setMoveState] = useState<MoveState>("jump");
  const [animationFrame, setAnimationFrame] = useState(0);
  const [spriteColor, setSpriteColor] = useState('red')
  const [canvasSize, setCanvasSize] = useState({
    width: 34,
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
      spriteHeight = 22;
      spriteWidth = 33;
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
    console.log(spriteColor)
  }, [moveState, spriteColor]);

  const getSpriteSheetURL = (state: string) => {
    switch (state) {
      case "idle":
        return `/images/slime_${spriteColor}/idle/sp_slime_${spriteColor}_strip6.png`;
      case "ko":
        return `/images/slime_${spriteColor}/ko/sp_slime_${spriteColor}_ko_strip17.png`;
      case "jump":
        return `/images/slime_${spriteColor}/jump/sp_slime_${spriteColor}_hop_strip15.png`;
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

  const changeColor = (color: string) => {
    setSpriteColor(color)
  }

  return (
    <>
      <div className="red-slime-sprite">
        <canvas
          style={{ height: `${canvasSize.height * 4}px` }}
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        ></canvas>
      </div>
      <div className="slime-buttons">
      <button onClick={() => changeState("jump")}>Jump!</button>
      <button onClick={() => changeState("ko")}>Attack!</button>
      <button onClick={() => changeState("respawn")}>Spawn</button>
      </div>
      <div className="slime-color">
        <select onChange={(e) => changeColor(e.target.value)} name="slime-color" id="slime-color">
            <option value="red">Red</option>
            <option value="blu">Blue</option>
            <option value="grn">Green</option>
        </select>
      </div>

    </>
  );
}

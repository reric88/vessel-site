import React, { useEffect, useState, useRef } from "react";
import Vessel from "./Vessel";
import { Wisp } from "./Wisp";
import { Bolt } from "./Bolt";

export const Two = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const pRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showP, setShowP] = useState({
    pOne: false,
    pTwo: false,
    pThree: false
  })

  
  const [scrollY, setScrollY] = useState(0);
  const [isBoltDone, setIsBoltDone] = useState(false)
   
  
  useEffect(()=>{
    if (scrollY >= 500){
      const updateP = {...showP, pOne: true};
      setShowP(updateP)
    }

    if (scrollY >= 900){
      const updateP = {...showP, pTwo: true};
      setShowP(updateP)
    }

    if (scrollY >= 1300){
      const updateP = {...showP, pThree: true};
      setShowP(updateP)
    }

    const canvas = canvasRef.current;
    
    if (!canvas){
      return;
    }
    
    const context = canvas.getContext("2d");
    const drawGalaxy = new Image();
    drawGalaxy.src = "/images/deco/sp_galaxy4.png";
    drawGalaxy.crossOrigin = "anonymous";
    
    if (!context){
      return
    }
    
    context.canvas.width = 64
    context.canvas.height = 64
    context.drawImage(drawGalaxy, 0, 0)




    
  }, [scrollY])



  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (divRef.current) {
      const pYPositions = pRefs.current.map((pRef) => {
        if (pRef) {
          const rect = pRef.getBoundingClientRect();
          return rect.y + window.scrollY;
        }
        return null;
      });

      // console.log(pYPositions);
      console.log(window.scrollY)
      const triggerPoint = scrollY + window.innerHeight / 1.5;

      pYPositions.forEach((yPosition, index) => {
        if (yPosition && triggerPoint > yPosition) {
          pRefs.current[index]?.classList.add("scrolled-p");
        }
      });
    }
  }, [scrollY]);

const handleBoltState = () => {
  setIsBoltDone(true)
}

  return (
    <div className="block-two" ref={divRef}>
      {/* <img src="/images/deco/sp_galaxy4.png" alt="" /> */}
      {showP.pOne === true ? 
      <>
      <canvas
      className="galaxy-canvas fade-in"
      ref={canvasRef}
      // height={'100px'}
      // width={'300px'}
      ></canvas>
      <p className="scrolled-p" 
      // ref={(ref) => (pRefs.current[0] = ref)}
      >
        The vast expanse of our cosmos beckons, its destiny hanging precariously
        on the precipice of destruction.
      </p>
      </>
      :
      <></>}
      {showP.pTwo === true ? 
      <>
      <div className="vessel-enter fade-in">
      <Bolt handleBoltState={handleBoltState} />
      {isBoltDone ? <Vessel isBoltDone={isBoltDone} /> : <></>}
      </div>
      <p className="scrolled-p" 
      // ref={(ref) => (pRefs.current[1] = ref)}
      >
        With the ability to transcend time, will you arrive as our savior, or
        will you unwittingly embrace the ominous unraveling of existence itself?
      </p>
      </>
      :
      <></>
      }
        {showP.pThree === true ? 
        <>
        <div className="wisp-enter">
      <Wisp />
      <p className="scrolled-p" 
      // ref={(ref) => (pRefs.current[2] = ref)}
      >
        The decision is solely within your hands, yet as the harbinger of our salvation, I implore you to save us from the
        encroaching cataclysm.
      </p>

        </div></>
        :
        <></>}

    </div>
  );
};

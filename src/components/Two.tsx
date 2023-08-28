import React, { useEffect, useState, useRef } from 'react';
import Vessel from './Vessel'
import { Wisp } from './Wisp';

export const Two = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const pRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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

      console.log(pYPositions);

      const triggerPoint = scrollY + window.innerHeight / 1.5;

      pYPositions.forEach((yPosition, index) => {
        if (yPosition && triggerPoint > yPosition) {
          pRefs.current[index]?.classList.add('scrolled-p');
        } 
      });
    }
  }, [scrollY]);

  return (
    <div className="block-two" ref={divRef}>
      <p ref={(ref) => (pRefs.current[0] = ref)}>
        The vast expanse of our cosmos beckons, its destiny hanging precariously on the precipice of destruction.
      </p>
<Vessel />
      <p ref={(ref) => (pRefs.current[1] = ref)}>
        With the ability to transcend time, will you arrive as our savior, or will you unwittingly embrace the ominous unraveling of existence itself?
      </p>

      <Wisp />
      <p ref={(ref) => (pRefs.current[2] = ref)}>
        It is solely within your grasp to decide, yet as the harbinger of our final salvation, I passionately implore you to save us from the encroaching cataclysm.
      </p>
    </div>
  );
};

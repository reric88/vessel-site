import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import RedSlime from "./components/RedSlime";
import Vessel from "./components/Vessel";
import HairBroOne from "./components/HairBroOne";
import { NavButton } from "./components/NavButton";
import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Backgrounds } from "./components/Backgrounds";
import { One } from "./components/One";
import { Two } from "./components/Two";
import { Wisp } from "./components/Wisp";
import { Three } from "./components/Three";
import { Paladin } from "./components/Paladin";
import { Story } from "./components/Story";

function App() {
  const [navButtonClicked, setNavButtonClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [wispState, setWispState] = useState(undefined);
  const rootDiv = useRef<HTMLDivElement | null>(null);

  const handleSetNavClicked = () => {
    setNavButtonClicked((prev) => !prev);
  };

  const handleCurrentPage = (v: string) => {
    setCurrentPage(v);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={rootDiv} id="root">
      <Backgrounds />
      <Header isScrolled={isScrolled} />
      <NavButton
        isScrolled={isScrolled}
        navButtonClicked={navButtonClicked}
        handleSetNavClicked={handleSetNavClicked}
      />
      <Navbar
        currentPage={currentPage}
        handleCurrentPage={handleCurrentPage}
        isScrolled={isScrolled}
        navButtonClicked={navButtonClicked}
      />
      {/* <One />
      <Two />
      <Three />
      <div className="paladin-div">
        <Paladin />
      </div> */}
      <Story />
      <Footer />
    </div>
  );
}

export default App;

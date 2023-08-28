import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import RedSlime from './components/RedSlime';
import Vessel from './components/Vessel'
import HairBroOne from './components/HairBroOne';
import { NavButton } from './components/NavButton';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Backgrounds } from './components/Backgrounds';
import { One } from './components/One';
import { Two } from './components/Two';
import { Wisp } from './components/Wisp';



function App() {
const [navButtonClicked, setNavButtonClicked] = useState(false)
const [isScrolled, setIsScrolled] = useState(false)
const [currentPage, setCurrentPage] = useState('home')
const [wispState, setWispState] = useState(undefined)

const handleSetNavClicked = () => {
  setNavButtonClicked(prev=>!prev)
}

const handleCurrentPage = (v: string) => {
  setCurrentPage(v)
}

useEffect(()=>{
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
// console.log('window Y', window.innerHeight)
// console.log(window.scrollY)
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [])



  return (
    <div id='root'>
      <Backgrounds />
      <Header isScrolled={isScrolled} />
      <NavButton isScrolled={isScrolled} navButtonClicked={navButtonClicked} handleSetNavClicked={handleSetNavClicked} />
      <Navbar currentPage={currentPage} handleCurrentPage={handleCurrentPage} isScrolled={isScrolled} navButtonClicked={navButtonClicked} />
      {/* <One /> */}
      <Two />





      <Footer />
      {/* <div className="sprite-look">
      <div className='slimes'><RedSlime /></div>
      <div className='vessel'><Vessel /></div>
      <div className="hair-bros">
        <HairBroOne />
      </div>
      </div> */}

      
    </div>
  );
}

export default App;

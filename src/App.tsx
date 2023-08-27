import React, { useState } from 'react';
import './App.css';
import RedSlime from './components/RedSlime';
import Vessel from './components/Vessel'
import HairBroOne from './components/HairBroOne';
import { NavButton } from './components/NavButton';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';



function App() {
const [navButtonClicked, setNavButtonClicked] = useState(false)

const handleSetNavClicked = () => {
  setNavButtonClicked(prev=>!prev)
}
console.log(navButtonClicked)
  return (
    <div id='root'>
      <Header />
      <NavButton navButtonClicked={navButtonClicked} handleSetNavClicked={handleSetNavClicked} />
      <Navbar />
      {/* <div className='slimes'><RedSlime /></div> */}
      <div className='vessel'><Vessel /></div>
      {/* <div className="hair-bros">
        <HairBroOne />
      </div> */}
    </div>
  );
}

export default App;

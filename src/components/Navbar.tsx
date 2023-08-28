import React, { useState } from "react";

type Props = {
  navButtonClicked: boolean,
  isScrolled: boolean,
  handleCurrentPage: (v:string)=>void,
  currentPage: string
};


export const Navbar = (props: Props) => {


    return (
    <>
      <nav className={props.navButtonClicked ? "drop-nav" : "stow-nav"}>
        <ul>
            <li className="nav-list-item"><a onClick={()=>props.handleCurrentPage('home')} href="#home">Home</a></li>
            <li className="nav-list-item"><a onClick={()=>props.handleCurrentPage('story')} href="#story">Story</a></li>
            <li className="nav-list-item"><a onClick={()=>props.handleCurrentPage('characters')} href="#characters">Characters</a></li>
            <li className="nav-list-item"><a onClick={()=>props.handleCurrentPage('abilities')} href="#abilities">Abilities</a></li>
            <li className="nav-list-item"><a onClick={()=>props.handleCurrentPage('screenshots')} href="#screenshots">Screenshots</a></li>
        </ul>
      </nav>
    </>
  );
};

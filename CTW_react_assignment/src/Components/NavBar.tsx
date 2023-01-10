import React, { type ReactElement, type MutableRefObject } from "react";
import cutlery from "../assets/cutlery1.svg"

const NavBar = (): ReactElement => {
  
    return (
        <div className="absolute z-50 flex p-10 bg-transparent">
        <img src={cutlery} alt="logo" className="w-10 filter invert rounded-full mr-5"/>
        <p className="font-title text-4xl text-charcoal">EAT</p><span className="text-4xl text-mustard font-title">ERY</span> 
        </div>
    );
  };
  
  export default NavBar;
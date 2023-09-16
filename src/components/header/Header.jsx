import { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import Navbar from "./Navbar";
import HeaderRight from "./HeaderRight";

const Header = ({ requistFrind }) => {

  const [toggle, setToggle] =  useState(false)
    return (
        <header className="header">
           <HeaderLeft toggle={toggle} setToggle={setToggle} />
           <Navbar requistFrind={requistFrind} toggle={toggle} setToggle={setToggle}/>
           <HeaderRight />
        </header>
    );
};

export default Header;
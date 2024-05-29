import React from "react";
import BurgerMenu from "./Burgermenu";

function Header() {
  const links = [
    { url: "/", text: "Home" },
    { url: "/about", text: "About" },
    { url: "/contact", text: "Contact" },
  ];

  return (
    <div className="header">
      <a href="/">
        <h1>DnD Tools</h1>
      </a>
      <BurgerMenu links={links} />
    </div>
  );
}

export default Header;

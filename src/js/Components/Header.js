import React from "react";
import BurgerMenu from "./Burgermenu";

function Header() {

    const links = [
        { url: '/', text: 'Home' },
        { url: '/about', text: 'About' },
        { url: '/contact', text: 'Contact' },
    ];

  return (
    <header className="header">
          <h1>DnD Tools</h1>
          <BurgerMenu links={links} />
    </header>
  );
}

export default Header;

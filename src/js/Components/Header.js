import React, { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <header>
        <h1>Header Component</h1>
      </header>
      <div>
        <div className="burger-menu" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
        </div>
        <nav className={`nav-menu ${isOpen ? "open" : ""}`}>
          <button className="close-button" onClick={closeMenu}>
            X
          </button>
          <a href="/" className="menu-item">
            Home
          </a>
          <a href="/about" className="menu-item">
            About
          </a>
          <a href="/services" className="menu-item">
            Services
          </a>
          <a href="/contact" className="menu-item">
            Contact
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Header;

import React, { useState } from 'react';

function BurgerMenu({ links }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="burger-menu">
            <button className="burger-icon" onClick={toggleMenu}>
                ☰
            </button>
            {isOpen && (
                <div className="menu-items">
                    <button className="close-button" onClick={closeMenu}>
                        &times;
                    </button>
                    {/* Map through the links passed from the parent */}
                    {links.map((link, index) => (
                        <a key={index} href={link.url}>{link.text}</a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BurgerMenu;

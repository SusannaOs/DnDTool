import React, { useState } from 'react';

function BurgerMenu({ links }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="burger-menu">
            <button className="burger-icon" onClick={toggleMenu}>
                ☰
            </button>
            {isOpen && (
                <div className="menu-items">
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

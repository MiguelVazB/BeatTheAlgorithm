import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import "./componentStyles/NavBar.css";
import { AlgoMenu } from "./AlgoMenu";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function showMenuClick() {
    setShowMenu((prev) => !prev);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const mobileMenu = document.querySelector(".mobile-menu");
      const mobileMenuButton = document.querySelector(".mobile-menu-button");

      if (
        mobileMenu &&
        !mobileMenu.contains(event.target) &&
        !mobileMenuButton.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  React.useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
      document.querySelector(".algoMenu").style.overflow = "auto";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMenu]);

  // Handle scroll locking for mobile menu
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;

      // Prevent touch scrolling on mobile
      const preventScroll = (e) => e.preventDefault();
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('wheel', preventScroll, { passive: false });

      return () => {
        document.removeEventListener('touchmove', preventScroll);
        document.removeEventListener('wheel', preventScroll);
      };
    } else if (!showMenu) {
      // Re-enable scrolling
      const scrollY = document.body.style.top;
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isMobileMenuOpen, showMenu]);

  const handleNavClick = () => {
    setShowMenu(false);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="navbar-container">
      <div className="logo">
        <Link to="/" onClick={handleNavClick}>
          <img
            src={"./beatthealgo.png"}
            alt="Logo"
            className="logo-icon"
          />
        </Link>
        <Link className="logo-text" to="/" onClick={handleNavClick}>
          Beat the Algorithm
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <Link
          to="/"
          className="nav-link"
          onClick={handleNavClick}
        >
          Home
        </Link>
        <Link
          to="/moreOnAlgorithms"
          className="nav-link"
          onClick={handleNavClick}
        >
          Algorithms
        </Link>
        <Link
          to="/about"
          className="nav-link"
          onClick={handleNavClick}
        >
          About
        </Link>
      </nav>

      <div className="action-container">
        <Link
          to="/algo/bubble_sort"
          className="start-challenge-button"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span>Start Challenge</span>
          <span className="material-icon">play_arrow</span>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className={`mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="material-icon">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <Link
            to="/"
            className="mobile-nav-link"
            onClick={handleNavClick}
          >
            Home
          </Link>
          <Link
            to="/moreOnAlgorithms"
            className="mobile-nav-link"
            onClick={handleNavClick}
          >
            Algorithms
          </Link>
          <Link
            to="/about"
            className="mobile-nav-link"
            onClick={handleNavClick}
          >
            About
          </Link>
          <Link
            to="/algo/bubble_sort"
            className="mobile-nav-link mobile-start-button"
            onClick={handleNavClick}
          >
            <span>Start Challenge</span>
            <span className="material-icon">play_arrow</span>
          </Link>
        </nav>
      </div>

      {/* AlgoMenu overlay */}
      {showMenu && <AlgoMenu showMenuClick={showMenuClick} />}
    </header>
  );
}
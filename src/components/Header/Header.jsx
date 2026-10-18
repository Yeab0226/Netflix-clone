import React, { useEffect } from "react";
import Styles from "./Header.module.css";

import { Link } from "react-router-dom";

import { useState } from "react";

import { Search, Bell, User, ChevronDown } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // for navbar blur effect

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header className={`${Styles.header} ${isScrolled ? Styles.scrolled : ""}`}>
      {/* logo and nav links  */}
      <div className={Styles.container}>
        {/* logo  */}
        <Link className={Styles.demoLogo} to="/">
          Trailer Showcase
        </Link>

        <button
          className={Styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* nav links  */}
        <nav
          id="main-navigation"
          className={`${Styles.nav} ${isMenuOpen ? Styles.navOpen : ""}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Link className={Styles.navLink} to="/">
            Home
          </Link>
          <Link className={Styles.navLink} to="/">
            TV Shows
          </Link>
          <Link className={Styles.navLink} to="/">
            Movies
          </Link>
          <Link className={Styles.navLink} to="/">
            New & Popular
          </Link>
          <Link className={Styles.navLink} to="/">
            My List
          </Link>
          <Link className={Styles.navLink} to="/">
            Browse by Language
          </Link>
        </nav>

        {/* right side section  */}

        <div className={Styles.rightSection}>
          {/* search and notification icon  */}
          <div className={Styles.searchContainer}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={Styles.searchButton}
            >
              <Search size={20} />
            </button>

            {isSearchOpen && (
              <input
                type="text"
                placeholder="movie title"
                className={Styles.searchInput}
              />
            )}
          </div>
          <button className={Styles.iconButton}>
            <Bell size={20} />
            <span className={Styles.notificationBadge}>4</span>
          </button>

          {/* profile icon  */}

          <div className={Styles.profileContainer}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={Styles.profileButton}
            >
              <div className={Styles.profileAvatar}>
                <User size={20} />
              </div>
              <ChevronDown size={20} />
            </button>

            {isProfileOpen && (
              <div className={Styles.profileMenu}>
                <Link className={Styles.profileMenuItem}>Account</Link>
                <Link className={Styles.profileMenuItem}>Help Center</Link>
                <hr className={Styles.profileMenuDivider} />
                <button className={Styles.profileMenuItem}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className={Styles.demoNotice}>
        Educational portfolio demo · Not affiliated with Netflix · Trailers only
      </p>
    </header>
  );
}

export default Header;

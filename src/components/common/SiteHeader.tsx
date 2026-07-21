'use client';

import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { setMenu, setReloadMenu } from '@/lib/globalSelectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { MenuItem } from '@/types/public';
import { RootState } from '@/lib/store';
import { useGetMenu } from '@/hooks/useGetMenu';

const logoSrc = '/images/nlogo.png';

export default function SiteHeader() {
  const globalSelection = useSelector((state: RootState) => state.globalSelection);
  const dispatch = useDispatch();
  const { getMenu } = useGetMenu();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarId = 'siteHeaderNavDropdown';

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!globalSelection.menu && globalSelection.reloadMenu) {
        dispatch(setReloadMenu(false));
        getMenu().then((menu) => {
          dispatch(setMenu(menu));
        });
      }
    }, 250);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, getMenu, globalSelection.menu, globalSelection.reloadMenu]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((currentValue) => !currentValue);
  };

  const buildMenuItems = () => {
    if (globalSelection.menu && globalSelection.menu.items) {
      const lineItems = globalSelection.menu.items.map((menuItem: MenuItem) => {
        if (menuItem.items && menuItem.items.length > 0) {
          const submenuItems = menuItem.items.map((submenuItem: MenuItem) => (
            <li key={submenuItem.route}>
              <Link
                className="dropdown-item"
                title={submenuItem.displayText}
                href={`/${submenuItem.route}`}
                onClick={closeMenu}
              >
                {submenuItem.displayText}
              </Link>
            </li>
          ));

          return (
            <li
              key={menuItem.route}
              className="nav-item dropdown site-header__item site-header__item--dropdown"
            >
              <button
                className="btn btn-dark dropdown-toggle site-header__dropdown-toggle"
                id={`${menuItem.route}DropdownMenuLink`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
                type="button"
              >
                {menuItem.displayText}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark site-header__dropdown-menu"
                aria-labelledby={`${menuItem.route}DropdownMenuLink`}
              >
                {submenuItems}
              </ul>
            </li>
          );
        }

        return (
          <li key={menuItem.route} className="nav-item site-header__item">
            <Link
              className="nav-link site-header__nav-link"
              title={menuItem.displayText}
              href={`/${menuItem.route}`}
              onClick={closeMenu}
            >
              {menuItem.displayText}
            </Link>
          </li>
        );
      });

      return [
        ...lineItems,
        <li key="menuItem_facebook" className="nav-item site-header__item">
          <a
            className="nav-link site-header__nav-link"
            target="_blank"
            rel="noreferrer"
            title="Facebook"
            href="https://www.facebook.com/NationalActs"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faFacebook} />
            <span className="social">Facebook</span>
          </a>
        </li>,
        <li key="menuItem_instagram" className="nav-item site-header__item">
          <a
            className="nav-link site-header__nav-link"
            target="_blank"
            rel="noreferrer"
            title="Instagram"
            href="https://www.instagram.com/nationalactsvip"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faInstagram} />
            <span className="social">Instagram</span>
          </a>
        </li>,
      ];
    }

    return [];
  };

  return (
    <header className="site-header">
      <nav
        className="navbar navbar-expand-lg navbar-dark site-header__navbar"
        role="navigation"
      >
        <div className="site-header__inner">
          <button
            className={`navbar-toggler site-header__toggler${isMenuOpen ? '' : ' collapsed'}`}
            type="button"
            aria-controls={navbarId}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link
            className="navbar-brand site-header__brand"
            href="/"
            aria-label="National Acts home"
          >
            <Image
              alt="National Acts VIP"
              src={logoSrc}
              width={166}
              height={30}
              priority={false}
            />
          </Link>

          <div
            className={`collapse navbar-collapse site-header__collapse${isMenuOpen ? ' show' : ''}`}
            id={navbarId}
          >
            <ul className="navbar-nav site-header__menu">{buildMenuItems()}</ul>

            <Link
              className="site-header__login"
              href="/my-account"
              onClick={closeMenu}
            >
              Log in
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

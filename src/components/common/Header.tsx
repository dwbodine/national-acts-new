"use client";

import { JSX, useEffect } from 'react';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { setMenu, setReloadMenu } from '@/lib/globalSelectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from "next/link";
import { MenuItem } from '@/types/public';
import { RootState } from '@/lib/store';
import { useGetMenu } from '@/hooks/useGetMenu';


export default function Header() {
    const globalSelection = useSelector((state: RootState) => state.globalSelection);
    const dispatch = useDispatch();
    const { getMenu } = useGetMenu();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!globalSelection.menu && globalSelection.reloadMenu) {
                dispatch(setReloadMenu(false));
                getMenu().then((menu) => {
                    dispatch(setMenu(menu));
                })
            }
        }, 250);
        return () => {
          clearTimeout(timeoutId);
        };
    }, [dispatch, getMenu, globalSelection.menu, globalSelection.reloadMenu]);
    
    const buildMenuItems = (): JSX.Element[] => {
        if (globalSelection.menu && globalSelection.menu.items) {
            const lineItems: JSX.Element[] = [];
            globalSelection.menu.items.forEach((menuItem: MenuItem, i: number) => {
                if (menuItem.items && menuItem.items.length > 0) {
                    const submenuItems: JSX.Element[] = [];
                    menuItem.items.forEach((submenuItem: MenuItem, j: number) => {
                        submenuItems.push(<li key={`submenuItem_${j}`}><a className="dropdown-item" title={submenuItem.displayText} href={`/${submenuItem.route}`}>{submenuItem.displayText}</a></li>)
                    });
                    lineItems.push(
                        <li key={`menuItem_${i}`} className="nav-item dropdown">
                            <button className="btn btn-dark dropdown-toggle" id={`${menuItem.route}DropdownMenuLink`} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{menuItem.displayText}</button>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby={`${menuItem.route}DropdownMenuLink`}>
                                 {submenuItems}
                            </ul>
                        </li>
                    );
                } else {
                    lineItems.push(<li key={`menuItem_${i}`} className="nav-item"><a className="nav-link" title={menuItem.displayText} href={`/${menuItem.route}`}>{menuItem.displayText}</a></li>);
                }
            });
            lineItems.push(<li key="menuItem_1000" className="nav-item"><a className="nav-link" target="_blank" title="Facebook" href="https://www.facebook.com/NationalActs"><FontAwesomeIcon icon={faFacebook} /><span className="social">Facebook</span></a></li>);
            lineItems.push(<li key="menuItem_1001" className="nav-item"><a className="nav-link" target="_blank" title="Instagram" href="https://www.instagram.com/nationalactsvip"><FontAwesomeIcon icon={faInstagram} /><span className="social">Instagram</span></a></li>);
            return lineItems;

        }
        return [];
    };


    return (
        <header className="header" data-bs-theme="dark">
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark header-nav" role="navigation">
                <Link className="navbar-brand" href="/" title="NationalActs">
                    <Image alt="National Acts VIP" src="/images/nlogo.png" width={166} height={30} priority={false}></Image>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {buildMenuItems()}
                    </ul>
                </div>
            </nav>
        </header>
    );   
}
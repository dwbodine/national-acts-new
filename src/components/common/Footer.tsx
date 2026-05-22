"use client";

import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link";
import moment from "moment";

export default function Footer() {
    const year = moment().year();
    return (
        <footer id="footer" className="clearfix">
            <div className="container">
                <div className="row">
                    <div className="col-xs-6 col-sm-5 col-md-3">
                        <ul>
                            <h4>Use nationalactsvip.com</h4>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/contact-us">Contact Us</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/terms">Terms</Link></li>
                            <li><Link href="/downloads">Downloads</Link></li>
                        </ul>
                    </div>
                    <div className="col-xs-6 col-sm-5 col-md-3">
                        <ul>
                            <h4>Plan Events</h4>
                            <li><Link href="https://users.nationalactsvip.com" target="_blank">Client Portal</Link></li>
                        </ul>
                    </div>
                    <div className="col-xs-6 col-sm-5 col-md-3">
                        <ul>
                            <h4>Find Events</h4>
                            <li><Link href="/events">Search Events</Link></li>
                            <li><Link href="/vipclients">VIP Roster</Link></li>
                        </ul>
                    </div>
                    <div className="col-xs-6 col-sm-5 col-md-3">
                        <ul>
                            <h4>Connect with us</h4>
                            <li><Link href="https://www.facebook.com/NationalActs" target="_blank"><FontAwesomeIcon icon={faFacebook} />Facebook</Link></li>
                            <li><Link href="https://www.instagram.com/nationalactsvip" target="_blank"><FontAwesomeIcon icon={faInstagram} />Instagram</Link></li>
                            <li><Link href="/mailing-list">Mailing List</Link></li>
                            <li><Link href="/my-account">My Account</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="sub-floor" className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 copyright">&copy; {year} National Acts, Inc.</div>
                </div>
            </div>
        </footer>
    )
}
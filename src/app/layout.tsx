import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import '../Css/App.css';
import '../Css/Header.css';
import '../Css/Footer.css';
import '../Css/About.css';
import '../Css/Artist.css';
import '../Css/ArtistBox.css';
import '../Css/Clients.css';
import '../Css/Contact.css';
import '../Css/Downloads.css';
import '../Css/Events.css';
import '../Css/EventRow.css';
import '../Css/Faq.css';
import '../Css/Home.css';
import '../Css/MailingList.css';
import '../Css/SellTickets.css';
import '../Css/Venue.css';
import '../Css/Terms.css';

// eslint-disable-next-line camelcase
import { Open_Sans } from "next/font/google";
import Providers from '@/components/common/providers';
import Script from 'next/script';

// eslint-disable-next-line new-cap
const openSans = Open_Sans({
  subsets: ["latin-ext"],
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta
          name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width"
        />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <link rel="icon" href="/images/favicon.png"></link>
        <link rel="apple-touch-icon" href="/images/apple-icon-touch.png" />
      </head>
      <body className={`${openSans.variable}`}>
        <Providers>{children}</Providers>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}

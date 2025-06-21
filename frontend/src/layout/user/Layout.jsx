import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-creamParchment">
      <Navbar />
      <main className="flex-grow font-poppins">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

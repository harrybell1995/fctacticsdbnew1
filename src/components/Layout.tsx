import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <MobileNav />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};
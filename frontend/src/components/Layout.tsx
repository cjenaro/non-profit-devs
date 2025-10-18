import React from 'react';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <React.Fragment>
      <Header />
      <main>
        {/* @ts-expect-error we need to update react router types */}
        <Outlet />
      </main>
      <Header fixed />
    </React.Fragment>
  );
}

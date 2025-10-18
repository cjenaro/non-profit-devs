import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <Header fixed />
    </React.Fragment>
  )
}

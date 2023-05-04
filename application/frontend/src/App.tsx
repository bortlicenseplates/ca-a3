import './App.scss';
import React, { FC, useEffect, useState } from 'react';
import logo from './logo.svg';
import { Link, Route } from 'wouter';
import Home from './pages/Home';
import Navbar from './components/navbar/navbar';
import Roaster from './pages/Roasters'
import RoasterDetail from './pages/RoasterDetail'
import CultivarDetail from './pages/CultivarDetail';
import Cultivars from './pages/Cultivars';
import RoastDetail from './pages/RoastDetail';
import Roasts from './pages/Roasts';

type routeItem = {
  href: string;
  label?: string;
  component: FC<any>
  navbar: boolean
};

const routes: routeItem[] = [
  {
    href: "/",
    label: 'Home',
    component: Home,
    navbar: true
  },
  {
    href: "/roasters",
    label: 'Roasters',
    component: Roaster,
    navbar: true
  },
  {
    href: "/roasters/:id",
    component: RoasterDetail,
    navbar: false
  },
  {
    href: "/roasts",
    label: 'Roasts',
    component: Roasts,
    navbar: true
  },
  {
    href: "/roasts/:id",
    component: RoastDetail,
    navbar: false
  },
  {
    href: "/cultivars",
    label: 'Cultivars',
    component: Cultivars,
    navbar: true
  },
  {
    href: "/cultivars/:id",
    component: CultivarDetail,
    navbar: false
  },
];

function App() {
  return (
    <div className="App">
      <Navbar title={'CoffeeDbExplorer'} logo={logo}>
        {routes.filter(c => c.navbar).map(route => <Link href={route.href} key={route.href}>{route.label}</Link>)}
      </Navbar>
      <div className="content">
        {routes.map(route => <Route path={route.href} component={route.component} />)}
      </div>
    </div>
  );
}

export default App;


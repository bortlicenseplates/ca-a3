import React, { FC, PropsWithChildren } from "react";
import './navbar.css';

const Navbar: FC<PropsWithChildren<{ title: string; logo: string }>> = props => {
  return (
    <div className="Navbar">
      <img className="logo" src={props.logo} alt="logo" />
      <h2>{props.title}</h2>
      <div className="links">{React.Children.map(props.children, child => <div className="nav-item">{child}</div>)}</div>
    </div>
  );
}

export default Navbar;
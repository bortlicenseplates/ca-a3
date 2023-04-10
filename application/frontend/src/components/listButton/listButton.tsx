import React, {FC, PropsWithChildren} from "react";
import { Link } from "wouter";

const ListButton: FC<PropsWithChildren<{ href: string; }>> = ({ href, children }) => {
  return (
    <Link className="listButton" href={href}>
      {children}
    </Link>
  );
}
export default ListButton;
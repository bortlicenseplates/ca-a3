import { FC, PropsWithChildren } from "react";
import { Link } from "wouter";

const CardButton: FC<PropsWithChildren<{
  href: string;
  title: string;
}>> = ({href, title, children}) => {
  return (
    <div className="card">
      <Link href={href}>
        <div className="card-header cursor-pointer">
          <h3>
            Name: {title}
          </h3>
        </div>
      </Link>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
export default CardButton;
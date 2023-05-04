import React, { FC } from "react";
import './rating.scss';

const Rating: FC<{ rating: number }> = props => {
  let circles = [];
  for(let i = 0; i < props.rating; i++) {
    circles.push(<div className="circle bg-primary"></div>)
  }
  return (
    <div className="Rating">
      {circles}
    </div>
  );
}

export default Rating;
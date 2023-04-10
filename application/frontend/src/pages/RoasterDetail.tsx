import React, { FC, useEffect, useState } from "react";
import Table from "../components/table/table";
import { Link } from "wouter";
import { roasterWithRoasts } from "../types/roasts"
import Rating from "../components/rating/rating";

const RoasterDetail: FC<{ params: {id: number } }> = (props) => {
  console.log(props);
  const [roaster, setRoaster] = useState<roasterWithRoasts>();
  useEffect(() => {
    fetch(`/api/roasters/${props.params.id}`)
      .then(res => res.json())
      .then((res: { data: roasterWithRoasts}) => {
        setRoaster(res.data);
      })
  }, [setRoaster]);
  return (
    <>
    <Link href="/roasters">Back</Link>
    {roaster && (<>
        <h1>Roaster: {roaster.roasterName}</h1>
        <h2>Country: {roaster.roasterCountry}</h2>
        <div className="roast-list">
        <hr />
        <h2>Roasts:</h2>
          {roaster.roasts.map(roast => 
              <>
                <h3><Link href={`/roasts/${roast.roastId}`}>Name: {roast.roastName}</Link></h3>
                <p className="flex">Acidity: <Rating rating={roast.roastAcidity} /></p>
                <p className="flex">Sweetness: <Rating rating={roast.roastSweetness} /></p>
                <p className="flex">Roast Level: <Rating rating={roast.roastLevel} /></p>
                <p>Cultivars:</p>
                <ul>{roast.cultivars.map(cultivar => <li>
                  <Link href={`/cultivars/${cultivar.cultivarId}`}>{cultivar.cultivarName}</Link>
                </li>)}</ul>
              </>
            )}
        </div>
    </>)}
    </>
  );
}
export default RoasterDetail;
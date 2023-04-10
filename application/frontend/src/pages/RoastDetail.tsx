import React, { FC, useEffect, useState } from "react";
import Table from "../components/table/table";
import { Link } from "wouter";
import { roasterWithRoasts } from "../types/roasts"

const RoasterDetail: FC<{ params: {id: number } }> = (props) => {
  console.log(props);
  const [roaster, setRoaster] = useState<roasterWithRoasts>();
  useEffect(() => {
    fetch(`/api/roasters/${props.params.id}`)
      .then(res => res.json())
      .then((res: { data: roasterWithRoasts}) => {
        console.log(res.data);
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
          {roaster.roasts.map(roast => 
              <>
                <h3>Name: {roast.roastName}</h3>
                <p>Acidity: {roast.roastAcidity}</p>
                <p>Sweetness: {roast.roastSweetness}</p>
                <p>Roast Level: {roast.roastLevel}</p>
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
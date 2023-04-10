import React, { FC, useEffect, useState } from "react";
import Table from "../components/table/table";
import { Link } from "wouter";
import { cultivarWithRoasts } from "../types/roasts"
import Rating from "../components/rating/rating";

const CultivarDetail: FC<{ params: {id: number } }> = (props) => {
  console.log(props);
  const [cultivars, setCultivars] = useState<cultivarWithRoasts>();
  useEffect(() => {
    fetch(`/api/cultivars/${props.params.id}`)
      .then(res => res.json())
      .then((res: { data: cultivarWithRoasts}) => {
        console.log(res.data);
        setCultivars(res.data);
      })
  }, [setCultivars]);
  return (
    <>
    <Link href="/cultivars">Back</Link>
    {cultivars && (<>
        <h1>Cultivar: {cultivars.cultivarName}</h1>
        <h2>Country: {cultivars.cultivarCountry}</h2>
        <hr />
        <div className="roast-list">
          <h2>Roasts:</h2>
          {cultivars.roasts.map(roast => 
              <>
                <h3><Link href={`/roasts/${roast.roastId}`}>
                  Name: {roast.roastName}
                </Link></h3>
                <p><Link href={`/roasters/${roast.roasterId}`}>
                  Roaster: {roast.roasterName}
                </Link></p>
                <p>Roaster Country: {roast.roasterCountry}</p>
                <p className="flex">Acidity: <Rating rating={roast.roastAcidity} /></p>
                <p className="flex">Sweetness: <Rating rating={roast.roastSweetness} /></p>
                <p className="flex">Roast Level: <Rating rating={roast.roastLevel} /></p>
              </>
            )}
        </div>
    </>)}
    </>
  );
}
export default CultivarDetail;
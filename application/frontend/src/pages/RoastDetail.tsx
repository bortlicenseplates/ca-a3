import React, { FC, useEffect, useState } from "react";
import Table from "../components/table/table";
import { Link } from "wouter";
import { roastWithCultivarsAndRoaster, roasterWithRoasts } from "../types/roasts"
import Rating from "../components/rating/rating";
import CardButton from "../components/detailView/detailView";

const RoastDetail: FC<{ params: {id: number } }> = (props) => {
  console.log(props);
  const [roast, setRoast] = useState<roastWithCultivarsAndRoaster>();
  useEffect(() => {
    fetch(`/api/roasts/${props.params.id}`)
      .then(res => res.json())
      .then((res: { data: roastWithCultivarsAndRoaster}) => {
        console.log(res.data);
        setRoast(res.data);
      })
  }, [setRoast]);
  return (
    <>
    <Link href="/roasters">Back</Link>
    {roast && (<>
        <h1>Name: {roast.roastName}</h1>
        <h2><Link href={`/roasters/${roast.roasterId}`}>Roaster: {roast.roasterName}</Link></h2>
        <h2>Country: {roast.roasterCountry}</h2>
        <p className="flex">Acidity: <Rating rating={roast.roastAcidity} /></p>
        <p className="flex">Sweetness: <Rating rating={roast.roastSweetness} /></p>
        <p className="flex">Roast Level: <Rating rating={roast.roastLevel} /></p>
        <hr />
        <h2>Cultivars:</h2>
        {roast.cultivars?.map(cultivar => 
          <div className="mb-3">
            <CardButton href={`/cultivars/${cultivar.cultivarId}`} title={cultivar.cultivarName}>
              <p><Link href={`/roasters/${roast.roasterId}`}>
                Roaster: {roast.roasterName}
              </Link></p>
              <p>Roaster Country: {cultivar.cultivarCountry}</p>
              <p className="flex">Masl Range: {cultivar.cultivarMaslMin}M - {cultivar.cultivarMaslMax}M</p>
            </CardButton>
          </div>
        )}
    </>)}
    </>
  );
}
export default RoastDetail;
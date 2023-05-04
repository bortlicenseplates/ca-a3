import React, { FC, useEffect, useState } from "react";
import Table from "../components/table/table";
import { Link } from "wouter";
import { cultivarWithRoasts } from "../types/roasts"
import Rating from "../components/rating/rating";
import { Card } from "react-bootstrap";
import CardButton from "../components/detailView/detailView";
import { countryListAlpha3 } from "../utils/countries";

const CultivarDetail: FC<{ params: {id: number } }> = (props) => {
  console.log(props);
  const [cultivar, setCultivar] = useState<cultivarWithRoasts>();
  useEffect(() => {
    fetch(`/api/cultivars/${props.params.id}`)
      .then(res => res.json())
      .then((res: { data: cultivarWithRoasts}) => {
        setCultivar(res.data);
      })
  }, [setCultivar]);
  return (
    <>
      <Link href="/cultivars">Back</Link>
      {cultivar && (<>
          <h1>Cultivar: {cultivar.cultivarName}</h1>
          <h2>Country: {cultivar.cultivarCountry}</h2>
          <p>Altitude: {cultivar.cultivarMaslMin}M - {cultivar.cultivarMaslMax}M</p>
          <hr />
          <div className="roast-list">
            <h2>Roasts:</h2>
            {cultivar.roasts.map(roast => 
              <div className="mb-3">
                <CardButton href={`/roasts/${roast.roastId}`} title={roast.roastName}>
                  <p><Link href={`/roasters/${roast.roasterId}`}>
                    Roaster: {roast.roasterName}
                  </Link></p>
                  <p>Roaster Country: {countryListAlpha3[roast.roasterCountry]}</p>
                  <p className="flex">Acidity: <Rating rating={roast.roastAcidity} /></p>
                  <p className="flex">Sweetness: <Rating rating={roast.roastSweetness} /></p>
                  <p className="flex">Roast Level: <Rating rating={roast.roastLevel} /></p>
                </CardButton>
              </div>
              )}
          </div>
      </>)}
    </>
  );
}
export default CultivarDetail;
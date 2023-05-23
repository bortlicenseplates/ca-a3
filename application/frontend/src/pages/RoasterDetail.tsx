import { FC, useEffect, useState } from "react";
import { Link } from "wouter";
import { cultivar, roasterWithRoasts } from "../types/roasts"
import Rating from "../components/rating/rating";
import CardButton from "../components/detailView/detailView";
import { countryListAlpha3 } from "../utils/countries";

const RoasterDetail: FC<{ params: {id: number } }> = (props) => {
  const [roaster, setRoaster] = useState<roasterWithRoasts>();
  useEffect(() => {
    fetch(`/api/roasters/${props.params.id}`)
      .then(res => res.json())
      .then((res: { data: roasterWithRoasts}) => {
        setRoaster(res.data);
      })
  }, [props.params.id, setRoaster]);
  return (
    <>
      <p className="mb-4"><strong><u><Link href="/roasters">Back to Roasters</Link></u></strong></p>
      {roaster && (<>
        <h1><strong>Roaster:</strong> {roaster.roasterName}</h1>
        <h2><strong>Country:</strong> {countryListAlpha3[roaster.roasterCountry]}</h2>
        <div className="roast-list">
        <hr />
        <h2>Roasts:</h2>
          {roaster.roasts.map(roast => 
            <div className="mb-3">
              <CardButton href={`/roasts/${roast.roastId}`} title={roast.roastName}>
                <p className="flex">Acidity: <Rating rating={roast.roastAcidity} /></p>
                <p className="flex">Sweetness: <Rating rating={roast.roastSweetness} /></p>
                <p className="flex">Roast Level: <Rating rating={roast.roastLevel} /></p>
                <hr />
                <p>
                  <strong>Cultivars:</strong>
                </p>
                <ul>{roast.cultivars.map(cultivar => <li>
                  <Link href={`/cultivars/${cultivar.cultivarId}`}>
                    <strong>{cultivar.cultivarName}</strong>
                  </Link>
                  , {countryListAlpha3[cultivar.cultivarCountry]}
                </li>)}</ul>
              </CardButton>
            </div>
          )}
        </div>
        <h2>Cultivars:</h2>
        {roaster.roasts.reduce((cultivars, roast) => {
          roast.cultivars.forEach(c => {
            const existing = cultivars.find((clt: cultivar) => clt.cultivarId === c.cultivarId);
            if(existing) {
              existing.count ++;
            } else {
              cultivars.push({...c, count: 1});
            }
          });
          return cultivars
        }, [] as (cultivar & {count: number})[]).map(cultivar => 
          <CardButton href={`/cultivars/${cultivar.cultivarId}`} title={cultivar.cultivarName}>
            <p><strong>country:</strong> {countryListAlpha3[cultivar.cultivarCountry]}</p>
            <p><strong>count:</strong> {cultivar.count}</p>
          </CardButton>
        )}
      </>)}
    </>
  );
}
export default RoasterDetail;
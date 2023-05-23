import { FC, useEffect, useState } from "react";
import { Link } from "wouter";
import { roastWithCultivarsAndRoaster } from "../types/roasts"
import Rating from "../components/rating/rating";
import CardButton from "../components/detailView/detailView";

const RoastDetail: FC<{ params: {id: number } }> = (props) => {
  const [roast, setRoast] = useState<roastWithCultivarsAndRoaster>();
  useEffect(() => {
    fetch(`/api/roasts/${props.params.id}`)
      .then(res => res.json())
      .then((res: { data: roastWithCultivarsAndRoaster}) => {
        setRoast(res.data);
      })
  }, [props.params.id, setRoast]);
  return (
    <>
    <Link href="/roasts">Back</Link>
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
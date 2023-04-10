import { useEffect, useState } from "react";
import { cultivar } from "../types/roasts";
import { Link } from "wouter";

const Cultivars: React.FC = () => {
  let [cultivars, setCultivars] = useState<cultivar[]>([]);

  useEffect(() => {
    fetch(`/api/cultivars/all`)
      .then(res => res.json())
      .then((res: { data: cultivar[] }) => {
        setCultivars(res.data);
      })
  }, [setCultivars]);
  return (
    <>
      <h1>Cultivars</h1>
      <div className="flex flex-column w-100">
        {cultivars.map(cultivar => 
        <Link href={`/cultivars/${cultivar.cultivarId}`} className="link-content">
          <span className="name pr-2">Name: {cultivar.cultivarName}</span>
          <span className="country">Country: {cultivar.cultivarCountry}</span>
        </Link>)}
      </div>
    </>
  );
}

export default Cultivars;

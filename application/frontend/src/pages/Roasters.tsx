import React, { useEffect, useState } from "react";
import { roaster } from "../types/roasts";
import { Link } from "wouter";

const Roasters: React.FC = () => {
  let [roasters, setRoasters] = useState<roaster[]>([]);

  useEffect(() => {
    fetch(`/api/roasters/all`)
      .then(res => res.json())
      .then((res: { data: roaster[] }) => {
        console.log(res);
        setRoasters(res.data);
      })
  }, [setRoasters]);
  return (
    <>
      <h1>Roasters Table</h1>
      <div className="flex flex-column w-100">
        {roasters.map(roaster => (
          <Link href={`/roasters/${roaster.roasterId}`} className="link-content">
            <span className="name pr-2">Name: {roaster.roasterName}</span>
            <span className="country">Country: { roaster.roasterCountry}</span>
          </Link>
        ))}
      </div>
      {/* <Table title={"Roasters"} header={roastersHeader} data={roastersData}></Table> */}
    </>
  );
}

export default Roasters;

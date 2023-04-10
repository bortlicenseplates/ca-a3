import React, { useEffect, useState } from "react";
import { roast, roaster } from "../types/roasts";
import { Link } from "wouter";

const Roasts: React.FC = () => {
  let [roasts, setRoasts] = useState<(roast & roaster)[]>([]);

  useEffect(() => {
    fetch(`/api/roasts/all`)
      .then(res => res.json())
      .then((res: { data: (roast & roaster)[] }) => {
        setRoasts(res.data);
      })
  }, [setRoasts]);
  return (
    <>
      <h1>Roasts List</h1>
      <div className="flex flex-column w-100">
        {roasts.map((roast) => <Link href={`/roasts/${roast.roastId}`}>
          <div className="link-content">
            <span className="name pr-2">Name: {roast.roastName}</span>
            <span className="country">Country: { roast.roasterCountry}</span>
          </div>
        </Link>)}
      </div>
      {/* <Table title={"Roasters"} header={roastersHeader} data={roastersData}></Table> */}
    </>
  );
}

export default Roasts;

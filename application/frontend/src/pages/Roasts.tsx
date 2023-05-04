import React, { useEffect, useState } from "react";
import { roast, roaster } from "../types/roasts";
import { Link } from "wouter";

const Roasts: React.FC = () => {
  let [roasts, setRoasts] = useState<(roast & roaster)[]>([]);

  useEffect(() => {
    fetch(`/api/roasts/all`)
      .then(res => res.json())
      .then((res: { data: (roast & roaster)[] }) => {
        console.log(res.data)
        setRoasts(res.data);
      })
  }, [setRoasts]);
  return (
    <div className="container">
    <div className="row">
      <div className="col-12">
        <h1>Roasts</h1>
      </div>
    </div>
    {/* <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
      <div className="row mb-2">
        <div className="col-12">
          <input type='text' id='cultivarName' name='cultivarName'></input>
          <label htmlFor='cultivarName'>Name</label>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12">
          <select name="countryName" id="countryName">
            {Object.keys(countryListAlpha3).map((c) => 
              (<option value={c}>{countryListAlpha3[c as ISOAlpha3]}</option>)
            )}
          </select>
          <label htmlFor='cultivarCountry'>Country</label>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12">
          <span>MASL (Meters Above Sea Level)</span>
          <input type='text' id='MaslMin' name='MaslMin'></input>
          <label htmlFor='MaslMin'>Min</label>
          <input type='text' id='MaslMax' name='MaslMax'></input>
          <label htmlFor='MaslMax'>Max</label>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12">
          <input type="submit" />
        </div>
      </div>
    </form> */}
    <div className="d-flex flex-column w-100">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Cultivar Count</th>
          </tr>
        </thead>
        <tbody>
          {roasts.map(roasts => 
            <Link href={`/roasts/${roasts.roastId}`}>
              <tr className="cursor-pointer">
                <td>{roasts.roastName}</td>
                <td>{roasts.roasterCountry}</td>
                <td>{roasts.cultivarCount}</td>
              </tr>
            </Link>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default Roasts;

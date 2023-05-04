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
  <div className="container">
    <div className="row">
      <div className="col-12">
        <h1>Roaster</h1>
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
          </tr>
        </thead>
        <tbody>
          {roasters.map(roaster => 
            <Link href={`/roasters/${roaster.roasterId}`}>
              <tr className="cursor-pointer">
                <td>{roaster.roasterName}</td>
                <td>{roaster.roasterCountry}</td>
              </tr>
            </Link>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default Roasters;

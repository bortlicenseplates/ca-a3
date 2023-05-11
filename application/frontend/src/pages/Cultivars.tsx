import { useEffect, useState } from "react";
import { cultivar } from "../types/roasts";
import { Link } from "wouter";
import { ISOAlpha3, countryListAlpha3 } from "../utils/countries";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { put } from "../utils/http";

const Cultivars: React.FC = () => {
  let [cultivars, setCultivars] = useState<cultivar[]>([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<cultivar>();
  const addNew: SubmitHandler<cultivar> = (data: cultivar) => {
    debugger;
    put(`/api/cultivars/new/`, data).then(res => {
      setCultivars(previous => [...previous, data]);
    });
  };
  
  useEffect(() => {
    fetch(`/api/cultivars/all`)
      .then(res => res.json())
      .then((res: { data: cultivar[] }) => {
        setCultivars(res.data);
      })
  }, [setCultivars]);


  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Cultivars</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(addNew)} className="d-flex flex-column">
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
      </form>
      <div className="d-flex flex-column w-100">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Altitude</th>
            </tr>
          </thead>
          <tbody>
            {cultivars.map(cultivar => 
              <Link href={`/cultivars/${cultivar.cultivarId}`}>
                <tr className="cursor-pointer">
                  <td>{cultivar.cultivarName}</td>
                  <td>{cultivar.cultivarCountry}</td>
                  <td>{cultivar.cultivarMaslMin} - {cultivar.cultivarMaslMin} M</td>
                </tr>
              </Link>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cultivars;

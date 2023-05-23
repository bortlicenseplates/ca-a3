import { useEffect, useState } from "react";
import { cultivar } from "../types/roasts";
import { Link } from "wouter";
import { ISOAlpha3, countryListAlpha3 } from "../utils/countries";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchDelete, fetchPost } from "../utils/http";

const Cultivars: React.FC = () => {
  let [cultivars, setCultivars] = useState<cultivar[]>([]);
  const {
    register,
    handleSubmit,
  } = useForm<cultivar>();
  const addNew: SubmitHandler<cultivar> = (data: cultivar) => {
    fetchPost(`/api/cultivars/new/`, data).then(res => {
      return res
    }).then(() => {
      setCultivars((previous) => [...previous, data]);
    });
  };

  const deleteCultivar = (id: number) => fetchDelete(`/api/cultivars/${id}`)
    .then(() => {
      setCultivars((previous) => previous.filter(c => c.cultivarId !== id))
    });

  useEffect(() => {
    fetch(`/api/cultivars/all`)
      .then((res) => res.json())
      .then((res: { data: cultivar[] }) => {
        setCultivars(res.data);
      });
  }, [setCultivars]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Cultivars</h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <h2>Add New Cultivar</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit(addNew)} className="d-flex flex-column">
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="cultivarName">Name</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <input required type="text" id="cultivarName" {...register("cultivarName")}></input>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="cultivarCountry">Country</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <select {...register("cultivarCountry")} id="cultivarCountry" required>
              <option value="" disabled selected hidden>Select a Country</option>
              {Object.keys(countryListAlpha3).map((c) => (
                <option value={c}>{countryListAlpha3[c as ISOAlpha3]}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12">
            <span>MASL (Meters Above Sea Level)</span>
          </div>
          <div className="col-12">
            <div className="mr-2 d-inline-block">
              <label htmlFor="cultivarMaslMin">Min</label>
              <input required
                className="mr-2"
                type="text"
                id="cultivarMaslMin"
                {...register("cultivarMaslMin")}
              ></input>
            </div>
            <div className="ml-2 d-inline-block">
              <label htmlFor="cultivarcultivarMaslMax">Max</label>
              <input required
                className="mr-2"
                type="text"
                id="cultivarMaslMax"
                {...register("cultivarMaslMax")}
              ></input>
            </div>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12">
            <input type="submit" className="btn btn-success text-white px-4" />
          </div>
        </div>
      </form>
      <hr />
      <div className="row">
        <div className="col-12">
          <h2>Cultivar List</h2>
        </div>
      </div>
      <div className="d-flex flex-column w-100">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Altitude</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cultivars.map((cultivar) => (
              <Link href={`/cultivars/${cultivar.cultivarId}`}>
                <tr className="cursor-pointer">
                  <td>{cultivar.cultivarName}</td>
                  <td>{countryListAlpha3[cultivar.cultivarCountry]}</td>
                  <td>
                    {cultivar.cultivarMaslMin} - {cultivar.cultivarMaslMin} M
                  </td>
<td align="right"><button className="btn btn-danger text-white" onClick={(e) => {
                    e.preventDefault();
                    deleteCultivar(cultivar.cultivarId)
                  }}>delete</button></td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cultivars;

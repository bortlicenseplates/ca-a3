import React, { useEffect, useState } from "react";
import { roaster } from "../types/roasts";
import { Link } from "wouter";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchDelete, fetchPost } from "../utils/http";
import { countryListAlpha3, ISOAlpha3 } from "../utils/countries";

const Roasters: React.FC = () => {
  let [roasters, setRoasters] = useState<roaster[]>([]);

  const {
    register,
    handleSubmit,
  } = useForm<roaster>();

  const addNew: SubmitHandler<roaster> = (data: roaster) => {
    fetchPost(`/api/roasters/new/`, data)
      .then((res) => {
        return res;
      })
      .then(() => {
        setRoasters((previous) => [...previous, data]);
      });
  };

  const deleteRoaster = (id: number) => fetchDelete(`/api/roasters/${id}`)
    .then(() => {
      setRoasters((previous) => previous.filter(r => r.roasterId !== id))
    });

  useEffect(() => {
    fetch(`/api/roasters/all`)
      .then((res) => res.json())
      .then((res: { data: roaster[] }) => {
        setRoasters(res.data);
      });
  }, [setRoasters]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Roaster</h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <h2>Add New Roaster</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit(addNew)} className="d-flex flex-column">
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="roastName">Name</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <input
              required
              type="text"
              id="roastName"
              {...register("roasterName")}
            ></input>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="cultivarCountry">Country</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <select {...register("roasterCountry")} id="cultivarCountry" required>
              <option value="" disabled selected hidden>Select a Country</option>
              {Object.keys(countryListAlpha3).map((c) => (
                <option value={c}>{countryListAlpha3[c as ISOAlpha3]}</option>
              ))}
            </select>
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
          <h2>Roasters List</h2>
        </div>
      </div>
      <div className="d-flex flex-column w-100">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {roasters.map((roaster) => (
              <Link href={`/roasters/${roaster.roasterId}`}>
                <tr className="cursor-pointer">
                  <td>{roaster.roasterName}</td>
                  <td>{roaster.roasterCountry}</td>
                  <td align="right"><button className="btn btn-danger text-white" onClick={(e) => {
                    e.preventDefault();
                    deleteRoaster(roaster.roasterId)
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

export default Roasters;

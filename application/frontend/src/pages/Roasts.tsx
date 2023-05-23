import React, { useEffect, useState } from "react";
import {
  cultivar,
  roast,
  roastWithCultivarsAndRoaster,
  roastWithRoaster,
  roaster,
} from "../types/roasts";
import { Link } from "wouter";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchDelete, fetchPost } from "../utils/http";
import { countryListAlpha3 } from "../utils/countries";

const Roasts: React.FC = () => {
  let [roasts, setRoasts] = useState<(roast & roaster)[]>([]);
  let [roasters, setRoasters] = useState<roaster[]>([]);
  let [cultivars, setCultivars] = useState<cultivar[]>([]);

  const {
    register,
    handleSubmit,
  } = useForm<roastWithCultivarsAndRoaster>();

  const addNew: SubmitHandler<roastWithRoaster> = (data: roastWithRoaster) => {
    fetchPost(`/api/roasts/new/`, data)
      .then((res) => {
        return res;
      })
      .then(() => {
        setRoasts((previous) => [...previous, data]);
      });
  };

  const deleteRoast = (id: number) => fetchDelete(`/api/roasts/${id}`)
    .then(() => {
      setRoasts((previous) => previous.filter(r => r.roastId !== id))
    });

  useEffect(() => {
    fetch(`/api/roasts/all`)
      .then((res) => res.json())
      .then((res: { data: (roast & roaster)[] }) => {
        setRoasts(res.data);
      });
  }, [setRoasts]);

  useEffect(() => {
    fetch(`/api/roasters/all`)
      .then((res) => res.json())
      .then((res: { data: roaster[] }) => {
        setRoasters(res.data);
      });
  }, [setRoasts]);

  useEffect(() => {
    fetch(`/api/cultivars/all`)
      .then((res) => res.json())
      .then((res: { data: cultivar[] }) => {
        setCultivars(res.data);
      });
  }, [setRoasts]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Roasts</h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <h2>Add New Roast</h2>
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
              {...register("roastName")}
            ></input>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="roasterId">Roaster</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <select {...register("roasterId")} id="roasterId" required>
              <option value="" disabled selected hidden>Select a Roaster</option>
              {roasters.map((r) => (
                <option value={r.roasterId}>{r.roasterName}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="cultivars">Cultivar</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <select multiple {...register("cultivars")} id="cultivars" required>
              {cultivars.map((c) => (
                <option value={c.cultivarId}>{c.cultivarName}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="roastLevel">Roast Level</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <input
              required
              type="text"
              id="roastLevel"
              {...register("roastLevel")}
            ></input>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="roastSweetness">Sweetness</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <input
              required
              type="text"
              id="roastSweetness"
              {...register("roastSweetness")}
            ></input>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="roastName">Acidity</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <input
              required
              type="text"
              id="roastAcidity"
              {...register("roastAcidity")}
            ></input>
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
          <h2>Roast List</h2>
        </div>
      </div>
      <div className="d-flex flex-column w-100">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Cultivar Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {roasts.map((roast) => (
              <Link href={`/roasts/${roast.roastId}`}>
                <tr className="cursor-pointer">
                  <td>{roast.roastName}</td>
                  <td>{countryListAlpha3[roast.roasterCountry]}</td>
                  <td>{roast.cultivarCount}</td>
                  <td align="right"><button className="btn btn-danger text-white" onClick={(e) => {
                    e.preventDefault();
                    deleteRoast(roast.roastId)
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

export default Roasts;

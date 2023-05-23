import React, { useEffect, useState } from "react";
import { cultivar, roast, roastWithCultivarsAndRoaster, roastWithRoaster, roaster } from "../types/roasts";
import { Link } from "wouter";
import { SubmitHandler, useForm } from "react-hook-form";
import { post } from "../utils/http";
import { countryListAlpha3 } from "../utils/countries";

const Roasts: React.FC = () => {
  let [roasts, setRoasts] = useState<(roast & roaster)[]>([]);
  let [roasters, setRoasters] = useState<roaster[]>([]);
  let [cultivars, setCultivars] = useState<cultivar[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<roastWithCultivarsAndRoaster>();

  const addNew: SubmitHandler<roastWithRoaster> = (data: roastWithRoaster) => {
    post(`/api/cultivars/new/`, data).then(res => {
      return res
    }).then(() => {
      setRoasts((previous) => [...previous, data]);
    });
  };

  useEffect(() => {
    fetch(`/api/roasts/all`)
      .then(res => res.json())
      .then((res: { data: (roast & roaster)[] }) => {
        setRoasts(res.data);
      })
  }, [setRoasts]);

  useEffect(() => {
    fetch(`/api/roasters/all`)
      .then(res => res.json())
      .then((res: { data: (roaster)[] }) => {
        setRoasters(res.data);
      })
  }, [setRoasters]);

  useEffect(() => {
    fetch(`/api/cultivars/all`)
      .then(res => res.json())
      .then((res: { data: (cultivar)[] }) => {
        setCultivars(res.data);
      })
  }, [setCultivars]);
  return (
    <div className="container">
    <div className="row">
      <div className="col-12">
        <h1>Roasts</h1>
      </div>
    </div>
    <form onSubmit={handleSubmit(addNew)} className="d-flex flex-column">
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="roastName">Name</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <input required type="text" id="roastName" {...register("roastName")}></input>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="roasterId">Roaster</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <select {...register("roasterId")} id="roasterId" required>
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
                <option onMouseDown={(e => {
                  e.preventDefault();
                  const el = e.target as HTMLOptionElement;
                  const parent = el.parentElement as HTMLElement;
                  const scroll = parent.scrollTop;
                  el.selected = !el.selected;
                  setTimeout(() => {
                    parent.scrollTop = scroll;
                  }, 0);
                  return false;
                })} value={c.cultivarId}>{c.cultivarName}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="roastLevel">Roast Level</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <input required type="text" id="roastLevel" {...register("roastLevel")}></input>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="roastSweetness">Sweetness</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <input required type="text" id="roastSweetness" {...register("roastSweetness")}></input>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-2 col-md-1">
            <label htmlFor="roastName">Acidity</label>
          </div>
          <div className="col-12 col-sm-10 col-11">
            <input required type="text" id="roastAcidity" {...register("roastAcidity")}></input>
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
            <th>Cultivar Count</th>
          </tr>
        </thead>
        <tbody>
          {roasts.map(roasts => 
            <Link href={`/roasts/${roasts.roastId}`}>
              <tr className="cursor-pointer">
                <td>{roasts.roastName}</td>
                <td>{countryListAlpha3[roasts.roasterCountry]}</td>
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

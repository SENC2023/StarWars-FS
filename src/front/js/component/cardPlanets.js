import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CardPlanets = ({ planet }) => {
  // console.log(planet)

const [details, setDetails] = useState ({})
const {store, actions} = useContext(Context);

const addToFavorites = () => {
  if (!store.favorites.includes(planet.name)) {
    actions.addFavorite(planet.name);
  }
};

  useEffect(() => {
		fetch("https://www.swapi.tech/api/planets/"+planet.uid)
        .then(res => res.json())
        .then(data => setDetails(data.result.properties))
        .catch(err => console.error(err))
        }, [])

	return (
    <div className="card col-3 m-2 p-2 bg-dark text-light">
      <img src="https://loremflickr.com/640/360" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title text-center">{planet.name}</h5>
        <p className="card-text">Population: {details.population}</p>
        <p className="card-text">Terrain: {details.terrain}</p>
        <div className="d-flex justify-content-between">
          <Link to={`/planet/${planet.uid}`}>
            <button className="btn btn-primary">
              Learn more!
            </button>
          </Link>
          <div className="">
            <button className="btn btn-warning" onClick={addToFavorites}>
              <i className="fa-solid fa-heart"></i> Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  };
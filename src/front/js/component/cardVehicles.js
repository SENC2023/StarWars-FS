import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CardVehicles = ({ vehicle }) => {
  // console.log(vehicle)

const [details, setDetails] = useState ({})
const {store, actions} = useContext(Context);

const addToFavorites = () => {
  if (!store.favorites.includes(vehicle.name)) {
    actions.addFavorite(vehicle.name);
  }
};

  useEffect(() => {
		fetch("https://www.swapi.tech/api/vehicles/"+vehicle.uid)
        .then(res => res.json())
        .then(data => setDetails(data.result.properties))
        .catch(err => console.error(err))
        }, [])

	return (
    <div className="card col-3 m-2 p-2 bg-dark text-light">
      <img src="https://loremflickr.com/640/360" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title text-center">{vehicle.name}</h5>
        <p className="card-text">Model: {details.model}</p>
        <p className="card-text">Vehicle Class: {details.vehicle_class}</p>
        <div className="d-flex justify-content-between">
          <Link to={`/vehicle/${vehicle.uid}`}>
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
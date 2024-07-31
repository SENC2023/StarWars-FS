import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CardComponent = ({ character }) => {
  // console.log(character)

const [details, setDetails] = useState ({})
const {store, actions} = useContext(Context);

const addToFavorites = () => {
  if (!store.favorites.includes(character.name)) {
    actions.addFavorite(character.name);
  }
};

  useEffect(() => {
		fetch("https://www.swapi.tech/api/people/"+character.uid)
    .then(res => res.json())
    .then(data => setDetails(data.result.properties))
    .catch(err => console.error(err))
	}, [])

	return (
    <div className="card col-3 m-2 p-2 bg-dark text-light">
      <img src="https://loremflickr.com/640/360" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title text-center">{character.name}</h5>
        <p className="card-text">Gender: {details.gender}</p>
        <p className="card-text">Hair Color: {details.hair_color}</p>
        <p className="card-text">Eye Color: {details.eye_color}</p>
        <div className="d-flex justify-content-between">
          <Link to={`/people/${character.uid}`}>
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
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { CardComponent } from "../component/cardComponent.js";
import { CardPlanets } from "../component/cardPlanets.js"
import { CardVehicles } from "../component/cardVehicles.js";

export const Home = () => {

	const {store, actions} = useContext(Context);

	useEffect(() => {
		actions.getCharacters()
		actions.getPlanets()
		actions.getVehicles()
	}, [])
	// console.log(store.planets);
	return (
        <div className="Home">
			<h1 className="ms-5 mt-4">Characters</h1>
            <div className="Overflow p-4">
				{store.characters.map((character, index) => (
					<CardComponent key={index} character={character} />
				))}
			</div>
			<h1 className="ms-5 mt-4">Planets</h1>
			<div className="Overflow p-4">
				{store.planets.map((planets, index) => (
					<CardPlanets key={index} planet={planets} />
				))}
			</div>
			<h1 className="ms-5 mt-4">Vehicles</h1>
			<div className="Overflow p-4">
				{store.vehicles.map((vehicles, index) => (
					<CardVehicles key={index} vehicle={vehicles} />
				))}
			</div>
        </div>
    );
};

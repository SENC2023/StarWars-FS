import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";

export const Planets = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // console.log("Effect running. Fetching planet with id:", id);
        actions.getPlanet(id);
    }, [id]);

    const planet = store.planet;

    // console.log("Planet from store:", planet);

    if (!planet || Object.keys(planet).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="PlanetDetail">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src="https://www.vinaporta.cl/wp-content/uploads/2021/03/800x600.png"
                            className="img-fluid rounded-start"
                            alt="..."
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title text-center">{planet.name}</h5>
                            <p className="card-text text-center">{planet.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="card border-danger mb-3">
                    <div className="card-header">Details</div>
                    <div className="d-flex flex-row">
                        <div className="card-body text-danger">
                            <h5 className="card-title">Name</h5>
                            <p className="card-text">{planet.name}</p>
                        </div>
                        <div className="card-body text-danger">
                            <h5 className="card-title">Orbital Period</h5>
                            <p className="card-text">{planet.orbital_period}</p>
                        </div>
                        <div className="card-body text-danger">
                            <h5 className="card-title">Rotation Period</h5>
                            <p className="card-text">{planet.rotation_period}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
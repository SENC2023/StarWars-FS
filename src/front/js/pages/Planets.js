import React, {useEffect, useContext} from "react";
import { useParams } from "react-router";
import "../../styles/People.css";
import { Context } from "../store/appContext";

export const Planets = () => {
    
    const params = useParams()
    // console.log(params);
    const {store, actions} = useContext(Context)
    useEffect(() => {
        actions.getPlanet(params.id)
    },[])
    // console.log(store.planet);
    return(
        <div className="CharacterDetail">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src="https://www.vinaporta.cl/wp-content/uploads/2021/03/800x600.png" className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title text-center">{store.planet?.properties?.name}</h5>
                        <p className="card-text text-center">{store.planet?.description}</p>
                    </div>
                    </div>
                </div>
            </div>
            <div>
            <div className="card border-danger mb-3 ">
                <div className="card-header">Header</div>
                <div className="d-flex flex-row">

                <div className="card-body text-danger">
                    <h5 className="card-title">Diameter</h5>
                    <p className="card-text">{store.planet?.properties?.diameter}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Rotation Period</h5>
                    <p className="card-text">{store.planet?.properties?.rotation_period}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Orbital_Period</h5>
                    <p className="card-text">{store.planet?.properties?.orbital_period}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Gravity</h5>
                    <p className="card-text">{store.planet?.properties?.gravity}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Population</h5>
                    <p className="card-text">{store.planet?.properties?.population}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Climate</h5>
                    <p className="card-text">{store.planet?.properties?.climate}</p>
                </div>

                </div>
                </div>
            </div>
        </div>
    )
}
import React, {useEffect, useContext} from "react";
import { useParams } from "react-router";
import "../../styles/People.css";
import { Context } from "../store/appContext";

export const Vehicles = () => {
    
    const params = useParams()
    // console.log(params);
    const {store, actions} = useContext(Context)
    useEffect(() => {
        actions.getVehicle(params.id)
    },[])
    // console.log(store.vehicle);
    return(
        <div className="CharacterDetail">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src="https://www.vinaporta.cl/wp-content/uploads/2021/03/800x600.png" className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title text-center">{store.vehicle?.properties?.name}</h5>
                        <p className="card-text text-center">{store.vehicle?.description}</p>
                    </div>
                    </div>
                </div>
            </div>
            <div>
            <div className="card border-danger mb-3 ">
                <div className="card-header">Header</div>
                <div className="d-flex flex-row">

                <div className="card-body text-danger">
                    <h5 className="card-title">Cargo Capacity</h5>
                    <p className="card-text">{store.vehicle?.properties?.cargo_capacity}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Consumables</h5>
                    <p className="card-text">{store.vehicle?.properties?.consumables}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Cost in Credits</h5>
                    <p className="card-text">{store.vehicle?.properties?.cost_in_credits}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Crew</h5>
                    <p className="card-text">{store.vehicle?.properties?.crew}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Model</h5>
                    <p className="card-text">{store.vehicle?.properties?.model}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Vehicle Class</h5>
                    <p className="card-text">{store.vehicle?.properties?.vehicle_class}</p>
                </div>

                </div>
                </div>
            </div>
        </div>
    )
}
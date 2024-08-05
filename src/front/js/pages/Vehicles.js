import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";

export const Vehicles = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // console.log("Effect running. Fetching vehicle with id:", id);
        actions.getVehicle(id);
    }, [id]);

    const vehicle = store.vehicle;

    // console.log("Vehicle from store:", vehicle);

    if (!vehicle || Object.keys(vehicle).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="VehicleDetail">
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
                            <h5 className="card-title text-center">{vehicle.name}</h5>
                            <p className="card-text text-center">{vehicle.description}</p>
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
                            <p className="card-text">{vehicle.name}</p>
                        </div>
                        <div className="card-body text-danger">
                            <h5 className="card-title">Length</h5>
                            <p className="card-text">{vehicle.length}</p>
                        </div>
                        <div className="card-body text-danger">
                            <h5 className="card-title">Model</h5>
                            <p className="card-text">{vehicle.model}</p>
                        </div>
                        <div className="card-body text-danger">
                            <h5 className="card-title">Vehicle class</h5>
                            <p className="card-text">{vehicle.vehicle_class}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
import React, {useEffect, useContext} from "react";
import { useParams } from "react-router";
import "../../styles/People.css";
import { Context } from "../store/appContext";

export const People = () => {
    
    const params = useParams()
    // console.log(params);
    const {store, actions} = useContext(Context)
    useEffect(() => {
        actions.getCharacter(params.id)
    },[])
    // console.log(store.character);
    return(
        <div className="CharacterDetail">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src="https://www.vinaporta.cl/wp-content/uploads/2021/03/800x600.png" className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title text-center">{store.character?.properties?.name}</h5>
                        <p className="card-text text-center">{store.character?.description}</p>
                    </div>
                    </div>
                </div>
            </div>
            <div>
            <div className="card border-danger mb-3 ">
                <div className="card-header">Header</div>
                <div className="d-flex flex-row">

                <div className="card-body text-danger">
                    <h5 className="card-title">Name</h5>
                    <p className="card-text">{store.character?.properties?.name}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Birth Year</h5>
                    <p className="card-text">{store.character?.properties?.birth_year}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Gender</h5>
                    <p className="card-text">{store.character?.properties?.gender}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Height</h5>
                    <p className="card-text">{store.character?.properties?.height}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Skin Color</h5>
                    <p className="card-text">{store.character?.properties?.skin_color}</p>
                </div>
                <div className="card-body text-danger">
                    <h5 className="card-title">Eye Color</h5>
                    <p className="card-text">{store.character?.properties?.eye_color}</p>
                </div>

                </div>
                </div>
            </div>
        </div>
    )
}
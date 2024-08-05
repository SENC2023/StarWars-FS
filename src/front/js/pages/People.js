import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";

export const People = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // console.log("Effect running. Fetching character with id:", id);
        actions.getCharacter(id);
    }, [id]);

    const character = store.character;

    // console.log("Character from store:", character);

    if (!character || Object.keys(character).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="CharacterDetail">
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
                            <h5 className="card-title text-center">{character.name}</h5>
                            <p className="card-text text-center">{character.description}</p>
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
                            <p className="card-text">{character.name}</p>
                        </div>
                        <div className="card-body text-danger">
                            <h5 className="card-title">Birth Year</h5>
                            <p className="card-text">{character.birth_year}</p>
                        </div>
                        <div className="card-body text-danger">
                            <h5 className="card-title">Gender</h5>
                            <p className="card-text">{character.gender}</p>
                        </div>
                        <div className="card-body text-danger">
                            <h5 className="card-title">Hair Color</h5>
                            <p className="card-text">{character.hair_color}</p>
                        </div>
                        <div className="card-body text-danger">
                            <h5 className="card-title">Eye Color</h5>
                            <p className="card-text">{character.eye_color}</p>
                        </div>
                        <div className="card-body text-danger">
                            <h5 className="card-title">Skin Color</h5>
                            <p className="card-text">{character.skin_color}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
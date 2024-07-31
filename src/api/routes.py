"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Characters, Planets, Vehicles, FavoriteCharacters, FavoritePlanets, FavoriteVehicles
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/characters', methods=['GET'])
def get_all_characters():

    query_characters = Characters.query.all()
    results_characters = list(map(lambda item: item.serialize(), query_characters))

    if query_characters == []:
        return jsonify({"msg":"Characters not found"}), 404
    else:
        return jsonify(results_characters), 200
    
@api.route('/characters/<int:characters_id>', methods=['GET'])
def get_id_character(characters_id):

    character_query = Characters.query.filter_by(id=characters_id).first()

    if character_query == None:
        return jsonify({"msg":"Character not found"}), 404
    else:
        return jsonify(character_query.serialize()), 200
    
@api.route('/planets', methods=['GET'])
def get_all_planets():

    query_planets = Planets.query.all()
    results_planets = list(map(lambda item: item.serialize(), query_planets))

    if query_planets == []:
        return jsonify({"msg":"Planets not found"}), 404
    else:
        return jsonify(results_planets), 200
    
@api.route('/planets/<int:planets_id>', methods=['GET'])
def get_id_planet(planets_id):

    planet_query = Planets.query.filter_by(id=planets_id).first()

    if planet_query == None:
        return jsonify({"msg":"Planet not found"}), 404
    else:
        return jsonify(planet_query.serialize()), 200
    
@api.route('/vehicles', methods=['GET'])
def get_all_vehicles():

    query_vehicles = Vehicles.query.all()
    results_vehicles = list(map(lambda item: item.serialize(), query_vehicles))

    if query_vehicles == []:
        return jsonify({"msg":"Vehicles not found"}), 404
    else:
        return jsonify(results_vehicles), 200
    
@api.route('/vehicles/<int:vehicles_id>', methods=['GET'])
def get_id_vehicle(vehicles_id):

    vehicle_query = Vehicles.query.filter_by(id=vehicles_id).first()

    if vehicle_query == None:
        return jsonify({"msg":"Vehicle not found"}), 404
    else:
        return jsonify(vehicle_query.serialize()), 200
    
@api.route('/user/favorites/<int:user_id>', methods=['GET'])
def get_all_favorites_user(user_id):

    
    results_favorite_characters = FavoriteCharacters.query.filter_by(user=user_id).all()
    all_favorite_characters = [favorite.serialize() for favorite in results_favorite_characters]
    results_favorite_planets = FavoritePlanets.query.filter_by(user=user_id).all()
    all_favorite_planets = [favorite.serialize() for favorite in results_favorite_planets]
    results_favorite_vehicles = FavoriteVehicles.query.filter_by(user=user_id).all()
    all_favorite_vehicles = [favorite.serialize() for favorite in results_favorite_vehicles]

    return jsonify({
        "characters": all_favorite_characters,
        "planets": all_favorite_planets,
        "vehicles": all_favorite_vehicles
    })

@api.route('/favorite/planet/<int:planet_id>', methods=['POST'])
def add_new_favorite_planet(planet_id):

    user_id = request.json.get('user_id')

    user = User.query.get(user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    planet = Planets.query.get(planet_id)
    if planet is None:
        return jsonify({"error": "Planet not found"}), 404

    existing_favorite = FavoritePlanets.query.filter_by(user_id=user_id, planet_id=planet_id).first()
    if existing_favorite:
        return jsonify({"message": "Planet is already a favorite"}), 400

    new_favorite = FavoritePlanets(user_id=user_id, planet_id=planet_id)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify({"message": "Planet added to favorites successfully"}), 201

@api.route('/favorite/character/<int:character_id>', methods=['POST'])
def add_new_favorite_character(character_id):

    user_id = request.json.get('user_id')

    user = User.query.get(user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    character = Characters.query.get(character_id)
    if character is None:
        return jsonify({"error": "Character not found"}), 404

    existing_favorite = FavoriteCharacters.query.filter_by(user_id=user_id, character_id=character_id).first()
    if existing_favorite:
        return jsonify({"message": "Character is already a favorite"}), 400

    new_favorite = FavoriteCharacters(user_id=user_id, character_id=character_id)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify({"message": "Character added to favorites successfully"}), 201

@api.route('/favorite/planet/<int:planet_id>', methods=['DELETE'])
def delete_favorite_planet(planet_id):
    
    favorite_planet = FavoritePlanets.query.filter_by(id=planet_id).first()

    if favorite_planet is None:
        return jsonify({"error": "Favorite planet not found"}), 404

    db.session.delete(favorite_planet)
    db.session.commit()

    return jsonify({"message": "Favorite planet deleted successfully"}), 200

@api.route('/favorite/character/<int:character_id>', methods=['DELETE'])
def delete_favorite_character(character_id):
    
    favorite_character = FavoriteCharacters.query.filter_by(id=character_id).first()

    if favorite_character is None:
        return jsonify({"error": "Favorite character not found"}), 404

    db.session.delete(favorite_character)
    db.session.commit()

    return jsonify({"message": "Favorite character deleted successfully"}), 200
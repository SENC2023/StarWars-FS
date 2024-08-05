const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [

			],
			details: [

			],
			character: {

			},
			planets: [

			],
			planet: [

			],
			vehicles: [

			],
			vehicle: [

			],
			favorites: [

			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			getCharacters: () => {
				fetch("https://psychic-system-4j7pxvvrqv47f7xxv-3001.app.github.dev/api/characters")
					.then(res => res.json())
					.then(data => {
						console.log(data);
						if (data.results) {
							setStore({ characters: data.results });
						} else {
							setStore({ characters: data });
						}
					})
					.catch(err => console.error(err));
			},
			getCharacter: (id) => {
				fetch(`https://psychic-system-4j7pxvvrqv47f7xxv-3001.app.github.dev/api/characters/${id}`)
					.then(res => res.json())
					.then(data => {
						console.log("Fetched character data:", data);
						setStore({ character: data });
					})
					.catch(err => console.error("Error fetching character:", err));
			},			
			getPlanets: () => {
				fetch("https://psychic-system-4j7pxvvrqv47f7xxv-3001.app.github.dev/api/planets")
					.then(res => res.json())
					.then(data => {
						console.log(data);
						if (data.results) {
							setStore({ planets: data.results });
						} else {
							setStore({ planets: data });
						}
					})
					.catch(err => console.error(err));
			},
			getPlanet: (id) => {
				fetch(`https://psychic-system-4j7pxvvrqv47f7xxv-3001.app.github.dev/api/planets/${id}`)
					.then(res => res.json())
					.then(data => {
						console.log("Fetched planet data:", data);
						setStore({ planet: data });
					})
					.catch(err => console.error("Error fetching planet:", err));
			},
			getVehicles: () => {
				fetch("https://psychic-system-4j7pxvvrqv47f7xxv-3001.app.github.dev/api/vehicles")
					.then(res => res.json())
					.then(data => {
						console.log(data);
						if (data.results) {
							setStore({ vehicles: data.results });
						} else {
							setStore({ vehicles: data });
						}
					})
					.catch(err => console.error(err));
			},
			getVehicle: (id) => {
				fetch(`https://psychic-system-4j7pxvvrqv47f7xxv-3001.app.github.dev/api/vehicles/${id}`)
					.then(res => res.json())
					.then(data => {
						console.log("Fetched vehicle data:", data);
						setStore({ vehicle: data });
					})
					.catch(err => console.error("Error fetching vehicle:", err));
			},
			addFavorite: (characterName) => {
				const { favorites } = getStore();
				setStore({ favorites: [...favorites, characterName] });
			  },
			removeFavorite: (characterName) => {
				const { favorites } = getStore();
				const updatedFavorites = favorites.filter((name) => name !== characterName);
				setStore({ favorites: updatedFavorites });
			  }
		}
	};
};

export default getState;

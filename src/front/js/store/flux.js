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
				fetch("https://www.swapi.tech/api/people/")
				.then(res => res.json())
				.then(data => setStore({ characters: data.results }))
				.catch(err => console.error(err))
			},
			getCharacter: (id) => {
				fetch("https://www.swapi.tech/api/people/"+id)
				.then(res => res.json())
				.then(data => setStore({ character: data.result }))
				.catch(err => console.error(err))
			},
			getPlanets: () => {
				fetch("https://www.swapi.tech/api/planets/")
				.then(res => res.json())
				.then(data => setStore({ planets: data.results }))
				.catch(err => console.error(err))
			},
			getPlanet: (id) => {
				fetch("https://www.swapi.tech/api/planets/"+id)
				.then(res => res.json())
				.then(data => setStore({ planet: data.result }))
				.catch(err => console.error(err))
			},
			getVehicles: () => {
				fetch("https://www.swapi.tech/api/vehicles/")
				.then(res => res.json())
				.then(data => setStore({ vehicles: data.results }))
				.catch(err => console.error(err))
			},
			getVehicle: (id) => {
				fetch("https://www.swapi.tech/api/vehicles/"+id)
				.then(res => res.json())
				.then(data => setStore({ vehicle: data.result }))
				.catch(err => console.error(err))
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

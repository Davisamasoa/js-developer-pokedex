function createCard(pokemonName) {
	if (document.querySelector(".poke-card")) {
		document.querySelector(".poke-card").remove();
	}

	const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

	fetch(apiUrl)
		.then((response) => response.json())
		.then((pokemonData) => {
			const card = document.createElement("div");
			card.className = `poke-card ${pokemonData.types[0].type.name}`;

			const name = document.createElement("h2");
			name.textContent = pokemonData.name;
			name.className = "poke-name";

			const image = document.createElement("img");
			image.src = pokemonData.sprites.front_default;
			image.alt = pokemonData.name;

			const types = document.createElement("p");
			types.textContent = `Type: ${pokemonData.types.map((type) => type.type.name).join(", ")}`;

			const abilities = document.createElement("p");
			abilities.textContent = `Abilities: ${pokemonData.abilities
				.map((ability) => ability.ability.name)
				.join(", ")}`;

			const closeBtn = document.createElement("span");
			closeBtn.className = "close-btn";
			closeBtn.textContent = "X";
			closeBtn.addEventListener("click", () => card.remove());

			card.appendChild(closeBtn);
			card.appendChild(name);
			card.appendChild(image);
			card.appendChild(types);
			card.appendChild(abilities);

			const body = document.querySelector("body");
			body.appendChild(card);
		})
		.catch((error) => console.error(error));
}

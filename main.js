const searchField = document.querySelector('#search');
const searchButton = document.querySelector('#searchButon');

searchButton.addEventListener('click', async () => {
  const pokemonId = searchField.value;
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  console.log(data);
  });


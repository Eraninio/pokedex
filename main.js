const searchField = document.querySelector('#search');
const searchButton = document.querySelector('#searchButon');
const err404Img = document.querySelector('#err404img');
err404Img.hidden = true;

searchButton.addEventListener('click', async () => {
  const pokemonId = searchField.value;
  try {
    err404Img.hidden = true;
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const chars = {
    pName : data.name,
    pHeight : data.height,
    pWeight : data.weight,
    pSpriteFront: data.sprites.front_default,
    pSpriteBack: data.sprites.back_default,
    pType: data.types
  };
    InsertDataToHTML(chars);
  } catch (e) {
    console.log(e);
    err404Img.hidden = false;
  }

  // console.log(`name: ${chars.pName} height: ${chars.pHeight}, weight: ${chars.pWeight}`);
  // console.log(data);
});

const typediv = document.getElementById('types');
const names = document.getElementById('names');
function InsertDataToHTML(chars) {
  typediv.innerHTML = "type: ";
  for (let i = 0; i < chars.pType.length; i++){
    const type = document.createElement('span');
    type.innerHTML = " " + chars.pType[i].type.name;
    typediv.append(type); 
    type.onclick = async() => {
      const {data} = await axios.get(`${chars.pType[i].type.url}`);
      names.innerHTML = '';
      for (let j = 0; j < data.pokemon.length; j++){
        const typeName = document.createElement('li');
        typeName.innerHTML = data.pokemon[j].pokemon.name;
        names.append(typeName);
      }
    }
  }

  const para = document.querySelector('p');
  para.innerText = `name: ${chars.pName}, height: ${chars.pHeight}, weight: ${chars.pWeight}` ;
  const image = document.createElement('img');
  image.src = chars.pSpriteFront;
  image.border = '1px';
  para.append(image);
  image.onmouseover = () => (image.src = chars.pSpriteBack); 
  image.onmouseout = () => (image.src = chars.pSpriteFront);


}


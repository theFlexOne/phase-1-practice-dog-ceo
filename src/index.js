const IMG_URL = "https://dog.ceo/api/breeds/image/random/4"
const BREED_URL = 'https://dog.ceo/api/breeds/list/all'

const breedDropdown = document.querySelector('#breedDropdown');
const dogBreedsHTML = document.querySelector('#dogBreeds')

// const createBreedLi = (subBreed) => {
//   const dogLi = document.createElement('li');
//   dogLi.textContent = `${ (subBreed)? subBreed : "" } ${breed}`
//   dogBreedsHTML.appendChild(dogLi);
// }

const pickRdmColor = () => {
  const rdmVal = () => Math.floor(Math.random() * 255) +1
  return `rgb(${rdmVal()}, ${rdmVal()}, ${rdmVal()})`
}

fetch(IMG_URL)
  .then(res => res.json())
  .then(data => {
    const dogImages = data.message;
    const dogImageContainerHTML = document.querySelector('#dogImageContainer');
    dogImages.forEach(imgUrl => {
      const dogImg = document.createElement('img');
      dogImg.src = imgUrl;
      dogImageContainerHTML.appendChild(dogImg);
    })
  })
  .catch(error => console.error(error));

fetch(BREED_URL)
  .then(res => res.json())
  .then(data => {
    const allBreeds = {...data.message};
    console.dir(allBreeds)
    for (let breed in allBreeds) {
      let subBreed = "";
      if (allBreeds[breed].length > 0) {
        allBreeds[breed].forEach((subBreed) => {
          // this is DRY
          const dogLi = document.createElement('li');
          dogLi.textContent = `${ (subBreed)? subBreed : "" } ${breed}`;
          dogLi.addEventListener('click', e => e.target.style.color = pickRdmColor())
          dogBreedsHTML.appendChild(dogLi);
        })
      } else {
        // this is DRY
      const dogLi = document.createElement('li');
      dogLi.textContent = `${ (subBreed)? subBreed : "" } ${breed}`;
      
      dogLi.addEventListener('click', e => e.target.style.color = pickRdmColor())
      dogBreedsHTML.appendChild(dogLi);
      }
    }
})

breedDropdown.addEventListener('change', e => {
  const dropdownVal = e.target.value;

})
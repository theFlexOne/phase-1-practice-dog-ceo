const IMG_URL = "https://dog.ceo/api/breeds/image/random/4"
const BREED_URL = 'https://dog.ceo/api/breeds/list/all'

const pickRdmColor = () => {
  const rdmVal = () => Math.floor(Math.random() * 255) +1
  return `rgb(${rdmVal()}, ${rdmVal()}, ${rdmVal()})`
}

const hasSubBreed = (breed) => breed.length > 0 ? true : false;

const displayImages = data => {
  const imgUrls = data.message;
  const dogImageContainer = document.querySelector('#dogImageContainer');
  imgUrls.forEach(url => {
    const newDogImg = document.createElement('img');
    newDogImg.src = url;
    dogImageContainer.appendChild(newDogImg);
  })
}

const constructBreedList = data => {
  // debugger;
  const breedData = data.message;
  const dogBreedsList = document.querySelector('#dogBreeds');
  for (const breed in breedData) {
    let subBreed = "";
    if (hasSubBreed(breedData[breed])) {
      breedData[breed].forEach((subBreed) => {
        // this is DRY
        const newBreedLi = document.createElement('li');
        newBreedLi.textContent = `${ (subBreed)? subBreed : "" } ${breed}`;
        newBreedLi.addEventListener('click', e => e.target.style.color = pickRdmColor())
        dogBreedsList.appendChild(newBreedLi);
      })
    } else {
      // this is DRY
    const newBreedLi = document.createElement('li');
    newBreedLi.textContent = `${ (subBreed)? subBreed : "" } ${breed}`;
    newBreedLi.addEventListener('click', e => e.target.style.color = pickRdmColor())
    dogBreedsList.appendChild(newBreedLi);
    }
  }
}


fetch(IMG_URL)
  .then(res => res.json())
  .then(data => displayImages(data))
  .catch(error => console.error(error));

fetch(BREED_URL)
  .then(res => res.json())
  .then(data => constructBreedList(data))
  .catch(error => console.error(error))

breedDropdown.addEventListener('change', e => {
  const dropdownVal = e.target.value;
  const breeds = document.querySelectorAll('#dogBreeds li');
  breeds.forEach((breed, i, breeds) => {
    if (!breeds[i].textContent.startsWith(dropdownVal)) {
      breeds[i].setAttribute('hidden', '')
    } else {
      breeds[i].removeAttribute('hidden')
    }
  })
})
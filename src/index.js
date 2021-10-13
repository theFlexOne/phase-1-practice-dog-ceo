const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

const createBreedLi = (subBreed) => {
  const dogLi = document.createElement('li');
  dogLi.textContent = `${ (subBreed)? subBreed : "" } ${breed}`
  dogBreeds.appendChild(dogLi);
}

fetch(imgUrl)
  .then(res => res.json())
  .then(data => {
    const dogImages = data.message;
    const dogImageContainer = document.querySelector('#dogImageContainer');
    dogImages.forEach(imgUrl => {
      const dogImg = document.createElement('img');
      dogImg.src = imgUrl;
      dogImageContainer.appendChild(dogImg);
    })
  })
  .catch(error => console.error(error));

  fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
      const allBreeds = {...data.message};
      console.dir(allBreeds)
      const dogBreeds = document.querySelector('#dogBreeds')
      for (let breed in allBreeds) {
        let subBreed = "";
        if (allBreeds[breed].length > 0) {
          allBreeds[breed].forEach((subBreed) => {
            const dogLi = document.createElement('li');
            dogLi.textContent = `${ (subBreed)? subBreed : "" } ${breed}`;
            dogBreeds.appendChild(dogLi);
          })
        } else {
        const dogLi = document.createElement('li');
        dogLi.textContent = `${ (subBreed)? subBreed : "" } ${breed}`;
        dogBreeds.appendChild(dogLi);
        }
      }
    })

/** I tried writing code that was easy to read, DRY, and structured in a short and efficient way.
    I know that this isn't ideal, as it is, and that's where I'm wanting feedback
    I encourage you to be as critical as possible. I can't be the best with anything less **/

//  ** Is this code readable? //
  //  ** How are my variable names? //
  //  ** Where could I have used shorthand for more readable code? //
  //  ** Is the overall structure (placement of variables at top, then function, event listeners, etc.) good? //

// ** Am I declaring these constants correctly? //
const IMG_URL = "https://dog.ceo/api/breeds/image/random/4"
const BREED_URL = 'https://dog.ceo/api/breeds/list/all'

const pickRdmColor = () => {
  const rdmVal = () => Math.floor(Math.random() * 255) +1
  return `rgb(${rdmVal()}, ${rdmVal()}, ${rdmVal()})`
}

const hasSubBreed = breed => breed.length > 0 ? true : false;

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
  const breedData = data.message;
  const dogBreedsList = document.querySelector('#dogBreeds');
  for (const breed in breedData) {
    let subBreed = "";
    if (hasSubBreed(breedData[breed])) {
      breedData[breed].forEach((subBreed) => {  // ** How to refactor this callback to make code DRY? //
        // this is NOT DRY
        const newBreedLi = document.createElement('li');
        newBreedLi.textContent = `${ (subBreed)? subBreed : "" } ${breed}`;
        newBreedLi.addEventListener('click', e => e.target.style.color = pickRdmColor())
        dogBreedsList.appendChild(newBreedLi);
      })
    } else {
      // this is NOT DRY
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
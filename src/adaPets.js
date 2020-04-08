// Use Node-style imports for dependencies.
const axios = require('axios');
const result = require('./result.js');

const setResult = result.setResult;
const setError = result.setError;

const BASE_URL = 'http://localhost:3000/pets/';

// Option functions.
const listPets = () => {
  // Fill out as part of Wave 1.
  axios.get(BASE_URL)
    .then((response) => {
      listOfPets = []
      response.data.forEach(pet => {
        listOfPets.push({ id: pet.id, name: pet.name });
      })
      setResult(listOfPets);
    })
    .catch((error) => {

      setError(`ERROR OCCURED: ${error.status}`);
      console.log(`ERROR OCCURED: ${error}`);
    })
};

const showDetails = (selectedPetId) => {
  if (!selectedPetId) {
    setError("You tried to show details for a pet without selecting it!");
  } else {
    // Fill out as part of Wave 2.
    axios.get(`${BASE_URL}${selectedPetId}`)
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
  }
};

const removePet = (selectedPetId) => {
  if (!selectedPetId) {
    setError("You tried to remove a pet without selecting it!");
  } else {
    // Fill out as part of Wave 3.
    axios.delete(`${BASE_URL}${selectedPetId}`)
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        setError(`failed to remove ${selectedPetId} pet`);
      })
  }
};

const addPet = (petInfo) => {
  const body = {
    name: petInfo.name,
    species: petInfo.species,
    about: petInfo.about
  };

  // Fill out as part of Wave 4.
  axios.post(BASE_URL, body)
    .then((response) => {
      setResult(response.data);
    })
    .catch((error) => {
      setError(`failed to add ${petInfo.name} pet`);
    })
};

// Use Node-style exports to export functions for tests and main.
module.exports = {
  listPets,
  showDetails,
  removePet,
  addPet
};

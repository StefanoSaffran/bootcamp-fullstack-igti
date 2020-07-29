import { promises as fs } from 'fs';
let cities = [];
let states = [];

const generateStatesJSON = async () => {
  cities = JSON.parse(await fs.readFile('./files/initial-files/Cidades.json'));
  states = JSON.parse(await fs.readFile('./files/initial-files/Estados.json'));
  
  for (const state of states) {
    const citiesFromState = cities.filter(city => city.Estado === state.ID);

    await fs.writeFile(`./files/${state.Sigla}.json`, JSON.stringify(citiesFromState, null, 2));
  }

  generate();
}

const generate = async () => {
  const countStateCities = async state => { 
    const stateCities = JSON.parse(await fs.readFile(`./files/${state}.json`));
    console.log(`${state} tem ${stateCities.length} cidades. \n`);
  };

  const getTotalCitiesFromEachState = () => {
    const statesArray = [];
    for (const state of states) {
      const citiesFromState = cities.filter(city => city.Estado === state.ID);
      statesArray.push({
        UF: state.Sigla,
        total: citiesFromState.length,
      })
    }
    return statesArray;
  }

  const top5HasMoreCities = () => {
    const statesArray = getTotalCitiesFromEachState();

    statesArray.sort((a, b) => {
      return b.total - a.total;
    });

    const top5 = statesArray.splice(0, 5);

    console.log(top5.map(item => `${item.UF} - ${item.total}`));
  }

  const top5HasLessCities = () => {
    const statesArray = getTotalCitiesFromEachState();
    
    statesArray.sort((a, b) => {
      return a.total - b.total;
    });

    const top5 = statesArray.splice(0, 5);

    top5.sort((a, b) => {
      return b.total - a.total;
    });

    console.log(top5.map(item => `${item.UF} - ${item.total}`));
  } 

  const longestCityNameFromEachState = async () => {
    const result = [];
    for (const state of states) {
      const stateCities = JSON.parse(await fs.readFile(`./files/${state.Sigla}.json`));

      const longestCity = stateCities
        .sort((a, b) => b.Nome.length - a.Nome.length)
        .filter((city, _, array) => city.Nome.length === array[0].Nome.length)
        .sort();

      result.push(`${longestCity[0].Nome} - ${state.Sigla}`); 
    }
    
    console.log(result);
    return result;
  }

  const shortestCityNameFromEachState = async () => {
    const result = [];
    for (const state of states) {
      const stateCities = JSON.parse(await fs.readFile(`./files/${state.Sigla}.json`));

      const shortestCities = stateCities
        .sort((a, b) => a.Nome.length - b.Nome.length)
        .filter((city, _, array) => city.Nome.length === array[0].Nome.length)
        .sort();

      result.push(`${shortestCities[0].Nome} - ${state.Sigla}`); 
    }
    
    console.log(result);
    return result;
  }

  const longestCityName = longestCitiesfromEachState => {
    const theLongestCity = longestCitiesfromEachState.reduce((acc, next) => {
      return acc.length > next.length ? acc : next;
    }, '');

    console.log(theLongestCity);
  }

  const shortestCityName = shortestCityNameFromEachState => {
    const theShortestCity = shortestCityNameFromEachState
      .sort((a, b) => a.length - b.length)
      .filter((city, _, array) => city.length === array[0].length)
      .sort();

    console.log(theShortestCity[0]);
  }

  countStateCities('AC');
  top5HasMoreCities();
  top5HasLessCities();
  const response = await longestCityNameFromEachState();
  const responseShortestCities = await shortestCityNameFromEachState();
  longestCityName(response);
  shortestCityName(responseShortestCities);
}

generateStatesJSON();

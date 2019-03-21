export const types = [
  {
    id: 2,
    name: 'Administrativo',
  },
  {
    id: 3,
    name: 'Entrega',
  },
  {
    id: 1,
    name: 'Principal (Operação)',
  },
  {
    id: 4,
    name: 'Residencial',
  },
];

export const FindCityByName = (cityName, cities) => {
  console.log('cities 1-1-1-1-1--1-1', cities);
  console.log('cityName -2-2-2-2-2-2-2-2', cityName);
  if (cities && cityName) {
    console.log('top -------------------');
    const newState = cities.find(el => el.code === cityName);

    console.log('NEW CITIE NAME', newState);
    return newState.name;
  }
  return [];
};

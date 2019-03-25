export const addressesTypes = [
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
  if (cities && cityName) {
    const newState = cities.find(el => el.code === cityName);

    return newState.name;
  }
  return [];
};

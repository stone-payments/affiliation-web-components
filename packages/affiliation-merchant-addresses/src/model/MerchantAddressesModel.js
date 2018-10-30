export const addressesModel = ([
  data,
]) => {
  const modeledData = data.data.map(item => ({
    description: item.typeName,
    state: item.stateName,
    city: item.cityName,
    street: item.streetName,
    number: item.streetNumber,
    complement: item.complement,
    neighborhood: item.neighborhood,
  }));

  return modeledData;
};

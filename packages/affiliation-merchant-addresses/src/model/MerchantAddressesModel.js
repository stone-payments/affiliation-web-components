export const AddressesModel = ([{ data }]) => {
  console.log('addresses model', data);

  return data.map(item => ({
    key: item.key,
    typeId: item.type.id,
    typeName: item.type.name,
    postalCode: item.postalCode,
    stateId: item.city.countrySubdivision.id,
    stateCode: item.city.countrySubdivision.iso31662Short,
    cityId: item.city.id,
    cityName: item.city.name,
    street: item.streetName,
    number: item.entranceNumber,
    complement: item.complement ? item.complement : 'N/A',
    neighborhood: item.neighborhood,
    cityDisplay: `${item.city.name} / ${item.city.countrySubdivision.iso31662Short}`,
    streetDisplay: `${item.streetName}, ${item.entranceNumber} ${item.complement ? item.complement : 'N/A'}`,
  }));
};

export const StatesModel = ([, data]) => {
  console.log('states model *******************', data);
  const modeledData = data.data.map(state => ({
    id: state.code,
    name: state.name,
  }));

  return modeledData;
};

export const CitiesModel = (cities) => {
  console.log('Cities model -----------------', cities.data);
  const modeledData = cities.data.map(citie => ({
    code: citie.name,
    name: citie.name,
  }));

  return modeledData;
};

export const AddressesModel = ([data]) => {
  console.log('addresses model', data);

  return data.data.map(item => ({
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

export const StatesModel = ([, states]) => {
  console.log('states model', states);
  const modeledData = states.data.map(state => ({
    id: state.code,
    name: state.name,
  }));

  return modeledData;
};

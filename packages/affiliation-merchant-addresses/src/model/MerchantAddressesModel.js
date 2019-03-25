export const AddressesModel = ([{ data }]) => data.map(item => ({
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

export const StatesModel = ([, data]) => {
  const modeledData = data.data.map(state => ({
    id: state.code,
    name: state.name,
  }));

  return modeledData;
};

export const CitiesModel = (cities) => {
  const modeledData = cities.data.map(citie => ({
    code: citie.name,
    name: citie.name,
  }));

  return modeledData;
};

export const PayloadModel = payload => ({
  typeId: Number(payload.typeId),
  entranceNumber: Number(payload.number),
  streetName: String(payload.street),
  neighborhood: String(payload.neighborhood),
  postalCode: String(payload.postalCode),
  cityName: String(payload.cityName),
  countrySubdivisionCode: String(payload.stateCode),
});

export const AddressResponseModel = (currentState, responses) => {
  const [data] = responses;
  const modeledArray = [];

  currentState.map((item) => {
    if (item.key === data.key) {
      const newEl = {
        ...item,
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
      };

      return modeledArray.push(newEl);
    }

    return modeledArray.push(item);
  });

  return modeledArray;
};

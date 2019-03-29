export const AddressesModel = ([data]) => data.data.map(item => ({
  key: item.key,
  typeId: item.type.id,
  typeName: item.type.name,
  postalCode: item.postalCode,
  stateCode: item.city.countrySubdivision.iso31662Short,
  cityName: item.city.name,
  streetName: item.streetName,
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

export const PayloadModel = payload => ({
  typeId: Number(payload.typeId),
  entranceNumber: Number(payload.number),
  streetName: String(payload.streetName),
  neighborhood: String(payload.neighborhood),
  postalCode: String(payload.postalCode),
  cityName: String(payload.cityName),
  countrySubdivisionCode: String(payload.stateCode),
});

export const AddressesUpdatedResponseModel = (currentState, [{ data }]) => {
  const modeledArray = [];

  currentState.map((item) => {
    if (item.key === data.key) {
      const updatedItem = {
        ...item,
        key: data.key,
        typeId: data.type.id,
        typeName: data.type.name,
        postalCode: data.postalCode,
        stateCode: data.city.countrySubdivision.iso31662Short,
        cityName: data.city.name,
        streetName: data.streetName,
        number: data.entranceNumber,
        complement: data.complement ? data.complement : 'N/A',
        neighborhood: data.neighborhood,
        cityDisplay: `${data.city.name} / ${data.city.countrySubdivision.iso31662Short}`,
        streetDisplay: `${data.streetName}, ${data.entranceNumber} ${data.complement ? data.complement : 'N/A'}`,
      };

      return modeledArray.push(updatedItem);
    }

    return modeledArray.push(item);
  });

  return modeledArray;
};

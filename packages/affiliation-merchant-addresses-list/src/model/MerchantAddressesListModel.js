export const AddressesListModel = ([
  data,
]) => {
  const modeledData = data.data.map(item => ({
    typeName: item.type.name,
    streetDisplay: `${item.streetName}, ${item.entranceNumber} ${item.complement ? item.complement : ''}`,
    neighborhood: item.neighborhood,
    cityDisplay: `${item.city.name} / ${item.city.countrySubdivision.iso31662Short}`,
    postalCode: item.postalCode,
  }));

  return modeledData;
};

export const AddressesListModel = ([
  data,
]) => {
  const modeledData = data.data.map(item => ({
    type: item.type.name,
    street: item.streetName,
    number: item.entranceNumber,
    complement: item.complement,
    neighborhood: item.neighborhood,
    city: item.city.name,
    state: item.city.countrySubdivision.iso31662Short,
    postalCode: item.postalCode,
  }));

  return modeledData;
};

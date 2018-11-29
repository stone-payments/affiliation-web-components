export const AddressesModel = ([data]) => data.map(item => ({
  description: item.type.name,
  descriptionTypeId: item.type.id,
  state: item.city.countrySubdivision.name,
  stateId: item.city.countrySubdivision.id,
  city: item.city.name,
  citId: item.city.id,
  street: item.streetName,
  number: item.entranceNumber,
  complement: item.complement,
  neighborhood: item.neighborhood,
}));

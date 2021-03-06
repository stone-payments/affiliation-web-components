export const AddressesModel = ([data]) => data.data.map(item => ({
  key: item.key,
  typeId: item.type.id,
  typeName: item.type.name,
  postalCode: item.postalCode,
  stateCode: item.city.countrySubdivision.iso31662Short,
  cityName: item.city.name,
  street: item.streetName,
  number: item.entranceNumber,
  complement: item.complement ? item.complement : 'N/A',
  neighborhood: item.neighborhood,
  cityDisplay: `${item.city.name} / ${item.city.countrySubdivision.iso31662Short}`,
  streetDisplay: `${item.streetName}, ${item.entranceNumber} ${item.complement ? item.complement : 'N/A'}`,
}));

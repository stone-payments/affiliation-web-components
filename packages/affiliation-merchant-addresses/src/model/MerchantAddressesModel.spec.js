import { expect } from 'chai';
import { AddressesModel } from './MerchantAddressesModel.js';

const mockData = [
  {
    data: [
      {
        affiliationCode: 111111111,
        id: 111111,
        typeId: 1,
        typeName: 'test',
        cityId: 1,
        cityName: 'test',
        stateName: 'test',
        countryId: 1,
        countryName: 'test',
        complement: 'test',
        locatedInShopping: false,
        neighborhood: 'test',
        postalCode: '1111111',
        reference: 'test',
        streetName: 'test',
        streetNumber: 1,
        streetTypeId: 1,
      },
    ],
  },
];

const expctedeData = [{
  description: 'test',
  state: 'test',
  city: 'test',
  street: 'test',
  number: 1,
  complement: 'test',
  neighborhood: 'test',
}];

describe('Merchant Addresses Model', () => {
  it('Should return a sucesses modeled data', () => {
    const testData = AddressesModel(mockData);

    expect(testData).to.deep.equal(expctedeData);
  });
});

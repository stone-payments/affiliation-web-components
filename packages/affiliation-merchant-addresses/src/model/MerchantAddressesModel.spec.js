import { expect } from 'Chai';
import { addressesModel } from './MerchantAddressesModel.js';

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
  uf: 'test',
  city: 'test',
  street: 'test',
  number: 1,
  complement: 'test',
  neighborhood: 'test',
}];

describe('Merchant Addresses Model', () => {
  it('Should return a sucesses modeled data', () => {
    const testData = addressesModel(mockData);
    expect(testData).to.deep.equal(expctedeData);
  });
});

import { expect } from 'chai';
import { AddressesModel } from './MerchantAddressesModel.js';

const mockData = [
  {
    data: [
      {
        key: 'test',
        entranceNumber: 1,
        streetName: 'test',
        neighborhood: 'test',
        postalCode: 'test',
        city: {
          id: 1,
          name: 'test',
          countrySubdivision: {
            id: 'test',
            name: 'test',
            iso31662Short: 'test',
            country: {
              id: 1,
              name: 'test',
              iso31661Alpha3: 'test',
              iso31661Alpha2: 'test',
            },
          },
        },
        type: {
          id: 1,
          name: 'test',
        },
      },
    ],
  },
];

const expctedeData = [{
  key: 'test',
  typeId: 1,
  typeName: 'test',
  postalCode: 'test',
  stateCode: 'test',
  cityName: 'test',
  streetName: 'test',
  number: 1,
  complement: 'N/A',
  neighborhood: 'test',
  cityDisplay: 'test / test',
  streetDisplay: 'test, 1 N/A',
}];

describe('Merchant Addresses Model', () => {
  it('Should return a sucesses modeled data', () => {
    const testData = AddressesModel(mockData);

    expect(testData).to.deep.equal(expctedeData);
  });
});

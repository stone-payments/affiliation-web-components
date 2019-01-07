import { expect } from 'chai';
import { AddressesListModel } from './MerchantAddressesListModel.js';

const mockData = [
  {
    data: [
      {
        key: 'SOME-KEY',
        entranceNumber: '15',
        streetName: 'Test street name',
        neighborhood: 'Test neighborhood',
        postalCode: '11111-11',
        complement: 'Test complement',
        city: {
          id: 1,
          name: 'Test city name',
          countrySubdivision: {
            id: 'TS-MG',
            name: 'Test country subdivision name',
            iso31662Short: 'TS',
            country: {
              id: 1,
              name: 'Test country',
              iso31661Alpha3: 'TSA',
              iso31661Alpha2: 'TAS',
            },
          },
        },
        type: {
          id: 1,
          name: 'Test type name',
        },
      },
    ],
  },
];

const expctedeData = [{
  typeName: 'Test type name',
  streetDisplay: 'Test street name, 15 Test complement',
  cityDisplay: 'Test city name / TS',
  neighborhood: 'Test neighborhood',
  postalCode: '11111-11',

}];

describe('Merchant Addresses Model List', () => {
  it('Should return a sucesses modeled data', () => {
    const testData = AddressesListModel(mockData);
    expect(testData).to.deep.equal(expctedeData);
  });
});

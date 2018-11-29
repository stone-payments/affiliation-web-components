import { expect } from 'chai';
import { AddressesModel } from './MerchantAddressesModel.js';

const mockData = [
  [
    {
      key: 'TEST',
      entranceNumber: '1',
      streetName: 'TEST',
      neighborhood: 'TEST',
      postalCode: '11111-11',
      city: {
        id: 1,
        name: 'TEST',
        countrySubdivision: {
          id: 'TES-T',
          name: 'TEST',
          iso31662Short: 'TE',
          country: {
            id: 1,
            name: 'TEST',
            iso31661Alpha3: 'TES',
            iso31661Alpha2: 'TE',
          },
        },
      },
      complement: 'TEST',
      type: {
        id: 1,
        name: 'TEST',
      },
    },
  ],
];

const expctedeData = [{
  description: 'TEST',
  descriptionTypeId: 1,
  state: 'TEST',
  stateId: 'TES-T',
  city: 'TEST',
  citId: 1,
  street: 'TEST',
  number: '1',
  complement: 'TEST',
  neighborhood: 'TEST',
}];

describe('Merchant Addresses Model', () => {
  it('Should return a sucesses modeled data', () => {
    const testData = AddressesModel(mockData);

    expect(testData).to.deep.equal(expctedeData);
  });
});

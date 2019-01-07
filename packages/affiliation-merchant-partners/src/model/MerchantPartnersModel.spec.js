import { expect } from 'chai';
import { NewPartnersModel } from './MerchantPartnersModel.js';

describe('Merchant Partners Model', () => {
  it('Should return correct PartnerModel response', () => {
    const mockData = [
      [
        {
          naturalPerson: {
            name: 'TEST',
            taxId: '1',
            taxIdType: {
              id: 1,
              name: 'TEST',
            },
            ownershipPercentage: 1,
            birthdate: '0000-00-07T00:00:00Z',
            birthPlace: 'TEST',
            birthCountry: {
              id: 1,
              name: 'TEST',
              iso31661Alpha3: 'TEST',
              iso31661Alpha2: 'TEST',
            },
            fatherName: 'TEST',
            motherName: 'TEST',
            spouseName: 'TEST',
            spouseTaxId: 'TEST',
            spouseTaxIdType: {
              id: 1,
              name: 'TEST',
            },
          },
        },
      ],
    ];

    const modeledData = [
      {
        name: 'TEST',
        documentId: '1',
        document: 'TEST',
        partnerType: 'natural',
      },
    ];

    expect(NewPartnersModel(mockData))
      .to
      .deep
      .equal(modeledData);
  });
});

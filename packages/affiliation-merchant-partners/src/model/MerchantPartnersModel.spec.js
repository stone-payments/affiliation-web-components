import { expect } from 'chai';
import { PartnersModel } from './MerchantPartnersModel.js';

describe('Merchant Partners Model', () => {
  it('Should return correct PartnerModel response', () => {
    const mockData = [
      {
        data: [
          {
            naturalPerson: {
              key: 'test',
              name: 'test',
              taxId: 1,
              taxIdType: {
                id: 2,
                name: 'CPF',
              },
              ownershipPercentage: null,
              birthdate: null,
              birthPlace: null,
              birthCountry: null,
              fatherName: null,
              motherName: null,
              spouseName: null,
              spouseTaxId: null,
              spouseTaxIdType: null,
            },
          },
        ],
      },
    ];

    const modeledData = [
      {
        name: 'test',
        documentId: 1,
        document: 'CPF',
        partnerType: 'natural',
      },
    ];

    expect(PartnersModel(mockData))
      .to
      .deep
      .equal(modeledData);
  });
});

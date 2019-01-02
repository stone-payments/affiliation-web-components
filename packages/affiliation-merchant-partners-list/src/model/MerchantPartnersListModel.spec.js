import { expect } from 'chai';
import { PartnersListModel } from './MerchantPartnersListModel.js';

describe('Merchant Partners Model', () => {
  it('Should return correct PartnersModel response.', () => {
    const dataResponse = [
      [
        {
          naturalPerson: {
            key: 'KEY',
            name: 'Natural name test',
            taxId: '123456789',
            taxIdType: {
              id: 1,
              name: 'CPF',
            },
            ownershipPercentage: 0.1,
          },
        },
        {
          legalPerson: {
            key: 'KEY',
            name: 'Legal name test',
            taxId: '987654321',
            taxIdType: {
              id: 2,
              name: 'CNPJ',
            },
            ownershipPercentage: 0.1,
          },
        },
      ],
    ];

    const modeledData = [
      {
        name: 'Natural name test',
        documentType: 'CPF',
        documentNumber: '123456789',
      },
      {
        name: 'Legal name test',
        documentType: 'CNPJ',
        documentNumber: '987654321',
      },
    ];

    expect(PartnersListModel(dataResponse))
      .to
      .deep
      .equal(modeledData);
  });
});

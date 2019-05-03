import { expect } from 'chai';
import { getInfo } from './MerchantInfoListState.js';

const mockApiResponse = [
  {
    data: {
      memberKey: 'test',
      mcc: {
        id: 1,
        name: 'Test Name',
      },
      legalName: 'Test Legal Name',
      tradeName: 'Test Trade Name',
      legalPersonality: {
        id: 1,
        name: 'Test Name',
      },
      taxId: '12345678911',
      taxIdType: {
        id: 1,
        name: 'CPF',
      },
      additionalDocuments: [
        {
          documentType: {
            id: 1,
            name: 'CNPJ',
          },
          documentIdentifier: '11111111111111',
          issuedBy: 'test',
          issueDate: '1990-12-31T00:00:00.0000000Z',
          expirationDate: '1990-12-31T00:00:00.0000000Z',
        },
      ],
      estimatedMonthlyBilling: 10000,
      birthDate: '1990-12-31T00:00:00.0000000Z',
      birthPlace: 'test',
      motherName: 'izabel',
      birthCountry: {
        id: 1,
        name: 'test',
      },
    },
  },
];


describe('Merchant Info List State.', () => {
  it('Should return correct getInfo response', () => {
    const stateData = {
      info: {
        basicData: [{
          affiliationCode: '123456789',
          documentType: 'CPF',
          documentNumber: '123.456.789-11',
          legalName: 'Test Legal Name',
          tradeName: 'Test Trade Name',
          mccDescription: 'Test Name',
        }],
        additionalData: [{
          additionalDocumentType: 'CNPJ',
          additionalDocumentIdentifier: '11.111.111/1111-11',
          issuedBy: 'test',
          issueDate: '30/12/1990',
          expirationDate: '30/12/1990',
          estimatedMonthlyBilling: 'R$ 10000',
          birthDate: '30/12/1990',
          birthPlace: 'test',
          birthCountry: 'test',
          motherName: 'izabel',
        }],
      },
      apiResponse: mockApiResponse,
      formData: {},
      affiliationCode: '11111',
    };

    const modeledData = {
      affiliationCode: '123456789',
      documentNumber: '123.456.789-11',
      documentType: 'CPF',
      legalName: 'Test Legal Name',
      tradeName: 'Test Trade Name',
      mccDescription: 'Test Name',
      mccId: 1,
    };

    expect(getInfo(stateData))
      .to
      .deep
      .equal(modeledData);
  });

  it('Should return correct getInfo response without info in ', () => {
    const stateData = {
      info: [],
      formData: {},
      apiResponse: [],
      affiliationCode: '',
    };

    const modeledData = '';

    expect(getInfo(stateData))
      .to
      .deep
      .equal(modeledData);
  });
});

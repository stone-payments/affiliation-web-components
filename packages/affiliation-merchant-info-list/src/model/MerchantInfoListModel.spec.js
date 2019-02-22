import { expect } from 'chai';
import {
  MerchantInfoListModel,
  MerchantInfoListPayloadModel,
  MerchantInfoListResponseModel,
} from './MerchantInfoListModel.js';

describe('Merchant Info List Model', () => {
  it('Should return correct MerchantInfoListModel response.', () => {
    const affiliationCode = '123456789';
    const infoData = [
      {
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
        taxId: '11111111111',
        taxIdType: {
          id: 1,
          name: 'Test Document',
        },
        additionalDocuments: [
          {
            documentType: {
              id: 1,
              name: 'test',
            },
            documentIdentifier: '11111111111111',
            issuedBy: 'test',
            issueDate: new Date(),
            expirationDate: new Date(),
          },
        ],
        estimatedMonthlyBilling: 1,
        birthDate: new Date(),
        birthPlace: 'test',
        birthCountry: {
          id: 1,
          name: 'test',
        },
      },
    ];

    const modeledData = [
      {
        affiliationCode: '123456789',
        documentNumber: '111.111.111-11',
        legalName: 'Test Legal Name',
        tradeName: 'Test Trade Name',
        mccDescription: 'Test Name',
      },
    ];

    expect(MerchantInfoListModel(infoData, affiliationCode, true, true))
      .to
      .deep
      .equal(modeledData);
  });

  it('Should return correct MerchantInfoListPayloadModel response', () => {
    const infoData = {
      formData:
      {
        fantasyName: 'Mock fantasy',
        mccId: 1,
      },
    };

    const modeledData = { tradeName: 'Mock fantasy', mccId: 1 };

    expect(MerchantInfoListPayloadModel(infoData))
      .to
      .deep
      .equal(modeledData);
  });

  it('Should return correct MerchantInfoListResponseModel response', () => {
    const stateData = [{
      tradeName: 'Flash',
      affiliationCode: '11111111',
      documentNumber: '1111',
      companyName: 'test',
      mccDescription: 'test',
    }];

    const requestResponseData = [
      {
        data: {
          fantasyName: 'Superman',
        },
      },
    ];

    const modeledData = [{
      tradeName: 'Superman',
      affiliationCode: '11111111',
      documentNumber: '1111',
      companyName: 'test',
      mccDescription: 'test',
    }];

    expect(MerchantInfoListResponseModel(requestResponseData, stateData))
      .to
      .deep
      .equal(modeledData);
  });
});

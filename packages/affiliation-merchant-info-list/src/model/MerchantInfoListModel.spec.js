import { expect } from 'chai';
import {
  MerchantInfoListModel,
  MerchantInfoListPayloadModel,
  MerchantInfoListResponseModel,
} from './MerchantInfoListModel.js';

const mockAffiliationCode = '123456789';
const mockInfoData = [
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
          issueDate: new Date(),
          expirationDate: new Date(),
        },
      ],
      estimatedMonthlyBilling: 10000,
      birthDate: new Date(),
      birthPlace: 'test',
      motherName: 'izabel',
      birthCountry: {
        id: 1,
        name: 'test',
      },
    },
  },
];

describe('Merchant Info List Model', () => {
  it('Should return correct MerchantInfoListModel response.', () => {
    const modeledData = {
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
        additionalDocumentIdentifier: '11 111 111/1111-11',
        issueBy: 'test',
        issueDate: '25/02/2019',
        expirationDate: '25/02/2019',
        estimatedMonthlyBilling: 'R$ 10000',
        birthDate: '25/02/2019',
        birthPlace: 'test',
        birthCountry: 'test',
        motherName: 'izabel',
      }],
    };

    expect(MerchantInfoListModel(mockInfoData, mockAffiliationCode, true, true))
      .to
      .deep
      .equal(modeledData);
  });

  it('Should MerchantInfoListModel response without showBasicData.', () => {
    const modeledData = {
      basicData: [],
      additionalData: [{
        additionalDocumentType: 'CNPJ',
        additionalDocumentIdentifier: '11 111 111/1111-11',
        issueBy: 'test',
        issueDate: '25/02/2019',
        expirationDate: '25/02/2019',
        estimatedMonthlyBilling: 'R$ 10000',
        birthDate: '25/02/2019',
        birthPlace: 'test',
        birthCountry: 'test',
        motherName: 'izabel',
      }],
    };

    expect(MerchantInfoListModel(
      mockInfoData, mockAffiliationCode, undefined, true))
      .to
      .deep
      .equal(modeledData);
  });

  it('Should MerchantInfoListModel response without' +
    ' showAdditionalData.', () => {
    const modeledData = {
      basicData: [{
        affiliationCode: '123456789',
        documentType: 'CPF',
        documentNumber: '123.456.789-11',
        legalName: 'Test Legal Name',
        tradeName: 'Test Trade Name',
        mccDescription: 'Test Name',
      }],
      additionalData: [],
    };

    expect(MerchantInfoListModel(
      mockInfoData, mockAffiliationCode, true, undefined))
      .to
      .deep
      .equal(modeledData);
  });

  it('Should MerchantInfoListModel response without showBasicData' +
    ' showAdditionalData.', () => {
    const modeledData = {
      basicData: [],
      additionalData: [],
    };

    expect(MerchantInfoListModel(
      mockInfoData, mockAffiliationCode, undefined, undefined))
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

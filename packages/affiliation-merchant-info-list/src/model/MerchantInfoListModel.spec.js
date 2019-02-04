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
        taxId: '1',
        taxIdType: {
          id: 1,
          name: 'Test Document',
        },
      },
    ];

    const modeledData = [
      {
        affiliationCode: '123456789',
        documentNumber: '1',
        legalName: 'Test Legal Name',
        tradeName: 'Test Trade Name',
        mccDescription: 'Test Name',
      },
    ];

    expect(MerchantInfoListModel(infoData, affiliationCode))
      .to
      .deep
      .equal(modeledData);
  });

  it('Should return correct MerchantInfoListPayloadModel response', () => {
    // state.formdata.fantasyName
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

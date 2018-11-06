import { expect } from 'chai';
import {
  MerchantInfoListModel,
  MerchantInfoListPayloadModel,
  MerchantInfoListresponseModel,
} from './MerchantInfoListModel.js';

describe('Merchant Info List Model', () => {
  it('Should return correct MerchantInfoListModel response.', () => {
    const affiliationCode = '123456789';
    const infoData = [
      {
        data: {
          prop: 'xpto',
          stonecode: '1234567',
          document: '111.111-11111',
          companyName: 'Mock_xpto',
          fantasyName: 'Mock fantasy',
          mccDescription: 'mock mcc',
        },
      },
    ];

    const modeledData = [
      {
        affiliationCode: '123456789',
        cnpj: '111.111-11111',
        companyName: 'Mock_xpto',
        fantasyName: 'Mock fantasy',
        mccDescription: 'mock mcc',
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
      formData: { fantasyName: 'Mock fantasy' },
    };

    const modeledData = { fantasyName: 'Mock fantasy' };

    expect(MerchantInfoListPayloadModel(infoData))
      .to
      .deep
      .equal(modeledData);
  });

  it('Should return correct MerchantInfoListresponseModel response', () => {
    const infoData = [
      {
        data: {
          fantasyName: 'Flash',
        },
      },
    ];

    const requestResponseData = [
      {
        data: {
          fantasyName: 'Flash',
        },
      },
    ];

    const modeledData = [{ fantasyName: 'Flash' }];

    expect(MerchantInfoListresponseModel(requestResponseData, infoData))
      .to
      .deep
      .equal(modeledData);
  });
});

import { expect } from 'chai';
import { getInfo } from './MerchantInfoListState.js';

describe('Merchant Info List State.', () => {
  it('Should return correct getInfo response', () => {
    const stateData = {
      info: {
        basicData: [
          {
            affiliationCode: '11111111111',
            documentNumber: '11111111111',
            companyName: 'test.',
            fantasyName: 'test',
            mccDescription: 'test',
          },
        ],
      },
      apiResponse: [{ mcc: { id: 1 } }],
      formData: {},
      affiliationCode: '11111',
    };

    const modeledData = {
      affiliationCode: '11111111111',
      documentNumber: '11111111111',
      companyName: 'test.',
      fantasyName: 'test',
      mccDescription: 'test',
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

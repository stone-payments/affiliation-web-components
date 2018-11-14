import { expect } from 'chai';
import { PartnersModel } from './MerchantPartnersModel.js';

describe('Merchant Partners Model', () => {
  it('Should return correct PartnerModel response', () => {
    const dataResponse = [
      [
        {
          object: 'test',
          id: '11111',
          name: 'test',
          email: 'test@test.com',
          rg: 'N/I',
          cpf: '111111111111',
          birthday: '1111-11-11',
        },
      ],
    ];
    const modeledData = [
      {
        name: 'test',
        email: 'test@test.com',
        rg: 'N/I',
        cpf: '111111111111',
      },
    ];

    expect(PartnersModel(dataResponse))
      .to
      .deep
      .equal(modeledData);
  });
});

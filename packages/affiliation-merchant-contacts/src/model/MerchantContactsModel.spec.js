import { expect } from 'chai';
import {
  merchantContactsPayloadModel,
  contactsModel,
} from './MerchantContactsModel.js';

describe('', () => {
  it('Should return correct Merchant Contacts model.', () => {
    const modeledResponse = {
      name: 'xpto',
      email: 'xpto@stone.com.br',
      phone: '22222222',
      mobilePhone: '12345678',
      typeName: '12345',
    };

    const contactsData = [
      {
        data: {
          name: 'xpto',
          email: 'xpto@stone.com.br',
          phone: '22222222',
          mobilePhone: '12345678',
          typeName: '12345',
        },
      }];

    expect(contactsModel(contactsData))
      .to.deep.equal(modeledResponse);
  });

  it('Should return correct Put Merchant Contacts model.', () => {
    const modeledResponse = {
      name: 'xpto',
      email: 'xpto@stone.com.br',
      phone: '2199999999',
      mobilePhone: '21999999999',
      typeId: 1,
    };

    const contactsData = {
      name: 'xpto',
      email: 'xpto@stone.com.br',
      phone: '(21) 9999-9999',
      mobilePhone: '(21) 99999-9999',
      typeId: '1',
    };

    expect(merchantContactsPayloadModel(contactsData))
      .to.deep.equal(modeledResponse);
  });
});

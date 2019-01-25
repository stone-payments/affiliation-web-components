import { expect } from 'chai';
import {
  MerchantContactsPayloadModel,
  ContactsModel,
} from './MerchantContactsModel.js';

describe('', () => {
  it('Should return correct Merchant Contacts model.', () => {
    const modeledResponse = [
      {
        name: 'teste tomador2',
        email: 'test@email.com',
        phone: '1112341234',
        typeName: 'Administrativo',
        typeId: 1,
      },
    ];

    const contactsData = [
      {
        key: 'Test key',
        type: {
          id: 1,
          name: 'Administrativo',
        },
        friendlyName: 'teste tomador2',
        phones: [
          {
            key: 'Test key',
            type: {
              id: 1,
              name: 'Desconhecido',
            },
            countryCode: 11,
            areaCode: 11,
            phoneNumber: 12341234,
          },
        ],
        emails: [
          {
            key: 'Test key',
            email: 'test@email.com',
          },
        ],
      }];

    expect(ContactsModel(contactsData))
      .to.deep.equal(modeledResponse);
  });

  it('Should return correct Put Merchant Contacts model.', () => {
    const modeledResponse = {
      name: 'xpto',
      email: 'xpto@stone.com.br',
      phone: '2199999999',
      typeId: 1,
    };

    const contactsData = {
      name: 'xpto',
      email: 'xpto@stone.com.br',
      phone: '(21) 9999-9999',
      typeId: '1',
    };

    expect(MerchantContactsPayloadModel(contactsData))
      .to.deep.equal(modeledResponse);
  });
});

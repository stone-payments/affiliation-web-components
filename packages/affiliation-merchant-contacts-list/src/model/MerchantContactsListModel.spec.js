import { expect } from 'chai';
import { ContactsListModel } from './MerchantContactsListModel.js';

describe('Contacts List Model', () => {
  it('Should return correct data.', () => {
    const responseData = [
      {
        data: [
          {
            affiliationCode: '111111111',
            email: 'test',
            id: '111',
            mobilePhone: '2222222222',
            name: 'test',
            phone: '2222222222',
            typeId: 1,
            typeName: 'test',
          },
        ],
      },
    ];

    const modeledData = [
      {
        Cargo: 'test',
        Celular: '2222222222',
        Email: 'test',
        Nome: 'test',
        Telefone: '2222222222',
      },
    ];

    expect(ContactsListModel(responseData)).to.be.deep.equal(modeledData);
  });
});

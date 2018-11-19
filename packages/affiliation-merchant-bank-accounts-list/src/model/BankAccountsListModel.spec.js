import { expect } from 'chai';
import { BankAccountsListModel } from './BankAccountsListModel.js';

const infoData = [
  {
    data: [{
      id: 111,
      compeCode: 111,
      ispbCode: 11111,
      name: 'test',
      accountTypes: [
        {
          id: 2,
          name: 'test',
        },
        {
          id: 1,
          name: 'test',
        },
      ],
    }],
  },
  {
    data: [{
      affiliationCode: 111,
      id: 111,
      accountNumber: 2222,
      accountNumberVerificationCode: 2,
      agencyNumber: 1111,
      agencyNumberVerificationCode: 2,
      bankId: 4,
      bankName: 'test',
      statusId: 4,
      typeId: 1,
      typeName: 'test',
      centralizedPayment: false,
    }],
  },
];

describe('Merchant Bank Accounts List Model', () => {
  it('Should return correct Merchant Bank Accounts model.', () => {
    const modeledData = {
      banks: [{
        accountNumber: 2222,
        accountNumberVerificationCode: 2,
        agencyNumber: 1111,
        agencyNumberVerificationCode: 2,
        bankName: 'test',
        typeName: 'test',
      }],
      availableBanks: [{
        id: 111,
        compeCode: 111,
        ispbCode: 11111,
        name: 'test',
        accountTypes: [
          {
            id: 2,
            name: 'test',
          },
          {
            id: 1,
            name: 'test',
          },
        ],
      }],
    };

    expect(BankAccountsListModel(infoData)).to.deep.equal(modeledData);
  });
});

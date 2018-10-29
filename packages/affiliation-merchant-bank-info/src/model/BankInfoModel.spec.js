import { bankInfoModel } from './BankInfoModel.js';

it('Should return correct Merchant Bank Info model.', () => {
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
  expect(bankInfoModel(infoData))
    .to.eql({
      banks: [{
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
    });
});

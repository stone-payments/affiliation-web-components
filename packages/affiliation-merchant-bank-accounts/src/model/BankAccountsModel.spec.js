import { expect } from 'chai';
import {
  BankAccountsModel,
  BankAccountsFormResponseModel,
  BankAccountsModelWithAvailableBanks,
} from './BankAccountsModel.js';

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

const stateFormValue = [
  {
    affiliationCode: '11111',
    id: 1111,
    accountNumber: '1111',
    accountNumberVerificationCode: '1',
    agencyNumber: '1',
    agencyNumberVerificationCode: '1',
    bankId: 111,
    bankName: 'test',
    statusId: 1,
    typeId: 1,
    typeName: 'test',
    centralizedPayment: false,
  },
];

const apiResponsesValues = [
  {
    data: {
      bankId: 111,
      accountNumber: '1111',
      accountNumberVerificationCode: '1',
      agencyNumber: '1111',
      agencyNumberVerificationCode: '1',
      centralizedPayment: false,
      id: 111111,
      statusId: 1,
      typeId: 1,
    },
    messages: [],
  },
];

describe('Merchant Bank Accounts Model', () => {
  it('Should return correct Merchant Bank Accounts' +
  ' with available banks model.', () => {
    const modeledData = {
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
    };

    expect(BankAccountsModelWithAvailableBanks(infoData))
      .to
      .deep
      .equal(modeledData);
  });

  it('Should return correct Merchant Bank Accounts form Response model', () => {
    const modeledData = [
      {
        bankName: 'test',
        typeName: 'test',
        accountNumber: '1111',
        accountNumberVerificationCode: '1',
        agencyNumber: '1111',
        agencyNumberVerificationCode: '1',
        bankId: 111,
        statusId: 1,
        typeId: 1,
        centralizedPayment: false,
      },
    ];

    expect(BankAccountsFormResponseModel(stateFormValue, apiResponsesValues))
      .to
      .deep
      .equal(modeledData);
  });

  it('Should return correct Merchant Bank Accounts', () => {
    const mock = [
      [
        {
          key: 'test',
          bank: {
            id: 'test',
            name: 'test',
          },
          branchCode: 'test',
          accountNumber: 'test',
          accountNumberCheckDigit: 'test',
          accountType: {
            id: 'test',
            name: 'test',
          },
          status: {
            id: 'test',
            name: 'test',
          },
        }],
      [],
    ];

    const modeledData = [{
      key: 'test',
      bankId: 'test',
      bankName: 'test',
      branchCode: 'test',
      accountNumber: 'test',
      accountNumberCheckDigit: 'test',
      accountTypeId: 'test',
      accountTypeName: 'test',
      statusId: 'test',
      statusName: 'test',
      accountDisplayNmae: 'test-test',
    }];

    expect(BankAccountsModel(mock))
      .to
      .deep
      .equal(modeledData);
  });
});

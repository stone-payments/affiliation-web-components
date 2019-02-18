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

const newStateDataMock = [
  {
    key: '1',
    bankId: 'test',
    bankName: 'test',
    branchCode: 'test',
    accountNumber: 'test',
    accountNumberCheckDigit: 'test',
    accountTypeId: 'test',
    accountTypeName: 'test',
    statusId: 'test',
    statusName: 'test',
    branchCodeDisplay: 'test',
    accountDisplayNmae: 'test',
  },
  {
    key: '2',
    bankId: 'test',
    bankName: 'test',
    branchCode: 'test',
    accountNumber: 'test',
    accountNumberCheckDigit: 'test',
    accountTypeId: 'test',
    accountTypeName: 'test',
    statusId: 'test',
    statusName: 'test',
    branchCodeDisplay: 'test',
    accountDisplayNmae: 'test',
  },
];

const newResponseDataMock = [
  {
    key: '2',
    bank: { id: 1, name: 'test response' },
    bankName: 'test response',
    branchCode: 'test response',
    accountNumber: 'test response',
    accountNumberCheckDigit: 'test response',
    accountType: { id: 1, name: 'test response' },
    accountTypeName: 'test response',
    status: { id: 1, name: 'test response' },
    statusName: 'test response',
    branchCodeDisplay: 'test response',
    accountDisplayNmae: 'test response',
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
        key: '1',
        bankId: 'test',
        bankName: 'test',
        branchCode: 'test',
        accountNumber: 'test',
        accountNumberCheckDigit: 'test',
        accountTypeId: 'test',
        accountTypeName: 'test',
        statusId: 'test',
        statusName: 'test',
        branchCodeDisplay: 'test',
        accountDisplayNmae: 'test',
      }, {
        key: '2',
        bankId: 1,
        bankName: 'test response',
        branchCode: 'test response',
        branchCodeCheckDigit: undefined,
        accountNumber: 'test response',
        accountNumberCheckDigit: 'test response',
        accountTypeId: 1,
        accountTypeName: 'test response',
        statusId: 1,
        statusName: 'test response',
        branchCodeDisplay: 'test response',
        accountDisplayNmae: 'test response-test response',
      },
    ];

    expect(BankAccountsFormResponseModel(newStateDataMock, newResponseDataMock))
      .to
      .deep
      .equal(modeledData);
  });

  it('Should return correct Merchant Bank Accounts', () => {
    const mock = [
      {
        data: [
          {
            id: 1,
            name: 'test',
          }, {
            id: 2,
            name: 'test',
          },
        ],
      },
      {
        data: [
          {
            key: 'test',
            bank: {
              id: 'test',
              name: 'test',
            },
            branchCode: 'test',
            branchCodeCheckDigit: 'test',
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
          },
        ],
      },
    ];

    const modeledData = {
      banks: [
        {
          key: 'test',
          bankId: 'test',
          bankName: 'test',
          branchCode: 'test',
          branchCodeCheckDigit: 'test',
          accountNumber: 'test',
          accountNumberCheckDigit: 'test',
          accountTypeId: 'test',
          accountTypeName: 'test',
          statusId: 'test',
          statusName: 'test',
          accountDisplayNmae: 'test-test',
          branchCodeDisplay: 'test-test',
        }],
      availableBanks: [
        {
          id: 1,
          name: 'test',
        }, {
          id: 2,
          name: 'test',
        },
      ],
    };

    expect(BankAccountsModel(mock))
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
          branchCodeCheckDigit: 'test',
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
      branchCodeCheckDigit: 'test',
      accountNumber: 'test',
      accountNumberCheckDigit: 'test',
      accountTypeId: 'test',
      accountTypeName: 'test',
      statusId: 'test',
      statusName: 'test',
      accountDisplayNmae: 'test-test',
      branchCodeDisplay: 'test-test',
    }];

    expect(BankAccountsModel(mock))
      .to
      .deep
      .equal(modeledData);
  });
});

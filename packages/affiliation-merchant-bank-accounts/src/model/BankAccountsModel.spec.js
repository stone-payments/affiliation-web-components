import { expect } from 'chai';
import {
  BankAccountsModel,
  BankAccountsFormResponseModel,
} from './BankAccountsModel.js';

const newStateDataMock = [
  {
    key: '1',
    bankId: 'test',
    bankName: 'test',
    branchCode: 'test',
    accountNumber: 'test',
    accountNumberCheckDigit: '1',
    accountTypeId: 'test',
    accountTypeName: 'test',
    statusId: 'test',
    statusName: 'test',
    branchCodeDisplay: 'test',
    accountDisplayName: 'test',
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
  },
];

const newResponseDataMock = [
  {
    key: '2',
    bank: { id: 1, name: 'test response' },
    bankName: 'test response',
    branchCode: 'test response',
    accountNumber: 'test response',
    accountNumberCheckDigit: '1',
    accountType: { id: 1, name: 'test response' },
    accountTypeName: 'test response',
    status: { id: 1, name: 'test response' },
    statusName: 'test response',
  },
];

describe('Merchant Bank Accounts Model', () => {
  it('Should return correct Merchant Bank Accounts form Response model', () => {
    const modeledData = [
      {
        key: '1',
        bankId: 'test',
        bankName: 'test',
        branchCode: 'test',
        accountNumber: 'test',
        accountNumberCheckDigit: '1',
        accountTypeId: 'test',
        accountTypeName: 'test',
        statusId: 'test',
        statusName: 'test',
        branchCodeDisplay: 'test',
        accountDisplayName: 'test',
      }, {
        key: '2',
        bankId: 1,
        bankName: 'test response',
        branchCode: 'test response',
        branchCodeCheckDigit: undefined,
        accountNumber: 'test response',
        accountNumberCheckDigit: '1',
        accountTypeId: 1,
        accountTypeName: 'test response',
        statusId: 1,
        statusName: 'test response',
        branchCodeDisplay: 'test response',
        accountDisplayName: 'test response-1',
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
          id: 1,
          name: 'test',
        }, {
          id: 2,
          name: 'test',
        },
      ],
      bankAccounts: [
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
          accountDisplayName: 'test-test',
          branchCodeDisplay: 'test-test',
        }],
    };

    expect(BankAccountsModel(mock))
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
          id: 1,
          name: 'test',
        }, {
          id: 2,
          name: 'test',
        },
      ],
      bankAccounts: [
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
          accountDisplayName: 'test-test',
          branchCodeDisplay: 'test-test',
        }],
    };

    expect(BankAccountsModel(mock))
      .to
      .deep
      .equal(modeledData);
  });
});
